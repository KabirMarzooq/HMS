<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // 1. Role Enum (Matches your React "ROLES" array exactly)
            $table->enum('role', ['patient', 'doctor', 'receptionist', 'admin'])
                ->default('patient')
                ->after('email');

            // 2. Phone Number (Required in your form, but safe to keep nullable in DB)
            $table->string('phone')->nullable()->after('role');

            // 3. Professional Details (Nullable: because Patients won't have these)
            $table->string('specialization')->nullable()->after('phone'); // For Doctors
            $table->string('license_id')->nullable()->after('specialization'); // For Doctors
            $table->string('staff_id')->nullable()->after('license_id'); // For Receptionists/Staff

            // 4. Soft Deletes (Standard practice)
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
};
