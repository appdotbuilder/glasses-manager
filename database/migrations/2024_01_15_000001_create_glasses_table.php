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
        Schema::create('glasses', function (Blueprint $table) {
            $table->id();
            $table->string('model_name')->comment('The model name of the glasses');
            $table->string('brand')->comment('Brand of the glasses');
            $table->decimal('purchase_price', 8, 2)->comment('Purchase price per unit');
            $table->decimal('selling_price', 8, 2)->comment('Selling price per unit');
            $table->integer('stock_quantity')->default(0)->comment('Current stock quantity');
            $table->integer('low_stock_threshold')->default(10)->comment('Low stock alert threshold');
            $table->text('description')->nullable()->comment('Product description');
            $table->string('frame_type')->nullable()->comment('Frame type (e.g., full-rim, half-rim, rimless)');
            $table->string('frame_material')->nullable()->comment('Frame material (e.g., plastic, metal, titanium)');
            $table->string('lens_type')->nullable()->comment('Lens type (e.g., prescription, reading, sunglasses)');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('brand');
            $table->index('model_name');
            $table->index(['stock_quantity', 'low_stock_threshold']);
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('glasses');
    }
};