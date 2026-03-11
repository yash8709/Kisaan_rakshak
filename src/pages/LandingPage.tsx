import React, { useRef } from 'react';
import Navbar from '../components/Navbar';
import FeatureCard from '../components/ui/FeatureCard';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Shield, Smartphone } from 'lucide-react';
import { ReactLenis } from '@studio-freight/react-lenis';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { staggerContainer, slideInLeft, slideInRight } from '../utils/motion';

// New Enterprise Components
import HeroSection from '../components/landing/HeroSection';
import CropGrowthAnimation from '../components/landing/CropGrowthAnimation';
import PestDetectionPreview from '../components/landing/PestDetectionPreview';
import ParallaxContainer from '../components/landing/ParallaxContainer';
import PestDetectionMarquee from '../components/landing/PestDetectionMarquee';

// ─── Reusable scroll-reveal wrapper ───────────────────────────────────────────
interface RevealProps {
    children: React.ReactNode;
    delay?: number;
    direction?: 'up' | 'left' | 'right' | 'none';
    className?: string;
}

const Reveal: React.FC<RevealProps> = ({
    children,
    delay = 0,
    direction = 'up',
    className = '',
}) => {
    const initial = {
        opacity: 0,
        y: direction === 'up' ? 40 : 0,
        x: direction === 'left' ? -40 : direction === 'right' ? 40 : 0,
    };

    return (
        <motion.div
            initial={initial}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
                duration: 0.75,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// ─── Animated gradient line that draws itself in ──────────────────────────────
const DrawLine: React.FC = () => (
    <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: 0 }}
        className="h-[1px] w-full bg-gradient-to-r from-emerald-500/40 via-teal-400/20 to-transparent mb-16"
    />
);

// ─── Animated section badge ───────────────────────────────────────────────────
const SectionBadge: React.FC<{ label: string; delay?: number }> = ({ label, delay = 0 }) => (
    <Reveal delay={delay} direction="up">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-semibold mb-6 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            {label}
        </div>
    </Reveal>
);

const LandingPage: React.FC = () => {
    const { t } = useTranslation();

    // Scroll-driven opacity for the demos section
    const demoRef = useRef<HTMLElement>(null);
    const { scrollYProgress: demoProgress } = useScroll({
        target: demoRef,
        offset: ['start end', 'end start'],
    });
    const demoOpacity = useTransform(demoProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0]);

    return (
        <ReactLenis root options={{ lerp: 0.08, duration: 1.4, smoothWheel: true }}>
            <div className="bg-surface-subtle dark:bg-slate-950 font-sans selection:bg-emerald-500 selection:text-white overflow-x-hidden min-h-screen transition-colors duration-300">
                <Navbar />

                {/* 1. Hero Section */}
                <HeroSection />

                {/* 2. Interactive Demonstrations Section */}
                <motion.section
                    ref={demoRef}
                    style={{ opacity: demoOpacity }}
                    className="py-24 lg:py-32 relative z-10 bg-white dark:bg-slate-950 border-t border-emerald-100 dark:border-slate-800 transition-colors duration-300"
                >
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16 lg:mb-24">
                            <SectionBadge label="Vision Engine" delay={0} />

                            <Reveal delay={0.1}>
                                <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 font-display">
                                    Intelligent Farming,{' '}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400">
                                        Visualized.
                                    </span>
                                </h2>
                            </Reveal>

                            <Reveal delay={0.2}>
                                <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                                    Experience how our AI models track plant vitality and detect anomalies with unparalleled precision.
                                </p>
                            </Reveal>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                            <Reveal direction="left" delay={0.05}>
                                <ParallaxContainer speed={0.1}>
                                    <CropGrowthAnimation />
                                </ParallaxContainer>
                            </Reveal>

                            <Reveal direction="right" delay={0.15}>
                                <ParallaxContainer speed={0.15}>
                                    <PestDetectionPreview />
                                </ParallaxContainer>
                            </Reveal>
                        </div>
                    </div>
                </motion.section>

                {/* Marquee */}
                <Reveal direction="none">
                    <PestDetectionMarquee />
                </Reveal>

                {/* 3. Features Section */}
                <section
                    id="features"
                    className="py-24 lg:py-32 relative bg-surface-subtle dark:bg-slate-950 border-t border-emerald-100 dark:border-slate-800/50 transition-colors duration-300"
                >
                    <div className="max-w-7xl mx-auto px-6 relative z-10">

                        <DrawLine />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
                            {/* Left — existing slideInLeft variant is preserved; Reveal wraps inner text */}
                            <motion.div
                                variants={slideInLeft}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <SectionBadge label="Our Technology" delay={0} />

                                <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-8 font-display leading-[1.2]">
                                    Where technology meets <br />
                                    <span className="text-emerald-600 dark:text-emerald-400 underline decoration-wavy decoration-emerald-500/30 underline-offset-[12px]">
                                        the roots of nature.
                                    </span>
                                </h2>

                                <Reveal delay={0.15}>
                                    <p className="text-slate-600 dark:text-slate-400 text-xl leading-relaxed mb-10 border-l-2 border-emerald-500/50 pl-6 font-light">
                                        Our platform combines cutting-edge computer vision with agronomy expertise to detect crop threats instantly. We verify every scan with 95%+ accuracy.
                                    </p>
                                </Reveal>

                                <div className="grid grid-cols-2 gap-10">
                                    {[
                                        { value: '20k+', label: 'Scans Analyzed' },
                                        { value: '100%', label: 'Free for Farmers' },
                                    ].map((stat, i) => (
                                        <Reveal key={stat.label} delay={0.2 + i * 0.1}>
                                            <h3 className="text-5xl font-extrabold text-slate-900 dark:text-white mb-2 font-display">
                                                {stat.value}
                                            </h3>
                                            <p className="text-emerald-600 dark:text-emerald-500 font-semibold tracking-wider text-xs uppercase">
                                                {stat.label}
                                            </p>
                                        </Reveal>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Right — existing slideInRight is preserved */}
                            <motion.div
                                variants={slideInRight}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="relative group rounded-[2.5rem] p-1 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 dark:to-teal-900/40"
                            >
                                <div className="absolute inset-0 bg-emerald-500/10 rounded-[2.5rem] rotate-3 transform group-hover:rotate-6 transition-transform duration-700 blur-2xl" />
                                <div className="bg-white dark:bg-[#040f0a] rounded-[2.4rem] overflow-hidden relative z-10 border border-emerald-500/20 shadow-[0_0_50px_rgba(4,15,10,0.1)] dark:shadow-[0_0_50px_rgba(4,15,10,0.8)]">
                                    <img
                                        src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=800&auto=format&fit=crop"
                                        alt="Farmer utilizing tech"
                                        className="w-full h-auto transform transition-all duration-1000 group-hover:scale-110 opacity-90 dark:opacity-60 mix-blend-normal dark:mix-blend-luminosity dark:hover:mix-blend-normal hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 dark:from-[#040f0a] dark:via-[#040f0a]/40 to-transparent pointer-events-none" />
                                </div>
                            </motion.div>
                        </div>

                        {/* Feature Cards — staggerContainer is preserved */}
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        >
                            <FeatureCard
                                icon={<CheckCircle size={32} strokeWidth={1.5} />}
                                title="Instant Detection"
                                description="Upload a photo and get results in seconds. Our AI works offline for remote fields."
                                index={0}
                            />
                            <FeatureCard
                                icon={<Shield size={32} strokeWidth={1.5} />}
                                title="Expert Remedies"
                                description="Get actionable advice on organic and chemical treatments to save your crop."
                                index={1}
                            />
                            <FeatureCard
                                icon={<Smartphone size={32} strokeWidth={1.5} />}
                                title="Analytics Dashboard"
                                description="Track your farm's health over time with detailed charts and history logs."
                                index={2}
                            />
                        </motion.div>
                    </div>

                    {/* Background glows */}
                    <div className="absolute top-1/2 left-0 w-[40vw] h-[40vw] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none translate-x-1/3 translate-y-1/3" />
                </section>

                {/* 4. Footer */}
                <Reveal direction="up" delay={0.05}>
                    <footer className="bg-white dark:bg-[#040f0a] text-slate-500 dark:text-slate-400 py-16 border-t border-emerald-100 dark:border-emerald-900/30 relative overflow-hidden transition-colors duration-300">
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
                        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center relative z-10">
                            <div className="mb-8 md:mb-0">
                                <h3 className="text-2xl font-display font-bold tracking-tight mb-2 flex items-center gap-2">
                                    <span className="text-emerald-600 dark:text-emerald-500">Kisaan</span>
                                    <span className="text-slate-900 dark:text-white">Rakshak</span>
                                </h3>
                                <p className="max-w-xs text-sm text-slate-500 font-light">Innovating agriculture for a sustainable future.</p>
                            </div>
                            <div className="flex gap-8 text-sm font-medium">
                                <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300">Privacy Policy</a>
                                <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300">Terms of Service</a>
                                <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300">Contact Us</a>
                            </div>
                        </div>
                    </footer>
                </Reveal>
            </div>
        </ReactLenis>
    );
};

export default LandingPage;
