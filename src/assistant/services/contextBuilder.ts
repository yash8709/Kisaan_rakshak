import { getHistory } from '../../services/historyService';
import { getWeatherData } from '../../services/weatherService';
import { AssistantContext, ChatMessage } from '../types/assistant.types';

export const buildContext = async (page: string, recentMessages: ChatMessage[]): Promise<AssistantContext> => {
    // 1. Get recent pest detection (if any)
    const history = getHistory();
    const lastScan = history.length > 0 ? history[0] : null;

    // 2. Get current weather
    // We try to get cached/current location weather. 
    // Optimization: In a real app, we might pass this in from the UI state to avoid double-fetch.
    // For now, we fetch it again (it uses caching internally/browser level usually or we accept the overhead).
    const weather = await getWeatherData();

    return {
        page,
        recentHistory: recentMessages,
        weather: {
            temp: weather.temp,
            condition: weather.description,
            location: weather.location
        },
        pestPrediction: lastScan ? {
            className: lastScan.result.replace('Pest: ', ''),
            probability: lastScan.confidence,
            isPest: lastScan.isPest
        } : undefined
    };
};
