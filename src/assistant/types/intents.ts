export enum AssistantIntent {
    EXPLAIN_RESULT = 'EXPLAIN_RESULT',     // "What is this pest?"
    SUGGEST_REMEDY = 'SUGGEST_REMEDY',     // "How do I cure it?"
    WEATHER_ADVICE = 'WEATHER_ADVICE',     // "Will it rain?"
    GENERAL_QUERY = 'GENERAL_QUERY',       // "How to grow tomatoes?"
    CHANGE_LANGUAGE = 'CHANGE_LANGUAGE',   // "Speak in Hindi"
    STOP_SPEAKING = 'STOP_SPEAKING',       // "Stop"
    UNKNOWN = 'UNKNOWN'
}

export const INTENT_KEYWORDS: Record<AssistantIntent, string[]> = {
    [AssistantIntent.EXPLAIN_RESULT]: ['result', 'pest', 'disease', 'diagnosis', 'what is this'],
    [AssistantIntent.SUGGEST_REMEDY]: ['cure', 'fix', 'medicine', 'solution', 'treat', 'remedy'],
    [AssistantIntent.WEATHER_ADVICE]: ['weather', 'rain', 'temperature', 'forecast', 'wind'],
    [AssistantIntent.GENERAL_QUERY]: [], // Fallback
    [AssistantIntent.CHANGE_LANGUAGE]: ['hindi', 'english', 'language', 'speak in'],
    [AssistantIntent.STOP_SPEAKING]: ['stop', 'quiet', 'shut up', 'silence', 'pause'],
    [AssistantIntent.UNKNOWN]: []
};
