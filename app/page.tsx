'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Video, Upload, CheckCircle, Loader2, Play, Zap } from 'lucide-react'
import VideoStyleSelector from '@/components/VideoStyleSelector'
import AgentActivityLog from '@/components/AgentActivityLog'
import VideoPreview from '@/components/VideoPreview'
import PlatformSelector from '@/components/PlatformSelector'

type VideoStyle = 'professional' | 'brainrot' | 'infoeducational' | null
type Platform = 'tiktok' | 'reels' | 'youtube' | 'x' | 'linkedin'

export default function Home() {
  const [inputText, setInputText] = useState('')
  const [selectedStyle, setSelectedStyle] = useState<VideoStyle>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null)
  const [agentLogs, setAgentLogs] = useState<string[]>([])
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([])
  const [isPosting, setIsPosting] = useState(false)
  const [postedPlatforms, setPostedPlatforms] = useState<Platform[]>([])

  const handleGenerate = async () => {
    if (!inputText.trim() || !selectedStyle) return

    setIsGenerating(true)
    setAgentLogs([])
    setGeneratedVideo(null)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: inputText,
          style: selectedStyle,
        }),
      })

      const data = await response.json()

      // Simulate agent activity logs
      const logs = [
        '🤖 Content Planner Agent: Analyzing your idea...',
        '✍️ Scriptwriter Agent: Creating platform-optimized scripts...',
        '🎙️ Voiceover Agent: Generating voice narration...',
        '🎨 Visual Design Agent: Selecting visuals and graphics...',
        '✂️ Editor Agent: Assembling final video...',
      ]

      for (let i = 0; i < logs.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 800))
        setAgentLogs(prev => [...prev, logs[i]])
      }

      setGeneratedVideo(data.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4')
    } catch (error) {
      console.error('Error generating video:', error)
      setAgentLogs(prev => [...prev, '❌ Error generating video. Please try again.'])
    } finally {
      setIsGenerating(false)
    }
  }

  const handlePost = async () => {
    if (selectedPlatforms.length === 0) return

    setIsPosting(true)
    setPostedPlatforms([])

    try {
      const response = await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          videoUrl: generatedVideo,
          platforms: selectedPlatforms,
        }),
      })

      const data = await response.json()

      // Simulate posting to each platform
      for (const platform of selectedPlatforms) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        setPostedPlatforms(prev => [...prev, platform])
      }
    } catch (error) {
      console.error('Error posting:', error)
    } finally {
      setIsPosting(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-slate-900 tracking-tight">
              AutoShort
            </h1>
          </div>
          <p className="text-2xl md:text-3xl text-slate-700 mb-3 font-medium">
            One Text → Instant Multi-Platform Content
          </p>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Transform your ideas into viral short-form videos across TikTok, Reels, YouTube Shorts, and more
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Input */}
            <motion.div
              initial={{ opacity: 1, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Text Input */}
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Your Idea
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Make a post about how paying off credit cards faster saves money..."
                  className="w-full h-36 bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm leading-relaxed transition-all"
                />
              </div>

              {/* Style Selector */}
              <VideoStyleSelector
                selectedStyle={selectedStyle}
                onSelect={setSelectedStyle}
              />

              {/* Generate Button */}
              <motion.button
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleGenerate}
                disabled={!inputText.trim() || !selectedStyle || isGenerating}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 px-6 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all text-base"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Generate Video
                  </>
                )}
              </motion.button>

              {/* Agent Activity Log */}
              {agentLogs.length > 0 && (
                <AgentActivityLog logs={agentLogs} />
              )}
            </motion.div>

            {/* Right Column - Preview & Post */}
            <motion.div
              initial={{ opacity: 1, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Video Preview */}
              {generatedVideo && (
                <VideoPreview videoUrl={generatedVideo} />
              )}

              {/* Platform Selector & Post */}
              {generatedVideo && (
                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                  <PlatformSelector
                    selectedPlatforms={selectedPlatforms}
                    onSelect={setSelectedPlatforms}
                    postedPlatforms={postedPlatforms}
                  />

                  <motion.button
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={handlePost}
                    disabled={selectedPlatforms.length === 0 || isPosting}
                    className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold py-4 px-6 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40 transition-all text-base"
                  >
                    {isPosting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Posting to {selectedPlatforms.length} platform{selectedPlatforms.length > 1 ? 's' : ''}...
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5" />
                        Post to Selected Platforms
                      </>
                    )}
                  </motion.button>
                </div>
              )}

              {/* Empty State */}
              {!generatedVideo && !isGenerating && (
                <div className="bg-white rounded-2xl p-16 border border-slate-200 shadow-sm text-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center mx-auto mb-6">
                    <Video className="w-10 h-10 text-blue-500" />
                  </div>
                  <p className="text-slate-500 text-base font-medium">
                    Your generated video will appear here
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}

