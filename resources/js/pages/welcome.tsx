import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="GlassesFlow - Glasses Business Management">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6 text-gray-900 lg:justify-center lg:p-8 dark:from-gray-900 dark:to-gray-800 dark:text-gray-100">
                <header className="mb-6 w-full max-w-[335px] text-sm lg:max-w-6xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-lg border border-blue-200 bg-white px-6 py-2.5 text-sm font-medium text-blue-700 shadow-sm transition-all hover:border-blue-300 hover:bg-blue-50 dark:border-blue-800 dark:bg-gray-800 dark:text-blue-300 dark:hover:bg-gray-700"
                            >
                                📊 Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-lg px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-300"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md dark:bg-blue-700 dark:hover:bg-blue-600"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow">
                    <main className="w-full max-w-6xl">
                        {/* Hero Section */}
                        <div className="text-center mb-16">
                            <div className="mb-6">
                                <span className="text-6xl mb-4 block">👓</span>
                                <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                                    Glasses<span className="text-blue-600">Flow</span>
                                </h1>
                            </div>
                            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto dark:text-gray-300">
                                Complete business management system for glasses retailers. 
                                Manage inventory, record sales, and track performance all in one place.
                            </p>
                            {!auth.user && (
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl"
                                    >
                                        🚀 Start Managing Today
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-8 py-3 text-lg font-semibold text-gray-700 shadow-md transition-all hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                                    >
                                        🔑 Employee Login
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-3 gap-8 mb-16">
                            <div className="bg-white rounded-xl p-8 shadow-lg dark:bg-gray-800">
                                <div className="text-4xl mb-4">📦</div>
                                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Inventory Management</h3>
                                <ul className="text-gray-600 space-y-2 dark:text-gray-300">
                                    <li>✓ Track glasses by model, brand & specs</li>
                                    <li>✓ Monitor stock levels in real-time</li>
                                    <li>✓ Set low stock alerts</li>
                                    <li>✓ Manage purchase & selling prices</li>
                                </ul>
                            </div>

                            <div className="bg-white rounded-xl p-8 shadow-lg dark:bg-gray-800">
                                <div className="text-4xl mb-4">💰</div>
                                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Sales Recording</h3>
                                <ul className="text-gray-600 space-y-2 dark:text-gray-300">
                                    <li>✓ Quick & easy sale entry</li>
                                    <li>✓ Automatic stock deduction</li>
                                    <li>✓ Customer information tracking</li>
                                    <li>✓ Sale history & receipts</li>
                                </ul>
                            </div>

                            <div className="bg-white rounded-xl p-8 shadow-lg dark:bg-gray-800">
                                <div className="text-4xl mb-4">📊</div>
                                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Business Reports</h3>
                                <ul className="text-gray-600 space-y-2 dark:text-gray-300">
                                    <li>✓ Low stock alerts & reports</li>
                                    <li>✓ Monthly sales performance</li>
                                    <li>✓ Revenue tracking</li>
                                    <li>✓ Best selling products</li>
                                </ul>
                            </div>
                        </div>

                        {/* Dashboard Preview */}
                        <div className="bg-white rounded-xl p-8 shadow-lg mb-16 dark:bg-gray-800">
                            <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
                                🎯 Built for Glasses Store Employees
                            </h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Quick Operations</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg dark:bg-green-900/20">
                                            <span className="text-green-600 text-xl">➕</span>
                                            <span className="text-sm text-gray-700 dark:text-gray-300">Add new glasses to inventory</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg dark:bg-blue-900/20">
                                            <span className="text-blue-600 text-xl">🛒</span>
                                            <span className="text-sm text-gray-700 dark:text-gray-300">Record customer sales</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg dark:bg-orange-900/20">
                                            <span className="text-orange-600 text-xl">⚠️</span>
                                            <span className="text-sm text-gray-700 dark:text-gray-300">Check low stock alerts</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Real-time Insights</h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Total Inventory Value</span>
                                            <span className="font-semibold text-gray-900 dark:text-white">$X,XXX</span>
                                        </div>
                                        <div className="flex justify-between p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">This Month's Sales</span>
                                            <span className="font-semibold text-green-600">$X,XXX</span>
                                        </div>
                                        <div className="flex justify-between p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Low Stock Items</span>
                                            <span className="font-semibold text-orange-600">X items</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Section */}
                        {!auth.user && (
                            <div className="text-center bg-blue-600 rounded-xl p-12 text-white">
                                <h2 className="text-3xl font-bold mb-4">Ready to streamline your glasses business? 🚀</h2>
                                <p className="text-xl mb-8 opacity-90">
                                    Join hundreds of glasses retailers using GlassesFlow to manage their inventory and sales.
                                </p>
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-lg font-semibold text-blue-600 shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl"
                                >
                                    Start Your Free Trial
                                </Link>
                            </div>
                        )}

                        {auth.user && (
                            <div className="text-center bg-green-600 rounded-xl p-12 text-white">
                                <h2 className="text-3xl font-bold mb-4">Welcome back! 👋</h2>
                                <p className="text-xl mb-8 opacity-90">
                                    Ready to manage your glasses inventory and sales?
                                </p>
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-lg font-semibold text-green-600 shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl"
                                >
                                    Go to Dashboard
                                </Link>
                            </div>
                        )}
                    </main>
                </div>

                <footer className="mt-12 text-sm text-gray-500 text-center dark:text-gray-400">
                    Built with ❤️ by{" "}
                    <a 
                        href="https://app.build" 
                        target="_blank" 
                        className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                    >
                        app.build
                    </a>
                </footer>
            </div>
        </>
    );
}