import { AssistantIntent } from './intents';

export type MessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
    id: string;
    role: MessageRole;
    text: string;
    timestamp: number;
    intent?: AssistantIntent;
    language?: 'en' | 'hi';
}

export interface AssistantState {
    messages: ChatMessage[];
    isListening: boolean;
    isSpeaking: boolean;
    isLoading: boolean;
    error: string | null;
    currentIntent: AssistantIntent | null;
}

export interface AssistantContext {
    weather?: {
        temp: number;
        condition: string;
        location: string;
    };
    pestPrediction?: {
        className: string;
        probability: number;
        isPest: boolean;
    };
    page: string;
    recentHistory: ChatMessage[];
}
