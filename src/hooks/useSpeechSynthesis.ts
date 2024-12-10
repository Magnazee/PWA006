import { useState, useEffect, useCallback } from 'react';

interface UseSpeechSynthesisProps {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: any) => void;
}

export function useSpeechSynthesis({ onStart, onEnd, onError }: UseSpeechSynthesisProps = {}) {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = useCallback((text: string, lang?: string) => {
    if (!window.speechSynthesis) return;

    const utterance = new SpeechSynthesisUtterance(text);
    
    if (lang) {
      const voice = voices.find(v => v.lang.startsWith(lang));
      if (voice) {
        utterance.voice = voice;
      }
      utterance.lang = lang;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      onStart?.();
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      onEnd?.();
    };

    utterance.onerror = (event) => {
      setIsSpeaking(false);
      onError?.(event);
    };

    window.speechSynthesis.speak(utterance);
  }, [voices, onStart, onEnd, onError]);

  const pause = useCallback(() => {
    window.speechSynthesis.pause();
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    window.speechSynthesis.resume();
    setIsPaused(false);
  }, []);

  const cancel = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  }, []);

  const getVoiceForLanguage = useCallback((lang: string) => {
    return voices.find(voice => voice.lang.startsWith(lang)) || null;
  }, [voices]);

  return {
    speak,
    pause,
    resume,
    cancel,
    getVoiceForLanguage,
    isSpeaking,
    isPaused,
    voices,
    isSupported: 'speechSynthesis' in window
  };
}