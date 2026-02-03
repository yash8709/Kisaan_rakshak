import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import { useTranslation } from 'react-i18next';
import { detectPest, PredictionResult } from '../services/aiService';
import { saveScan } from '../services/historyService';
import remediesData from '../data/remedies.json';
import { Camera, RefreshCw, CheckCircle, AlertTriangle, ChevronRight } from 'lucide-react';

const PestDetectionPage: React.FC = () => {
    const { t } = useTranslation();
    const [image, setImage] = useState<string | null>(null);
    const [prediction, setPrediction] = useState<PredictionResult | null>(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Helper to get remedies safely
    const getRemedies = (pestName: string) => {
        const key = Object.keys(remediesData).find(k => pestName.toLowerCase().includes(k));
        return key ? (remediesData as any)[key] : null;
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imgUrl = URL.createObjectURL(file);
            setImage(imgUrl);
            setPrediction(null);

            const imgElement = new Image();
            imgElement.src = imgUrl;
            imgElement.onload = () => runPrediction(imgElement, imgUrl);
        }
    };

    const runPrediction = async (imgElement: HTMLImageElement, imgUrl: string) => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 500)); // UI delay
            const result = await detectPest(imgElement);
            setPrediction(result);

            // Save to history
            saveScan({
                imageUrl: imgUrl,
                result: result.isPest ? `Pest: ${result.className}` : 'Healthy',
                confidence: result.probability,
                isPest: result.isPest
            });

        } catch (error) {
            console.error("Prediction error:", error);
            alert("Failed to analyze image.");
        } finally {
            setLoading(false);
        }
    };

    const triggerFileInput = () => fileInputRef.current?.click();
    const remedies = prediction?.isPest ? getRemedies(prediction.className) : null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
            <Navbar />

            <main className="max-w-4xl mx-auto pt-28 pb-12 px-6">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-colors duration-300">
                    {/* Header */}
                    <div className="bg-green-700 dark:bg-green-900 py-8 px-8 text-center sm:text-left">
                        <h2 className="text-3xl font-bold text-white mb-2">{t('nav.detect')}</h2>
                        <p className="text-green-100">{t('detect.upload_desc')}</p>
                    </div>

                    <div className="p-8">
                        {/* Upload Area */}
                        <div
                            className={`border-2 border-dashed rounded-2xl p-10 text-center transition cursor-pointer group
                                ${image ? 'border-gray-300 dark:border-gray-600' : 'border-green-500 bg-green-50 dark:bg-green-900/10 hover:bg-green-100 dark:hover:bg-green-900/20'}`}
                            onClick={triggerFileInput}
                        >
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" ref={fileInputRef} />

                            {!image ? (
                                <div className="space-y-4">
                                    <div className="bg-green-100 dark:bg-green-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-green-600 dark:text-green-200">
                                        <Camera size={40} />
                                    </div>
                                    <p className="text-xl font-medium">{t('detect.upload_title')}</p>
                                </div>
                            ) : (
                                <div className="relative inline-block rounded-xl overflow-hidden shadow-md">
                                    <img src={image} alt="Crop" className="max-h-80 object-contain mx-auto" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white">
                                            <RefreshCw size={24} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Loading State */}
                        {loading && (
                            <div className="mt-10 text-center py-8">
                                <div className="inline-block w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                                <h3 className="text-xl font-semibold animate-pulse">{t('detect.analyzing')}</h3>
                            </div>
                        )}

                        {/* Results */}
                        {prediction && !loading && (
                            <div className="mt-10 animate-fade-in-up">
                                <div className={`p-6 rounded-2xl border-l-8 shadow-sm ${prediction.isPest ? 'bg-red-50 border-red-500 dark:bg-red-900/10' : 'bg-green-50 border-green-500 dark:bg-green-900/10'}`}>
                                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                                        <div className={`p-4 rounded-full ${prediction.isPest ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                            {prediction.isPest ? <AlertTriangle size={48} /> : <CheckCircle size={48} />}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className={`text-2xl font-bold mb-1 ${prediction.isPest ? 'text-red-700 dark:text-red-400' : 'text-green-800 dark:text-green-400'}`}>
                                                {prediction.isPest ? t('detect.result_pest') : t('detect.result_healthy')}
                                            </h3>
                                            <p className="text-lg opacity-80 mb-2">
                                                {prediction.isPest ? `Detected: ${prediction.className}` : 'No threats found.'}
                                            </p>
                                            <div className="inline-flex items-center gap-2 bg-white dark:bg-gray-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                                                <span>{t('detect.confidence')}:</span>
                                                <span className={`font-bold ${prediction.probability > 0.8 ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
                                                    {(prediction.probability * 100).toFixed(1)}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Remedies Section */}
                                {prediction.isPest && remedies && (
                                    <div className="mt-8 bg-blue-50 dark:bg-blue-900/10 rounded-2xl p-8 border border-blue-100 dark:border-blue-900/30">
                                        <h3 className="text-xl font-bold text-blue-900 dark:text-blue-300 mb-6 flex items-center gap-2">
                                            <span>🩺</span> {t('detect.remedies')}
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm">
                                                <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">🌿 Organic Solution</h4>
                                                <p className="text-sm">{remedies.organic}</p>
                                            </div>
                                            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm">
                                                <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">🧪 Chemical Solution</h4>
                                                <p className="text-sm">{remedies.chemical}</p>
                                            </div>
                                            <div className="md:col-span-2 bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-xl border border-yellow-200 dark:border-yellow-900/30">
                                                <h4 className="font-semibold text-yellow-800 dark:text-yellow-500 mb-1">⚠️ Precaution</h4>
                                                <p className="text-sm text-yellow-700 dark:text-yellow-600">{remedies.precaution}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PestDetectionPage;
