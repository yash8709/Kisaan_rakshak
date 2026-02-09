import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ExpertCard, { Expert } from '../components/expert/ExpertCard';
import expertsData from '../data/experts.json';
import { Search, Filter, MessageSquare, PhoneCall } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ExpertConnectPage: React.FC = () => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
    const [connectionType, setConnectionType] = useState<'chat' | 'call' | 'video' | null>(null);

    const filteredExperts = expertsData.filter(expert =>
        expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expert.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expert.language.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleConnect = (expert: Expert, type: 'chat' | 'call' | 'video') => {
        setSelectedExpert(expert);
        setConnectionType(type);
        // In a real app, this would open a modal or navigate to a chat/call room
        if (type === 'chat') {
            const message = encodeURIComponent(`Hello ${expert.name}, I need advice regarding my crops.`);
            // Mock WhatsApp redirect or similar
            window.open(`https://wa.me/?text=${message}`, '_blank');
        } else {
            alert(`Initiating ${type} with ${expert.name}... (Feature coming soon)`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Navbar />

            <div className="max-w-7xl mx-auto pt-28 pb-12 px-6">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
                        Connect with <span className="text-green-600">Agri-Experts</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Get real-time advice from certified entomologists, plant pathologists, and soil scientists.
                    </p>
                </div>

                {/* Search & Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-2xl mx-auto">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by name, specialty, or language..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-surface-dark-subtle border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-green-500 outline-none text-gray-900 dark:text-white placeholder-gray-400"
                        />
                    </div>
                    {/* Filter Button (Mock) */}
                    <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-surface-dark-subtle border border-gray-200 dark:border-white/10 rounded-xl font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <Filter size={20} />
                        Filters
                    </button>
                </div>

                {/* Helpline Banner */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 mb-12 text-white flex flex-col md:flex-row items-center justify-between shadow-xl">
                    <div className="flex items-center gap-6 mb-6 md:mb-0">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <PhoneCall size={32} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-1">Kisan Call Center (Govt)</h3>
                            <p className="opacity-90">Toll Free Number: 1800-180-1551</p>
                        </div>
                    </div>
                    <a href="tel:18001801551" className="px-8 py-3 bg-white text-blue-700 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg">
                        Call Now
                    </a>
                </div>

                {/* Experts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredExperts.map(expert => (
                        <ExpertCard key={expert.id} expert={expert as Expert} onConnect={handleConnect} />
                    ))}
                    {filteredExperts.length === 0 && (
                        <div className="col-span-full text-center py-12 text-gray-500">
                            No experts found matching your criteria.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExpertConnectPage;
