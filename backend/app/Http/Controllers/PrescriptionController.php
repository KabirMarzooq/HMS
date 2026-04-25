<?php

// app/Http/Controllers/PrescriptionController.php

namespace App\Http\Controllers;

use App\Models\Prescription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PrescriptionController extends Controller
{
    // Fetch prescriptions written by the logged-in doctor
    public function index()
    {
        return Prescription::with('patient:id,name')
            ->where('doctor_id', Auth::id())
            ->latest()
            ->get();
    }

    // Save a new prescription
    public function store(Request $request)
    {
        $validated = $request->validate([
            'patient_id'          => 'required|exists:users,id',
            'instructions'        => 'nullable|string',
            'drugs'               => 'required|array|min:1',
            'drugs.*.drug_id'     => 'required|exists:drugs,id',
            'drugs.*.drug_name'   => 'required|string',
            'drugs.*.quantity'    => 'required|integer|min:1',
            'drugs.*.unit_price'  => 'required|numeric|min:0',
            'drugs.*.total'       => 'required|numeric|min:0',
        ]);

        $doctorId = Auth::id();

        // Build a readable medication string for backward compatibility
        $medicationSummary = collect($validated['drugs'])
            ->map(fn($d) => "{$d['drug_name']} x{$d['quantity']}")
            ->join(', ');

        // Create the prescription
        $prescription = Prescription::create([
            'doctor_id'    => $doctorId,
            'patient_id'   => $validated['patient_id'],
            'medication'   => $medicationSummary,
            'dosage'       => '—',
            'frequency'    => '—',
            'duration'     => '—',
            'instructions' => $validated['instructions'],
        ]);

        // Save individual drug items
        foreach ($validated['drugs'] as $drug) {
            $prescription->items()->create([
                'drug_id'    => $drug['drug_id'],
                'drug_name'  => $drug['drug_name'],
                'quantity'   => $drug['quantity'],
                'unit_price' => $drug['unit_price'],
                'total'      => $drug['total'],
            ]);
        }

        // Generate prescription invoice
        BillingController::generatePrescriptionInvoice(
            $prescription,
            $validated['drugs']
        );

        return response()->json($prescription->load('items'), 201);
    }

    public function allPrescriptions()
    {
        return Prescription::with(['patient:id,name', 'doctor:id,name'])
            ->latest()
            ->paginate(15);
    }
}
