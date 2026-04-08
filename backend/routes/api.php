<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\DashboardController;

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

    Route::post('/appointments', [AppointmentController::class, 'store']);


    Route::get('/doctors', [AppointmentController::class, 'getDoctors']);

    Route::get('/my-appointments', [AppointmentController::class, 'myAppointments']);

    Route::patch('/appointments/{id}/cancel', [AppointmentController::class, 'cancel']);

    Route::patch('/appointments/{id}/reschedule', [AppointmentController::class, 'reschedule']);
    // Add routes for appointments, medical records, etc. here

});

// Doctor Protected Routes
Route::middleware(['auth:api', 'role:doctor'])->prefix('doctor')->group(function () {
 
    Route::get('/appointments', [AppointmentController::class, 'doctorAppointments']);

    Route::get('/dashboard-overview', [DashboardController::class, 'getDoctorDashboard']);

    // Status update endpoints
    Route::patch('/appointments/{id}/accept', [AppointmentController::class, 'acceptAppointment']);
    Route::patch('/appointments/{id}/decline', [AppointmentController::class, 'declineAppointment']);
});

// Only Admins can see these
Route::middleware(['auth:api', 'role:admin'])->group(function () {
    // Route::get('/admin/stats', [DashboardController::class, 'stats']);
});

// Both Patients and Admins can see these
Route::middleware(['auth:api', 'role:patient,admin'])->group(function () {
    // Route::get('/my-history', [MedicalRecordController::class, 'show']);
});
