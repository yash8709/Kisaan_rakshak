import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';

// Define the shape of our context
interface AIContextType {
    weatherContext: string | null;
    dashboardContext: string | null;
    currentRoute: string;
    updateWeatherContext: (data: any) => void;
    updateDashboardContext: (stats: any) => void;
    updateRoute: (route: string) => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const AIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [weatherContext, setWeatherContext] = useState<string | null>(null);
    const [dashboardContext, setDashboardContext] = useState<string | null>(null);
    const [currentRoute, setCurrentRoute] = useState<string>('Home');

    const updateWeatherContext = useCallback((data: any) => {
        // Format weather data into a readable string for the AI
        if (!data) {
            setWeatherContext(null);
            return;
        }
        const contextString = `Current Weather: ${data.temp}°C, ${data.description}, Humidity ${data.humidity}%, Wind ${data.windSpeed}km/h. advice: ${data.advice || ''}`;
        setWeatherContext(contextString);
    }, []);

    const updateDashboardContext = useCallback((stats: any) => {
        // Format dashboard stats into a readable string
        if (!stats) {
            setDashboardContext(null);
            return;
        }
        // Assuming stats is an object with readable keys
        const contextString = `Farm Stats: ${JSON.stringify(stats)}`;
        setDashboardContext(contextString);
    }, []);

    const updateRoute = useCallback((route: string) => {
        setCurrentRoute(route);
    }, []);

    const value = useMemo(() => ({
        weatherContext,
        dashboardContext,
        currentRoute,
        updateWeatherContext,
        updateDashboardContext,
        updateRoute
    }), [weatherContext, dashboardContext, currentRoute, updateWeatherContext, updateDashboardContext, updateRoute]);

    return (
        <AIContext.Provider value={value}>
            {children}
        </AIContext.Provider>
    );
};

export const useAIContext = () => {
    const context = useContext(AIContext);
    if (context === undefined) {
        throw new Error('useAIContext must be used within an AIProvider');
    }
    return context;
};
