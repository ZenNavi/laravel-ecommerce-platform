import { Head, useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { useState } from 'react';

export default function WalletIndex({ auth, assets = [], transactions = [], assetTypes = [] }) {
    const [activeTab, setActiveTab] = useState('overview');
    const [chargeAmount, setChargeAmount] = useState('');
    const { post, processing } = useForm();

    const requestPayCharge = () => {
        post('/wallet/pay/charge', {
            data: { amount: chargeAmount },
            onSuccess: () => setChargeAmount(''),
        });
    };

    return (
        <MainLayout auth={auth}>
            <Head title="Wallet" />

            <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wallet</h1>

                {/* Asset Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {assets.map((asset) => (
                        <div
                            key={asset.id}
                            className="bg-white rounded-lg shadow-md p-6"
                        >
                            <h3 className="text-sm font-medium text-gray-500">
                                {asset.asset_type?.name || 'Unknown'}
                            </h3>
                            <p className="mt-2 text-2xl font-bold text-gray-900">
                                {asset.asset_type?.code === 'reward_point'
                                    ? `${asset.balance.toLocaleString()} P`
                                    : `$${asset.balance.toLocaleString()}`
                                }
                            </p>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="border-b border-gray-200">
                        <nav className="flex -mb-px">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`px-6 py-3 border-b-2 text-sm font-medium ${
                                    activeTab === 'overview'
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                Overview
                            </button>
                            <button
                                onClick={() => setActiveTab('charge')}
                                className={`px-6 py-3 border-b-2 text-sm font-medium ${
                                    activeTab === 'charge'
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                Charge Pay
                            </button>
                            <button
                                onClick={() => setActiveTab('history')}
                                className={`px-6 py-3 border-b-2 text-sm font-medium ${
                                    activeTab === 'history'
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                Transaction History
                            </button>
                        </nav>
                    </div>

                    <div className="p-6">
                        {activeTab === 'overview' && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Asset Overview
                                </h3>
                                <div className="space-y-4">
                                    {assets.map((asset) => (
                                        <div
                                            key={asset.id}
                                            className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                                        >
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {asset.asset_type?.name}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {asset.asset_type?.description}
                                                </p>
                                            </div>
                                            <p className="text-xl font-bold text-gray-900">
                                                {asset.asset_type?.code === 'reward_point'
                                                    ? `${asset.balance.toLocaleString()} P`
                                                    : `$${asset.balance.toLocaleString()}`
                                                }
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'charge' && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Charge Pay Balance
                                </h3>
                                <div className="max-w-md">
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Amount to Charge
                                        </label>
                                        <input
                                            type="number"
                                            value={chargeAmount}
                                            onChange={(e) => setChargeAmount(e.target.value)}
                                            placeholder="Enter amount"
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            min="1000"
                                            max="1000000"
                                        />
                                        <p className="mt-1 text-sm text-gray-500">
                                            Minimum: $1,000 / Maximum: $1,000,000
                                        </p>
                                    </div>
                                    <button
                                        onClick={requestPayCharge}
                                        disabled={processing || !chargeAmount}
                                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700 disabled:opacity-50"
                                    >
                                        {processing ? 'Submitting...' : 'Request Charge'}
                                    </button>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Charge requests require admin approval.
                                    </p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'history' && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Transaction History
                                </h3>
                                {transactions.length > 0 ? (
                                    <div className="space-y-3">
                                        {transactions.map((tx) => (
                                            <div
                                                key={tx.id}
                                                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                                            >
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        {tx.description}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {new Date(tx.created_at).toLocaleString()}
                                                    </p>
                                                </div>
                                                <p className={`text-lg font-bold ${
                                                    tx.type === 'credit' ? 'text-green-600' : 'text-red-600'
                                                }`}>
                                                    {tx.type === 'credit' ? '+' : '-'}
                                                    ${tx.amount.toLocaleString()}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500">No transactions yet.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
