import React from 'react';
import { motion, Variants } from 'framer-motion';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    index?: number;
}

// Each card slides up with a blur-clear effect; the delay is index-driven
const cardVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 48,
        filter: 'blur(6px)',
        scale: 0.97,
    },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        scale: 1,
        transition: {
            duration: 0.75,
            delay: i * 0.13,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, index = 0 }) => {
    return (
        <motion.div
            variants={cardVariants}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            whileHover={{
                y: -6,
                scale: 1.015,
                transition: { type: 'spring', stiffness: 300, damping: 20 },
            }}
            className="relative group p-8 rounded-[2rem] bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm border border-emerald-500/20 dark:border-emerald-500/10 hover:border-emerald-500/40 dark:hover:border-emerald-500/30 shadow-[0_8px_32px_rgba(16,185,129,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-500 overflow-hidden"
        >
            {/* Gradient Glow Border on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Soft spotlight */}
            <div className="absolute -inset-px bg-gradient-to-r from-emerald-500/0 to-teal-500/10 rounded-[2rem] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

            {/* Animated top border line that draws in on hover */}
            <motion.div
                className="absolute top-0 left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent rounded-full"
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.3 + index * 0.13, ease: [0.22, 1, 0.36, 1] }}
            />

            <div className="relative z-10">
                {/* Icon box */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.13, ease: 'easeOut' }}
                    className="mb-6 inline-flex p-4 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500/20 group-hover:text-emerald-500 dark:group-hover:text-emerald-300 transition-all duration-300 border border-emerald-500/20 shadow-[0_0_15px_rgba(52,211,153,0.1)]"
                >
                    {icon}
                </motion.div>

                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white font-display tracking-tight group-hover:text-emerald-900 dark:group-hover:text-emerald-50 transition-colors">
                    {title}
                </h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-light group-hover:text-slate-800 dark:group-hover:text-slate-300 transition-colors">
                    {description}
                </p>
            </div>
        </motion.div>
    );
};

export default FeatureCard;
