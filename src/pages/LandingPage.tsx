import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FeatureCard from '../components/ui/FeatureCard';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Shield, Smartphone, ArrowRight, PlayCircle } from 'lucide-react';
import { ReactLenis } from '@studio-freight/react-lenis';
import { motion } from 'framer-motion';
import farmerUsingPhone from '../assets/farmer-using-phone.jpg';

const LandingPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <ReactLenis root>
            <div className="min-h-screen bg-gray-50 dark:bg-agri-darker transition-colors duration-500 font-sans selection:bg-green-500 selection:text-white">
                <Navbar />

                {/* Hero Section */}
                <section className="relative h-screen flex items-center justify-center overflow-hidden">
                    {/* Video/Image Background Overlay */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://images.unsplash.com/photo-1625246333195-098e98e5066c?q=80&w=2070&auto=format&fit=crop"
                            alt="Farm Background"
                            className="w-full h-full object-cover opacity-90 dark:opacity-40 hidden"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-emerald-900 to-black opacity-100"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <span className="inline-block py-1 px-3 rounded-full bg-green-500/20 border border-green-400/30 text-green-300 text-sm font-bold mb-6 backdrop-blur-sm">
                                AI-POWERED AGRICULTURE
                            </span>
                            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight leading-tight">
                                Grow the Future with <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">Sustainable Intelligence</span>
                            </h1>
                            <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                                Empowering farmers with next-gen pest detection, real-time analytics, and expert remedies.
                            </p>

                            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                                <Link to="/detect">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-green-500/40 transition-all flex items-center gap-2"
                                    >
                                        Get Started <ArrowRight size={20} />
                                    </motion.button>
                                </Link>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center gap-3 text-white font-semibold group"
                                >
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition">
                                        <PlayCircle size={24} />
                                    </div>
                                    <span>Watch Demo</span>
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-24 relative">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
                            <div>
                                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                                    Where technology meets <br />
                                    <span className="text-green-500">the roots of nature.</span>
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
                                    Our platform combines cutting-edge computer vision with agronomy expertise to detect crop threats instantly. We verify every scan with 95%+ accuracy.
                                </p>
                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">20k+</h3>
                                        <p className="text-gray-500">Scans Analyzed</p>
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">100%</h3>
                                        <p className="text-gray-500">Free for Farmers</p>
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <img
                                    src={farmerUsingPhone}
                                    alt="Farmer using phone"
                                    className="rounded-3xl shadow-2xl z-10 relative"
                                />
                                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-green-500/20 rounded-full blur-3xl -z-0"></div>
                            </div>
                        </div>

                        {/* Feature Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <FeatureCard
                                icon={<CheckCircle size={32} />}
                                title="Instant Detection"
                                description="Upload a photo and get results in seconds. Our AI works offline for remote fields."
                            />
                            <FeatureCard
                                icon={<Shield size={32} />}
                                title="Expert Remedies"
                                description="Get actionable advice on organic and chemical treatments to save your crop."
                            />
                            <FeatureCard
                                icon={<Smartphone size={32} />}
                                title="Analytics Dashboard"
                                description="Track your farm's health over time with detailed charts and history logs."
                            />
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-black/95 text-gray-400 py-16 border-t border-white/5">
                    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-8 md:mb-0">
                            <h3 className="text-2xl font-bold text-white mb-2">Kisaan Rakshak</h3>
                            <p className="max-w-xs text-sm">Innovating agriculture for a sustainable future.</p>
                        </div>
                        <div className="flex gap-8">
                            <a href="#" className="hover:text-green-400 transition">Privacy</a>
                            <a href="#" className="hover:text-green-400 transition">Terms</a>
                            <a href="#" className="hover:text-green-400 transition">Contact</a>
                        </div>
                    </div>
                </footer>
            </div>
        </ReactLenis>
    );
};

export default LandingPage;
