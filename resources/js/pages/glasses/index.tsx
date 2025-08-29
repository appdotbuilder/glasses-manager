import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Glasses Inventory',
        href: '/glasses',
    },
];

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
    sales_count?: number;
    created_at: string;
}

interface PaginatedGlasses {
    data: Glasses[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Props {
    glasses: PaginatedGlasses;
    [key: string]: unknown;
}

export default function GlassesIndex({ glasses }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const handleDelete = (id: number, modelName: string) => {
        if (confirm(`Are you sure you want to delete ${modelName}? This action cannot be undone.`)) {
            router.delete(route('glasses.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Glasses Inventory - GlassesFlow" />
            
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            👓 Glasses Inventory
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Manage your glasses products and stock levels
                        </p>
                    </div>
                    <Link href={route('glasses.create')}>
                        <Button>➕ Add New Glasses</Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Products</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{glasses.total}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Low Stock</p>
                        <p className="text-2xl font-bold text-orange-600">
                            {glasses.data.filter(g => g.stock_quantity <= g.low_stock_threshold).length}
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Out of Stock</p>
                        <p className="text-2xl font-bold text-red-600">
                            {glasses.data.filter(g => g.stock_quantity === 0).length}
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Value</p>
                        <p className="text-2xl font-bold text-green-600">
                            {formatCurrency(glasses.data.reduce((sum, g) => sum + (g.stock_quantity * g.selling_price), 0))}
                        </p>
                    </div>
                </div>

                {/* Glasses Grid */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">All Products</h2>
                    </div>
                    
                    {glasses.data.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Product</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Pricing</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Stock</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Details</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {glasses.data.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {item.brand} {item.model_name}
                                                    </div>
                                                    {item.description && (
                                                        <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                                                            {item.description}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm">
                                                    <div className="text-gray-900 dark:text-white">
                                                        Sell: {formatCurrency(item.selling_price)}
                                                    </div>
                                                    <div className="text-gray-500 dark:text-gray-400">
                                                        Cost: {formatCurrency(item.purchase_price)}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm">
                                                    <div className={`font-medium ${
                                                        item.stock_quantity === 0 ? 'text-red-600' :
                                                        item.stock_quantity <= item.low_stock_threshold ? 'text-orange-600' :
                                                        'text-green-600'
                                                    }`}>
                                                        {item.stock_quantity} in stock
                                                    </div>
                                                    <div className="text-gray-500 dark:text-gray-400">
                                                        Min: {item.low_stock_threshold}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                                <div className="space-y-1">
                                                    {item.frame_type && <div>Frame: {item.frame_type}</div>}
                                                    {item.frame_material && <div>Material: {item.frame_material}</div>}
                                                    {item.lens_type && <div>Lens: {item.lens_type}</div>}
                                                    {item.sales_count !== undefined && <div>Sales: {item.sales_count}</div>}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                                                <Link 
                                                    href={route('glasses.show', item.id)}
                                                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                                >
                                                    View
                                                </Link>
                                                <Link 
                                                    href={route('glasses.edit', item.id)}
                                                    className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(item.id, `${item.brand} ${item.model_name}`)}
                                                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="p-12 text-center">
                            <div className="text-6xl mb-4">👓</div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No glasses in inventory</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-4">Get started by adding your first glasses product.</p>
                            <Link href={route('glasses.create')}>
                                <Button>Add First Product</Button>
                            </Link>
                        </div>
                    )}

                    {/* Pagination */}
                    {glasses.last_page > 1 && (
                        <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-700 dark:text-gray-300">
                                    Showing {((glasses.current_page - 1) * glasses.per_page) + 1} to {Math.min(glasses.current_page * glasses.per_page, glasses.total)} of {glasses.total} results
                                </div>
                                <div className="flex items-center space-x-2">
                                    {glasses.links.map((link, index) => {
                                        if (link.url === null) {
                                            return (
                                                <span key={index} className="px-3 py-1 text-gray-400 dark:text-gray-600">
                                                    {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                                                </span>
                                            );
                                        }
                                        return (
                                            <Link
                                                key={index}
                                                href={link.url}
                                                className={`px-3 py-1 rounded ${
                                                    link.active
                                                        ? 'bg-blue-600 text-white'
                                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                                }`}
                                            >
                                                {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}