<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
// app/Providers/AppServiceProvider.php
use App\Models\Appointment;
use App\Models\User;
use App\Models\Prescription;
use App\Observers\AppointmentObserver;
use App\Observers\UserObserver;
use App\Observers\PrescriptionObserver;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Appointment::observe(AppointmentObserver::class);
        User::observe(UserObserver::class);
        Prescription::observe(PrescriptionObserver::class);
    }
}
