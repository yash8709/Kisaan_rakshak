import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, Variants } from 'framer-motion';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroGraphic from './HeroGraphic';
import ParticleBackground from './ParticleBackground';
import { useAuth } from '../../context/AuthContext';

// Stagger delays for the hero text lines
const textVariants: Variants = {
    hidden: { opacity: 0, y: 32, filter: 'blur(4px)' },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.8,
            delay: i * 0.14,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

// Badge reveal
const badgeVariants: Variants = {
    hidden: { opacity: 0, y: 16, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

// CTA button entrance
const ctaVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.65,
            delay: 0.7 + i * 0.12,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

const HeroSection: React.FC = () => {
    const { currentUser } = useAuth();
    const targetRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start start', 'end start'],
    });

    // Parallax for background glows — spring-smoothed
    const rawBgY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const bgY = useSpring(rawBgY, { stiffness: 50, damping: 18 });

    // Fade out hero content as user scrolls
    const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

    // Subtle upward drift on the left text block
    const rawTextY = useTransform(scrollYProgress, [0, 1], ['0px', '-60px']);
    const textY = useSpring(rawTextY, { stiffness: 60, damping: 20 });

    // Subtle downward drift on the graphic for depth contrast
    const rawGraphicY = useTransform(scrollYProgress, [0, 1], ['0px', '40px']);
    const graphicY = useSpring(rawGraphicY, { stiffness: 60, damping: 20 });

    return (
        <section
            ref={targetRef}
            className="relative min-h-[100dvh] flex items-center justify-center pt-24 pb-20 overflow-hidden transition-colors duration-300"
        >
            {/* 1. Background */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-emerald-50/80 via-white to-emerald-50/50 dark:from-slate-950 dark:via-green-950/20 dark:to-slate-900 transition-colors duration-500" />

            <motion.div
                style={{ y: bgY, opacity }}
                className="absolute inset-0 z-0 pointer-events-none"
            >
                <div className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-emerald-600/10 dark:bg-emerald-600/20 blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] rounded-full bg-teal-500/10 dark:bg-teal-500/20 blur-[120px]" />
            </motion.div>

            <ParticleBackground />

            {/* 2. Main Content */}
            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">

                {/* LEFT: Text & CTA */}
                <motion.div
                    style={{ y: textY }}
                    initial="hidden"
                    animate="visible"
                    className="flex-1 text-center lg:text-left pt-10 lg:pt-0"
                >
                    {/* Status badge */}
                    <motion.div
                        variants={badgeVariants}
                        initial="hidden"
                        animate="visible"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-semibold mb-8 backdrop-blur-md"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        Kisaan Rakshak Intelligence V2
                    </motion.div>

                    {/* Headline — each word group staggered */}
                    <div className="mb-8 overflow-hidden py-2">
                        <motion.h1
                            custom={0}
                            variants={textVariants}
                            initial="hidden"
                            animate="visible"
                            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none sm:leading-tight mb-2"
                        >
                            Grow the Future with
                        </motion.h1>
                        <motion.div
                            custom={1}
                            variants={textVariants}
                            initial="hidden"
                            animate="visible"
                            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none sm:leading-tight py-2"
                        >
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.1)] dark:drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                                {' '}AI-Powered
                            </span>{' '}
                            <span className="text-slate-900 dark:text-white inline-block mt-2 sm:mt-0">Agriculture</span>
                        </motion.div>
                    </div>

                    {/* Subtext */}
                    <motion.p
                        custom={2}
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0"
                    >
                        Detect pests instantly, monitor crop health, and receive intelligent farming insights. The world-class enterprise SaaS for sustainable farming.
                    </motion.p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                        <motion.div
                            custom={0}
                            variants={ctaVariants}
                            initial="hidden"
                            animate="visible"
                            className="w-full sm:w-auto"
                        >
                            <Link to={currentUser ? '/dashboard' : '/signup'} className="w-full sm:w-auto">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-[0_0_20px_rgba(16,185,129,0.2)] dark:shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:ring-2 hover:ring-offset-2 hover:ring-emerald-500 dark:hover:ring-offset-slate-950 transition-all flex items-center justify-center gap-2 group border border-emerald-400/50"
                                >
                                    Get Started{' '}
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </Link>
                        </motion.div>

                        <motion.div
                            custom={1}
                            variants={ctaVariants}
                            initial="hidden"
                            animate="visible"
                            className="w-full sm:w-auto"
                        >
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                className="w-full sm:w-auto flex items-center justify-center gap-3 text-slate-700 dark:text-white font-semibold group px-8 py-4 rounded-2xl bg-white/60 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 transition-colors border border-emerald-100 dark:border-slate-700 backdrop-blur-md shadow-sm dark:shadow-none"
                            >
                                <div className="text-emerald-500 dark:text-emerald-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors scale-110">
                                    <PlayCircle size={24} />
                                </div>
                                <span>Watch Demo</span>
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* Floating social-proof pill — appears after CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-10 inline-flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400"
                    >
                        <span className="flex -space-x-2">
                            {['bg-emerald-400', 'bg-teal-400', 'bg-green-500'].map((c, i) => (
                                <span
                                    key={i}
                                    className={`w-7 h-7 rounded-full border-2 border-white dark:border-slate-950 ${c} opacity-80`}
                                />
                            ))}
                        </span>
                        <span>
                            Trusted by <span className="font-semibold text-slate-700 dark:text-slate-200">20,000+</span> farmers
                        </span>
                    </motion.div>
                </motion.div>

                {/* RIGHT: Hero Graphic with independent parallax */}
                <motion.div
                    style={{ y: graphicY }}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="flex-1 w-full h-[50vh] lg:h-auto min-h-[400px] lg:min-h-[700px] relative z-10 lg:ml-10"
                >
                    <HeroGraphic />
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                style={{ opacity }}
                className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20"
            >
                <span className="text-slate-400/50 dark:text-white/30 text-[10px] tracking-widest uppercase font-bold">
                    Scroll
                </span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-[2px] h-8 rounded-full bg-gradient-to-b from-emerald-500/50 to-transparent"
                />
            </motion.div>
        </section>
    );
};

export default HeroSection;
