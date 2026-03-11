import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, Leaf, Sun, Droplets } from 'lucide-react';

const GrowthStage = ({ icon: Icon, delay, active }: { icon: any, delay: number, active: boolean }) => (
    <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay, type: "spring", stiffness: 100 }}
        className="relative flex flex-col items-center"
    >
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500
            ${active ? 'bg-gradient-to-br from-emerald-400 to-green-600 shadow-neon border border-emerald-300/50 text-white' : 'bg-slate-800 border border-slate-700 text-slate-400'}`}
        >
            <Icon size={32} />
        </div>
        {active && (
            <motion.div
                className="absolute inset-0 bg-emerald-400/30 rounded-2xl blur-md -z-10"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
            />
        )}
    </motion.div>
);

const CropGrowthAnimation: React.FC = () => {
    return (
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/5 rounded-full blur-[80px]" />

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-10">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2 font-display">AI Growth Tracking</h3>
                        <p className="text-slate-400 text-sm">Monitor crop vitality from seed to harvest.</p>
                    </div>
                    <div className="flex gap-2">
                        <div className="p-2 bg-slate-800 rounded-lg text-yellow-400"><Sun size={20} /></div>
                        <div className="p-2 bg-slate-800 rounded-lg text-blue-400"><Droplets size={20} /></div>
                    </div>
                </div>

                <div className="relative pb-4">
                    {/* Connecting Line */}
                    <div className="absolute top-8 left-8 right-8 h-1 bg-slate-800 rounded-full z-0 overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-emerald-500 to-green-400"
                            initial={{ width: "0%" }}
                            whileInView={{ width: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
                        />
                    </div>

                    <div className="flex justify-between items-center relative z-10 px-2 lg:px-4">
                        <GrowthStage icon={Sprout} delay={0.2} active={true} />
                        <GrowthStage icon={Sprout} delay={0.8} active={true} />
                        <GrowthStage icon={Leaf} delay={1.4} active={true} />
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 2.0, type: "spring" }}
                            className="w-16 h-16 rounded-2xl bg-slate-800 border-2 border-dashed border-emerald-500/30 flex items-center justify-center text-emerald-500/50 uppercase text-[10px] font-bold text-center leading-tight"
                        >
                            Harvest<br />Ready
                        </motion.div>
                    </div>
                </div>

                {/* Simulated AI Output */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 2.2 }}
                    className="mt-8 bg-slate-800/50 border border-emerald-500/20 rounded-xl p-4 flex items-center gap-4"
                >
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-sm text-slate-300"><span className="text-emerald-400 font-bold">Status:</span> Optimal growth detected. Next stage in ~12 days.</p>
                </motion.div>
            </div>
        </div>
    );
};

export default CropGrowthAnimation;
