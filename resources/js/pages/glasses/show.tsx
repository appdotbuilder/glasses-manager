import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

interface Sale {
    id: number;
    sale_date: string;
    quantity: number;
    unit_price: number;
    total_price: number;
    customer_name?: string;
    notes?: string;
}

interface Glasses {
    id: number;
    model_name: string;
    brand: string;
    purchase_price: number;
    selling_price: number;
    stock_quantity: number;
    low_stock_threshold: number;
    description?: string;
    frame_type?: string;
    frame_material?: string;
    lens_type?: string;
    created_at: string;
    sales: Sale[];
}

interface Props {
    glasses: Glasses;
    [key: string]: unknown;
}

export default function ShowGlasses({ glasses }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Glasses Inventory',
            href: '/glasses',
        },
        {
            title: `${glasses.brand} ${glasses.model_name}`,
            href: `/glasses/${glasses.id}`,
        },
    ];

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete ${glasses.brand} ${glasses.model_name}? This action cannot be undone.`)) {
            router.delete(route('glasses.destroy', glasses.id));
        }
    };

    const totalSalesQuantity = glasses.sales.reduce((sum, sale) => sum + sale.quantity, 0);
    const totalSalesRevenue = glasses.sales.reduce((sum, sale) => sum + sale.total_price, 0);
    const inventoryValue = glasses.stock_quantity * glasses.purchase_price;
    const potentialValue = glasses.stock_quantity * glasses.selling_price;
    const isLowStock = glasses.stock_quantity <= glasses.low_stock_threshold;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${glasses.brand} ${glasses.model_name} - GlassesFlow`} />
            
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            👓 {glasses.brand} {glasses.model_name}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Product details and sales history
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Link href={route('glasses.edit', glasses.id)}>
                            <Button variant="outline">✏️ Edit</Button>
                        </Link>
                        <Button variant="destructive" onClick={handleDelete}>
                            🗑️ Delete
                        </Button>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">📦</div>
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Stock</p>
                                <p className={`text-2xl font-bold ${
                                    glasses.stock_quantity === 0 ? 'text-red-600' :
                                    isLowStock ? 'text-orange-600' : 'text-green-600'
                                }`}>
                                    {glasses.stock_quantity}
                                </p>
                                {isLowStock && glasses.stock_quantity > 0 && (
                                    <p className="text-sm text-orange-600">⚠️ Low stock</p>
                                )}
                                {glasses.stock_quantity === 0 && (
                                    <p className="text-sm text-red-600">❌ Out of stock</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">💰</div>
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Inventory Value</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {formatCurrency(inventoryValue)}
                                </p>
                                <p className="text-sm text-gray-500">Cost basis</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">🎯</div>
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Potential Value</p>
                                <p className="text-2xl font-bold text-green-600">
                                    {formatCurrency(potentialValue)}
                                </p>
                                <p className="text-sm text-gray-500">At selling price</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">📊</div>
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Sold</p>
                                <p className="text-2xl font-bold text-blue-600">
                                    {totalSalesQuantity}
                                </p>
                                <p className="text-sm text-gray-500">{formatCurrency(totalSalesRevenue)} revenue</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Product Details */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                📋 Product Information
                            </h2>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Brand</p>
                                    <p className="text-lg text-gray-900 dark:text-white">{glasses.brand}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Model</p>
                                    <p className="text-lg text-gray-900 dark:text-white">{glasses.model_name}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Purchase Price</p>
                                    <p className="text-lg text-gray-900 dark:text-white">{formatCurrency(glasses.purchase_price)}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Selling Price</p>
                                    <p className="text-lg text-green-600">{formatCurrency(glasses.selling_price)}</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Low Stock Threshold</p>
                                <p className="text-lg text-gray-900 dark:text-white">{glasses.low_stock_threshold} units</p>
                            </div>

                            {(glasses.frame_type || glasses.frame_material || glasses.lens_type) && (
                                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Specifications</h3>
                                    <div className="space-y-2">
                                        {glasses.frame_type && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Frame Type:</span>
                                                <span className="text-gray-900 dark:text-white capitalize">{glasses.frame_type}</span>
                                            </div>
                                        )}
                                        {glasses.frame_material && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Frame Material:</span>
                                                <span className="text-gray-900 dark:text-white capitalize">{glasses.frame_material}</span>
                                            </div>
                                        )}
                                        {glasses.lens_type && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Lens Type:</span>
                                                <span className="text-gray-900 dark:text-white capitalize">{glasses.lens_type}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {glasses.description && (
                                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Description</p>
                                    <p className="text-gray-900 dark:text-white">{glasses.description}</p>
                                </div>
                            )}

                            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Added on</p>
                                <p className="text-gray-900 dark:text-white">{formatDate(glasses.created_at)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Sales History */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    🛒 Sales History
                                </h2>
                                {glasses.stock_quantity > 0 && (
                                    <Link href={route('sales.create')} className="text-blue-600 hover:text-blue-800 text-sm">
                                        Record Sale
                                    </Link>
                                )}
                            </div>
                        </div>
                        <div className="p-6">
                            {glasses.sales.length > 0 ? (
                                <div className="space-y-4">
                                    {glasses.sales.map((sale) => (
                                        <div key={sale.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="font-medium text-gray-900 dark:text-white">
                                                        Qty: {sale.quantity}
                                                    </p>
                                                    <span className="text-gray-400">•</span>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        {formatDate(sale.sale_date)}
                                                    </p>
                                                </div>
                                                {sale.customer_name && (
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        Customer: {sale.customer_name}
                                                    </p>
                                                )}
                                                {sale.notes && (
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {sale.notes}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-green-600">
                                                    {formatCurrency(sale.total_price)}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {formatCurrency(sale.unit_price)}/unit
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-4xl mb-2">📊</div>
                                    <p className="text-gray-500 dark:text-gray-400">No sales recorded yet</p>
                                    {glasses.stock_quantity > 0 && (
                                        <Link href={route('sales.create')} className="text-blue-600 hover:text-blue-800 text-sm">
                                            Record the first sale
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-4">
                        🚀 Quick Actions
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        <Link href={route('glasses.edit', glasses.id)}>
                            <Button variant="outline" size="sm">
                                ✏️ Update Stock
                            </Button>
                        </Link>
                        {glasses.stock_quantity > 0 && (
                            <Link href={route('sales.create')}>
                                <Button size="sm">
                                    🛒 Record Sale
                                </Button>
                            </Link>
                        )}
                        <Link href={route('glasses.index')}>
                            <Button variant="outline" size="sm">
                                📦 Back to Inventory
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}