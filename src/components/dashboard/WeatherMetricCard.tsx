import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface WeatherMetricCardProps {
    label: string;
    value: string;
    icon: LucideIcon;
    color?: string;
    delay?: number;
}

const WeatherMetricCard: React.FC<WeatherMetricCardProps> = ({
    label,
    value,
    icon: Icon,
    color = "text-blue-400",
    delay = 0
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-green-900/30 backdrop-blur-sm border border-slate-200 dark:border-green-800/30 rounded-xl p-5 flex flex-col justify-between hover:border-green-500/30 dark:hover:border-green-600/50 transition-colors shadow-lg"
        >
            <div className={`p-2 rounded-lg bg-slate-100 dark:bg-white/5 w-fit mb-3`}>
                <Icon className={`${color}`} size={24} />
            </div>
            <div>
                <p className="text-slate-500 dark:text-green-200/60 text-sm font-medium uppercase tracking-wider mb-1">{label}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
            </div>
        </motion.div>
    );
};

export default WeatherMetricCard;
