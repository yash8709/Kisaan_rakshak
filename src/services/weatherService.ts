import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || '';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export interface WeatherData {
    temp: number;
    humidity: number;
    description: string;
    icon: string;
    windSpeed: number;
    location: string;
    pressure: number;
    clouds: number;
    visibility: number;
}

// Mock data for development/demo purposes (failsafe)
const MOCK_WEATHER: WeatherData = {
    temp: 28,
    humidity: 65,
    description: "scattered clouds",
    icon: "03d",
    windSpeed: 12,
    location: "Demo Farm Location",
    pressure: 1012,
    clouds: 40,
    visibility: 10000
};

export const getWeatherData = async (city?: string): Promise<WeatherData> => {
    try {
        let url = '';

        if (city) {
            url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;
        } else {
            // 1. Get Coordinates if no city provided
            try {
                const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                    if (!navigator.geolocation) {
                        reject(new Error("Geolocation not supported"));
                        return;
                    }
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });
                const { latitude, longitude } = position.coords;
                url = `${BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
            } catch (geoError) {
                console.warn("Geolocation failed or denied. Using default location.", geoError);
                // Fallback to New Delhi if location access is denied
                const defaultCity = "New Delhi";
                url = `${BASE_URL}?q=${defaultCity}&appid=${API_KEY}&units=metric`;
            }
        }

        // 2. Try Real API Call (Will fail without valid key, so we catch and return mock)
        if (!API_KEY || API_KEY === 'YOUR_WEATHER_API_KEY_HERE') {
            console.warn('Weather Service: No API Key provided. Using Mock Data.');
            // Return varied mock data based on input to simulate search
            if (city) {
                return {
                    ...MOCK_WEATHER,
                    location: city.charAt(0).toUpperCase() + city.slice(1),
                    temp: Math.floor(Math.random() * (35 - 20) + 20),
                    description: ['rainy', 'sunny', 'cloudy'][Math.floor(Math.random() * 3)]
                };
            }
            return MOCK_WEATHER;
        }

        const response = await axios.get(url);
        const data = response.data;

        return {
            temp: Math.round(data.main.temp),
            humidity: data.main.humidity,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            windSpeed: data.wind.speed,
            location: data.name,
            pressure: data.main.pressure,
            clouds: data.clouds.all,
            visibility: data.visibility
        };

    } catch (error) {
        console.error('Weather Service Error:', error);
        throw error; // Propagate error to UI for handling
    }
};

export const getWeatherAdvice = (weather: WeatherData): string => {
    if (weather.description.includes('rain')) return "Avoid spraying pesticides today due to rain.";
    if (weather.windSpeed > 15) return "High winds detected. Spraying may drift.";
    if (weather.temp > 35) return "High heat. Ensure crops are irrigated.";
    if (weather.clouds < 20) return "Clear skies. Good for solar drying crops.";
    return "Weather is stable. Good conditions for field work.";
};
