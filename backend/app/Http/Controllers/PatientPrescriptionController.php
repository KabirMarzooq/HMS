<?php

namespace App\Http\Controllers;

use App\Models\Prescription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PatientPrescriptionController extends Controller
{
    // Fetch prescriptions for the logged-in patient
    public function index()
    {
        // We fetch the prescriptions where the patient_id matches the logged-in user.
        // We use 'with' to pull in the doctor's name so we can display "Prescribed by Dr. X".
        // 'latest()' automatically sorts them with the newest ones first.
        $prescriptions = Prescription::with('doctor:id,name')
            ->where('patient_id', Auth::id())
            ->latest()
            ->get();

        return response()->json($prescriptions);
    }

    // Handle a refill request
    public function requestRefill(Request $request, $id)
    {
        // First, make sure this prescription actually belongs to this patient
        $prescription = Prescription::where('id', $id)
            ->where('patient_id', Auth::id())
            ->firstOrFail();

        // Here, you would typically create a Notification or a "RefillRequest" database record 
        // to alert the doctor. For now, we will return a success response to the frontend.

        // Example: 
        // RefillRequest::create(['prescription_id' => $prescription->id, 'status' => 'pending']);

        return response()->json([
            'message' => 'Refill request sent to Dr. ' . $prescription->doctor->name
        ]);
    }

    // Handle the PDF Download
    public function downloadPdf($id)
    {
        $prescription = Prescription::with(['doctor', 'patient'])
            ->where('id', $id)
            ->where('patient_id', Auth::id())
            ->firstOrFail();

        // You will need a package like 'barryvdh/laravel-dompdf' to actually generate the PDF.
        // If you have it installed, the code would look something like this:
        // $pdf = Pdf::loadView('pdfs.prescription', compact('prescription'));
        // return $pdf->download('prescription-'.$prescription->id.'.pdf');

        return response()->json(['message' => 'PDF generation endpoint ready.']);
    }
}
