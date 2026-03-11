import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getHistory, ScanRecord } from '../services/historyService';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Scan, ShieldCheck, AlertTriangle, Activity, ChevronRight } from 'lucide-react';
import WeatherDashboard from '../components/dashboard/WeatherDashboard';
import AnalyticsCard from '../components/dashboard/AnalyticsCard';
import AnalyticsDashboard from '../components/analytics/AnalyticsDashboard';
import { useAuth } from '../context/AuthContext';
import { fadeInUp, staggerContainer } from '../utils/motion';

const DashboardPage: React.FC = () => {
    const { t } = useTranslation();
    const [history, setHistory] = useState<ScanRecord[]>([]);
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchHistory = async () => {
            if (currentUser) {
                try {
                    const data = await getHistory(currentUser.uid);
                    setHistory(data);
                } catch (err: any) {
                    console.error("Dashboard failed to fetch history:", err);
                }
            }
        };
        fetchHistory();
    }, [currentUser]);

    // Calculate stats
    const pestCount = history.filter(r => r.isPest).length;
    const healthyCount = history.length - pestCount;
    const stats = {
        totalScans: history.length,
        healthy: healthyCount,
        infected: pestCount
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-green-950 transition-colors duration-300 selection:bg-agri-green/30">
            <Navbar />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto pt-28 pb-10 px-6 space-y-12">

                {/* 1. Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row justify-between items-end border-b border-slate-200 dark:border-white/10 pb-6"
                >
                    <div>
                        <h1 className="text-4xl font-bold font-display tracking-tight text-slate-900 dark:text-white mb-2">
                            {t('dashboard.title')}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400">Welcome back, {currentUser?.displayName || 'Farmer'} 🌱</p>
                    </div>

                    <div className="flex gap-3 mt-4 md:mt-0">
                        <select className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-agri-green">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                        </select>
                    </div>
                </motion.div>

                {/* 2. Weather Intelligence (Primary Section) */}
                <section>
                    <WeatherDashboard />
                </section>

                {/* 3. Key Metrics Grid */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <Activity className="text-agri-green" size={24} />
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Farm Performance</h2>
                    </div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        <AnalyticsCard
                            title={t('dashboard.totalScans')}
                            value={stats.totalScans}
                            icon={Scan}
                            color="text-blue-500 dark:text-blue-400"
                            bgColor="bg-blue-100 dark:bg-blue-500/10"
                            trend="+12%"
                            delay={0.1}
                        />
                        <AnalyticsCard
                            title={t('dashboard.healthy')}
                            value={stats.healthy}
                            icon={ShieldCheck}
                            color="text-green-500 dark:text-green-400"
                            bgColor="bg-green-100 dark:bg-green-500/10"
                            trend="+5%"
                            delay={0.2}
                        />
                        <AnalyticsCard
                            title={t('dashboard.infected')}
                            value={stats.infected}
                            icon={AlertTriangle}
                            color="text-red-500 dark:text-red-400"
                            bgColor="bg-red-100 dark:bg-red-500/10"
                            trend="-2%"
                            delay={0.3}
                        />
                        <AnalyticsCard
                            title={t('dashboard.analytics.pending_actions')}
                            value="3"
                            icon={Activity}
                            color="text-purple-500 dark:text-purple-400"
                            bgColor="bg-purple-100 dark:bg-purple-500/10"
                            delay={0.4}
                        />
                    </motion.div>
                </section>

                {/* 4. Detailed Analytics & History */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Charts Section - 2/3 width */}
                    <div className="lg:col-span-2">
                        <AnalyticsDashboard history={history} />
                    </div>

                    {/* Recent Activities - 1/3 width */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white dark:bg-slate-900/60 backdrop-blur-xl p-6 rounded-3xl border border-slate-200 dark:border-slate-700/50 h-fit shadow-lg dark:shadow-none"
                    >
                        <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white font-display">{t('dashboard.analytics.recent_detections')}</h2>
                        <div className="space-y-4">
                            {history.length === 0 ? (
                                <p className="text-slate-500 text-center py-10">{t('dashboard.analytics.no_recent_activity')}</p>
                            ) : (
                                history.slice(0, 5).map((record, index) => (
                                    <motion.div
                                        key={record.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 + index * 0.1 }}
                                        className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="relative overflow-hidden w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-700/50 flex items-center justify-center shrink-0">
                                                {record.imageUrl ? (
                                                    <img 
                                                        src={record.imageUrl} 
                                                        alt="Scan" 
                                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                                                        onError={(e) => {
                                                            // Fallback if image URL is dead
                                                            e.currentTarget.style.display = 'none';
                                                            e.currentTarget.parentElement?.classList.add('fallback-shown');
                                                        }}
                                                    />
                                                ) : null}
                                                {/* Fallback Icon (always behind the image, or visible if no image/image fails) */}
                                                <div className="absolute inset-0 flex items-center justify-center text-emerald-500/50 dark:text-green-400/30">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 dark:text-slate-200 text-sm truncate max-w-[150px]">{record.result}</p>
                                                <p className="text-xs text-slate-500">{new Date(record.date).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${record.result === 'Healthy' ? 'bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400 border border-green-200 dark:border-green-500/20' : 'bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400 border border-red-200 dark:border-red-500/20'}`}>
                                                {(record.confidence * 100).toFixed(0)}%
                                            </span>
                                            <ChevronRight size={14} className="ml-2 text-slate-400 dark:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
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
