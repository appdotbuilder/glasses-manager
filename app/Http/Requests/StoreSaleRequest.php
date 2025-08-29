<?php

namespace App\Http\Requests;

use App\Models\Glasses;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreSaleRequest extends FormRequest
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
            'glasses_id' => 'required|exists:glasses,id',
            'sale_date' => 'required|date|before_or_equal:today',
            'quantity' => [
                'required',
                'integer',
                'min:1',
                function ($attribute, $value, $fail) {
                    if ($this->glasses_id) {
                        $glasses = Glasses::find($this->glasses_id);
                        if ($glasses && $value > $glasses->stock_quantity) {
                            $fail('Cannot sell more than available stock (' . $glasses->stock_quantity . ').');
                        }
                    }
                },
            ],
            'unit_price' => 'required|numeric|min:0|max:9999.99',
            'customer_name' => 'nullable|string|max:255',
            'notes' => 'nullable|string|max:1000',
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
            'glasses_id.required' => 'Please select a glasses product.',
            'glasses_id.exists' => 'The selected glasses product does not exist.',
            'sale_date.required' => 'Sale date is required.',
            'sale_date.date' => 'Please provide a valid sale date.',
            'sale_date.before_or_equal' => 'Sale date cannot be in the future.',
            'quantity.required' => 'Quantity is required.',
            'quantity.integer' => 'Quantity must be a whole number.',
            'quantity.min' => 'Quantity must be at least 1.',
            'unit_price.required' => 'Unit price is required.',
            'unit_price.numeric' => 'Unit price must be a valid number.',
            'unit_price.min' => 'Unit price cannot be negative.',
        ];
    }
}