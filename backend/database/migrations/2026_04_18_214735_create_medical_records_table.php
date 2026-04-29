<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Medical records table
        Schema::create('medical_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('doctor_id')->constrained('users')->onDelete('cascade');
            $table->date('visit_date');
            $table->string('chief_complaint');               
            $table->string('blood_pressure')->nullable();    
            $table->decimal('temperature_c', 4, 1)->nullable(); 
            $table->integer('heart_rate')->nullable();       
            $table->integer('oxygen_saturation')->nullable(); 
            $table->text('diagnosis')->nullable();           
            $table->text('notes')->nullable();               
            $table->string('action_taken')->nullable();     
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('medical_records');
    }
};
