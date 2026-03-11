import React from 'react';
import { motion } from 'framer-motion';

interface SimpleMarqueeProps {
    children: React.ReactNode;
    direction?: 'left' | 'right';
    speed?: number;
    pauseOnHover?: boolean;
}

const SimpleMarquee: React.FC<SimpleMarqueeProps> = ({
    children,
    direction = 'left',
    speed = 40,
    pauseOnHover = true,
}) => {
    return (
        <div className="flex overflow-hidden group">
            <motion.div
                className="flex shrink-0 min-w-full"
                animate={{
                    x: direction === 'left' ? ['0%', '-100%'] : ['-100%', '0%'],
                }}
                transition={{
                    duration: speed,
                    ease: 'linear',
                    repeat: Infinity,
                }}
            // The hover slowing effect is added here by applying a paused/slowed state
            // when hovered, relying on CSS or framer-motion variants below.
            // A simpler way with vanilla CSS is adding a class to slow down the animation.
            >
                <div className={`flex w-max shrink-0 ${pauseOnHover ? 'group-hover:animate-marquee-slow' : ''}`}>
                    {children}
                </div>
            </motion.div>
            {/* Duplicate for infinite seamless scrolling */}
            <motion.div
                className="flex shrink-0 min-w-full"
                animate={{
                    x: direction === 'left' ? ['0%', '-100%'] : ['-100%', '0%'],
                }}
                transition={{
                    duration: speed,
                    ease: 'linear',
                    repeat: Infinity,
                }}
            >
                <div className={`flex w-max shrink-0 ${pauseOnHover ? 'group-hover:animate-marquee-slow' : ''}`}>
                    {children}
                </div>
            </motion.div>
        </div>
    );
};

export default SimpleMarquee;
