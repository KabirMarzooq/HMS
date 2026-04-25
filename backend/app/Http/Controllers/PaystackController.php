<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Payment;
use App\Models\Receipt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class PaystackController extends Controller
{
    // ─────────────────────────────────────────────────────────────────────────
    // STEP 1: Patient clicks "Pay Now"
    // Frontend calls this to get a Paystack authorization URL / access code
    // ─────────────────────────────────────────────────────────────────────────
    public function initializePayment(Request $request)
    {
        $request->validate([
            'invoice_id' => 'required|exists:invoices,id',
        ]);

        $invoice = Invoice::where('id', $request->invoice_id)
            ->where('patient_id', Auth::id())
            ->whereIn('status', ['unpaid', 'overdue'])
            ->firstOrFail();

        $patient = Auth::user();

        // Amount must be in KOBO (multiply NGN by 100)
        $amountInKobo = (int) ($invoice->total_amount * 100);

        // Call Paystack API to initialize transaction
        $response = $this->callPaystack('POST', '/transaction/initialize', [
            'email'     => $patient->email,
            'amount'    => $amountInKobo,
            'currency'  => 'NGN',
            'reference' => $this->generateReference($invoice->id),
            'metadata'  => [
                'invoice_id'   => $invoice->id,
                'patient_id'   => $patient->id,
                'invoice_number' => $invoice->invoice_number,
                'cancel_action' => config('app.frontend_url') . '/dashboard/bills',
            ],
        ]);

        if (!$response || !$response['status']) {
            return response()->json([
                'message' => 'Could not initialize payment. Please try again.'
            ], 500);
        }

        // Save a pending payment record
        Payment::create([
            'invoice_id'        => $invoice->id,
            'patient_id'        => $patient->id,
            'amount'            => $invoice->total_amount,
            'currency'          => 'NGN',
            'status'            => 'pending',
            'gateway'           => 'paystack',
            'gateway_reference' => $response['data']['reference'],
        ]);

        return response()->json([
            'access_code'          => $response['data']['access_code'],
            'reference'            => $response['data']['reference'],
            'authorization_url'    => $response['data']['authorization_url'],
        ]);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // STEP 2: Paystack sends a webhook to this endpoint after payment
    // This is what actually marks the invoice as paid
    // ─────────────────────────────────────────────────────────────────────────
    public function webhook(Request $request)
    {
        // 1. Verify the request is genuinely from Paystack
        $paystackSignature = $request->header('x-paystack-signature');
        $computedHash = hash_hmac(
            'sha512',
            $request->getContent(),
            config('paystack.secretKey')
        );

        if ($paystackSignature !== $computedHash) {
            Log::warning('Paystack webhook: invalid signature');
            return response()->json(['message' => 'Invalid signature'], 400);
        }

        $payload = $request->all();
        $event   = $payload['event'] ?? null;

        Log::info('Paystack webhook received: ' . $event);

        // 2. Only handle successful charge events
        if ($event === 'charge.success') {
            $data      = $payload['data'];
            $reference = $data['reference'];
            $metadata  = $data['metadata'] ?? [];
            $invoiceId = $metadata['invoice_id'] ?? null;

            if (!$invoiceId) {
                Log::error('Paystack webhook: no invoice_id in metadata');
                return response()->json(['message' => 'OK'], 200);
            }

            DB::transaction(function () use ($data, $reference, $invoiceId) {
                // Find the invoice
                $invoice = Invoice::find($invoiceId);

                if (!$invoice || $invoice->status === 'paid') {
                    return; // Already paid or not found — skip
                }

                // Update the pending payment record
                $payment = Payment::where('gateway_reference', $reference)->first();

                if ($payment) {
                    $payment->update([
                        'status'           => 'successful',
                        'payment_method'   => $data['channel'] ?? 'card',
                        'gateway_response' => $data,
                        'paid_at'          => now(),
                    ]);
                } else {
                    // Create payment if not found (edge case)
                    $payment = Payment::create([
                        'invoice_id'        => $invoiceId,
                        'patient_id'        => $invoice->patient_id,
                        'amount'            => $invoice->total_amount,
                        'currency'          => 'NGN',
                        'status'            => 'successful',
                        'gateway'           => 'paystack',
                        'gateway_reference' => $reference,
                        'gateway_response'  => $data,
                        'payment_method'    => $data['channel'] ?? 'card',
                        'paid_at'           => now(),
                    ]);
                }

                // Mark invoice as paid
                $invoice->update([
                    'status'  => 'paid',
                    'paid_at' => now(),
                ]);

                // Generate receipt
                Receipt::create([
                    'receipt_number' => Receipt::generateReceiptNumber(),
                    'payment_id'     => $payment->id,
                    'invoice_id'     => $invoice->id,
                    'patient_id'     => $invoice->patient_id,
                    'amount_paid'    => $invoice->total_amount,
                    'currency'       => 'NGN',
                    'payment_method' => $data['channel'] ?? 'card',
                    'issued_at'      => now(),
                ]);

                // Decrement stock for prescription invoices
                if ($invoice->type === 'prescription') {
                    $items = \App\Models\InvoiceItem::where('invoice_id', $invoice->id)
                        ->whereNot('description', 'like', '%Service Charge%')
                        ->get();

                    foreach ($items as $item) {
                        \App\Models\Drug::where('name', $item->description)
                            ->decrement('stock_quantity', $item->quantity);
                    }
                }

                Log::info("Invoice #{$invoice->invoice_number} marked as paid via Paystack.");
            });
        }

        // Always return 200 to Paystack so it stops retrying
        return response()->json(['message' => 'OK'], 200);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // STEP 3: Frontend can verify payment status after popup closes
    // ─────────────────────────────────────────────────────────────────────────
    public function verifyPayment($reference)
    {
        $response = $this->callPaystack('GET', '/transaction/verify/' . $reference);

        if (!$response || !$response['status']) {
            return response()->json(['verified' => false, 'message' => 'Verification failed'], 400);
        }

        $status = $response['data']['status']; // 'success', 'failed', 'abandoned'

        return response()->json([
            'verified' => $status === 'success',
            'status'   => $status,
            'data'     => $response['data'],
        ]);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // HELPER: Make a request to Paystack API
    // ─────────────────────────────────────────────────────────────────────────
    private function callPaystack(string $method, string $endpoint, array $body = []): ?array
    {
        $secretKey = config('paystack.secretKey');
        $baseUrl   = 'https://api.paystack.co';

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $baseUrl . $endpoint);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Bearer ' . $secretKey,
            'Content-Type: application/json',
        ]);

        if ($method === 'POST') {
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
        }

        $result = curl_exec($ch);
        curl_close($ch);

        return $result ? json_decode($result, true) : null;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // HELPER: Generate a unique transaction reference
    // ─────────────────────────────────────────────────────────────────────────
    private function generateReference(int $invoiceId): string
    {
        return 'ONC-' . $invoiceId . '-' . strtoupper(uniqid());
    }
}
