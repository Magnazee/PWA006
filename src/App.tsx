import { useState } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { SpeechTest } from './components/SpeechTest';

function App() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <main className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Voice AI Assistant</h1>
          {detectedLanguage && (
            <p className="text-sm text-gray-600 mt-2">
              Detected Language: {detectedLanguage}
            </p>
          )}
        </header>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Speech Recognition Test</h2>
          <SpeechTest />
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setIsListening(!isListening)}
            className={`p-4 rounded-full ${
              isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
            } text-white transition-colors`}
          >
            {isListening ? <MicOff size={24} /> : <Mic size={24} />}
          </button>
          <button
            onClick={() => setIsSpeaking(!isSpeaking)}
            className={`p-4 rounded-full ${
              isSpeaking ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'
            } text-white transition-colors`}
          >
            {isSpeaking ? <Volume2 size={24} /> : <VolumeX size={24} />}
          </button>
        </div>

        <div className="space-y-4">
          <div className="h-96 border rounded-lg p-4 overflow-y-auto">
            <p className="text-gray-500 text-center">Start speaking to begin...</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;