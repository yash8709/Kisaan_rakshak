import React from 'react';
import { motion } from 'framer-motion';
import { AgriWeatherInsights } from '../../assistant/utils/agriculture';
import { Droplets, Bug, ThermometerSun, Wind, AlertTriangle, Sprout, CheckCircle, Info, CloudRain } from 'lucide-react';

interface AgriIntelligenceProps {
    data: AgriWeatherInsights;
}

const LevelBadge = ({ level }: { level: string }) => {
    const colors = {
        LOW: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-green-500/20 dark:text-green-300 dark:border-green-500/30',
        MEDIUM: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-yellow-500/20 dark:text-yellow-300 dark:border-yellow-500/30',
        HIGH: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-500/20 dark:text-red-300 dark:border-red-500/30',
        POOR: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-500/20 dark:text-red-300 dark:border-red-500/30',
        MODERATE: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-yellow-500/20 dark:text-yellow-300 dark:border-yellow-500/30',
        GOOD: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-green-500/20 dark:text-green-300 dark:border-green-500/30',
    };
    const style = colors[level as keyof typeof colors] || colors.MEDIUM;

    return (
        <span className={`px-3 py-1 rounded-lg text-xs md:text-sm font-bold border ${style} shadow-sm`}>
            {level}
        </span>
    );
};

const IndexCard = ({ title, icon: Icon, data }: { title: string, icon: any, data: { level: string, reason: string } }) => (
    <div className="bg-slate-50 dark:bg-white/5 p-4 md:p-5 rounded-2xl border border-emerald-100 dark:border-white/5 hover:bg-emerald-50 dark:hover:bg-white/10 transition-colors shadow-sm">
        <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2.5 text-slate-800 dark:text-slate-200 text-sm md:text-base font-semibold">
                <Icon size={18} className="text-emerald-500 dark:text-emerald-400" />
                {title}
            </div>
            <LevelBadge level={data.level} />
        </div>
        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{data.reason}</p>
    </div>
);

const AgriIntelligence: React.FC<AgriIntelligenceProps> = ({ data }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 space-y-6"
        >
            <div className="flex items-center gap-3 mb-4 border-b border-emerald-100 dark:border-white/10 pb-4">
                <div className="p-2 bg-emerald-100 dark:bg-agri-green/20 rounded-xl">
                    <Sprout size={24} className="text-emerald-600 dark:text-agri-green" />
                </div>
                <h3 className="text-base md:text-xl font-bold text-slate-900 dark:text-white tracking-wide">Smart Farming Intelligence</h3>
            </div>

            {/* Indices Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {data.rainImpact && data.rainImpact.level !== 'NO IMPACT' && (
                    <div className="md:col-span-2 lg:col-span-4 bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 p-5 rounded-2xl flex justify-between items-center shadow-inner">
                        <div className="flex items-center gap-3 text-blue-800 dark:text-blue-200 text-sm md:text-base font-bold">
                            <CloudRain size={24} className="text-blue-500 dark:text-blue-400 drop-shadow-md" />
                            Rain Impact Analysis
                        </div>
                        <LevelBadge level={data.rainImpact.level} />
                    </div>
                )}
                <IndexCard title="Soil Moisture" icon={Droplets} data={data.soilMoistureIndex} />
                <IndexCard title="Pest Risk" icon={Bug} data={data.pestRiskIndex} />
                <IndexCard title="Crop Stress" icon={ThermometerSun} data={data.cropStressIndex} />
                <IndexCard title="Spray Cond." icon={Wind} data={data.spraySuitability} />
            </div>

            {/* Advice Section */}
            <div className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 rounded-2xl p-5 md:p-6 shadow-sm mt-6">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-1.5 bg-indigo-100 dark:bg-indigo-500/20 rounded-lg">
                        <CheckCircle size={20} className="text-indigo-600 dark:text-indigo-300" />
                    </div>
                    <span className="text-sm md:text-base font-bold text-indigo-800 dark:text-indigo-200 tracking-wide uppercase">Farming Action Plan</span>
                </div>
                <p className="text-sm md:text-base text-indigo-900 dark:text-indigo-100 mb-4 font-medium leading-relaxed max-w-4xl">{data.farmingAdvice.summary}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {data.farmingAdvice.recommendedActions.slice(0, 3).map((action, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 bg-indigo-100/50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-500/10 text-xs md:text-sm text-indigo-900 dark:text-indigo-200/90 font-medium">
                            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 shadow-[0_0_8px_rgba(129,140,248,0.8)]" />
                            {action}
                        </div>
                    ))}
                </div>
            </div>

            {/* Alerts */}
            {data.alerts.length > 0 && (
                <div className="bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-2xl p-5 md:p-6 flex items-start gap-4 shadow-sm">
                    <div className="p-1.5 bg-red-100 dark:bg-red-500/20 rounded-lg shrink-0">
                        <AlertTriangle size={20} className="text-red-500 dark:text-red-400" />
                    </div>
                    <div className="space-y-2 w-full">
                        <span className="text-sm md:text-base font-bold text-red-800 dark:text-red-300 tracking-wide uppercase block mb-1">Critical Alerts</span>
                        {data.alerts.map((alert, i) => (
                            <p key={i} className="text-sm md:text-base text-red-900 dark:text-red-200 font-medium bg-red-100/50 dark:bg-red-950/40 p-3 rounded-xl border border-red-200 dark:border-red-500/10 leading-relaxed">{alert}</p>
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default AgriIntelligence;
