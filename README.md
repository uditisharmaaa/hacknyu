# AutoShort 🚀

**One Text → Instant Multi-Platform Short-Form Content**

Transform your ideas into viral short-form content across TikTok, Reels, YouTube Shorts, X, and LinkedIn in under 1 minute.

## ✨ Features

- **Multi-Agent System**: AI agents collaborate to plan, script, voice, design, and edit your content
- **Style Selection**: Choose from Professional, Brainrot, or Info-Educational styles
- **Auto-Posting**: Automatically post to multiple social media platforms
- **Beautiful UI**: Modern, responsive design with real-time agent activity visualization
- **Video Preview**: Review your generated content before posting

## 🏗️ Architecture

### Multi-Agent System

1. **Content Planner Agent**: Analyzes your idea and creates a narrative plan
2. **Scriptwriter Agent**: Writes platform-optimized scripts
3. **Voiceover Agent**: Generates voice narration using ElevenLabs
4. **Visual Design Agent**: Selects visuals, graphics, and styling
5. **Editor Agent**: Assembles audio + visuals into final video
6. **Scheduler Agent**: Determines optimal posting times
7. **Posting Agent**: Uploads to social media platforms

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd hacknyu
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file:
```env
OPENAI_API_KEY=your_openai_api_key
ELEVENLABS_API_KEY=your_elevenlabs_api_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 Usage

1. Enter your idea in the text input
2. Select a video style (Professional, Brainrot, or Info-Educational)
3. Click "Generate Video"
4. Watch the agents work in real-time
5. Review your generated video
6. Select platforms to post to
7. Click "Post to Selected Platforms"

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes
- **AI**: OpenAI GPT-4, ElevenLabs (for voice)
- **Video**: Remotion (for video generation)

## 📝 API Routes

- `POST /api/generate` - Generate video from text
- `POST /api/post` - Post video to social media platforms

## 🎨 Customization

The app is fully customizable:
- Modify agent prompts in `/app/api/generate/route.ts`
- Adjust styling in `tailwind.config.js`
- Add new platforms in `/app/api/post/route.ts`

## 🚧 MVP Status

This is an MVP for hackathon demonstration. Current features:
- ✅ Multi-agent system architecture
- ✅ Beautiful UI with real-time agent logs
- ✅ Video style selection
- ✅ Platform selection and posting simulation
- ⚠️ Video generation uses placeholder (integrate actual video generation)
- ⚠️ Social media APIs are mocked (integrate real APIs for production)

## 🔮 Future Enhancements

- Real video generation with FFmpeg/Remotion
- Actual social media API integrations
- Analytics dashboard
- Batch processing
- Custom voice selection
- A/B testing for captions

## 📄 License

MIT

## 👥 Team

Built for HackNYU 2024

---

**Made with ❤️ for the hackathon**

