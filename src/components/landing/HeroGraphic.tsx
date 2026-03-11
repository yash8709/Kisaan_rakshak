import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const HeroGraphic: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });

    // Smooth out scroll progress for parallax layers
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 50,
        damping: 20
    });

    const layer1Y = useTransform(smoothProgress, [0, 1], [0, -80]);
    const layer2Y = useTransform(smoothProgress, [0, 1], [0, -40]);
    const layer3Y = useTransform(smoothProgress, [0, 1], [0, -10]);

    return (
        <div ref={containerRef} className="relative w-full h-full min-h-[500px] lg:min-h-[700px] flex items-center justify-center">

            {/* Ambient Background Glow - Massive light green aura to ensure it's not "empty" */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-lime-500/20 rounded-full blur-[120px] pointer-events-none -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-green-400/30 rounded-full blur-[80px] pointer-events-none -z-10" />

            <motion.div
                className="relative w-full max-w-[500px] aspect-square flex items-center justify-center cursor-pointer group"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
            >
                {/* 
                  Layer 1: The Base Rings
                  Adds technical structure around the organic leaf
                */}
                <motion.div
                    style={{ y: layer1Y }}
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, ease: "linear", repeat: Infinity }}
                >
                    <div className="w-[90%] h-[90%] rounded-full border-[1.5px] border-lime-500/20 border-dashed" />
                    <div className="absolute w-[80%] h-[80%] rounded-full border-[1.5px] border-green-500/10 border-dotted" />
                </motion.div>

                {/* 
                  Layer 2: The Core Solid Light-Green Leaves
                  We use three overlapping, solid gradient leaves to create a bold, 3D, glowing shape
                */}
                <motion.div
                    style={{ y: layer2Y }}
                    className="relative w-[70%] h-[70%] flex items-center justify-center"
                >
                    {/* Leaf 1 (Background - Darker Green) */}
                    <motion.div
                        className="absolute w-full h-full opacity-80 mix-blend-screen"
                        animate={{
                            rotate: [-15, -10, -15],
                            scale: [1, 1.05, 1],
                        }}
                        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
                    >
                        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                            <defs>
                                <linearGradient id="leaf1" x1="0%" y1="100%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#064e3b" />
                                    <stop offset="100%" stopColor="#10b981" />
                                </linearGradient>
                            </defs>
                            {/* Organic Leaf Path */}
                            <path d="M 10,90 C 10,40 40,10 90,10 C 90,60 60,90 10,90 Z" fill="url(#leaf1)" />
                        </svg>
                    </motion.div>

                    {/* Leaf 2 (Foreground Left - Vibrant Light Green/Lime) */}
                    <motion.div
                        className="absolute w-[85%] h-[85%] origin-bottom-left mix-blend-screen"
                        animate={{
                            rotate: [5, 15, 5],
                            scale: [1, 1.02, 1],
                        }}
                        transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, delay: 1 }}
                    >
                        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_40px_rgba(163,230,53,0.5)]">
                            <defs>
                                <linearGradient id="leaf2" x1="0%" y1="100%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#16a34a" />
                                    <stop offset="100%" stopColor="#84cc16" />
                                </linearGradient>
                            </defs>
                            <path d="M 10,90 C 10,40 40,10 90,10 C 90,60 60,90 10,90 Z" fill="url(#leaf2)" />
                            {/* Inner Vein Line */}
                            <path d="M 10,90 L 85,15" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </motion.div>

                    {/* Leaf 3 (Foreground Right - Emerald Glowing) */}
                    <motion.div
                        className="absolute w-[75%] h-[75%] origin-bottom-left mix-blend-add"
                        animate={{
                            rotate: [30, 20, 30],
                            scale: [0.95, 1, 0.95],
                        }}
                        transition={{ duration: 7, ease: "easeInOut", repeat: Infinity, delay: 2 }}
                    >
                        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_20px_rgba(52,211,153,0.6)]">
                            <defs>
                                <linearGradient id="leaf3" x1="0%" y1="100%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#059669" />
                                    <stop offset="100%" stopColor="#34d399" />
                                </linearGradient>
                            </defs>
                            <path d="M 10,90 C 10,40 40,10 90,10 C 90,60 60,90 10,90 Z" fill="url(#leaf3)" />
                            <path d="M 10,90 L 85,15" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </motion.div>
                </motion.div>

                {/* 
                  Layer 3: Floating Data Nodes
                  These anchor the nature theme back to "SaaS / AI / Analytics"
                */}
                <motion.div style={{ y: layer3Y }} className="absolute inset-0 pointer-events-none">
                    <motion.div
                        className="absolute top-[15%] left-[10%] flex items-center gap-2 bg-slate-900/90 backdrop-blur-md border border-lime-500/30 px-3 py-2 rounded-xl text-xs font-mono text-lime-400 shadow-[0_0_20px_rgba(132,204,22,0.2)]"
                        animate={{ y: [-5, 5, -5], opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    >
                        <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" /> AI Growth Model
                    </motion.div>

                    <motion.div
                        className="absolute bottom-[20%] right-[5%] flex items-center gap-2 bg-slate-900/90 backdrop-blur-md border border-emerald-500/30 px-3 py-2 rounded-xl text-xs font-mono text-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.2)]"
                        animate={{ y: [5, -5, 5], opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 5, delay: 0.5, repeat: Infinity }}
                    >
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Biomass Optimal
                    </motion.div>
                </motion.div>

                {/* Particle Dust (Hover / Ambient) */}
                <div className="absolute inset-0 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700">
                    <motion.div
                        className="absolute top-1/4 right-1/4 w-1.5 h-1.5 bg-lime-200 rounded-full shadow-[0_0_10px_rgba(217,249,157,1)]"
                        animate={{ y: -60, x: 20, opacity: [0, 1, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                    />
                    <motion.div
                        className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-green-300 rounded-full shadow-[0_0_10px_rgba(134,239,172,1)]"
                        animate={{ y: -80, x: -30, opacity: [0, 1, 0] }}
                        transition={{ duration: 4, delay: 0.3, repeat: Infinity, ease: "easeOut" }}
                    />
                    <motion.div
                        className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-emerald-300 rounded-full shadow-[0_0_10px_rgba(110,231,183,1)]"
                        animate={{ y: -50, x: 40, opacity: [0, 1, 0] }}
                        transition={{ duration: 2.5, delay: 0.7, repeat: Infinity, ease: "easeOut" }}
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default HeroGraphic;
