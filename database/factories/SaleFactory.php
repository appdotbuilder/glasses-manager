<?php

namespace Database\Factories;

use App\Models\Glasses;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Sale>
 */
class SaleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $quantity = fake()->numberBetween(1, 3);
        $unitPrice = fake()->randomFloat(2, 50, 500);
        $totalPrice = $quantity * $unitPrice;

        return [
            'glasses_id' => Glasses::factory(),
            'sale_date' => fake()->dateTimeBetween('-12 months', 'now')->format('Y-m-d'),
            'quantity' => $quantity,
            'unit_price' => $unitPrice,
            'total_price' => $totalPrice,
            'customer_name' => fake()->optional(0.7)->name(),
            'notes' => fake()->optional(0.3)->sentence(),
        ];
    }

    /**
     * Indicate that the sale is recent.
     */
    public function recent(): static
    {
        return $this->state(fn (array $attributes) => [
            'sale_date' => fake()->dateTimeBetween('-30 days', 'now')->format('Y-m-d'),
        ]);
    }

    /**
     * Indicate that the sale is from this month.
     */
    public function thisMonth(): static
    {
        return $this->state(fn (array $attributes) => [
            'sale_date' => fake()->dateTimeBetween('first day of this month', 'now')->format('Y-m-d'),
        ]);
    }

    /**
     * Indicate that the sale is a large quantity sale.
     */
    public function bulk(): static
    {
        return $this->state(function (array $attributes) {
            $quantity = fake()->numberBetween(5, 20);
            $unitPrice = $attributes['unit_price'] ?? fake()->randomFloat(2, 50, 500);
            
            return [
                'quantity' => $quantity,
                'total_price' => $quantity * $unitPrice,
            ];
        });
    }
}