<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GlassesController;
use App\Http\Controllers\LowStockReportController;
use App\Http\Controllers\MonthlySalesReportController;
use App\Http\Controllers\SaleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Main dashboard with business overview
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Glasses inventory management
    Route::resource('glasses', GlassesController::class);
    
    // Sales management
    Route::resource('sales', SaleController::class)->except(['edit', 'update']);
    
    // Reports
    Route::prefix('reports')->name('reports.')->group(function () {
        Route::get('low-stock', [LowStockReportController::class, 'index'])->name('low-stock');
        Route::get('monthly-sales', [MonthlySalesReportController::class, 'index'])->name('monthly-sales');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
