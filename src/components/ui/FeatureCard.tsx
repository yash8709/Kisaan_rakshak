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
            custom={index}
            whileHover={{ y: -5 }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative group p-8 rounded-[2rem] bg-surface-light dark:bg-surface-dark-subtle border border-surface-subtle dark:border-white/5 shadow-card hover:shadow-card-hover dark:shadow-none transition-all duration-500 overflow-hidden"
        >
            {/* Gradient Glow Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-agri-green/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Spotlight Background */}
            <div className="absolute -inset-px bg-gradient-to-r from-agri-green/50 to-emerald-500/50 rounded-[2rem] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />

            <div className="relative z-10">
                <div className="mb-6 inline-flex p-4 rounded-2xl bg-agri-green/10 text-agri-green dark:bg-white/5 dark:text-agri-neon group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-text-primary dark:text-white font-display">
                    {title}
                </h3>
                <p className="text-lg text-text-secondary dark:text-gray-400 leading-relaxed">
                    {description}
                </p>
            </div>
        </motion.div>
    );
};

export default FeatureCard;
