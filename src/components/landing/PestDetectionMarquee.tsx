import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { pestDetectionImages } from '../../utils/constants';
import { Scan, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface MarqueeRowProps {
    images: string[];
    direction?: 'left' | 'right';
    speed?: number;
    /** Extra vertical translate so rows feel slightly offset on scroll */
    scrollY: any;
    parallaxFactor?: number;
}

const getBadgeContent = (index: number) => {
    const types = [
        { text: 'Analyzed', icon: <CheckCircle2 size={12} className="text-emerald-500 dark:text-emerald-400" />, color: 'emerald' },
        { text: 'Scanning', icon: <Scan size={12} className="text-teal-500 dark:text-teal-400" />, color: 'teal', animate: true },
        { text: 'Detected', icon: <ShieldAlert size={12} className="text-rose-500 dark:text-rose-400" />, color: 'rose' },
    ];
    return types[index % types.length];
};

// ─── Single card ──────────────────────────────────────────────────────────────
const MarqueeCard: React.FC<{ src: string; index: number; keyPrefix: string }> = ({
    src,
    index,
    keyPrefix,
}) => {
    const badge = getBadgeContent(index);

    return (
        <div
            key={`${keyPrefix}-${index}`}
            className="relative w-48 h-32 sm:w-64 sm:h-44 md:w-80 md:h-52 rounded-2xl overflow-hidden shadow-lg shrink-0 group/card bg-white dark:bg-slate-800 border dark:border-none border-emerald-100"
        >
            <img
                src={src}
                alt={`Agritech sample ${index}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110 opacity-90 dark:opacity-80 group-hover/card:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 dark:from-slate-950/80 via-transparent to-transparent pointer-events-none transition-colors duration-300" />

            {/* Bounding box */}
            <div className="absolute inset-0 border-[1.5px] border-emerald-500/0 group-hover/card:border-emerald-500/50 transition-colors duration-500 rounded-2xl z-20 pointer-events-none" />

            {/* Targeting corners */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-emerald-500 dark:border-emerald-400 opacity-0 group-hover/card:opacity-100 transition-all duration-300 -translate-x-2 -translate-y-2 group-hover/card:translate-x-0 group-hover/card:translate-y-0 z-20" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-emerald-500 dark:border-emerald-400 opacity-0 group-hover/card:opacity-100 transition-all duration-300 translate-x-2 -translate-y-2 group-hover/card:translate-x-0 group-hover/card:translate-y-0 z-20" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-emerald-500 dark:border-emerald-400 opacity-0 group-hover/card:opacity-100 transition-all duration-300 -translate-x-2 translate-y-2 group-hover/card:translate-x-0 group-hover/card:translate-y-0 z-20" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-emerald-500 dark:border-emerald-400 opacity-0 group-hover/card:opacity-100 transition-all duration-300 translate-x-2 translate-y-2 group-hover/card:translate-x-0 group-hover/card:translate-y-0 z-20" />

            {/* AI status badge */}
            <div
                className={`absolute bottom-4 left-4 flex items-center gap-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-lg px-2.5 py-1.5 border border-${badge.color}-500/30 opacity-0 group-hover/card:opacity-100 transition-all duration-500 translate-y-4 group-hover/card:translate-y-0 z-20 shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(0,0,0,0.5)]`}
            >
                {(badge as any).animate ? (
                    <span className={`w-1.5 h-1.5 rounded-full bg-${badge.color}-500 dark:bg-${badge.color}-400 animate-pulse`} />
                ) : (
                    badge.icon
                )}
                <span
                    className={`text-[10px] sm:text-xs font-mono text-${badge.color}-600 dark:text-${badge.color}-300 uppercase tracking-wider font-semibold`}
                >
                    {badge.text}
                </span>
            </div>
        </div>
    );
};

// ─── Marquee row ──────────────────────────────────────────────────────────────
const MarqueeRow: React.FC<MarqueeRowProps> = ({
    images,
    direction = 'left',
    speed = 40,
    scrollY,
    parallaxFactor = 0,
}) => {
    // Optional gentle vertical parallax per row
    const rowY = useTransform(scrollY, [0, 1], [`${parallaxFactor * -30}px`, `${parallaxFactor * 30}px`]);

    return (
        <motion.div
            style={{ y: rowY }}
            className="flex gap-4 sm:gap-6 overflow-hidden w-full group py-4"
        >
            <motion.div
                className="flex shrink-0 gap-4 sm:gap-6"
                animate={{ x: direction === 'left' ? ['0%', '-100%'] : ['-100%', '0%'] }}
                transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
            >
                {images.map((src, i) => (
                    <MarqueeCard key={`first-${i}`} src={src} index={i} keyPrefix="first" />
                ))}
                {images.map((src, i) => (
                    <MarqueeCard key={`second-${i}`} src={src} index={i} keyPrefix="second" />
                ))}
            </motion.div>
        </motion.div>
    );
};

// ─── Section ──────────────────────────────────────────────────────────────────
const PestDetectionMarquee: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    // Smooth spring for parallax rows
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 18 });

    // Fade the whole section in as it enters the viewport
    const sectionOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

    const row1 = pestDetectionImages.slice(0, 5);
    const row2 = pestDetectionImages.slice(5, 10);
    const row3 = pestDetectionImages.slice(10, 15);

    return (
        <motion.section
            ref={sectionRef}
            style={{ opacity: sectionOpacity }}
            className="relative bg-emerald-50 dark:bg-[#040f0a] py-32 overflow-hidden border-t border-emerald-100 dark:border-slate-800 transition-colors duration-300"
        >
            {/* Background ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-100/50 dark:bg-emerald-950/20 blur-[150px] pointer-events-none z-0 transition-colors" />

            {/* Section header */}
            <div className="max-w-7xl mx-auto px-6 mb-20 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-semibold mb-6 backdrop-blur-md"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    Real-Time Analysis Gallery
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 28, filter: 'blur(4px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white font-display mb-6 tracking-tight"
                >
                    Visual Intelligence at{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-400">
                        Scale
                    </span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed"
                >
                    Kisaan Rakshak processes thousands of field images daily. Hover over any scan to view live detection telemetry and analysis status.
                </motion.p>
            </div>

            {/* Edge fades */}
            <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 z-30 bg-gradient-to-r from-emerald-50 dark:from-[#040f0a] to-transparent pointer-events-none transition-colors duration-300" />
            <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 z-30 bg-gradient-to-l from-emerald-50 dark:from-[#040f0a] to-transparent pointer-events-none transition-colors duration-300" />

            {/* Marquee rows — each gets a subtle different parallax factor */}
            <div className="flex flex-col gap-4 sm:gap-6 relative z-10">
                <MarqueeRow images={row1} direction="left"  speed={45} scrollY={smoothProgress} parallaxFactor={0.4} />
                <MarqueeRow images={row2} direction="right" speed={55} scrollY={smoothProgress} parallaxFactor={-0.2} />
                <MarqueeRow images={row3} direction="left"  speed={50} scrollY={smoothProgress} parallaxFactor={0.3} />
            </div>
        </motion.section>
    );
};

export default PestDetectionMarquee;
