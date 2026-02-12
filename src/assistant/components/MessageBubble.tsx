import React from 'react';
import { motion } from 'framer-motion';
import { User, Sprout } from 'lucide-react';
import { ChatMessage } from '../types/assistant.types';

interface MessageBubbleProps {
    message: ChatMessage;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
    const isUser = message.role === 'user';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}
        >
            <div className={`flex max-w-[85%] md:max-w-[75%] items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 
                    ${isUser ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300' : 'bg-agri-green text-white shadow-lg shadow-green-500/30'}`}>
                    {isUser ? <User size={16} /> : <Sprout size={16} />}
                </div>

                {/* Bubble */}
                <div className={`px-5 py-3 rounded-2xl text-sm md:text-base leading-relaxed shadow-sm
                    ${isUser
                        ? 'bg-indigo-600 text-white rounded-br-none'
                        : 'bg-white dark:bg-surface-dark-subtle text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-white/10 rounded-bl-none'
                    }`}>
                    {message.text}
                </div>
            </div>
        </motion.div>
    );
};

export default MessageBubble;
