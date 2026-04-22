<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserSettingsController;
use App\Http\Controllers\PrescriptionController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\MedicalRecordController;
use App\Http\Controllers\PatientPrescriptionController;
use App\Http\Controllers\MedicalReportRequestController;
use App\Http\Controllers\AdminMedicalReportController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\BillingController;
use App\Http\Controllers\PaystackController;
use App\Http\Controllers\Admin\AdminScheduleController;
use App\Http\Controllers\Admin\AdminSystemLogController;

// routes/api.php
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

// Protected routes (Must send Bearer Token)
Route::middleware('auth:api')->group(function () {
    Route::get('/user-profile', function () {
        return response()->json(auth('api')->user());
    });

    Route::patch('/user/update-email', [UserSettingsController::class, 'updateEmail']);
    Route::patch('/user/update-password', [UserSettingsController::class, 'updatePassword']);
    Route::delete('/user/delete-account', [UserSettingsController::class, 'deleteAccount']);

    Route::post('/appointments', [AppointmentController::class, 'store']);


    Route::get('/doctors', [AppointmentController::class, 'getDoctors']);

    Route::get('/my-appointments', [AppointmentController::class, 'myAppointments']);

    Route::patch('/appointments/{id}/cancel', [AppointmentController::class, 'cancel']);

    Route::patch('/appointments/{id}/reschedule', [AppointmentController::class, 'reschedule']);
    // Add routes for appointments, medical records, etc. here

    Route::post('/webhook/paystack', [PaystackController::class, 'webhook']);
});

// Doctor Protected Routes
Route::middleware(['auth:api', 'role:doctor'])->prefix('doctor')->group(function () {

    Route::get('/appointments', [AppointmentController::class, 'doctorAppointments']);

    Route::get('/dashboard-overview', [DashboardController::class, 'getDoctorDashboard']);

    Route::get('/prescriptions', [PrescriptionController::class, 'index']);
    Route::get('/patients', [PatientController::class, 'index']);
    Route::post('/prescriptions', [PrescriptionController::class, 'store']);

    // Route::get('/patients', function() {
    //     // You might want to filter this to only show patients 
    //     // who have had appointments with this specific doctor
    //     return \App\Models\User::where('role', 'patient')->get(['id', 'name']);
    // });

    Route::get('/patients/{id}/medical-record', [MedicalRecordController::class, 'show']);
    Route::post('/medical-records', [MedicalRecordController::class, 'store']);
    Route::patch('/patients/{id}/profile', [MedicalRecordController::class, 'updateProfile']);

    // Status update endpoints
    Route::patch('/appointments/{id}/accept', [AppointmentController::class, 'acceptAppointment']);
    Route::patch('/appointments/{id}/decline', [AppointmentController::class, 'declineAppointment']);
    Route::get('/revenue', [BillingController::class, 'doctorRevenue']);
});

// Patient Routes
Route::middleware(['auth:api', 'role:patient'])->prefix('patient')->group(function () {
    Route::get('/prescriptions', [PatientPrescriptionController::class, 'index']);
    Route::post('/prescriptions/{id}/refill', [PatientPrescriptionController::class, 'requestRefill']);
    Route::get('/prescriptions/{id}/download', [PatientPrescriptionController::class, 'downloadPdf']);

    Route::get('/bills', [BillingController::class, 'myBills']);
    Route::get('/bills/{id}', [BillingController::class, 'showInvoice']);
    Route::get('/receipts/{id}', [BillingController::class, 'showReceipt']);

    // Phase 1 test only — remove when Paystack webhook is live in Phase 2:
    Route::post('/bills/{id}/mark-paid', [BillingController::class, 'markPaid']);
    Route::post('/payment/initialize', [PaystackController::class, 'initializePayment']);
    Route::get('/payment/verify/{reference}', [PaystackController::class, 'verifyPayment']);

    Route::post('/report-requests', [MedicalReportRequestController::class, 'store']);
    Route::get('/report-requests', [MedicalReportRequestController::class, 'myRequests']);
    Route::get('/report-requests/{id}/report', [MedicalReportRequestController::class, 'getReport']);
});

// Only Admins can see these
Route::middleware(['auth:api', 'role:admin'])->prefix('admin')->group(function () {

    Route::get('/users', [AdminUserController::class, 'index']);
    Route::patch('/users/{id}/role', [AdminUserController::class, 'updateRole']);
    Route::delete('/users/{id}', [AdminUserController::class, 'destroy']);

    Route::get('/logs', [AdminSystemLogController::class, 'index']);

    Route::get('/report-requests', [AdminMedicalReportController::class, 'index']);
    Route::patch('/report-requests/{id}/approve', [AdminMedicalReportController::class, 'approve']);
    Route::patch('/report-requests/{id}/reject', [AdminMedicalReportController::class, 'reject']);
});

// Both Receptionist and Admins can see these
Route::middleware(['auth:api', 'role:receptionist,admin'])->group(function () {
    Route::get('/schedules', [AdminScheduleController::class, 'index']);
    
    Route::get('/patients', [PatientController::class, 'index']);
    Route::get('/patients/{id}/medical-record', [MedicalRecordController::class, 'show']);
});

Route::middleware(['auth:api', 'role:admin,receptionist,pharmacy'])->group(function () {
    Route::get('/prescriptions', [PrescriptionController::class, 'allPrescriptions']);
});
