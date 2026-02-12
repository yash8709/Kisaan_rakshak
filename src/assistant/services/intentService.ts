import { AssistantIntent, INTENT_KEYWORDS } from '../types/intents';

export const analyzeIntent = (text: string): AssistantIntent => {
    const lowerText = text.toLowerCase();

    // 1. Keyword Matching Strategy
    for (const [intent, keywords] of Object.entries(INTENT_KEYWORDS)) {
        if (keywords.some(keyword => lowerText.includes(keyword))) {
            return intent as AssistantIntent;
        }
    }

    // 2. Context Heuristics (Simple)
    // If text is very short and ends with ?, likely a question
    if (lowerText.length < 10 && lowerText.includes('?')) {
        return AssistantIntent.GENERAL_QUERY;
    }

    // Default Fallback
    return AssistantIntent.GENERAL_QUERY;
};

export const getIntentSystemInstruction = (intent: AssistantIntent): string => {
    switch (intent) {
        case AssistantIntent.EXPLAIN_RESULT:
            return "User is asking about the diagnosis. Explain the pest/disease detail, symptoms, and severity.";
        case AssistantIntent.SUGGEST_REMEDY:
            return "User needs a cure. Suggest organic and chemical remedies clearly. Mention safety precautions.";
        case AssistantIntent.WEATHER_ADVICE:
            return "User asked about weather. Analyze the provided weather data and give farming advice based on it.";
        case AssistantIntent.CHANGE_LANGUAGE:
            return "User wants to change language. Confirm the switch in the target language.";
        default:
            return "Answer the general farming question helpfuly.";
    }
};
