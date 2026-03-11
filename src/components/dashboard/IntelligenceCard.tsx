import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, CheckCircle, AlertTriangle, AlertOctagon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface IntelligenceData {
    level: string;
    reason: string;
}

interface IntelligenceCardProps {
    title: string;
    icon: LucideIcon;
    data: IntelligenceData;
    delay?: number;
}

const getStatusColor = (level: string) => {
    const l = level.toUpperCase();
    if (l === 'LOW' || l === 'GOOD') return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30';
    if (l === 'MEDIUM' || l === 'MODERATE') return 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-500/20 dark:text-yellow-400 dark:border-yellow-500/30';
    if (l === 'HIGH' || l === 'POOR') return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-500/20 dark:text-red-400 dark:border-red-500/30';
    return 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-green-900/20 dark:text-green-200/50 dark:border-green-800/30';
};

const getStatusIcon = (level: string) => {
    const l = level.toUpperCase();
    if (l === 'LOW' || l === 'GOOD') return CheckCircle;
    if (l === 'MEDIUM' || l === 'MODERATE') return AlertTriangle;
    if (l === 'HIGH' || l === 'POOR') return AlertOctagon;
    return CheckCircle;
};

const IntelligenceCard: React.FC<IntelligenceCardProps> = ({ title, icon: Icon, data, delay = 0 }) => {
    const { t } = useTranslation();
    const statusStyle = getStatusColor(data.level);
    const StatusIcon = getStatusIcon(data.level);

    // Map title to localized string
    const titleKeyMap: Record<string, string> = {
        "Soil Moisture": "soil_moisture",
        "Pest Risk": "pest_risk",
        "Crop Stress": "crop_stress",
        "Disease Risk": "disease_risk",
        "Spray Suitability": "spray_cond"
    };
    const localizedTitle = titleKeyMap[title] ? t(`dashboard.intelligence.${titleKeyMap[title]}`) : title;

    // Map level to localized string
    const localizedLevel = t(`dashboard.intelligence.levels.${data.level.toUpperCase()}`, { defaultValue: data.level });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-green-900/30 backdrop-blur-sm border border-slate-200 dark:border-green-800/30 rounded-xl p-6 hover:border-green-500/30 dark:hover:border-green-600/50 transition-colors shadow-lg h-full"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 rounded-lg">
                        <Icon size={20} />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{localizedTitle}</h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${statusStyle}`}>
                    <StatusIcon size={12} />
                    {localizedLevel}
                </span>
            </div>

            <p className="text-slate-600 dark:text-green-100/80 text-sm leading-relaxed border-t border-slate-100 dark:border-white/5 pt-4">
                {data.reason}
            </p>
        </motion.div>
    );
};

export default IntelligenceCard;
