<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 2. Medical records table — the chronological "Visit Cards"
        Schema::create('medical_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('doctor_id')->constrained('users')->onDelete('cascade');
            $table->date('visit_date');
            $table->string('chief_complaint');               // Reason for visit
            $table->string('blood_pressure')->nullable();    // e.g. "120/80"
            $table->decimal('temperature_c', 4, 1)->nullable(); // e.g. 37.5
            $table->integer('heart_rate')->nullable();       // bpm
            $table->integer('oxygen_saturation')->nullable(); // SpO2 %
            $table->text('diagnosis')->nullable();           // Doctor's conclusion
            $table->text('notes')->nullable();               // Free-form notes
            $table->string('action_taken')->nullable();      // e.g. "Prescribed Paracetamol"
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('medical_records');
    }
};
