export interface AgriWeatherInsights {
    soilMoistureIndex: {
        level: "LOW" | "MEDIUM" | "HIGH";
        reason: string;
    };
    pestRiskIndex: {
        level: "LOW" | "MEDIUM" | "HIGH";
        reason: string;
    };
    cropStressIndex: {
        level: "LOW" | "MEDIUM" | "HIGH";
        reason: string;
    };
    spraySuitability: {
        level: "POOR" | "MODERATE" | "GOOD";
        reason: string;
    };
    diseaseRiskIndex: {
        level: "LOW" | "MEDIUM" | "HIGH";
        reason: string;
    };
    irrigationRecommendation: {
        action: "REQUIRED" | "NOT REQUIRED" | "MONITOR";
        reason: string;
    };
    rainImpact?: {
        level: "NO IMPACT" | "LOW IMPACT" | "MEDIUM IMPACT" | "HIGH IMPACT";
        reason: string;
    };
    farmingAdvice: {
        summary: string;
        recommendedActions: string[];
    };
    alerts: string[];
}

export const AGRI_SYSTEM_PROMPT = `
You are Kisaan Rakshak AI, an advanced agricultural weather intelligence engine.
Your task is to analyze weather data and calculate specific agricultural indices, with special attention to RAIN IMPACT.

INPUT DATA:
Location: {location}
Temperature: {temp}°C
Humidity: {humidity}%
Wind Speed: {windSpeed} m/s
Rainfall: {rainfall} mm (approx based on conditions 1h)
Conditions: {description}

STRICT CALCULATION RULES:

1. RAIN IMPACT LEVEL:
   - HIGH IMPACT: Rainfall > 4mm
   - MEDIUM IMPACT: Rainfall 1-4mm
   - LOW IMPACT: Rainfall 0.1-1mm
   - NO IMPACT: Rainfall 0mm

2. SOIL MOISTURE INDEX:
   - HIGH: Humidity > 70% OR Rainfall > 2mm
   - MEDIUM: Humidity 40-70%
   - LOW: Humidity < 40% AND No Rain

3. PEST RISK INDEX:
   - HIGH: Temp 20-32°C AND Humidity > 60%
   - MEDIUM: Temp 15-35°C AND Humidity 40-60%
   - LOW: Otherwise

4. CROP STRESS INDEX:
   - HIGH: Temp > 35°C
   - MEDIUM: Temp 30-35°C
   - LOW: Temp 15-30°C

5. SPRAY SUITABILITY:
   - POOR: Wind > 5 m/s OR Rainfall > 1mm
   - MODERATE: Wind 3-5 m/s OR Rainfall 0-1mm
   - GOOD: Wind < 3 m/s AND No Rain

6. DISEASE RISK INDEX (Combined):
   - HIGH: (Humidity > 75% AND Temp 20-30°C) OR (Rainfall > 2mm AND Humidity > 70%)
   - MEDIUM: Humidity 50-75% OR Rainfall 0-2mm
   - LOW: Humidity < 50% AND No Rain

7. IRRIGATION RECOMMENDATION:
   - NOT REQUIRED: Soil Moisture HIGH OR Rainfall > 2mm
   - MONITOR: Soil Moisture MEDIUM OR Rainfall 0-2mm
   - REQUIRED: Soil Moisture LOW AND Temp > 25°C AND No Rain

OUTPUT FORMAT:
Return ONLY valid JSON with this structure:
{
  "soilMoistureIndex": { "level": "...", "reason": "..." },
  "pestRiskIndex": { "level": "...", "reason": "..." },
  "cropStressIndex": { "level": "...", "reason": "..." },
  "spraySuitability": { "level": "...", "reason": "..." },
  "diseaseRiskIndex": { "level": "...", "reason": "..." },
  "irrigationRecommendation": { "action": "...", "reason": "..." },
  "rainImpact": { "level": "...", "reason": "..." },
  "farmingAdvice": { "summary": "...", "recommendedActions": ["..."] },
  "alerts": ["..."]
}
`;

// Local Fallback Logic for Robustness
export function calculateAgriInsightsLocal(weather: any): AgriWeatherInsights {
    const rainfall = weather.description.toLowerCase().includes('rain') ? 5 : 0;
    const { temp, humidity, windSpeed } = weather;

    // 1. Rain Impact
    let rainImpact: any = { level: "NO IMPACT", reason: "No rain detected." };
    if (rainfall > 4) rainImpact = { level: "HIGH IMPACT", reason: "Heavy rainfall detected (>4mm)." };
    else if (rainfall >= 1) rainImpact = { level: "MEDIUM IMPACT", reason: "Moderate rainfall (1-4mm)." };
    else if (rainfall > 0) rainImpact = { level: "LOW IMPACT", reason: "Light drizzle detected." };

    // 2. Soil Moisture
    let soilMoisture: any = { level: "LOW", reason: "Low humidity and no rain." };
    if (humidity > 70 || rainfall > 2) soilMoisture = { level: "HIGH", reason: "High humidity or recent rain." };
    else if (humidity >= 40) soilMoisture = { level: "MEDIUM", reason: "Moderate humidity levels." };

    // 3. Pest Risk
    let pestRisk: any = { level: "LOW", reason: "Conditions not favorable for pests." };
    if (temp >= 20 && temp <= 32 && humidity > 60) pestRisk = { level: "HIGH", reason: "Warm and humid conditions favor pests." };
    else if (temp >= 15 && temp <= 35 && humidity >= 40) pestRisk = { level: "MEDIUM", reason: "Moderate risk conditions." };

    // 4. Crop Stress
    let cropStress: any = { level: "LOW", reason: "Temperature is optimal." };
    if (temp > 35) cropStress = { level: "HIGH", reason: "Extreme heat stress likely." };
    else if (temp >= 30) cropStress = { level: "MEDIUM", reason: "High temperature stress possible." };

    // 5. Spray Suitability
    let spray: any = { level: "GOOD", reason: "Conditions are ideal for spraying." };
    if (windSpeed > 5 || rainfall > 1) spray = { level: "POOR", reason: "High wind or rain makes spraying ineffective." };
    else if (windSpeed >= 3 || rainfall > 0) spray = { level: "MODERATE", reason: "Marginal conditions for spraying." };

    // 6. Disease Risk
    let disease: any = { level: "LOW", reason: "Dry conditions reduce disease risk." };
    if ((humidity > 75 && temp >= 20 && temp <= 30) || (rainfall > 2 && humidity > 70))
        disease = { level: "HIGH", reason: "High humidity and warmth favor fungal diseases." };
    else if (humidity >= 50 || rainfall > 0)
        disease = { level: "MEDIUM", reason: "Moderate disease risk present." };

    // 7. Irrigation
    let irrigation: any = { action: "REQUIRED", reason: "Soil moisture is low." };
    if (soilMoisture.level === "HIGH" || rainfall > 2) irrigation = { action: "NOT REQUIRED", reason: "Sufficient moisture present." };
    else if (soilMoisture.level === "MEDIUM" || rainfall > 0) irrigation = { action: "MONITOR", reason: "Check soil moisture before irrigating." };

    return {
        soilMoistureIndex: soilMoisture,
        pestRiskIndex: pestRisk,
        cropStressIndex: cropStress,
        spraySuitability: spray,
        diseaseRiskIndex: disease,
        irrigationRecommendation: irrigation,
        rainImpact: rainImpact,
        farmingAdvice: {
            summary: "Based on current weather, monitor crop health and adjust irrigation.",
            recommendedActions: [
                irrigation.action === "REQUIRED" ? "Irrigate crops" : "Monitor field moisture",
                disease.level === "HIGH" ? "Check for fungal signs" : "Scout for pests",
                spray.level === "GOOD" ? "Good time for foliar sprays" : "Delay spraying"
            ]
        },
        alerts: []
    };
}
