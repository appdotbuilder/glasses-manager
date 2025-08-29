<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Glasses;
use App\Models\Sale;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index()
    {
        // Total inventory value
        $totalInventoryValue = Glasses::sum(DB::raw('stock_quantity * purchase_price'));
        $totalPotentialValue = Glasses::sum(DB::raw('stock_quantity * selling_price'));

        // Low stock count
        $lowStockCount = Glasses::lowStock()->count();

        // Total glasses in stock
        $totalStock = Glasses::sum('stock_quantity');

        // Today's sales
        $todaysSales = Sale::whereDate('sale_date', today())
            ->selectRaw('COUNT(*) as count, SUM(total_price) as revenue')
            ->first();

        // This month's sales
        $thisMonthSales = Sale::whereMonth('sale_date', Carbon::now()->month)
            ->whereYear('sale_date', Carbon::now()->year)
            ->selectRaw('COUNT(*) as count, SUM(total_price) as revenue')
            ->first();

        // Recent sales
        $recentSales = Sale::with('glasses:id,model_name,brand')
            ->latest('sale_date')
            ->take(5)
            ->get();

        // Low stock items (top 5)
        $criticalStock = Glasses::lowStock()
            ->orderBy('stock_quantity')
            ->take(5)
            ->get();

        return Inertia::render('dashboard', [
            'metrics' => [
                'totalInventoryValue' => $totalInventoryValue,
                'totalPotentialValue' => $totalPotentialValue,
                'lowStockCount' => $lowStockCount,
                'totalStock' => $totalStock,
                'todaysSales' => $todaysSales,
                'thisMonthSales' => $thisMonthSales,
            ],
            'recentSales' => $recentSales,
            'criticalStock' => $criticalStock,
        ]);
    }
}