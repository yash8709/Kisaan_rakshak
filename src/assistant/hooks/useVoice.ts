import { useState, useEffect, useCallback } from 'react';

interface VoiceHook {
    isListening: boolean;
    transcript: string;
    startListening: () => void;
    stopListening: () => void;
    speak: (text: string, lang?: string) => void;
    stopSpeaking: () => void;
    supported: boolean;
}

export const useVoice = (autoStopOnNavigation: boolean = true): VoiceHook => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

    // Initialize Speech Recognition
    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
            const uRecognition = new SpeechRecognition();
            uRecognition.continuous = false;
            uRecognition.interimResults = true;
            uRecognition.lang = 'en-IN'; // Default, will switch dynamic later

            uRecognition.onstart = () => setIsListening(true);
            uRecognition.onend = () => setIsListening(false);
            uRecognition.onresult = (event: SpeechRecognitionEvent) => {
                const current = event.resultIndex;
                const transcriptText = event.results[current][0].transcript;
                setTranscript(transcriptText);
            };

            setRecognition(uRecognition);
        }
    }, []);

    // Auto-stop speech on navigation
    useEffect(() => {
        if (autoStopOnNavigation) {
            window.speechSynthesis.cancel();
        }
    }, [autoStopOnNavigation, window.location.pathname]);

    const startListening = useCallback(() => {
        if (recognition) {
            try {
                recognition.start();
            } catch (e) {
                console.error("Mic already active");
            }
        }
    }, [recognition]);

    const stopListening = useCallback(() => {
        if (recognition) recognition.stop();
    }, [recognition]);

    const speak = useCallback((text: string, lang = 'en-IN') => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang;
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            window.speechSynthesis.speak(utterance);
        }
    }, []);

    const stopSpeaking = useCallback(() => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
    }, []);

    return {
        isListening,
        transcript,
        startListening,
        stopListening,
        speak,
        stopSpeaking,
        supported: !!recognition
    };
};
