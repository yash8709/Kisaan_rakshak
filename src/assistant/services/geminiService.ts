import { AGRI_SYSTEM_PROMPT, AgriWeatherInsights } from '../utils/agriculture';

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY as string;
const IS_DEV = process.env.NODE_ENV === 'development';

// STEP 3: Runtime Validation Log
console.log("Gemini API Layer initialized");

if (IS_DEV && !API_KEY) {
    console.warn("Missing Gemini API key in local .env - direct calls may fail");
}

// PROTECTION LAYER CONSTANTS
const REQUEST_COOLDOWN_MS = 60000; // 60 seconds minimum between calls
const CACHE_DURATION_MS = 30 * 60 * 1000; // 30 minutes cache validity

// STATE MANAGEMENT
let isRequestInProgress = false;
let lastAgriCallTime = 0; // Distinct from Chat cooldown to prevent blocking UI
let lastCallTime = 0; // Chat cooldown state
const agriInsightsCache = new Map<string, { data: AgriWeatherInsights, timestamp: number }>();

export async function generateAgriInsights(weatherData: any): Promise<AgriWeatherInsights | null> {
    const now = Date.now();

    // 1. REQUEST DEDUPLICATION
    // Generate unique key based on weather parameters
    const cacheKey = `${weatherData.location}-${weatherData.temp}-${weatherData.humidity}-${weatherData.description}`;
    const cached = agriInsightsCache.get(cacheKey);

    // 2. INTELLIGENT CACHE CHECK
    if (cached) {
        const isCacheValid = (now - cached.timestamp) < CACHE_DURATION_MS;
        if (isCacheValid) {
            console.log("Using cached AI insights");
            return cached.data;
        }
    }

    // 3. COOLDOWN RATE LIMITER
    // If cooldown hasn't passed, return valid cache if available, otherwise block
    if (now - lastAgriCallTime < REQUEST_COOLDOWN_MS) {
        console.log("Using cooldown protection");
        if (cached) return cached.data;
        // If strict cooldown is active and no cache exists, we return null to trigger local fallback
        // ensuring we don't violate rate limits.
        return null;
    }

    // 4. REQUEST LOCK
    if (isRequestInProgress) {
        console.log("Gemini request prevented by protection layer");
        return cached ? cached.data : null;
    }

    const prompt = AGRI_SYSTEM_PROMPT
        .replace('{location}', weatherData.location || 'Unknown')
        .replace('{temp}', weatherData.temp)
        .replace('{humidity}', weatherData.humidity)
        .replace('{windSpeed}', weatherData.windSpeed)
        .replace('{rainfall}', weatherData.description.includes('rain') ? '5' : '0') // Estimating based on desc
        .replace('{description}', weatherData.description);

    try {
        isRequestInProgress = true;
        let result;

        if (IS_DEV && API_KEY) {
            console.log("Calling Gemini API directly (Local Dev)");
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${API_KEY}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }],
                        generationConfig: { responseMimeType: "application/json" }
                    })
                }
            );

            if (!response.ok) throw new Error("Local API Failed");
            const data = await response.json();
            const jsonText = data.candidates[0].content.parts[0].text;
            result = JSON.parse(jsonText);
        } else {
            console.log("Calling Vercel Serverless API safely");
            const response = await fetch('/api/gemini-insights', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt })
            });

            if (!response.ok) throw new Error("Serverless API Failed");
            const data = await response.json();
            const jsonText = data.candidates[0].content.parts[0].text;
            result = JSON.parse(jsonText);
        }

        // Update Cache and State
        lastAgriCallTime = Date.now();
        agriInsightsCache.set(cacheKey, { data: result, timestamp: lastAgriCallTime });
        isRequestInProgress = false;

        return result;

    } catch (e) {
        console.error("Agri Insights Error:", e);
        isRequestInProgress = false;

        // 5. FAILSAFE FALLBACK
        // Check if we have any potentially usable cache even if expired/different?
        // Prioritize specific cache key first.
        if (cached) {
            console.log("Using cached AI insights (Fallback)");
            return cached.data;
        }
        return null;
    }
}

export async function generateGeminiResponse(userInput: string, context?: any) {
    const now = Date.now();

    if (now - lastCallTime < 5000) { // Reduced cooldown to 5s for better UX
        return "Please wait a moment before sending another request.";
    }

    lastCallTime = now;

    const contextPart = context ? `
SYSTEM CONTEXT (Real-time data from user's farm):
${context.weatherContext ? `- ${context.weatherContext}` : ''}
${context.dashboardContext ? `- ${context.dashboardContext}` : ''}
${context.currentRoute ? `- Current View: ${context.currentRoute}` : ''}
` : '';

    const prompt = `
You are Kisaan Rakshak, an expert farming assistant for Indian farmers.

${contextPart}

INSTRUCTION:
1. Analyze the user's query in the context of the above system data (if available).
2. If the user asks about their farm (yield, pests, weather), USE THE CONTEXT.
3. If the query is general, answer generally but try to tie it back to their current context.
4. FORMAT YOUR RESPONSE OPTIMALLY:
   - Use strict Markdown.
   - Use Bullet Points for lists.
   - Use Bold for key terms.
   - Keep paragraphs short and readable.
   - If suggesting crops or remedies, use a step-by-step format.

Query: ${userInput}
`;

    try {
        let textResult;

        if (IS_DEV && API_KEY) {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${API_KEY}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }],
                        generationConfig: { temperature: 0.7, maxOutputTokens: 4000 }
                    })
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Gemini Local API Error:", errorData);
                throw new Error(errorData.error?.message || "Local Request Failed");
            }
            const data = await response.json();
            textResult = data.candidates[0].content.parts[0].text;
        } else {
            const response = await fetch('/api/gemini-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Gemini Vercel API Error:", errorData);
                throw new Error(errorData.error || "Serverless Request Failed");
            }
            const data = await response.json();
            textResult = data.candidates[0].content.parts[0].text;
        }

        return textResult;

    } catch (error) {
        console.error("Gemini Service Error:", error);
        return "AI service temporarily unavailable. Please try again later.";
    }
}
