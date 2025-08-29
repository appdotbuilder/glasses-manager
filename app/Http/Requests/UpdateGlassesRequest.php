<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateGlassesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'model_name' => 'required|string|max:255',
            'brand' => 'required|string|max:255',
            'purchase_price' => 'required|numeric|min:0|max:9999.99',
            'selling_price' => 'required|numeric|min:0|max:9999.99',
            'stock_quantity' => 'required|integer|min:0',
            'low_stock_threshold' => 'required|integer|min:1|max:100',
            'description' => 'nullable|string|max:1000',
            'frame_type' => 'nullable|string|max:255',
            'frame_material' => 'nullable|string|max:255',
            'lens_type' => 'nullable|string|max:255',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'model_name.required' => 'Model name is required.',
            'brand.required' => 'Brand is required.',
            'purchase_price.required' => 'Purchase price is required.',
            'purchase_price.numeric' => 'Purchase price must be a valid number.',
            'purchase_price.min' => 'Purchase price cannot be negative.',
            'selling_price.required' => 'Selling price is required.',
            'selling_price.numeric' => 'Selling price must be a valid number.',
            'selling_price.min' => 'Selling price cannot be negative.',
            'stock_quantity.required' => 'Stock quantity is required.',
            'stock_quantity.integer' => 'Stock quantity must be a whole number.',
            'stock_quantity.min' => 'Stock quantity cannot be negative.',
            'low_stock_threshold.required' => 'Low stock threshold is required.',
            'low_stock_threshold.integer' => 'Low stock threshold must be a whole number.',
            'low_stock_threshold.min' => 'Low stock threshold must be at least 1.',
        ];
    }
}