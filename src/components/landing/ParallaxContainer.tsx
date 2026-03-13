import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxContainerProps {
    children: React.ReactNode;
    speed?: number; // 0 to 1, higher is faster
    className?: string;
}

const ParallaxContainer: React.FC<ParallaxContainerProps> = ({ children, speed = 0.5, className = "" }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        // Check once on mount
        checkMobile();
        
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

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
    const activeSpeed = isMobile ? 0 : speed;
    const yRange = useTransform(springProgress, [0, 1], [`-${activeSpeed * 100}px`, `${activeSpeed * 100}px`]);

    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`}>
            <motion.div style={{ y: yRange }} className="w-full h-full relative z-10">
                {children}
            </motion.div>
        </div>
    );
};

export default ParallaxContainer;
