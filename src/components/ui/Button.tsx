import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends HTMLMotionProps<"button"> {
    isLoading?: boolean;
    variant?: 'primary' | 'outline';
}

const Button: React.FC<ButtonProps> = ({ children, isLoading, variant = 'primary', className, ...props }) => {
    const baseStyles = "relative w-full py-3.5 rounded-full font-bold flex items-center justify-center transition-all duration-300 overflow-hidden group";
    const variants = {
        primary: "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white shadow-lg shadow-green-500/25 hover:shadow-green-500/40 border border-transparent",
        outline: "border-2 border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 backdrop-blur-sm"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`${baseStyles} ${variants[variant]} ${className} disabled:opacity-70 disabled:cursor-not-allowed`}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {/* Shimmer Effect */}
            {variant === 'primary' && (
                <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
            )}

            <span className="relative z-20 flex items-center">
                {isLoading ? <Loader2 className="animate-spin mr-2" /> : <>{children}</>}
            </span>
        </motion.button>
    );
};

export default Button;
