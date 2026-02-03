import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends HTMLMotionProps<"button"> {
    isLoading?: boolean;
    variant?: 'primary' | 'outline';
}

const Button: React.FC<ButtonProps> = ({ children, isLoading, variant = 'primary', className, ...props }) => {
    const baseStyles = "w-full py-3 rounded-full font-bold flex items-center justify-center transition-all duration-300";
    const variants = {
        primary: "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white shadow-lg hover:shadow-green-500/30",
        outline: "border-2 border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`${baseStyles} ${variants[variant]} ${className} disabled:opacity-70 disabled:cursor-not-allowed`}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? <Loader2 className="animate-spin mr-2" /> : children}
        </motion.button>
    );
};

export default Button;
