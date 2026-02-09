import { useState, useEffect, useCallback, useRef } from 'react';

// Type definition for Web Speech API
interface IWindow extends Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
}

export const useSpeechToText = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [supported, setSupported] = useState(false);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        const { webkitSpeechRecognition, SpeechRecognition } = window as unknown as IWindow;
        if (webkitSpeechRecognition || SpeechRecognition) {
            setSupported(true);
            const SpeechRecognitionConstructor = SpeechRecognition || webkitSpeechRecognition;
            const recognitionInstance = new SpeechRecognitionConstructor();
            recognitionInstance.continuous = false; // Stop after one command usually
            recognitionInstance.interimResults = false;
            recognitionInstance.lang = 'en-US';

            recognitionInstance.onresult = (event: any) => {
                const text = event.results[0][0].transcript;
                setTranscript(text);
                setIsListening(false);
            };

            recognitionInstance.onerror = (event: any) => {
                console.error("Speech recognition error", event.error);
                setIsListening(false);
            };

            recognitionInstance.onend = () => {
                setIsListening(false);
            };

            recognitionRef.current = recognitionInstance;
        }
    }, []);

    const startListening = useCallback(() => {
        if (recognitionRef.current && !isListening) {
            try {
                recognitionRef.current.start();
                setIsListening(true);
                setTranscript(''); // Clear previous
            } catch (e) {
                console.error("Start listening error:", e);
            }
        }
    }, [isListening]);

    const stopListening = useCallback(() => {
        if (recognitionRef.current && isListening) {
            try {
                recognitionRef.current.stop();
                setIsListening(false);
            } catch (e) {
                console.error("Stop listening error:", e);
            }
        }
    }, [isListening]);

    return { isListening, transcript, startListening, stopListening, supported };
};
