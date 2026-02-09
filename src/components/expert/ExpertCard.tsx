import React from 'react';
import { Star, MessageCircle, Phone, Video } from 'lucide-react';
import { motion } from 'framer-motion';

export interface Expert {
    id: string;
    name: string;
    specialty: string;
    experience: string;
    rating: number;
    image: string;
    available: boolean;
    language: string;
}

interface ExpertCardProps {
    expert: Expert;
    onConnect: (expert: Expert, type: 'chat' | 'call' | 'video') => void;
}

const ExpertCard: React.FC<ExpertCardProps> = ({ expert, onConnect }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-surface-dark-subtle rounded-3xl p-6 shadow-card border border-surface-subtle dark:border-white/5 flex flex-col items-center text-center transition-all hover:shadow-card-hover"
        >
            <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-green-50 dark:border-green-900/30">
                    <img src={expert.image} alt={expert.name} className="w-full h-full object-cover" />
                </div>
                {expert.available && (
                    <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full" title="Available Now"></div>
                )}
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{expert.name}</h3>
            <p className="text-green-600 dark:text-green-400 font-medium text-sm mb-2">{expert.specialty}</p>

            <div className="flex items-center gap-2 mb-4 text-sm text-gray-500 dark:text-gray-400">
                <span>{expert.experience} exp</span>
                <span>•</span>
                <div className="flex items-center text-yellow-500">
                    <Star size={14} fill="currentColor" />
                    <span className="ml-1 text-gray-700 dark:text-gray-300 font-semibold">{expert.rating}</span>
                </div>
            </div>

            <div className="w-full space-y-2 mt-auto">
                <button
                    onClick={() => onConnect(expert, 'chat')}
                    className="w-full py-2.5 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-300 dark:hover:bg-green-900/40 font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                    <MessageCircle size={18} /> Chat
                </button>
                <div className="flex gap-2">
                    <button
                        onClick={() => onConnect(expert, 'call')}
                        className="flex-1 py-2.5 rounded-xl bg-gray-50 text-gray-700 hover:bg-gray-100 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10 font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                        <Phone size={18} /> Call
                    </button>
                    <button
                        onClick={() => onConnect(expert, 'video')}
                        className="flex-1 py-2.5 rounded-xl bg-gray-50 text-gray-700 hover:bg-gray-100 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10 font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                        <Video size={18} /> Video
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ExpertCard;
