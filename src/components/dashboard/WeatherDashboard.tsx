import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Droplets, Wind, MapPin, Loader, Sun, CloudRain, Search, Gauge, Eye, ThermometerSun, Bug, Sprout, CloudLightning, AlertTriangle } from 'lucide-react';
import { getWeatherData, getWeatherAdvice, WeatherData } from '../../services/weatherService';
import { useAIContext } from '../../assistant/context/AIContext';
import { generateAgriInsights } from '../../assistant/services/geminiService';
import { AgriWeatherInsights, calculateAgriInsightsLocal } from '../../assistant/utils/agriculture';
import { useTranslation } from 'react-i18next';
import WeatherMetricCard from './WeatherMetricCard';
import IntelligenceCard from './IntelligenceCard';

const WeatherDashboard: React.FC = () => {
    const { t } = useTranslation();
    const { updateWeatherContext } = useAIContext();
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchCity, setSearchCity] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    // Agri Intelligence State
    const [agriData, setAgriData] = useState<AgriWeatherInsights | null>(null);
    const [loadingAgri, setLoadingAgri] = useState(false);

    const fetchWeather = React.useCallback(async (city?: string) => {
        setLoading(true);
        setError(null);
        setAgriData(null);
        try {
            const data = await getWeatherData(city);
            setWeather(data);

            updateWeatherContext({
                temp: data.temp,
                description: data.description,
                humidity: data.humidity,
                windSpeed: data.windSpeed,
                advice: getWeatherAdvice(data)
            });

            setLoadingAgri(true);

            // Try AI first, then fallback to Local Rule Engine
            generateAgriInsights(data).then(insights => {
                if (insights) {
                    setAgriData(insights);
                } else {
                    console.log("Using Local Agri-Intelligence Fallback");
                    setAgriData(calculateAgriInsightsLocal(data));
                }
                setLoadingAgri(false);
            });

        } catch (err) {
            setError('Failed to fetch weather data.');
        } finally {
            setLoading(false);
        }
    }, [updateWeatherContext]);

    useEffect(() => {
        fetchWeather();
    }, [fetchWeather]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchCity.trim()) {
            fetchWeather(searchCity);
            setIsSearching(false);
        }
    };

    if (loading) {
        return (
            <div className="w-full h-96 bg-emerald-50/80 dark:bg-green-950/40 backdrop-blur-xl rounded-3xl border border-emerald-200/50 dark:border-green-800/30 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader className="animate-spin text-emerald-600 dark:text-agri-green" size={40} />
                    <p className="text-emerald-700 dark:text-green-200/70 font-medium">{t('dashboard.weather.analyzing')}</p>
                </div>
            </div>
        );
    }

    if (error || !weather) {
        return (
            <div className="w-full bg-red-50 dark:bg-red-900/20 backdrop-blur-xl rounded-3xl border border-red-200 dark:border-red-500/20 p-10 text-center">
                <p className="text-red-700 dark:text-red-300 mb-4">{error || 'Weather data unavailable'}</p>
                <button onClick={() => fetchWeather()} className="px-6 py-2 bg-red-100 dark:bg-red-500/20 text-red-800 dark:text-red-200 rounded-lg hover:bg-red-200 dark:hover:bg-red-500/30 transition-colors">
                    Retry Connection
                </button>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-7xl mx-auto space-y-8"
        >
            {/* MAIN WEATHER CARD */}
            <div className="bg-gradient-to-br from-green-600 to-emerald-700 dark:from-green-900/80 dark:to-emerald-950/80 backdrop-blur-xl border border-white/20 dark:border-green-700/30 rounded-3xl p-8 lg:p-10 shadow-2xl relative overflow-hidden group">
                {/* Background Glows */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] pointer-events-none" />

                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center relative z-10 gap-8">

                    {/* LEFT: Temp & Location */}
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            {isSearching ? (
                                <form onSubmit={handleSearch} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        autoFocus
                                        value={searchCity}
                                        onChange={(e) => setSearchCity(e.target.value)}
                                        onBlur={() => !searchCity && setIsSearching(false)}
                                        placeholder={t('dashboard.weather.search_placeholder')}
                                        className="bg-green-800/50 border border-green-600 rounded-lg px-3 py-1 text-white focus:outline-none focus:border-agri-green w-48 placeholder-green-200/50"
                                    />
                                </form>
                            ) : (
                                <button
                                    onClick={() => setIsSearching(true)}
                                    className="flex items-center gap-2 text-xl text-green-100 hover:text-white transition-colors group/loc"
                                >
                                    <MapPin className="text-emerald-400" size={24} />
                                    <span className="font-medium">{weather.location}</span>
                                    <Search size={16} className="opacity-0 group-hover/loc:opacity-50 transition-opacity" />
                                </button>
                            )}
                        </div>

                        <div className="flex items-baseline gap-4">
                            <h1 className="text-7xl font-bold text-white tracking-tighter shadow-black drop-shadow-lg">
                                {weather.temp}°
                            </h1>
                            <div className="text-xl text-green-200 font-medium capitalize flex items-center gap-2">
                                {weather.description}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Big Icon */}
                    <div className="hidden lg:block">
                        {weather.description.includes('rain') ? <CloudRain size={120} className="text-blue-300 drop-shadow-2xl" /> :
                            weather.description.includes('cloud') ? <Cloud size={120} className="text-green-100 drop-shadow-2xl" /> :
                                weather.description.includes('clear') ? <Sun size={120} className="text-yellow-300 drop-shadow-2xl animate-spin-slow" /> :
                                    <CloudLightning size={120} className="text-purple-300 drop-shadow-2xl" />}
                    </div>
                </div>

                {/* METRICS GRID */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-10">
                    <WeatherMetricCard label="Humidity" value={`${weather.humidity}%`} icon={Droplets} color="text-blue-300" delay={0.1} />
                    <WeatherMetricCard label="Wind" value={`${weather.windSpeed} km/h`} icon={Wind} color="text-emerald-300" delay={0.2} />
                    <WeatherMetricCard label="Pressure" value={`${weather.pressure || 1012} hPa`} icon={Gauge} color="text-purple-300" delay={0.3} />
                    <WeatherMetricCard label="Visibility" value={`${((weather.visibility || 10000) / 1000).toFixed(1)} km`} icon={Eye} color="text-yellow-300" delay={0.4} />
                    <WeatherMetricCard label="Rain (1h)" value={weather.description.includes('rain') ? '> 2mm' : '0mm'} icon={CloudRain} color="text-cyan-300" delay={0.5} />
                </div>
            </div>

            {/* INTELLIGENCE SECTION */}
            <div className="space-y-6">
                <div className="flex items-center gap-3 px-2">
                    <Sprout className="text-agri-green" size={28} />
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t('dashboard.intelligence.title')}</h2>
                </div>

                {loadingAgri ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-40 bg-slate-200 dark:bg-green-900/30 rounded-xl border border-slate-200 dark:border-green-800/30" />
                        ))}
                    </div>
                ) : agriData ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <IntelligenceCard title="Soil Moisture" icon={Droplets} data={agriData.soilMoistureIndex} delay={0.6} />
                        <IntelligenceCard title="Pest Risk" icon={Bug} data={agriData.pestRiskIndex} delay={0.7} />
                        <IntelligenceCard title="Crop Stress" icon={ThermometerSun} data={agriData.cropStressIndex} delay={0.8} />
                        <IntelligenceCard title="Disease Risk" icon={AlertTriangle} data={agriData.diseaseRiskIndex} delay={0.9} />

                        {/* Full Width Advice */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            className="bg-emerald-50 border border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-500/30 rounded-2xl p-6 md:col-span-2 lg:col-span-4 flex flex-col md:flex-row gap-6 items-start shadow-sm dark:shadow-none"
                        >
                            <div className="p-3 bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300 rounded-xl shrink-0">
                                <Sprout size={32} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-200 mb-2">{t('dashboard.intelligence.action_plan')}</h3>
                                <p className="text-emerald-700 dark:text-emerald-100/80 leading-relaxed mb-4">{agriData.farmingAdvice.summary}</p>
                                <div className="flex flex-wrap gap-2">
                                    {agriData.farmingAdvice.recommendedActions.map((action, i) => (
                                        <span key={i} className="px-3 py-1 bg-white border border-emerald-200 text-emerald-700 dark:bg-emerald-500/20 dark:border-emerald-500/30 rounded-full text-xs dark:text-emerald-200 font-medium shadow-sm dark:shadow-none">
                                            {action}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                ) : (
                    <div className="text-center py-10 bg-slate-100 dark:bg-green-900/20 border border-slate-200 dark:border-green-800/30 rounded-2xl">
                        <p className="text-slate-500 dark:text-green-200/50">Unable to generate agricultural insights at this time.</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default WeatherDashboard;
