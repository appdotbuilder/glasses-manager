<?php

namespace Database\Seeders;

use App\Models\Glasses;
use App\Models\Sale;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GlassesSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        // Create 50 glasses products with varying stock levels
        $glasses = Glasses::factory(30)->create();
        
        // Create some low stock items
        Glasses::factory(10)->lowStock()->create();
        
        // Create some out of stock items
        Glasses::factory(5)->outOfStock()->create();
        
        // Create some premium items
        Glasses::factory(5)->premium()->create();
        
        // Create sales for the glasses (using existing glasses)
        $allGlasses = Glasses::where('stock_quantity', '>', 0)->get();
        
        foreach ($allGlasses as $glassesItem) {
            // Create 0-5 sales per glasses item
            $salesCount = random_int(0, 5);
            
            for ($i = 0; $i < $salesCount; $i++) {
                // Only create sale if there's enough stock
                if ($glassesItem->stock_quantity > 0) {
                    $quantity = min(random_int(1, 2), $glassesItem->stock_quantity);
                    
                    Sale::factory()->create([
                        'glasses_id' => $glassesItem->id,
                        'quantity' => $quantity,
                        'unit_price' => $glassesItem->selling_price,
                        'total_price' => $quantity * (float) $glassesItem->selling_price,
                    ]);
                    
                    // Reduce stock
                    $glassesItem->stock_quantity -= $quantity;
                    $glassesItem->save();
                }
            }
        }
    }
}