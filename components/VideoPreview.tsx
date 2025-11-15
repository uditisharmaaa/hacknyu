'use client'

import { motion } from 'framer-motion'
import { Play, CheckCircle } from 'lucide-react'
import { useState } from 'react'

interface VideoPreviewProps {
  videoUrl: string
}

export default function VideoPreview({ videoUrl }: VideoPreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-slate-900">Generated Video</h3>
        <div className="flex items-center gap-2 text-emerald-600">
          <CheckCircle className="w-5 h-5" />
          <span className="text-sm font-medium">Ready</span>
        </div>
      </div>
      
      <div className="relative aspect-[9/16] bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-inner">
        {!isPlaying ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 via-slate-50 to-cyan-50">
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsPlaying(true)}
                className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 mb-4"
              >
                <Play className="w-10 h-10 text-white ml-1" fill="white" />
              </motion.button>
              <p className="text-slate-600 text-sm font-medium">Click to play</p>
            </div>
          </div>
        ) : (
          <video
            src={videoUrl}
            controls
            preload="auto"
            className="w-full h-full object-cover"
            style={{ display: 'block' }}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onLoadedData={(e) => {
              // Make sure video is fully loaded and seekable
              const video = e.currentTarget as HTMLVideoElement
              video.currentTime = 0
            }}
          />
        )}
      </div>
      
      <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
        <p className="text-xs text-slate-500 mb-2 font-medium">Video Specs</p>
        <div className="flex gap-4 text-sm text-slate-700">
          <span>9:16 Aspect Ratio</span>
          <span className="text-slate-300">•</span>
          <span>1080x1920</span>
          <span className="text-slate-300">•</span>
          <span>15 seconds</span>
        </div>
      </div>
    </motion.div>
  )
}

