<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AppointmentController;

// Public Auth Routes
// Route::group(['prefix' => 'auth'], function () {
//     Route::post('/register', [AuthController::class, 'register']);
//     Route::post('/login', [AuthController::class, 'login']);
// });

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

// Only Doctors can see these
Route::middleware(['auth:api', 'role:doctor'])->group(function () {
    Route::get('/doctor/appointments', [AppointmentController::class, 'index']);
});

// Only Admins can see these
Route::middleware(['auth:api', 'role:admin'])->group(function () {
    // Route::get('/admin/stats', [DashboardController::class, 'stats']);
});

// Both Patients and Admins can see these
Route::middleware(['auth:api', 'role:patient,admin'])->group(function () {
    // Route::get('/my-history', [MedicalRecordController::class, 'show']);
});
