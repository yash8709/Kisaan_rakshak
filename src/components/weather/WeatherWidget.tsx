import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Droplets, Wind, MapPin, Loader, Sun, CloudRain, Search, Gauge, Eye } from 'lucide-react';
import { getWeatherData, getWeatherAdvice, WeatherData } from '../../services/weatherService';
import { useAIContext } from '../../assistant/context/AIContext';
import { generateAgriInsights } from '../../assistant/services/geminiService';
import { AgriWeatherInsights } from '../../assistant/utils/agriculture';
import AgriIntelligence from './AgriIntelligence';

const WeatherWidget: React.FC = () => {
    const { updateWeatherContext } = useAIContext();
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchCity, setSearchCity] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    // New State for Agri Intelligence
    const [agriData, setAgriData] = useState<AgriWeatherInsights | null>(null);
    const [loadingAgri, setLoadingAgri] = useState(false);

    const fetchWeather = async (city?: string) => {
        setLoading(true);
        setError(null);
        setAgriData(null); // Reset old data
        try {
            const data = await getWeatherData(city);
            setWeather(data);

            // 1. Update Context First
            updateWeatherContext({
                temp: data.temp,
                description: data.description,
                humidity: data.humidity,
                windSpeed: data.windSpeed,
                advice: getWeatherAdvice(data)
            });

            // 2. Fetch Agri Intelligence
            setLoadingAgri(true);
            generateAgriInsights(data).then(insights => {
                setAgriData(insights);
                setLoadingAgri(false);
            });

        } catch (err) {
            setError('Failed to fetch weather data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather();
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchCity.trim()) {
            fetchWeather(searchCity);
            setIsSearching(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 h-full flex flex-col justify-between animate-pulse">
                <div className="space-y-4">
                    <div className="h-8 bg-white/10 rounded-md w-3/4"></div>
                    <div className="h-12 bg-white/10 rounded-md w-1/2"></div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-16 bg-white/10 rounded-xl"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-500/10 backdrop-blur-md rounded-3xl p-6 border border-red-500/20 h-full flex flex-col items-center justify-center text-center">
                <CloudRain size={48} className="text-red-400 mb-2" />
                <p className="text-red-200 text-sm mb-4">{error}</p>
                <button
                    onClick={() => fetchWeather()}
                    className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-lg text-sm transition-colors"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (!weather) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="group bg-gradient-to-br from-emerald-500 to-teal-600 dark:from-[#0f172a]/90 dark:to-[#1e293b]/90 backdrop-blur-2xl text-white rounded-3xl p-4 sm:p-6 shadow-2xl border border-emerald-400/30 dark:border-white/10 relative overflow-hidden h-full flex flex-col hover:border-emerald-400/50 dark:hover:border-white/20 transition-all duration-300"
        >
            {/* Decorative Elements */}
            <div className="absolute top-[-20%] right-[-20%] w-40 h-40 bg-white/20 dark:bg-agri-green/20 rounded-full blur-[60px] group-hover:bg-white/30 dark:group-hover:bg-agri-green/30 transition-all duration-500" />
            <div className="absolute bottom-[-10%] left-[-10%] w-32 h-32 bg-teal-200/20 dark:bg-blue-500/10 rounded-full blur-[50px]" />

            {/* Header: Location & Search */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center relative z-10 mb-8 gap-4">
                <div className="flex-1">
                    {isSearching ? (
                        <form onSubmit={handleSearch} className="flex items-center gap-2 mb-2">
                            <input
                                type="text"
                                autoFocus
                                value={searchCity}
                                onChange={(e) => setSearchCity(e.target.value)}
                                onBlur={() => !searchCity && setIsSearching(false)}
                                placeholder="Search city..."
                                className="bg-black/10 dark:bg-white/5 border border-white/30 dark:border-white/20 rounded-xl px-4 py-2 text-base text-white focus:outline-none focus:ring-2 focus:ring-white dark:focus:ring-agri-green w-full max-w-xs placeholder-emerald-100 dark:placeholder-slate-400"
                            />
                            <button type="submit" className="p-2.5 bg-white/20 dark:bg-agri-green rounded-xl hover:bg-white/30 dark:hover:bg-agri-green/80 transition-colors"><Search size={18} /></button>
                        </form>
                    ) : (
                        <div
                            onClick={() => setIsSearching(true)}
                            className="flex items-center space-x-2 text-emerald-50 dark:text-slate-300 text-base md:text-lg mb-2 cursor-pointer hover:text-white transition-colors group/loc"
                        >
                            <MapPin size={20} className="text-red-200 dark:text-red-400 group-hover/loc:scale-110 transition-transform" />
                            <span className="font-medium border-b border-transparent group-hover/loc:border-emerald-200 dark:group-hover/loc:border-slate-500 transition-colors">{weather.location}</span>
                            <Search size={14} className="opacity-0 group-hover/loc:opacity-50 transition-opacity" />
                        </div>
                    )}
                    <div className="text-6xl md:text-7xl lg:text-8xl font-display font-bold mt-2 bg-gradient-to-br from-white to-emerald-200 dark:to-slate-400 bg-clip-text text-transparent tracking-tighter drop-shadow-lg">
                        {weather.temp}°
                    </div>
                </div>

                <div className="bg-black/10 dark:bg-white/5 p-4 sm:p-6 rounded-3xl border border-white/20 dark:border-white/10 backdrop-blur-sm shadow-inner group-hover:bg-black/20 dark:group-hover:bg-white/10 transition-colors duration-300 flex flex-col items-center min-w-[100px] sm:min-w-[140px]">
                    {weather.description.includes('rain') ? <CloudRain size={56} className="text-blue-100 dark:text-blue-400 drop-shadow-xl" /> :
                        weather.description.includes('cloud') ? <Cloud size={56} className="text-white/80 dark:text-gray-400 drop-shadow-xl" /> :
                            <Sun size={56} className="text-yellow-200 dark:text-yellow-400 drop-shadow-xl animate-spin-slow" />}
                    <div className="text-sm md:text-base text-center mt-3 font-semibold bg-black/10 dark:bg-white/5 px-4 py-1.5 rounded-full capitalize text-white dark:text-slate-200 border border-white/20 dark:border-white/10 tracking-wide shadow-sm">
                        {weather.description}
                    </div>
                </div>
            </div>

            {/* Farming Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-8">
                {[
                    { icon: Droplets, color: 'text-blue-100 dark:text-blue-400', bg: 'bg-blue-900/20 dark:bg-blue-500/20', label: 'Moisture', value: `${weather.humidity}%` },
                    { icon: Wind, color: 'text-emerald-50 dark:text-slate-300', bg: 'bg-black/10 dark:bg-slate-500/20', label: 'Wind', value: `${weather.windSpeed} km/h` },
                    { icon: Gauge, color: 'text-purple-100 dark:text-purple-300', bg: 'bg-purple-900/20 dark:bg-purple-500/20', label: 'Pressure', value: `${weather.pressure || 1012} hPa` },
                    { icon: Eye, color: 'text-yellow-100 dark:text-yellow-300', bg: 'bg-yellow-900/20 dark:bg-yellow-500/20', label: 'Visibility', value: `${((weather.visibility || 10000) / 1000).toFixed(1)} km` }
                ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2 sm:gap-4 bg-black/5 dark:bg-white/5 p-3 sm:p-4 rounded-2xl border border-white/10 dark:border-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] shadow-sm">
                        <div className={`p-2 sm:p-3 ${item.bg} rounded-xl shadow-inner`}><item.icon size={20} className={item.color} /></div>
                        <div className="min-w-0">
                            <div className="text-[10px] sm:text-xs md:text-sm text-emerald-100 dark:text-slate-400 uppercase tracking-wider font-bold mb-0.5 truncate">{item.label}</div>
                            <div className="font-extrabold text-sm sm:text-base md:text-lg text-white dark:text-slate-100 truncate">{item.value}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* AI Intelligence Section */}
            {loadingAgri ? (
                <div className="mt-4 flex items-center justify-center h-40 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex flex-col items-center gap-2">
                        <Loader size={20} className="animate-spin text-agri-green" />
                        <span className="text-xs text-slate-400">Analyzing Farm Conditions...</span>
                    </div>
                </div>
            ) : agriData ? (
                <AgriIntelligence data={agriData} />
            ) : (
                <div className="mt-auto pt-4 border-t border-white/10">
                    <p className="text-xs text-slate-300 bg-agri-green/10 p-3 rounded-xl border border-agri-green/20 flex items-start gap-3 hover:bg-agri-green/15 transition-colors cursor-default">
                        <span className="text-agri-green font-bold shrink-0 text-base">💡</span>
                        <span className="leading-relaxed font-medium">{getWeatherAdvice(weather)}</span>
                    </p>
                </div>
            )}
        </motion.div>
    );
};

export default WeatherWidget;
