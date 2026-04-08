<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'patient_id',
        'doctor_id',
        'appointment_date',
        'appointment_time',
        'reason',
        'additional_notes',
        'status',
        'cancellation_reason'
    ];

    // Helper to get the Patient info later
    public function patient()
    {
        return $this->belongsTo(User::class, 'patient_id');
    }

    // Helper to get the Doctor info later
    public function doctor()
    {
        return $this->belongsTo(User::class, 'doctor_id');
    }
}
