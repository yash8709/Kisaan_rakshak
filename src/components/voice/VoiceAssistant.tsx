import React, { useEffect, useState } from 'react';
import { useSpeechToText } from '../../hooks/useSpeechToText';
import { useTextToSpeech } from '../../hooks/useTextToSpeech';
import { Mic, MicOff, X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const VoiceAssistant: React.FC = () => {
    const { isListening, transcript, startListening, stopListening, supported } = useSpeechToText();
    const { speak, cancel, isSpeaking } = useTextToSpeech();
    const [isOpen, setIsOpen] = useState(false);
    const [response, setResponse] = useState('');
    const navigate = useNavigate();

    // Initial Greeting
    useEffect(() => {
        if (isOpen && !isSpeaking) {
            speak("Hello farmer! How can I help you today?");
            setResponse("Hello farmer! How can I help you today?");
        } else if (!isOpen) {
            cancel();
            stopListening();
        }
    }, [isOpen]);

    // Handle Transcript
    useEffect(() => {
        if (transcript) {
            processCommand(transcript.toLowerCase());
        }
    }, [transcript]);

    const processCommand = (command: string) => {
        let reply = "I'm sorry, I didn't catch that.";

        if (command.includes('weather') || command.includes('forecast')) {
            reply = "Checking the weather for you.";
            // Logic to actually trigger weather check or navigate could be added
        } else if (command.includes('detect') || command.includes('scan') || command.includes('pest')) {
            reply = "Opening pest detection scanner.";
            navigate('/detect');
        } else if (command.includes('dashboard') || command.includes('home')) {
            reply = "Going to dashboard.";
            navigate('/dashboard');
        } else if (command.includes('history') || command.includes('record')) {
            reply = "Opening your scan history.";
            navigate('/dashboard'); // Assuming history is on dashboard for now or new page
        } else if (command.includes('hello') || command.includes('hi')) {
            reply = "Hello! I am Kisaan Rakshak. Ask me to scan a plant or check the weather.";
        }

        setResponse(reply);
        speak(reply);
    };

    if (!supported) return null; // Don't render if not supported

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl mb-4 w-80 border border-gray-200 dark:border-gray-700 pointer-events-auto relative overflow-hidden"
                    >
                        {/* Visualizer Background */}
                        {isListening && (
                            <div className="absolute inset-0 bg-green-500/5 flex items-end justify-center gap-1 pb-1">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ height: [10, 40, 10] }}
                                        transition={{ repeat: Infinity, duration: 0.5 + i * 0.1 }}
                                        className="w-2 bg-green-500/20 rounded-full"
                                    />
                                ))}
                            </div>
                        )}

                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <h3 className="font-bold text-lg dark:text-white flex items-center gap-2">
                                <span className="text-2xl">🤖</span> Kisaan AI
                            </h3>
                            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="min-h-[80px] mb-4 relative z-10">
                            {transcript ? (
                                <p className="text-gray-600 dark:text-gray-300 italic">"{transcript}"</p>
                            ) : (
                                <p className="text-gray-800 dark:text-gray-100 font-medium">{response}</p>
                            )}
                        </div>

                        <div className="flex justify-center relative z-10">
                            <button
                                onClick={isListening ? stopListening : startListening}
                                className={`p-4 rounded-full transition-all shadow-lg ${isListening
                                        ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                                        : 'bg-green-600 hover:bg-green-700 text-white'
                                    }`}
                            >
                                {isListening ? <MicOff size={24} /> : <Mic size={24} />}
                            </button>
                        </div>
                        {isListening && <p className="text-center text-xs text-gray-400 mt-2 relative z-10">Listening...</p>}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-xl pointer-events-auto flex items-center justify-center"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </motion.button>
        </div>
    );
};

export default VoiceAssistant;
