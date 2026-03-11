import React from 'react';
import { motion } from 'framer-motion';

interface BreathingTextProps {
    children: string;
    staggerDuration?: number;
    fromFontVariationSettings: string;
    toFontVariationSettings: string;
    className?: string;
    delayOffset?: number;
}

const BreathingText: React.FC<BreathingTextProps> = ({
    children,
    staggerDuration = 0.08,
    fromFontVariationSettings,
    toFontVariationSettings,
    className = '',
    delayOffset = 0,
}) => {
    const letters = children.split('');

    return (
        <div className={`flex ${className}`}>
            {letters.map((letter, i) => (
                <motion.span
                    key={i}
                    animate={{
                        fontVariationSettings: [fromFontVariationSettings, toFontVariationSettings, fromFontVariationSettings],
                        // Adding a standard 100 to 800 interpolation as a safe fallback 
                        // if the font doesn't natively support fontVariationSettings
                        fontWeight: [100, 800, 100],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: delayOffset + i * staggerDuration,
                        ease: "easeInOut",
                    }}
                    style={{ whiteSpace: "pre" }}
                >
                    {letter}
                </motion.span>
            ))}
        </div>
    );
};

export default BreathingText;
