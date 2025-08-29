<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Glasses;
use Inertia\Inertia;

class LowStockReportController extends Controller
{
    /**
     * Display the low stock report.
     */
    public function index()
    {
        $lowStockGlasses = Glasses::lowStock()
            ->with(['sales' => function ($query) {
                $query->latest()->take(3);
            }])
            ->orderBy('stock_quantity')
            ->get();

        return Inertia::render('reports/low-stock', [
            'glasses' => $lowStockGlasses
        ]);
    }
}