import { useState, useCallback, useEffect } from 'react';
import { ChatMessage, AssistantState } from '../types/assistant.types';
import { generateGeminiResponse } from '../services/geminiService';

// Persistent storage key
const STORAGE_KEY = 'kisaan_assistant_chat';

export const useAssistant = () => {
    const [state, setState] = useState<AssistantState>(() => {
        // Load from local storage on init (DISABLED TEMPORARILY PER USER REQUEST)
        // const saved = localStorage.getItem(STORAGE_KEY);
        const saved = null;
        return {
            messages: saved ? JSON.parse(saved) : [{
                id: 'welcome',
                role: 'assistant',
                text: 'Namaste! I am Kisaan Rakshak AI. How can I help you with your farm today?',
                timestamp: Date.now()
            }],
            isListening: false,
            isSpeaking: false,
            isLoading: false,
            error: null,
            currentIntent: null
        };
    });

    // Save to local storage whenever messages change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.messages.slice(-50))); // Keep last 50
    }, [state.messages]);

    const addMessage = useCallback((text: string, role: 'user' | 'assistant') => {
        const newMessage: ChatMessage = {
            id: Date.now().toString(),
            role,
            text,
            timestamp: Date.now()
        };
        setState(prev => ({
            ...prev,
            messages: [...prev.messages, newMessage]
        }));
        return newMessage;
    }, []);

    const sendMessage = useCallback(async (text: string) => {
        if (state.isLoading) return;

        addMessage(text, 'user');
        setState(prev => ({ ...prev, isLoading: true, error: null }));

        if (state.isSpeaking) {
            window.speechSynthesis.cancel();
            setState(prev => ({ ...prev, isSpeaking: false }));
        }

        try {
            // Minimal prompt flow: No context injection
            const responseText = await generateGeminiResponse(text);
            addMessage(responseText, 'assistant');
        } catch (err: any) {
            const errorMessage = "AI service temporarily unavailable.";
            setState(prev => ({ ...prev, error: errorMessage }));
            addMessage(`⚠️ ${errorMessage}`, 'assistant');
        } finally {
            setState(prev => ({ ...prev, isLoading: false }));
        }
    }, [addMessage, state.isLoading, state.isSpeaking]);

    return {
        state,
        sendMessage,
        addMessage
    };
};


