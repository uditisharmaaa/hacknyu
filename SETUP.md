# Quick Setup Guide 🚀

## Installation Steps

1. **Install dependencies:**
```bash
npm install
```

2. **Create environment file (optional for MVP):**
Create a `.env.local` file in the root directory:
```env
OPENAI_API_KEY=your_key_here
ELEVENLABS_API_KEY=your_key_here
```

Note: The app works without API keys for demo purposes (uses mock responses).

3. **Run the development server:**
```bash
npm run dev
```

4. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

## Demo Mode

The app works in demo mode without API keys:
- ✅ Beautiful UI and interactions
- ✅ Agent activity visualization
- ✅ Video style selection
- ✅ Platform selection
- ✅ Mock video generation and posting

## For Production

To enable real video generation:
1. Add your OpenAI API key to `.env.local`
2. Add your ElevenLabs API key (optional)
3. Integrate actual video generation (FFmpeg/Remotion)
4. Connect real social media APIs

## Troubleshooting

- **Port 3000 already in use?** Use `npm run dev -- -p 3001`
- **Dependencies not installing?** Try `rm -rf node_modules package-lock.json && npm install`
- **Build errors?** Check Node.js version (requires 18+)

## Tech Stack Quick Reference

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Lucide React (icons)

Enjoy your hackathon demo! 🎉

