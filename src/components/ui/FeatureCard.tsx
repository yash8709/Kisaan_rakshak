import React from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="bg-white/80 dark:bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-gray-100 dark:border-white/10 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300"
        >
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 w-16 h-16 rounded-2xl flex items-center justify-center text-green-600 dark:text-green-400 mb-6">
                {icon}
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                {description}
            </p>
        </motion.div>
    );
};

export default FeatureCard;
