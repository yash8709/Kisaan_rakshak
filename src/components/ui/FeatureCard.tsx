import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../utils/motion';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    index?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, index = 0 }) => {
    return (
        <motion.div
            variants={fadeInUp}
            whileHover={{
                y: -10,
                rotateX: 5,
                rotateY: 5,
                scale: 1.02,
                transition: { duration: 0.2 }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="group relative bg-agri-white dark:bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-gray-100 dark:border-white/10 overflow-hidden hover:shadow-card-hover dark:hover:shadow-neon transition-all duration-500"
        >
            {/* Gradient Border Glow on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-agri-green/0 via-agri-green/0 to-agri-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
                <div className="bg-gradient-to-br from-agri-green-light to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 w-16 h-16 rounded-2xl flex items-center justify-center text-agri-green dark:text-green-400 mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-800 dark:text-gray-100 group-hover:text-agri-green dark:group-hover:text-green-400 transition-colors">
                    {title}
                </h3>
                <p className="text-slate-600 dark:text-gray-400 leading-relaxed font-light">
                    {description}
                </p>
            </div>
        </motion.div>
    );
};

export default FeatureCard;
