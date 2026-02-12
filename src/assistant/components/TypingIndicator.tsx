import React from 'react';
import { motion } from 'framer-motion';

const TypingIndicator: React.FC = () => {
    return (
        <div className="flex justify-start w-full mb-4">
            <div className="flex items-center gap-2 bg-white dark:bg-surface-dark-subtle rounded-2xl rounded-bl-none px-4 py-3 border border-gray-100 dark:border-white/10 shadow-sm">
                <span className="text-xs text-gray-400 font-medium mr-1">AI Thinking</span>
                <div className="flex space-x-1">
                    {[0, 1, 2].map((dot) => (
                        <motion.div
                            key={dot}
                            className="w-1.5 h-1.5 bg-agri-green rounded-full"
                            animate={{ y: [0, -4, 0] }}
                            transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: dot * 0.2
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TypingIndicator;
