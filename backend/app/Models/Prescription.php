<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// app/Models/Prescription.php

class Prescription extends Model
{
    protected $fillable = [
        'doctor_id',
        'patient_id',
        'medication',
        'dosage',
        'frequency',
        'duration',
        'instructions'
    ];

    // Link to the patient
    public function patient()
    {
        return $this->belongsTo(User::class, 'patient_id');
    }

    // Link to the doctor
    public function doctor()
    {
        return $this->belongsTo(User::class, 'doctor_id');
    }

    public function items()
    {
        return $this->hasMany(PrescriptionItem::class);
    }
}
