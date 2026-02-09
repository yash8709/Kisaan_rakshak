import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getHistory, ScanRecord } from '../services/historyService';
import { useTranslation } from 'react-i18next';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Scan, ShieldCheck, AlertTriangle, Activity, ChevronRight, Bug, Leaf, History } from 'lucide-react';
import FeatureCard from '../components/ui/FeatureCard';
import WeatherWidget from '../components/weather/WeatherWidget';
import AnalyticsDashboard from '../components/analytics/AnalyticsDashboard';
import { useAuth } from '../context/AuthContext'; // Assuming useAuth is in AuthContext

import { fadeInUp, staggerContainer } from '../utils/motion';

const DashboardPage: React.FC = () => {
    const { t } = useTranslation();
    const [history, setHistory] = useState<ScanRecord[]>([]);
    const { currentUser } = useAuth();

    useEffect(() => {
        setHistory(getHistory());
    }, []);

    // Calculate stats
    const pestCount = history.filter(r => r.isPest).length;
    const healthyCount = history.length - pestCount;
    const stats = {
        totalScans: history.length,
        healthy: healthyCount,
        infected: pestCount
    };

    const data = [
        { name: 'Mon', scans: 30 },
        { name: 'Tue', scans: 45 },
        { name: 'Wed', scans: 28 },
        { name: 'Thu', scans: 52 },
        { name: 'Fri', scans: 60 },
        { name: 'Sat', scans: 35 },
        { name: 'Sun', scans: 48 },
    ];

    return (
        <div className="min-h-screen bg-surface-subtle dark:bg-surface-dark text-gray-800 dark:text-gray-100 transition-colors duration-300">
            <Navbar />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto pt-28 pb-10 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row justify-between items-center mb-8"
                >
                    <h1 className="text-3xl font-bold text-text-primary dark:text-white font-display tracking-tight">
                        {t('dashboard.title')}
                    </h1>
                    <div className="flex space-x-2 mt-4 md:mt-0">
                        <select className="bg-surface-white dark:bg-surface-dark-subtle border border-surface-subtle dark:border-white/10 rounded-lg px-4 py-2 text-sm text-text-secondary dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-agri-green">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                        </select>
                    </div>
                </motion.div>



                {/* Weather & Stats Section */}
                <div className="flex flex-col lg:flex-row gap-6 mb-8">
                    {/* ... Weather and Stats Grid ... */}
                    <div className="w-full lg:w-1/3">
                        <WeatherWidget />
                    </div>

                    {/* Stats Grid - Takes 2/3 width */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                        {[
                            { title: t('dashboard.totalScans'), value: stats.totalScans, icon: Scan, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                            { title: t('dashboard.healthy'), value: stats.healthy, icon: ShieldCheck, color: 'text-green-500', bg: 'bg-green-500/10' },
                            { title: t('dashboard.infected'), value: stats.infected, icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/10' },
                            { title: t('dashboard.actions'), value: 12, icon: Activity, color: 'text-purple-500', bg: 'bg-purple-500/10' }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                whileHover={{ y: -5 }}
                                className="bg-surface-light dark:bg-surface-dark-subtle p-6 rounded-3xl border border-surface-subtle dark:border-white/5 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                                        <stat.icon size={24} />
                                    </div>
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.bg} ${stat.color}`}>
                                        +5.2%
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold text-text-primary dark:text-white mb-1 font-display">{stat.value}</h3>
                                    <p className="text-sm text-text-secondary dark:text-gray-400 font-medium">{stat.title}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Analytics Section */}
                <div className="mb-8">
                    <AnalyticsDashboard history={history} />
                </div>

                {/* Recent Scans List Container - Modified to full width since charts moved */}
                <div className="grid grid-cols-1 gap-8">

                    {/* Recent Scans List */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-surface-light dark:bg-surface-dark-subtle p-8 rounded-[2rem] border border-surface-subtle dark:border-white/5 shadow-card"
                    >
                        <h2 className="text-xl font-bold mb-6 text-text-primary dark:text-white font-display">Recent Detections</h2>
                        <div className="space-y-4">
                            {history.length === 0 ? (
                                <p className="text-text-secondary dark:text-gray-400 text-center py-10">No scans yet.</p>
                            ) : (
                                history.slice(0, 5).map((record, index) => (
                                    <motion.div
                                        key={record.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 + index * 0.1 }}
                                        className="flex items-center justify-between p-4 bg-surface-subtle/50 dark:bg-white/5 rounded-2xl hover:bg-surface-subtle dark:hover:bg-white/10 transition-colors group cursor-pointer"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="relative overflow-hidden w-16 h-16 rounded-xl">
                                                <img src={record.imageUrl} alt="Scan" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-text-primary dark:text-white">{record.result}</p>
                                                <p className="text-xs text-text-secondary dark:text-gray-400">{new Date(record.date).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${record.result === 'Healthy' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                                {(record.confidence * 100).toFixed(0)}%
                                            </span>
                                            <ChevronRight size={16} className="ml-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;
