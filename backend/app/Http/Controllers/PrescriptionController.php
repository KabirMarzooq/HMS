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
            'patient_id' => 'required|exists:users,id',
            'medication' => 'required|string',
            'dosage' => 'required|string',
            'frequency' => 'required|string',
            'duration' => 'required|string',
            'instructions' => 'nullable|string',
        ]);

        $prescription = Prescription::create([
            'doctor_id' => Auth::id(),
            'patient_id' => $validated['patient_id'],
            'medication' => $validated['medication'],
            'dosage' => $validated['dosage'],
            'frequency' => $validated['frequency'],
            'duration' => $validated['duration'],
            'instructions' => $validated['instructions'],
        ]);

        return response()->json($prescription, 201);
    }

    public function allPrescriptions()
    {
        return Prescription::with(['patient:id,name', 'doctor:id,name'])
            ->latest()
            ->paginate(15);
    }
}
