import React from 'react';
import { motion } from 'framer-motion';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
    return (
        <div className="relative mb-6">
            <input
                {...props}
                className="peer w-full bg-transparent border-b-2 border-gray-300 dark:border-gray-600 px-0 py-2 focus:outline-none focus:border-green-500 dark:focus:border-green-400 transition-colors text-gray-900 dark:text-white placeholder-transparent"
                placeholder={label}
            />
            <label className="absolute left-0 -top-3.5 text-sm text-green-600 dark:text-green-400 transition-all 
        peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 
        peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-green-600 dark:peer-focus:text-green-400">
                {label}
            </label>
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs mt-1 absolute"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
};

export default Input;
