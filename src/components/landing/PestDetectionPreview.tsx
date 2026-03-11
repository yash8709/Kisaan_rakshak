import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ScanLine, ShieldAlert, CheckCircle2, ChevronRight, Activity } from 'lucide-react';

const PestDetectionPreview: React.FC = () => {
    const [step, setStep] = useState<0 | 1 | 2>(0); // 0: Upload, 1: Scanning, 2: Result

    // Simulate an automated demo loop for visual interest
    useEffect(() => {
        let isHovered = false; // Add hover detection later if needed, simple loop for now

        const loop = async () => {
            while (true) {
                setStep(0);
                await new Promise(resolve => setTimeout(resolve, 3000));

                setStep(1);
                await new Promise(resolve => setTimeout(resolve, 2500));

                setStep(2);
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
        };

        const runner = loop();
        return () => { /* Cleanup not strictly needed for this visual infinite async loop */ };
    }, []);

    return (
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-[2.5rem] p-6 lg:p-8 shadow-2xl relative group overflow-hidden h-full min-h-[400px] flex flex-col">

            {/* Header */}
            <div className="flex items-center justify-between mb-8 z-10">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400">
                        <Activity size={24} />
                    </div>
                    <div>
                        <h3 className="text-white font-bold leading-tight">Vision Engine</h3>
                        <p className="text-slate-400 text-xs">Live Detection Demo</p>
                    </div>
                </div>
                <div className="flex gap-1.5">
                    <div className={`w-2 h-2 rounded-full transition-colors ${step === 0 ? 'bg-emerald-400' : 'bg-slate-700'}`} />
                    <div className={`w-2 h-2 rounded-full transition-colors ${step === 1 ? 'bg-yellow-400' : 'bg-slate-700'}`} />
                    <div className={`w-2 h-2 rounded-full transition-colors ${step === 2 ? 'bg-red-400' : 'bg-slate-700'}`} />
                </div>
            </div>

            {/* Interactive Stage Area */}
            <div className="flex-1 relative bg-slate-800/50 border border-slate-700 rounded-3xl overflow-hidden flex flex-col">

                <AnimatePresence mode="wait">
                    {/* STAGE 0: UPLOAD */}
                    {step === 0 && (
                        <motion.div
                            key="upload"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center border-2 border-dashed border-slate-600 m-4 rounded-2xl"
                        >
                            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 mb-4 group-hover:scale-110 transition-transform">
                                <Camera size={32} />
                            </div>
                            <p className="text-slate-300 font-medium font-display text-lg">Auto-Simulating Upload...</p>
                        </motion.div>
                    )}

                    {/* STAGE 1: SCANNING */}
                    {step === 1 && (
                        <motion.div
                            key="scan"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center"
                        >
                            {/* Scanning Overlay Grid */}
                            <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply" />
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

                            {/* Scanning Laser */}
                            <motion.div
                                animate={{ top: ['0%', '100%', '0%'] }}
                                transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                                className="absolute left-0 right-0 h-1 bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)] z-20"
                            >
                                <div className="absolute inset-0 w-full h-8 -top-8 bg-gradient-to-t from-emerald-500/40 to-transparent" />
                            </motion.div>

                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-700 flex items-center gap-2 z-30">
                                <ScanLine size={16} className="text-emerald-400 animate-pulse" />
                                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Analyzing Pixels...</span>
                            </div>
                        </motion.div>
                    )}

                    {/* STAGE 2: RESULT */}
                    {step === 2 && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex flex-col"
                        >
                            <div className="h-40 bg-[url('https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                                {/* Bounding Box Highlight */}
                                <motion.div
                                    initial={{ scale: 1.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: "spring", delay: 0.2 }}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-red-500 bg-red-500/20 rounded-lg flex items-start justify-end p-1"
                                >
                                    <ShieldAlert size={16} className="text-red-500" />
                                </motion.div>
                            </div>

                            <div className="flex-1 bg-slate-900 p-5 rounded-t-3xl border-t border-slate-700 -mt-6 relative z-10 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-lg font-bold text-white flex items-center gap-2">
                                            <span className="w-3 h-3 rounded-full bg-red-500"></span>
                                            Early Blight
                                        </h4>
                                        <span className="text-xs font-bold px-2 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700">98.2% Match</span>
                                    </div>
                                    <p className="text-sm text-slate-400 mb-4 line-clamp-2">Alternaria solani fungal infection detected. High immediate priority.</p>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    className="w-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                                >
                                    <CheckCircle2 size={16} /> View Treatment Plan
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default PestDetectionPreview;
