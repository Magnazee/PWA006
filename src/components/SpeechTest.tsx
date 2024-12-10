import { useState, useEffect } from 'react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';

export function SpeechTest() {
  const [transcript, setTranscript] = useState('');
  const [detectedLang, setDetectedLang] = useState<string | null>(null);
  
  const { speak, isSpeaking } = useSpeechSynthesis({
    onStart: () => console.log('Started speaking'),
    onEnd: () => console.log('Finished speaking')
  });
  
  const { isListening, startListening, stopListening, isSupported } = useSpeechRecognition({
    onResult: (text) => {
      setTranscript(text);
      console.log('Transcript:', text);
    },
    onLanguageDetected: (lang) => {
      setDetectedLang(lang);
      console.log('Detected language:', lang);
    }
  });

  useEffect(() => {
    if (!isSupported) {
      console.warn('Speech recognition is not supported in this browser');
    }
  }, [isSupported]);

  const handleToggleListen = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleSpeak = () => {
    if (transcript) {
      speak(transcript, detectedLang || undefined);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex gap-4 justify-center">
        <button
          onClick={handleToggleListen}
          className={`px-4 py-2 rounded-lg ${
            isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
          } text-white transition-colors`}
        >
          {isListening ? 'Stop Listening' : 'Start Listening'}
        </button>
        
        <button
          onClick={handleSpeak}
          disabled={!transcript || isSpeaking}
          className={`px-4 py-2 rounded-lg ${
            isSpeaking || !transcript
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600'
          } text-white transition-colors`}
        >
          Speak Text
        </button>
      </div>

      <div className="space-y-2">
        <div className="font-semibold">Status:</div>
        <div className="space-y-1">
          <div>Recognition Supported: {isSupported ? '✅' : '❌'}</div>
          <div>Listening: {isListening ? '✅' : '❌'}</div>
          <div>Speaking: {isSpeaking ? '✅' : '❌'}</div>
          {detectedLang && <div>Detected Language: {detectedLang}</div>}
        </div>
      </div>

      <div className="space-y-2">
        <div className="font-semibold">Transcript:</div>
        <div className="p-4 bg-gray-100 rounded-lg min-h-[100px] whitespace-pre-wrap">
          {transcript || 'No transcript yet...'}
        </div>
      </div>
    </div>
  );
}