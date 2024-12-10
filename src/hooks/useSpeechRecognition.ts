import { useState, useEffect, useCallback } from 'react';
import { detect } from 'franc';

interface UseSpeechRecognitionProps {
  onResult?: (transcript: string) => void;
  onLanguageDetected?: (language: string) => void;
}

export function useSpeechRecognition({ onResult, onLanguageDetected }: UseSpeechRecognitionProps = {}) {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      
      setRecognition(recognition);
    }
  }, []);

  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

      if (onResult) {
        onResult(transcript);
      }

      // Detect language if we have enough text (at least 20 characters)
      if (onLanguageDetected && transcript.length >= 20) {
        const detectedLang = detect(transcript);
        if (detectedLang) {
          onLanguageDetected(detectedLang);
        }
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech Recognition Error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      if (isListening) {
        recognition.start();
      }
    };

    return () => {
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
    };
  }, [recognition, isListening, onResult, onLanguageDetected]);

  const startListening = useCallback(() => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  }, [recognition]);

  return {
    isListening,
    startListening,
    stopListening,
    isSupported: !!recognition
  };
}