<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Glasses>
 */
class GlassesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $brands = ['Ray-Ban', 'Oakley', 'Prada', 'Gucci', 'Tom Ford', 'Versace', 'Armani', 'Police', 'Persol', 'Maui Jim'];
        $frameTypes = ['full-rim', 'half-rim', 'rimless'];
        $frameMaterials = ['plastic', 'metal', 'titanium', 'acetate', 'stainless steel'];
        $lensTypes = ['prescription', 'reading', 'sunglasses', 'progressive', 'bifocal'];
        
        $purchasePrice = fake()->randomFloat(2, 20, 200);
        $sellingPrice = $purchasePrice * fake()->randomFloat(2, 1.5, 3.0); // 50% to 200% markup

        return [
            'model_name' => fake()->words(2, true) . ' ' . fake()->randomNumber(3),
            'brand' => fake()->randomElement($brands),
            'purchase_price' => $purchasePrice,
            'selling_price' => $sellingPrice,
            'stock_quantity' => fake()->numberBetween(0, 50),
            'low_stock_threshold' => fake()->numberBetween(5, 15),
            'description' => fake()->optional()->sentence(),
            'frame_type' => fake()->randomElement($frameTypes),
            'frame_material' => fake()->randomElement($frameMaterials),
            'lens_type' => fake()->randomElement($lensTypes),
        ];
    }

    /**
     * Indicate that the glasses are low on stock.
     */
    public function lowStock(): static
    {
        return $this->state(fn (array $attributes) => [
            'stock_quantity' => fake()->numberBetween(0, 5),
            'low_stock_threshold' => fake()->numberBetween(8, 15),
        ]);
    }

    /**
     * Indicate that the glasses are out of stock.
     */
    public function outOfStock(): static
    {
        return $this->state(fn (array $attributes) => [
            'stock_quantity' => 0,
        ]);
    }

    /**
     * Indicate that the glasses are premium products.
     */
    public function premium(): static
    {
        return $this->state(fn (array $attributes) => [
            'brand' => fake()->randomElement(['Tom Ford', 'Gucci', 'Prada', 'Versace']),
            'purchase_price' => fake()->randomFloat(2, 150, 400),
            'selling_price' => fake()->randomFloat(2, 300, 800),
            'frame_material' => fake()->randomElement(['titanium', 'gold', 'platinum']),
        ]);
    }
}