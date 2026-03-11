import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface AnalyticsCardProps {
    title: string;
    value: number | string;
    icon: LucideIcon;
    trend?: string;
    color: string;
    bgColor: string;
    delay?: number;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
    title,
    value,
    icon: Icon,
    trend,
    color,
    bgColor,
    delay = 0
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.3 }}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-green-900/30 backdrop-blur-sm border border-slate-200 dark:border-green-800/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:border-green-500/30 dark:hover:border-green-600/50 transition-all group"
        >
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${bgColor} ${color} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={24} />
                </div>
                {trend && (
                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                        {trend}
                    </span>
                )}
            </div>

            <div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-1 font-display tracking-tight">{value}</h3>
                <p className="text-sm text-slate-500 dark:text-green-200/60 font-medium">{title}</p>
            </div>
        </motion.div>
    );
};

export default AnalyticsCard;
