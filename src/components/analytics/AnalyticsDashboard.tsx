import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { ScanRecord } from '../../services/historyService';
import { useAIContext } from '../../assistant/context/AIContext';

interface AnalyticsDashboardProps {
    history: ScanRecord[];
}

const COLORS = ['#10b981', '#ef4444', '#f59e0b', '#3b82f6'];

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ history }) => {
    const { updateDashboardContext } = useAIContext();

    // 1. Process Data for Activity Chart (Last 7 Days)
    const activityData = useMemo(() => {
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (6 - i));
            return d.toISOString().split('T')[0];
        });

        return last7Days.map(date => {
            const count = history.filter(h => h.date.startsWith(date)).length;
            return {
                name: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
                scans: count
            };
        });
    }, [history]);

    // 2. Process Data for Pest Distribution
    const pestDistribution = useMemo(() => {
        const pests: Record<string, number> = {};
        history.filter(h => h.isPest).forEach(h => {
            // Extract pest name from "Pest: Name" string or use raw result
            const name = h.result.replace('Pest: ', '').trim();
            pests[name] = (pests[name] || 0) + 1;
        });

        return Object.entries(pests).map(([name, value]) => ({ name, value }));
    }, [history]);

    const hasData = history.length > 0;

    React.useEffect(() => {
        // Share stats with AI based on computed data
        const totalScans = history.length;
        const pestCount = history.filter(h => h.isPest).length;
        const healthyCount = totalScans - pestCount;

        updateDashboardContext({
            totalScans,
            pestCount,
            healthyCount,
            recentActivity: activityData.map(d => `${d.name}: ${d.scans}`).join(', '),
            topPests: pestDistribution.slice(0, 3).map(p => `${p.name} (${p.value})`).join(', ')
        });

        return () => updateDashboardContext(null);
    }, [history, activityData, pestDistribution, updateDashboardContext]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Scan Activity Chart */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-surface-light dark:bg-surface-dark-subtle p-8 rounded-[2rem] border border-surface-subtle dark:border-white/5 shadow-card"
            >
                <h2 className="text-xl font-bold mb-6 text-text-primary dark:text-white font-display">Scan Activity (7 Days)</h2>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={activityData}>
                            <defs>
                                <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} vertical={false} />
                            <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#F3F4F6', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                itemStyle={{ color: '#10b981' }}
                            />
                            <Area type="monotone" dataKey="scans" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorScans)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Pest Distribution - Pie Chart */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-surface-light dark:bg-surface-dark-subtle p-8 rounded-[2rem] border border-surface-subtle dark:border-white/5 shadow-card"
            >
                <h2 className="text-xl font-bold mb-6 text-text-primary dark:text-white font-display">Pest Composition</h2>
                <div className="flex flex-col h-96 items-center justify-center">
                    {!hasData || pestDistribution.length === 0 ? (
                        <div className="text-center text-text-secondary dark:text-gray-500 my-auto">
                            <p>No pest data available yet.</p>
                            <p className="text-sm mt-2">Start scanning to see analytics.</p>
                        </div>
                    ) : (
                        <>
                            {/* Chart Area */}
                            <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={pestDistribution}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={100}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {pestDistribution.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '12px', border: 'none', color: '#F3F4F6' }}
                                            itemStyle={{ color: '#F3F4F6' }}
                                            labelStyle={{ color: '#F3F4F6' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            
                            {/* Responsive HTML Legend */}
                            <div className="w-full mt-4 flex flex-wrap justify-center gap-3 overflow-y-auto max-h-24 pb-2 px-2 custom-scrollbar">
                                {pestDistribution.map((entry, index) => (
                                    <div key={`legend-${index}`} className="flex items-center gap-1.5 whitespace-nowrap bg-white/5 px-2 py-1 rounded-md border border-white/5">
                                        <div 
                                            className="w-3 h-3 rounded-full flex-shrink-0" 
                                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                        />
                                        <span className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate max-w-[150px]" title={entry.name}>
                                            {entry.name} ({entry.value})
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default AnalyticsDashboard;
