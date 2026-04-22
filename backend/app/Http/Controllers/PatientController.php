<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Appointment;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    public function index(Request $request)
    {
        $doctorId = $request->user()->id;

        // Only return patients who have had appointments with THIS doctor
        // More useful than returning every patient in the system
        $patients = Appointment::where('doctor_id', $doctorId)
            ->with('patient:id,name')
            ->get()
            ->pluck('patient')
            ->unique('id')
            ->values();

        return response()->json($patients);
    }
}