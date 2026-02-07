import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    icon?: React.ReactNode;
    error?: string;
}

const AuthInput: React.FC<AuthInputProps> = ({ label, icon, type = "text", error, ...props }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className="relative mb-6">
            <div className={`relative flex items-center bg-gray-50 dark:bg-white/10 border-2 rounded-xl transition-all duration-300 ${error
                ? 'border-red-400 bg-red-50 dark:bg-red-900/10'
                : isFocused ? 'border-agri-green shadow-lg shadow-green-500/10' : 'border-gray-200 dark:border-white/10'
                }`}>
                {/* Icon */}
                {icon && (
                    <div className={`pl-4 ${isFocused ? 'text-agri-green' : 'text-gray-400'}`}>
                        {icon}
                    </div>
                )}

                <input
                    {...props}
                    type={inputType}
                    className="w-full bg-transparent px-4 py-4 pt-5 pb-2 outline-none text-text-primary dark:text-white font-medium placeholder-transparent z-10 
                    focus:ring-0
                    transition-colors
                    [transition-delay:9999s]
                    dark:[&:-webkit-autofill]:shadow-[0_0_0_1000px_transparent_inset]
                    [&:-webkit-autofill]:shadow-[0_0_0_1000px_transparent_inset]
                    [&:-webkit-autofill]:-webkit-text-fill-color:black dark:[&:-webkit-autofill]:-webkit-text-fill-color:white"
                    onFocus={() => setIsFocused(true)}
                    onBlur={(e) => {
                        setIsFocused(false);
                        setHasValue(e.target.value.length > 0);
                        props.onBlur?.(e);
                    }}
                    onChange={(e) => {
                        setHasValue(e.target.value.length > 0);
                        props.onChange?.(e);
                    }}
                />

                {/* Floating Label */}
                <motion.label
                    initial={false}
                    animate={{
                        y: isFocused || hasValue || props.value ? -10 : 0,
                        scale: isFocused || hasValue || props.value ? 0.75 : 1,
                        x: icon ? 0 : 0
                    }}
                    className={`absolute left-0 pointer-events-none transition-colors duration-300 ${icon ? 'ml-12' : 'ml-4'
                        } ${isFocused || hasValue || props.value
                            ? 'text-agri-green font-bold'
                            : 'text-gray-400 dark:text-gray-400'
                        }`}
                >
                    {label}
                </motion.label>

                {/* Password Toggle */}
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="pr-4 text-gray-400 hover:text-text-primary dark:hover:text-white transition-colors cursor-pointer z-20"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                )}
            </div>

            {/* Error Message */}
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs mt-1 ml-2 font-medium"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
};

export default AuthInput;
