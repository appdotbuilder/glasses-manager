<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Sale;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MonthlySalesReportController extends Controller
{
    /**
     * Display the monthly sales report.
     */
    public function index()
    {
        // Get sales data grouped by month for the last 12 months
        $monthlySales = Sale::select(
            DB::raw('YEAR(sale_date) as year'),
            DB::raw('MONTH(sale_date) as month'),
            DB::raw('COUNT(*) as total_sales'),
            DB::raw('SUM(quantity) as total_quantity'),
            DB::raw('SUM(total_price) as total_revenue')
        )
        ->where('sale_date', '>=', Carbon::now()->subMonths(12))
        ->groupBy(DB::raw('YEAR(sale_date)'), DB::raw('MONTH(sale_date)'))
        ->orderBy(DB::raw('YEAR(sale_date)'), 'desc')
        ->orderBy(DB::raw('MONTH(sale_date)'), 'desc')
        ->get()
        ->map(function ($item) {
            $item['month_name'] = Carbon::createFromDate($item['year'], $item['month'], 1)->format('F Y');
            return $item;
        });

        // Get top selling glasses for the current month
        $topSellingThisMonth = Sale::select(
            'glasses_id',
            DB::raw('SUM(quantity) as total_sold'),
            DB::raw('SUM(total_price) as total_revenue')
        )
        ->whereMonth('sale_date', Carbon::now()->month)
        ->whereYear('sale_date', Carbon::now()->year)
        ->with('glasses:id,model_name,brand')
        ->groupBy('glasses_id')
        ->orderBy('total_sold', 'desc')
        ->take(10)
        ->get();

        // Current month stats
        $currentMonthStats = Sale::whereMonth('sale_date', Carbon::now()->month)
            ->whereYear('sale_date', Carbon::now()->year)
            ->selectRaw('
                COUNT(*) as total_sales,
                SUM(quantity) as total_quantity,
                SUM(total_price) as total_revenue,
                AVG(total_price) as average_sale
            ')
            ->first();

        return Inertia::render('reports/monthly-sales', [
            'monthlySales' => $monthlySales,
            'topSellingThisMonth' => $topSellingThisMonth,
            'currentMonthStats' => $currentMonthStats,
            'currentMonth' => Carbon::now()->format('F Y')
        ]);
    }
}