<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Payment;
use App\Models\Receipt;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ReceptionBillingController extends Controller
{
    /**
     * Get all invoices across all patients.
     * Supports search by patient name.
     */
    public function allBills(Request $request)
    {
        $search = $request->query('search');

        $invoices = Invoice::with([
            'patient:id,name,email,phone',
            'doctor:id,name,specialization',
            'appointment:id,appointment_date,appointment_time',
            'items',
            'receipt',
        ])
            ->when($search, function ($query) use ($search) {
                $query->whereHas('patient', function ($q) use ($search) {
                    $q->where('name', 'like', '%' . $search . '%')
                        ->orWhere('email', 'like', '%' . $search . '%');
                });
            })
            ->orderBy('created_at', 'desc')
            ->get();

        // Summary stats
        $totalUnpaid   = $invoices->whereIn('status', ['unpaid', 'overdue'])->sum('total_amount');
        $totalPaid     = $invoices->where('status', 'paid')->sum('total_amount');
        $unpaidCount   = $invoices->whereIn('status', ['unpaid', 'overdue'])->count();
        $paidCount     = $invoices->where('status', 'paid')->count();

        return response()->json([
            'invoices'     => $invoices,
            'stats' => [
                'total_unpaid'  => $totalUnpaid,
                'total_paid'    => $totalPaid,
                'unpaid_count'  => $unpaidCount,
                'paid_count'    => $paidCount,
            ],
        ]);
    }

    /**
     * Get a single invoice with full details.
     */
    public function showInvoice($id)
    {
        $invoice = Invoice::with([
            'patient:id,name,email,phone',
            'doctor:id,name,specialization',
            'appointment:id,appointment_date,appointment_time,reason',
            'items',
            'receipt',
            'payment',
        ])->findOrFail($id);

        return response()->json($invoice);
    }

    /**
     * Mark a bill as paid via CASH.
     * Receptionist collects cash and records it here.
     */
    public function markCashPaid(Request $request, $invoiceId)
    {
        $request->validate([
            'received_by' => 'nullable|string|max:100',
            'notes'       => 'nullable|string|max:255',
        ]);

        $invoice = Invoice::where('id', $invoiceId)
            ->whereIn('status', ['unpaid', 'overdue'])
            ->firstOrFail();

        DB::transaction(function () use ($invoice, $request) {
            // Create payment record
            $payment = Payment::create([
                'invoice_id'        => $invoice->id,
                'patient_id'        => $invoice->patient_id,
                'amount'            => $invoice->total_amount,
                'currency'          => 'NGN',
                'status'            => 'successful',
                'gateway'           => 'cash',
                'gateway_reference' => 'CASH-' . strtoupper(uniqid()),
                'gateway_response'  => [
                    'method'      => 'cash',
                    'received_by' => $request->received_by ?? Auth::user()->name,
                    'notes'       => $request->notes,
                    'processed_by_id' => Auth::id(),
                ],
                'payment_method'    => 'cash',
                'paid_at'           => now(),
            ]);

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
                'payment_method' => 'cash',
                'issued_at'      => now(),
            ]);
        });

        return response()->json([
            'message' => 'Cash payment recorded and receipt generated successfully.',
        ]);
    }

    /**
     * Initialize Paystack payment on behalf of a patient.
     * Same as patient side but receptionist triggers it.
     */
    public function initializeCardPayment(Request $request)
    {
        $request->validate([
            'invoice_id' => 'required|exists:invoices,id',
        ]);

        $invoice = Invoice::with('patient:id,name,email')
            ->where('id', $request->invoice_id)
            ->whereIn('status', ['unpaid', 'overdue'])
            ->firstOrFail();

        $amountInKobo = (int) ($invoice->total_amount * 100);

        // Use patient's email for Paystack
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://api.paystack.co/transaction/initialize');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Bearer ' . config('paystack.secretKey'),
            'Content-Type: application/json',
        ]);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
            'email'     => $invoice->patient->email,
            'amount'    => $amountInKobo,
            'currency'  => 'NGN',
            'reference' => 'ONC-' . $invoice->id . '-' . strtoupper(uniqid()),
            'metadata'  => [
                'invoice_id'     => $invoice->id,
                'patient_id'     => $invoice->patient_id,
                'invoice_number' => $invoice->invoice_number,
                'processed_by'   => Auth::user()->name,
            ],
        ]));

        $result   = curl_exec($ch);
        curl_close($ch);
        $response = json_decode($result, true);

        if (!$response || !$response['status']) {
            return response()->json([
                'message' => 'Could not initialize payment.'
            ], 500);
        }

        // Save pending payment
        Payment::create([
            'invoice_id'        => $invoice->id,
            'patient_id'        => $invoice->patient_id,
            'amount'            => $invoice->total_amount,
            'currency'          => 'NGN',
            'status'            => 'pending',
            'gateway'           => 'paystack',
            'gateway_reference' => $response['data']['reference'],
        ]);

        return response()->json([
            'access_code'       => $response['data']['access_code'],
            'reference'         => $response['data']['reference'],
            'authorization_url' => $response['data']['authorization_url'],
        ]);
    }

    /**
     * Get a single receipt.
     */
    public function showReceipt($id)
    {
        $receipt = Receipt::with([
            'invoice.items',
            'invoice.doctor:id,name,specialization',
            'invoice.appointment:id,appointment_date,appointment_time',
            'invoice.patient:id,name,email,phone',
            'payment',
        ])->findOrFail($id);

        return response()->json($receipt);
    }
}
