<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class DashboardController extends Controller
{

    public function getDoctorDashboard(Request $request)
    {
        $doctor = $request->user(); // Get the authenticated doctor
        $doctorId = $doctor->id;
        $today = now()->format('Y-m-d');
        
        $stats = [
            'totalPatients' => Appointment::where('doctor_id', $doctorId)
                ->distinct('patient_id') // ✅ Changed from user_id to patient_id
                ->count('patient_id'),
            'todayCount' => Appointment::where('doctor_id', $doctorId)
                ->where('appointment_date', $today)
                ->count(),
            'pendingCount' => Appointment::where('doctor_id', $doctorId)
                ->where('status', 'pending')
                ->count(),
            'messageCount' => 0,
        ];

        // Fetch patients who have appointments with this doctor
        $patients = Appointment::where('doctor_id', $doctorId)
            ->with('patient:id,name') // ✅ Load patient relationship
            ->select('patient_id', DB::raw('MAX(appointment_date) as last_appointment_date'))
            ->groupBy('patient_id')
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->patient_id,
                    'name' => $item->patient->name ?? 'Unknown',
                    'last_appointment_date' => $item->last_appointment_date,
                    'latest_symptom' => 'Consultation',
                ];
            });

        return response()->json([
            'stats' => $stats,
            'patients' => $patients
        ]);
    }
}
