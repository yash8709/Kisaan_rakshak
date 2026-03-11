import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxContainerProps {
    children: React.ReactNode;
    speed?: number; // 0 to 1, higher is faster
    className?: string;
}

const ParallaxContainer: React.FC<ParallaxContainerProps> = ({ children, speed = 0.5, className = "" }) => {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // We use a spring to make the scroll movement feel fluid and less jumpy
    const springProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Map the scroll progress to a physical Y translation
    const yRange = useTransform(springProgress, [0, 1], [`-${speed * 100}px`, `${speed * 100}px`]);

    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`}>
            <motion.div style={{ y: yRange }} className="w-full h-full relative z-10">
                {children}
            </motion.div>
        </div>
    );
};

export default ParallaxContainer;
