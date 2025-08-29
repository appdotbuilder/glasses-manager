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
        Schema::create('sales', function (Blueprint $table) {
            $table->id();
            $table->foreignId('glasses_id')->constrained()->onDelete('cascade');
            $table->date('sale_date')->comment('Date of the sale');
            $table->integer('quantity')->comment('Quantity sold');
            $table->decimal('unit_price', 8, 2)->comment('Price per unit at time of sale');
            $table->decimal('total_price', 10, 2)->comment('Total price for this sale');
            $table->string('customer_name')->nullable()->comment('Optional customer name');
            $table->text('notes')->nullable()->comment('Optional sale notes');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('sale_date');
            $table->index('glasses_id');
            $table->index(['sale_date', 'glasses_id']);
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales');
    }
};