import remediesData from '../data/remedies.json';
import { WeatherData } from './weatherService';

export interface RemedyResult {
    organic: string;
    chemical: string;
    precaution: string;
    weatherAdvisory?: string;
}

export type CropStage = 'seedling' | 'vegetative' | 'flowering' | 'fruiting' | 'harvest';

export const getRemedy = (
    pestName: string,
    weather?: WeatherData | null,
    stage: CropStage = 'vegetative'
): RemedyResult | null => {
    // 1. Find the pest entry
    const key = Object.keys(remediesData).find(k => pestName.toLowerCase().includes(k));
    if (!key) return null;

    const pestData = (remediesData as any)[key];
    const defaultRemedy = pestData.default;

    // 2. Stage-based override
    let organic = defaultRemedy.organic;
    let chemical = defaultRemedy.chemical;

    if (pestData.stages && pestData.stages[stage]) {
        if (pestData.stages[stage].organic) organic = pestData.stages[stage].organic;
        if (pestData.stages[stage].chemical) chemical = pestData.stages[stage].chemical;
    }

    // 3. Weather-based advisory
    let weatherAdvisory = "";
    if (weather && pestData.weather) {
        if (weather.description.includes('rain') && pestData.weather.rain) {
            weatherAdvisory = pestData.weather.rain;
        } else if (weather.windSpeed > 15 && pestData.weather.wind) {
            weatherAdvisory = pestData.weather.wind;
        } else if (weather.description.includes('cloud') && pestData.weather.cloudy) {
            weatherAdvisory = pestData.weather.cloudy;
        }
    }

    // General weather checks if no specific pest advice
    if (!weatherAdvisory && weather) {
        if (weather.description.includes('rain')) weatherAdvisory = "Rain expected. Pesticides may wash off.";
        if (weather.windSpeed > 20) weatherAdvisory = "High winds. Avoid spraying.";
    }

    return {
        organic,
        chemical,
        precaution: defaultRemedy.precaution,
        weatherAdvisory
    };
};
