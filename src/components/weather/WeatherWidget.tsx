import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Droplets, Wind, MapPin, Loader, Sun, CloudRain, Search, Gauge, Eye } from 'lucide-react';
import { getWeatherData, getWeatherAdvice, WeatherData } from '../../services/weatherService';

const WeatherWidget: React.FC = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchCity, setSearchCity] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const fetchWeather = async (city?: string) => {
        setLoading(true);
        const data = await getWeatherData(city);
        setWeather(data);
        setLoading(false);
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

    if (loading && !weather) {
        return (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 animate-pulse h-64 flex items-center justify-center">
                <Loader className="animate-spin text-agri-green" />
            </div>
        );
    }

    if (!weather) return null;

    const advice = getWeatherAdvice(weather);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] dark:from-[#0f172a] dark:to-[#1e293b] text-white rounded-3xl p-6 shadow-xl border border-white/10 relative overflow-hidden h-full flex flex-col"
        >
            {/* Background Blob */}
            <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-agri-green/20 rounded-full blur-[50px]" />

            {/* Header: Location & Search */}
            <div className="flex justify-between items-start relative z-10 mb-6">
                <div className="flex-1">
                    {isSearching ? (
                        <form onSubmit={handleSearch} className="flex items-center gap-2 mb-2">
                            <input
                                type="text"
                                autoFocus
                                value={searchCity}
                                onChange={(e) => setSearchCity(e.target.value)}
                                onBlur={() => !searchCity && setIsSearching(false)}
                                placeholder="Enter city..."
                                className="bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-sm text-white focus:outline-none focus:ring-1 focus:ring-agri-green w-full"
                            />
                            <button type="submit" className="p-1 bg-agri-green rounded-md"><Search size={14} /></button>
                        </form>
                    ) : (
                        <div
                            onClick={() => setIsSearching(true)}
                            className="flex items-center space-x-2 text-slate-300 text-sm mb-1 cursor-pointer hover:text-white transition-colors group"
                        >
                            <MapPin size={16} className="text-red-400 group-hover:scale-110 transition-transform" />
                            <span className="border-b border-dashed border-slate-500 hover:border-white">{weather.location}</span>
                            <Search size={12} className="opacity-50" />
                        </div>
                    )}
                    <div className="text-5xl font-display font-bold mt-2">
                        {weather.temp}°
                    </div>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                    {weather.description.includes('rain') ? <CloudRain size={40} className="text-blue-400" /> :
                        weather.description.includes('cloud') ? <Cloud size={40} className="text-gray-400" /> :
                            <Sun size={40} className="text-yellow-400" />}
                    <div className="text-xs text-center mt-2 font-medium bg-white/10 px-2 py-0.5 rounded-full capitalize">
                        {weather.description}
                    </div>
                </div>
            </div>

            {/* Farming Metrtics Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="p-2 bg-blue-500/20 rounded-lg"><Droplets size={18} className="text-blue-400" /></div>
                    <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider">Moisture</div>
                        <div className="font-bold text-sm">{weather.humidity}%</div>
                    </div>
                </div>
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="p-2 bg-slate-500/20 rounded-lg"><Wind size={18} className="text-slate-300" /></div>
                    <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider">Wind</div>
                        <div className="font-bold text-sm">{weather.windSpeed} km/h</div>
                    </div>
                </div>
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="p-2 bg-purple-500/20 rounded-lg"><Gauge size={18} className="text-purple-300" /></div>
                    <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider">Pressure</div>
                        <div className="font-bold text-sm">{weather.pressure || 1012} hPa</div>
                    </div>
                </div>
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="p-2 bg-yellow-500/20 rounded-lg"><Eye size={18} className="text-yellow-300" /></div>
                    <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider">Visibility</div>
                        <div className="font-bold text-sm">{((weather.visibility || 10000) / 1000).toFixed(1)} km</div>
                    </div>
                </div>
            </div>

            <div className="mt-auto pt-4 border-t border-white/10">
                <p className="text-xs text-slate-300 bg-agri-green/10 p-3 rounded-xl border border-agri-green/20 flex items-start gap-2">
                    <span className="text-agri-green font-bold shrink-0">💡 Advisory:</span>
                    <span className="leading-relaxed">{advice}</span>
                </p>
            </div>
        </motion.div>
    );
};

export default WeatherWidget;
