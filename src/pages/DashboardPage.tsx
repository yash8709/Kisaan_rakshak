import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getHistory, ScanRecord } from '../services/historyService';
import { useTranslation } from 'react-i18next';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const DashboardPage: React.FC = () => {
    const { t } = useTranslation();
    const [history, setHistory] = useState<ScanRecord[]>([]);

    useEffect(() => {
        setHistory(getHistory());
    }, []);

    // Calculate stats
    const pestCount = history.filter(r => r.isPest).length;
    const healthyCount = history.length - pestCount;

    const data = [
        { name: 'Pest Detected', value: pestCount, color: '#EF4444' }, // Red-500
        { name: 'Healthy Crop', value: healthyCount, color: '#10B981' }, // Green-500
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
            <Navbar />

            <main className="max-w-7xl mx-auto pt-28 pb-10 px-6">
                <h1 className="text-3xl font-bold mb-8">{t('dashboard.title')}</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Chart Section */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                        <h2 className="text-xl font-semibold mb-6">Overview</h2>
                        {history.length > 0 ? (
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={data}
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {data.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F3F4F6' }}
                                        />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-64 text-gray-500">
                                {t('dashboard.no_data')}
                            </div>
                        )}
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-red-100 dark:bg-red-900/20 p-6 rounded-2xl border border-red-200 dark:border-red-800">
                            <h3 className="text-red-800 dark:text-red-300 font-medium">Total Pests</h3>
                            <p className="text-4xl font-bold text-red-600 dark:text-red-400 mt-2">{pestCount}</p>
                        </div>
                        <div className="bg-green-100 dark:bg-green-900/20 p-6 rounded-2xl border border-green-200 dark:border-green-800">
                            <h3 className="text-green-800 dark:text-green-300 font-medium">Healthy Crops</h3>
                            <p className="text-4xl font-bold text-green-600 dark:text-green-400 mt-2">{healthyCount}</p>
                        </div>
                    </div>
                </div>

                {/* Recent Scans List */}
                <div className="mt-10">
                    <h2 className="text-2xl font-semibold mb-6">{t('dashboard.recent_scans')}</h2>
                    <div className="space-y-4">
                        {history.length === 0 && <p className="text-gray-500">{t('dashboard.no_data')}</p>}
                        {history.map((record) => (
                            <div key={record.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm flex items-center justify-between border-l-4 border-transparent hover:border-green-500 transition">
                                <div className="flex items-center space-x-4">
                                    <img src={record.imageUrl} alt="Scan" className="w-16 h-16 object-cover rounded-lg bg-gray-200" />
                                    <div>
                                        <p className="font-bold text-lg">{record.result}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(record.date).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-sm font-bold ${record.isPest ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                    {Math.round(record.confidence * 100)}% Conf.
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;
