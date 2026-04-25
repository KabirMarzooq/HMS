<?php

namespace App\Http\Controllers;

use App\Models\MedicalRecord;
use App\Models\PatientProfile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MedicalRecordController extends Controller
{
    /**
     * Get full medical record for a specific patient.
     * Returns: patient profile (folder cover) + visit timeline.
     */
    public function show($patientId)
    {
        $doctorId = Auth::id();

        // 1. Get patient basic info + their profile (folder cover)
        $patient = User::where('id', $patientId)
            // ->where('role', 'patient')
            ->with('patientProfile')
            ->firstOrFail();

        // 2. Get chronological visit records for this patient by this doctor
        $records = MedicalRecord::where('patient_id', $patientId)
            ->where('doctor_id', $doctorId)
            ->with('doctor:id,name')
            ->orderBy('visit_date', 'desc')
            ->get();

        // 3. Get prescriptions for this patient by this doctor
        $prescriptions = \App\Models\Prescription::where('patient_id', $patientId)
            ->where('doctor_id', $doctorId)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'patient' => [
                'id'                 => $patient->id,
                'name'               => $patient->name,
                'email'              => $patient->email,
                'profile'            => $patient->patientProfile,
            ],
            'records'       => $records,
            'prescriptions' => $prescriptions,
        ]);
    }

    /**
     * Store a new visit record (Add Record button).
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'patient_id'         => 'required|exists:users,id',
            'visit_date'         => 'required|date',
            'chief_complaint'    => 'required|string|max:255',
            'blood_pressure'     => 'nullable|string|max:20',
            'temperature_c'      => 'nullable|numeric|between:30,45',
            'heart_rate'         => 'nullable|integer|between:30,250',
            'oxygen_saturation'  => 'nullable|integer|between:50,100',
            'diagnosis'          => 'nullable|string',
            'notes'              => 'nullable|string',
            'action_taken'       => 'nullable|string|max:255',
        ]);

        $record = MedicalRecord::create([
            ...$validated,
            'doctor_id' => Auth::id(),
        ]);

        return response()->json($record->load('doctor:id,name'), 201);
    }

    /**
     * Update or create the patient's profile (folder cover).
     * Doctors can fill in blood type, allergies, etc.
     */
    public function updateProfile(Request $request, $patientId)
    {
        $validated = $request->validate([
            'blood_type'          => 'nullable|string|max:5',
            'gender'              => 'nullable|string|max:20',
            'date_of_birth'       => 'nullable|date',
            'height_cm'           => 'nullable|numeric',
            'weight_kg'           => 'nullable|numeric',
            'allergies'           => 'nullable|string',
            'chronic_conditions'  => 'nullable|string',
            'phone'               => 'nullable|string|max:20',
            'emergency_contact'   => 'nullable|string|max:100',
        ]);

        $profile = PatientProfile::updateOrCreate(
            ['user_id' => $patientId],
            $validated
        );

        return response()->json($profile);
    }

    public function adminShow($patientId)
    {
        // Get patient basic info + profile
        $patient = User::where('id', $patientId)
            ->with('patientProfile')
            ->firstOrFail();

        // ALL records for this patient across ALL doctors
        $records = MedicalRecord::where('patient_id', $patientId)
            ->with('doctor:id,name,specialization')
            ->orderBy('visit_date', 'desc')
            ->get();

        // ALL prescriptions for this patient across ALL doctors
        $prescriptions = \App\Models\Prescription::where('patient_id', $patientId)
            ->with('doctor:id,name')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'patient' => [
                'id'      => $patient->id,
                'name'    => $patient->name,
                'email'   => $patient->email,
                'profile' => $patient->patientProfile,
            ],
            'records'       => $records,
            'prescriptions' => $prescriptions,
        ]);
    }
}
