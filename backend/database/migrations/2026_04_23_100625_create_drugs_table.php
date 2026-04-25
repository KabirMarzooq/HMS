<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('drugs', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('category');                      // antibiotic, painkiller, etc.
            $table->string('unit_type');                     // tablets, capsules, syrup, injection, etc.
            $table->decimal('unit_price', 10, 2);            // price per unit in NGN
            $table->integer('stock_quantity')->default(0);   // current stock
            $table->integer('low_stock_threshold')->default(10); // alert below this
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('drugs');
    }
};
