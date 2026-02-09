import { useState, useEffect, useCallback } from 'react';

export const useTextToSpeech = () => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [supported, setSupported] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            setSupported(true);
        }
    }, []);

    const speak = useCallback((text: string, lang: string = 'en-US') => {
        if (!supported) return;

        // Cancel existing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 0.9; // Slightly slower for clarity
        utterance.pitch = 1;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
    }, [supported]);

    const cancel = useCallback(() => {
        if (supported) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    }, [supported]);

    return { speak, cancel, isSpeaking, supported };
};
