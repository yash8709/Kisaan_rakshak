import React from 'react';
import { Mic, MicOff, Volume2, Square } from 'lucide-react';
import { motion } from 'framer-motion';

interface VoiceControlsProps {
    isListening: boolean;
    isSpeaking: boolean;
    onMicClick: () => void;
    onStopSpeakClick: () => void;
}

const VoiceControls: React.FC<VoiceControlsProps> = ({ isListening, isSpeaking, onMicClick, onStopSpeakClick }) => {
    return (
        <div className="flex items-center gap-2">
            {isSpeaking && (
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    onClick={onStopSpeakClick}
                    className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full hover:bg-red-200"
                    title="Stop Speaking"
                >
                    <Square size={20} fill="currentColor" />
                </motion.button>
            )}

            <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onMicClick}
                className={`p-4 rounded-full transition-all shadow-lg flex items-center justify-center relative ${isListening
                        ? 'bg-red-500 text-white shadow-red-500/40'
                        : 'bg-agri-green text-white shadow-green-500/30 hover:bg-emerald-600'
                    }`}
            >
                {isListening ? <MicOff size={24} /> : <Mic size={24} />}

                {/* Visualizer Ring when listening */}
                {isListening && (
                    <span className="absolute inset-0 rounded-full border-4 border-white/30 animate-ping"></span>
                )}
            </motion.button>
        </div>
    );
};

export default VoiceControls;
