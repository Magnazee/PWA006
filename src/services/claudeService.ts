interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ConversationState {
  messages: Message[];
  currentLanguage: string | null;
}

export class ClaudeService {
  private apiUrl: string;
  private apiKey: string | null;

  constructor() {
    this.apiUrl = import.meta.env.VITE_CLAUDE_API_URL || '/api/claude';
    this.apiKey = null;
  }

  setApiKey(key: string) {
    this.apiKey = key;
  }

  async sendMessage(message: string, language: string | null, conversationState: ConversationState): Promise<string> {
    if (!this.apiKey) {
      throw new Error('API key not set');
    }

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          messages: [
            ...conversationState.messages,
            { role: 'user', content: message }
          ],
          language: language,
          model: 'claude-3-opus-20240229'
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error calling Claude API:', error);
      throw error;
    }
  }
}