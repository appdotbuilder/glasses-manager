<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSaleRequest;
use App\Models\Glasses;
use App\Models\Sale;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sales = Sale::with('glasses:id,model_name,brand')
            ->latest('sale_date')
            ->paginate(15);

        return Inertia::render('sales/index', [
            'sales' => $sales
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $glasses = Glasses::where('stock_quantity', '>', 0)
            ->orderBy('brand')
            ->orderBy('model_name')
            ->get(['id', 'model_name', 'brand', 'selling_price', 'stock_quantity']);

        return Inertia::render('sales/create', [
            'glasses' => $glasses
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSaleRequest $request)
    {
        $validatedData = $request->validated();
        
        // Calculate total price
        $totalPrice = $validatedData['quantity'] * $validatedData['unit_price'];
        $validatedData['total_price'] = $totalPrice;

        // Create the sale
        $sale = Sale::create($validatedData);

        // Reduce stock quantity
        $glasses = Glasses::find($validatedData['glasses_id']);
        $glasses->reduceStock($validatedData['quantity']);

        return redirect()->route('sales.show', $sale)
            ->with('success', 'Sale recorded successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Sale $sale)
    {
        $sale->load('glasses');

        return Inertia::render('sales/show', [
            'sale' => $sale
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sale $sale)
    {
        // Restore stock quantity
        $glasses = $sale->glasses;
        $glasses->stock_quantity += $sale->quantity;
        $glasses->save();

        $sale->delete();

        return redirect()->route('sales.index')
            ->with('success', 'Sale deleted and stock restored.');
    }
}