import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface Metrics {
    totalInventoryValue: number;
    totalPotentialValue: number;
    lowStockCount: number;
    totalStock: number;
    todaysSales: {
        count: number;
        revenue: number;
    };
    thisMonthSales: {
        count: number;
        revenue: number;
    };
}

interface RecentSale {
    id: number;
    sale_date: string;
    quantity: number;
    total_price: number;
    customer_name?: string;
    glasses: {
        model_name: string;
        brand: string;
    };
}

interface CriticalStock {
    id: number;
    model_name: string;
    brand: string;
    stock_quantity: number;
    low_stock_threshold: number;
}

interface Props {
    metrics: Metrics;
    recentSales: RecentSale[];
    criticalStock: CriticalStock[];
    [key: string]: unknown;
}

export default function Dashboard({ metrics, recentSales, criticalStock }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard - GlassesFlow" />
            
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                {/* Welcome Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            👓 Glasses Business Dashboard
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Manage your inventory, track sales, and monitor performance
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Link href={route('glasses.create')}>
                            <Button>➕ Add Glasses</Button>
                        </Link>
                        <Link href={route('sales.create')}>
                            <Button variant="outline">🛒 Record Sale</Button>
                        </Link>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">💰</div>
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Inventory Value</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {formatCurrency(metrics.totalInventoryValue)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">🎯</div>
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Potential Value</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {formatCurrency(metrics.totalPotentialValue)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">📊</div>
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">This Month Sales</p>
                                <p className="text-2xl font-bold text-green-600">
                                    {formatCurrency(metrics.thisMonthSales.revenue)}
                                </p>
                                <p className="text-sm text-gray-500">{metrics.thisMonthSales.count} sales</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">⚠️</div>
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Low Stock Items</p>
                                <p className="text-2xl font-bold text-orange-600">
                                    {metrics.lowStockCount}
                                </p>
                                <p className="text-sm text-gray-500">{metrics.totalStock} total in stock</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Link 
                        href={route('glasses.index')} 
                        className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                    >
                        <div className="flex items-center">
                            <div className="text-4xl mr-4">📦</div>
                            <div>
                                <h3 className="font-semibold text-blue-900 dark:text-blue-200">Manage Inventory</h3>
                                <p className="text-sm text-blue-700 dark:text-blue-300">View all glasses products</p>
                            </div>
                        </div>
                    </Link>

                    <Link 
                        href={route('sales.index')} 
                        className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                    >
                        <div className="flex items-center">
                            <div className="text-4xl mr-4">💳</div>
                            <div>
                                <h3 className="font-semibold text-green-900 dark:text-green-200">Sales History</h3>
                                <p className="text-sm text-green-700 dark:text-green-300">View all transactions</p>
                            </div>
                        </div>
                    </Link>

                    <Link 
                        href={route('reports.low-stock')} 
                        className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
                    >
                        <div className="flex items-center">
                            <div className="text-4xl mr-4">📋</div>
                            <div>
                                <h3 className="font-semibold text-orange-900 dark:text-orange-200">Reports</h3>
                                <p className="text-sm text-orange-700 dark:text-orange-300">View business reports</p>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Recent Activity & Low Stock */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Sales */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    🕐 Recent Sales
                                </h3>
                                <Link href={route('sales.index')} className="text-blue-600 hover:text-blue-800 text-sm">
                                    View all
                                </Link>
                            </div>
                        </div>
                        <div className="p-6">
                            {recentSales.length > 0 ? (
                                <div className="space-y-4">
                                    {recentSales.map((sale) => (
                                        <div key={sale.id} className="flex items-center justify-between py-2">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {sale.glasses.brand} {sale.glasses.model_name}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {sale.customer_name && `${sale.customer_name} • `}
                                                    Qty: {sale.quantity} • {formatDate(sale.sale_date)}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-green-600">
                                                    {formatCurrency(sale.total_price)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-4xl mb-2">📊</div>
                                    <p className="text-gray-500">No sales recorded yet</p>
                                    <Link href={route('sales.create')} className="text-blue-600 hover:text-blue-800 text-sm">
                                        Record your first sale
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Critical Stock */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    ⚠️ Low Stock Alert
                                </h3>
                                <Link href={route('reports.low-stock')} className="text-orange-600 hover:text-orange-800 text-sm">
                                    View all
                                </Link>
                            </div>
                        </div>
                        <div className="p-6">
                            {criticalStock.length > 0 ? (
                                <div className="space-y-4">
                                    {criticalStock.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between py-2">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {item.brand} {item.model_name}
                                                </p>
                                                <p className="text-sm text-orange-600">
                                                    Only {item.stock_quantity} left (min: {item.low_stock_threshold})
                                                </p>
                                            </div>
                                            <Link 
                                                href={route('glasses.edit', item.id)}
                                                className="text-blue-600 hover:text-blue-800 text-sm"
                                            >
                                                Update
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-4xl mb-2">✅</div>
                                    <p className="text-gray-500">All items well stocked!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Today's Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-200 mb-2">
                                📅 Today's Performance
                            </h3>
                            <div className="flex items-center gap-8">
                                <div>
                                    <p className="text-2xl font-bold text-blue-600">
                                        {formatCurrency(metrics.todaysSales.revenue)}
                                    </p>
                                    <p className="text-sm text-blue-700 dark:text-blue-300">
                                        {metrics.todaysSales.count} sales today
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <Link href={route('reports.monthly-sales')}>
                                <Button variant="outline" size="sm">
                                    📊 View Reports
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}