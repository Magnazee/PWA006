# PWA006 - Multilingual Voice AI Assistant

A Progressive Web Application that provides a voice interface for the Claude AI assistant with automatic language detection and natural speech synthesis.

## Features

- Real-time speech recognition
- Automatic language detection
- Natural text-to-speech synthesis
- Claude AI integration
- PWA support for offline capabilities
- Responsive design with Tailwind CSS

## Technical Stack

- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Web Speech API for voice features
- Franc for language detection
- Claude API for AI interaction

## Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file with your Claude API key:
   ```
   VITE_CLAUDE_API_KEY=your_api_key_here
   VITE_CLAUDE_API_URL=your_api_endpoint
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

- `/src`
  - `/components` - React components
  - `/hooks` - Custom React hooks
  - `/services` - API and service interfaces
  - `App.tsx` - Main application component
  - `main.tsx` - Application entry point

## Voice Features

- Speech Recognition
  - Continuous listening mode
  - Interim results for real-time feedback
  - Automatic language detection

- Speech Synthesis
  - Multiple voice options
  - Language-specific voice selection
  - Natural pronunciation

## Contributing

This is part of the "Project in a Day" series. Feel free to submit issues and enhancement requests.