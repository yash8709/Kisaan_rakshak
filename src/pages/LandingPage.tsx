import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FeatureCard from '../components/ui/FeatureCard';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Shield, Smartphone, ArrowRight, PlayCircle } from 'lucide-react';
import { ReactLenis } from '@studio-freight/react-lenis';
import { motion, useScroll, useTransform } from 'framer-motion';
import farmerUsingPhone from '../assets/farmer-using-phone.jpg';
import { fadeInUp, staggerContainer, slideInLeft, slideInRight, hoverScale } from '../utils/motion';

const LandingPage: React.FC = () => {
    const { t } = useTranslation();
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <ReactLenis root>
            <div className="min-h-screen bg-gray-50 dark:bg-agri-darker transition-colors duration-500 font-sans selection:bg-green-500 selection:text-white overflow-x-hidden">
                <Navbar />

                {/* Hero Section */}
                <section ref={targetRef} className="relative h-screen flex items-center justify-center overflow-hidden">
                    {/* Parallax Background */}
                    <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">

                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/90 via-green-700/80 to-teal-900/90 dark:from-green-900/40 dark:via-emerald-900/60 dark:to-black/80"></div>
                    </motion.div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.span
                                variants={fadeInUp}
                                className="inline-block py-2 px-4 rounded-full bg-green-500/20 border border-green-400/30 text-green-300 text-sm font-bold mb-6 backdrop-blur-md uppercase tracking-wider"
                            >
                                AI-Powered Agriculture
                            </motion.span>

                            <motion.h1
                                variants={fadeInUp}
                                className="text-6xl md:text-8xl font-display font-extrabold text-white mb-8 tracking-tight leading-tight drop-shadow-lg"
                            >
                                Grow the Future with <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-100 via-white to-green-200 dark:from-green-400 dark:via-emerald-300 dark:to-green-500 animate-pulse-slow">
                                    Sustainable Intelligence
                                </span>
                            </motion.h1>

                            <motion.p
                                variants={fadeInUp}
                                className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-12 font-light leading-relaxed drop-shadow-md"
                            >
                                Empowering farmers with next-gen pest detection, real-time analytics, and expert remedies.
                            </motion.p>

                            <motion.div
                                variants={fadeInUp}
                                className="flex flex-col sm:flex-row justify-center items-center gap-6"
                            >
                                <Link to="/detect">
                                    <motion.button
                                        whileHover={hoverScale}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-green-500 hover:bg-green-400 text-white px-10 py-5 rounded-full font-bold text-lg shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] hover:shadow-neon transition-all flex items-center gap-3 group"
                                    >
                                        Get Started <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </motion.button>
                                </Link>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center gap-3 text-white font-semibold group px-8 py-5 rounded-full hover:bg-white/10 transition-colors"
                                >
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition backdrop-blur-sm">
                                        <PlayCircle size={24} />
                                    </div>
                                    <span>Watch Demo</span>
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 1 }}
                        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
                    >
                        <span className="text-white/50 text-xs tracking-widest uppercase">Scroll</span>
                        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-1 h-12 rounded-full bg-gradient-to-b from-green-500 to-transparent"></motion.div>
                    </motion.div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-32 relative bg-surface-light dark:bg-agri-dark">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
                            <motion.div
                                variants={slideInLeft}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-8 font-display">
                                    Where technology meets <br />
                                    <span className="text-green-500 underline decoration-wavy decoration-green-500/30 underline-offset-8">the roots of nature.</span>
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 text-xl leading-relaxed mb-10 border-l-4 border-green-500 pl-6">
                                    Our platform combines cutting-edge computer vision with agronomy expertise to detect crop threats instantly. We verify every scan with 95%+ accuracy.
                                </p>
                                <div className="grid grid-cols-2 gap-10">
                                    <div>
                                        <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-1">20k+</h3>
                                        <p className="text-gray-500 font-medium tracking-wide text-sm uppercase">Scans Analyzed</p>
                                    </div>
                                    <div>
                                        <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-1">100%</h3>
                                        <p className="text-gray-500 font-medium tracking-wide text-sm uppercase">Free for Farmers</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                variants={slideInRight}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="relative group"
                            >
                                <div className="absolute inset-0 bg-green-500/20 rounded-[2.5rem] rotate-6 transform group-hover:rotate-3 transition-transform duration-500 blur-xl"></div>
                                <img
                                    src={farmerUsingPhone}
                                    alt="Farmer using phone"
                                    className="rounded-[2.5rem] shadow-2xl z-10 relative border-4 border-white dark:border-white/10 transform transition-transform duration-500 group-hover:scale-[1.01]"
                                />
                                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-green-500/30 rounded-full blur-[80px] -z-0"></div>
                            </motion.div>
                        </div>

                        {/* Feature Cards Grid */}
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        >
                            <FeatureCard
                                icon={<CheckCircle size={32} />}
                                title="Instant Detection"
                                description="Upload a photo and get results in seconds. Our AI works offline for remote fields."
                                index={0}
                            />
                            <FeatureCard
                                icon={<Shield size={32} />}
                                title="Expert Remedies"
                                description="Get actionable advice on organic and chemical treatments to save your crop."
                                index={1}
                            />
                            <FeatureCard
                                icon={<Smartphone size={32} />}
                                title="Analytics Dashboard"
                                description="Track your farm's health over time with detailed charts and history logs."
                                index={2}
                            />
                        </motion.div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-black/95 text-gray-400 py-16 border-t border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-900 via-green-500 to-green-900 opacity-50"></div>
                    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center relative z-10">
                        <div className="mb-8 md:mb-0">
                            <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">Kisaan Rakshak</h3>
                            <p className="max-w-xs text-sm text-gray-500">Innovating agriculture for a sustainable future.</p>
                        </div>
                        <div className="flex gap-8">
                            <a href="#" className="hover:text-green-400 transition-colors duration-300">Privacy</a>
                            <a href="#" className="hover:text-green-400 transition-colors duration-300">Terms</a>
                            <a href="#" className="hover:text-green-400 transition-colors duration-300">Contact</a>
                        </div>
                    </div>
                </footer>
            </div>
        </ReactLenis>
    );
};

export default LandingPage;
