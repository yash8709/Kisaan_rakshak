import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const ParticleBackground: React.FC = () => {
    // Generate static particle definitions to avoid hydration mismatches
    // and prevent re-rendering loops
    const particles = useMemo(() => {
        return Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            size: Math.random() * 4 + 2, // 2px to 6px
            delay: Math.random() * 5,
            duration: Math.random() * 10 + 15, // 15s to 25s
            xStart: Math.random() * 100, // 0vw to 100vw
            xEnd: Math.random() * 100,
            color: ['bg-green-500', 'bg-emerald-400', 'bg-teal-500'][Math.floor(Math.random() * 3)],
        }));
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className={`absolute rounded-full ${p.color} blur-[1px] opacity-20`}
                    style={{
                        width: p.size,
                        height: p.size,
                        left: `${p.xStart}%`,
                        top: '110%',
                    }}
                    animate={{
                        y: ['0vh', '-120vh'], // Move all the way up and offscreen
                        x: [`0vw`, `${(p.xEnd - p.xStart) * 0.5}vw`], // Gentle horizontal drift
                        opacity: [0, 0.3, 0], // Fade in and out
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    );
};

export default ParticleBackground;
