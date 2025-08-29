import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

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
        title: 'Add New Glasses',
        href: '/glasses/create',
    },
];

export default function CreateGlasses() {
    const { data, setData, post, processing, errors } = useForm({
        model_name: '',
        brand: '',
        purchase_price: '',
        selling_price: '',
        stock_quantity: '',
        low_stock_threshold: '10',
        description: '',
        frame_type: '',
        frame_material: '',
        lens_type: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('glasses.store'));
    };

    const frameTypes = [
        { value: '', label: 'Select frame type' },
        { value: 'full-rim', label: 'Full-rim' },
        { value: 'half-rim', label: 'Half-rim' },
        { value: 'rimless', label: 'Rimless' },
    ];

    const frameMaterials = [
        { value: '', label: 'Select frame material' },
        { value: 'plastic', label: 'Plastic' },
        { value: 'metal', label: 'Metal' },
        { value: 'titanium', label: 'Titanium' },
        { value: 'acetate', label: 'Acetate' },
        { value: 'stainless steel', label: 'Stainless Steel' },
        { value: 'carbon fiber', label: 'Carbon Fiber' },
    ];

    const lensTypes = [
        { value: '', label: 'Select lens type' },
        { value: 'prescription', label: 'Prescription' },
        { value: 'reading', label: 'Reading' },
        { value: 'sunglasses', label: 'Sunglasses' },
        { value: 'progressive', label: 'Progressive' },
        { value: 'bifocal', label: 'Bifocal' },
        { value: 'computer', label: 'Computer/Blue Light' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add New Glasses - GlassesFlow" />
            
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        ➕ Add New Glasses
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Add a new glasses product to your inventory
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Basic Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Model Name *
                                </label>
                                <input
                                    type="text"
                                    value={data.model_name}
                                    onChange={(e) => setData('model_name', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                                    placeholder="e.g., RB3025, Aviator Classic"
                                />
                                <InputError message={errors.model_name} className="mt-1" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Brand *
                                </label>
                                <input
                                    type="text"
                                    value={data.brand}
                                    onChange={(e) => setData('brand', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                                    placeholder="e.g., Ray-Ban, Oakley, Prada"
                                />
                                <InputError message={errors.brand} className="mt-1" />
                            </div>
                        </div>

                        {/* Pricing */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Purchase Price *
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2 text-gray-500 dark:text-gray-400">$</span>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={data.purchase_price}
                                        onChange={(e) => setData('purchase_price', e.target.value)}
                                        className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 pl-8 pr-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                                        placeholder="0.00"
                                    />
                                </div>
                                <InputError message={errors.purchase_price} className="mt-1" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Selling Price *
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2 text-gray-500 dark:text-gray-400">$</span>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={data.selling_price}
                                        onChange={(e) => setData('selling_price', e.target.value)}
                                        className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 pl-8 pr-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                                        placeholder="0.00"
                                    />
                                </div>
                                <InputError message={errors.selling_price} className="mt-1" />
                            </div>
                        </div>

                        {/* Stock Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Stock Quantity *
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={data.stock_quantity}
                                    onChange={(e) => setData('stock_quantity', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                                    placeholder="0"
                                />
                                <InputError message={errors.stock_quantity} className="mt-1" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Low Stock Threshold *
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    value={data.low_stock_threshold}
                                    onChange={(e) => setData('low_stock_threshold', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                                    placeholder="10"
                                />
                                <InputError message={errors.low_stock_threshold} className="mt-1" />
                                <p className="text-sm text-gray-500 mt-1">Alert when stock falls below this number</p>
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Frame Type
                                </label>
                                <select
                                    value={data.frame_type}
                                    onChange={(e) => setData('frame_type', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                                >
                                    {frameTypes.map((type) => (
                                        <option key={type.value} value={type.value}>{type.label}</option>
                                    ))}
                                </select>
                                <InputError message={errors.frame_type} className="mt-1" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Frame Material
                                </label>
                                <select
                                    value={data.frame_material}
                                    onChange={(e) => setData('frame_material', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                                >
                                    {frameMaterials.map((material) => (
                                        <option key={material.value} value={material.value}>{material.label}</option>
                                    ))}
                                </select>
                                <InputError message={errors.frame_material} className="mt-1" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Lens Type
                                </label>
                                <select
                                    value={data.lens_type}
                                    onChange={(e) => setData('lens_type', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                                >
                                    {lensTypes.map((type) => (
                                        <option key={type.value} value={type.value}>{type.label}</option>
                                    ))}
                                </select>
                                <InputError message={errors.lens_type} className="mt-1" />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Description
                            </label>
                            <textarea
                                rows={3}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                                placeholder="Optional product description, features, or notes..."
                            />
                            <InputError message={errors.description} className="mt-1" />
                        </div>

                        {/* Form Actions */}
                        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => window.history.back()}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? '💾 Saving...' : '💾 Save Glasses'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}