import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, MessageCircle, Mic } from 'lucide-react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
// import VoiceControls from './VoiceControls'; // Unused, keeping comment or removing line
import { useAssistant } from '../hooks/useAssistant';
import { useVoice } from '../hooks/useVoice';

const ChatWindow: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const { state, sendMessage } = useAssistant();
    const { transcript } = useVoice();
    const [inputValue, setInputValue] = React.useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-fill transcript
    useEffect(() => {
        if (transcript) {
            setInputValue(transcript);
        }
    }, [transcript]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [state.messages, isOpen]);

    const handleSend = () => {
        if (!inputValue.trim()) return;
        sendMessage(inputValue);
        setInputValue('');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Floating Toggle Button */}
            {!isOpen && (
                <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 md:bottom-10 md:right-10 w-16 h-16 bg-agri-green text-white rounded-full shadow-2xl flex items-center justify-center z-50 border-4 border-white dark:border-gray-800"
                >
                    <MessageCircle size={32} />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></span>
                </motion.button>
            )}

            {/* Main Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.9 }}
                        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] bg-surface-light dark:bg-surface-dark backdrop-blur-xl rounded-3xl shadow-2xl border border-surface-subtle dark:border-white/10 z-50 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-agri-dark text-white p-4 flex justify-between items-center shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                    <span className="text-2xl">🤖</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Kisaan Assistant</h3>
                                    <p className="text-xs text-green-200 flex items-center gap-1">
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                        Online
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 bg-surface-subtle/50 dark:bg-black/20">
                            {state.messages.map((msg) => (
                                <MessageBubble key={msg.id} message={msg} />
                            ))}
                            {state.isLoading && <TypingIndicator />}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-surface-light dark:bg-surface-dark border-t border-surface-subtle dark:border-white/5 shrink-0">
                            <div className="relative flex items-center gap-2">
                                <button className="p-3 text-text-secondary dark:text-gray-400 hover:bg-surface-subtle dark:hover:bg-white/5 rounded-full transition-colors">
                                    <Mic size={20} />
                                </button>

                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="Ask anything about farming..."
                                    className="flex-1 bg-surface-subtle dark:bg-black/20 border border-transparent focus:border-agri-green rounded-full px-5 py-3 text-text-primary dark:text-white placeholder:text-gray-400 focus:outline-none transition-all"
                                />

                                <button
                                    onClick={handleSend}
                                    disabled={!inputValue.trim() || state.isLoading}
                                    className="p-3 bg-agri-green text-white rounded-full hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-green-500/20"
                                >
                                    <Send size={20} />
                                </button>
                            </div>
                            <div className="text-center mt-2">
                                <span className="text-[10px] text-gray-400 uppercase tracking-widest">Powered by Google Gemini</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatWindow;
