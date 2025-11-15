'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

type Platform = 'tiktok' | 'reels' | 'youtube' | 'x' | 'linkedin'

interface PlatformSelectorProps {
  selectedPlatforms: Platform[]
  onSelect: (platforms: Platform[]) => void
  postedPlatforms: Platform[]
}

const platforms = [
  {
    id: 'tiktok' as const,
    name: 'TikTok',
    icon: '🎵',
    color: 'from-black to-gray-900',
  },
  {
    id: 'reels' as const,
    name: 'Reels',
    icon: '📸',
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 'youtube' as const,
    name: 'YouTube Shorts',
    icon: '▶️',
    color: 'from-red-500 to-red-700',
  },
  {
    id: 'x' as const,
    name: 'X (Twitter)',
    icon: '🐦',
    color: 'from-black to-gray-800',
  },
  {
    id: 'linkedin' as const,
    name: 'LinkedIn',
    icon: '💼',
    color: 'from-blue-600 to-blue-800',
  },
]

export default function PlatformSelector({
  selectedPlatforms,
  onSelect,
  postedPlatforms,
}: PlatformSelectorProps) {
  const togglePlatform = (platform: Platform) => {
    if (selectedPlatforms.includes(platform)) {
      onSelect(selectedPlatforms.filter(p => p !== platform))
    } else {
      onSelect([...selectedPlatforms, platform])
    }
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-4">
        Select Platforms to Post
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {platforms.map((platform) => {
          const isSelected = selectedPlatforms.includes(platform.id)
          const isPosted = postedPlatforms.includes(platform.id)
          
          return (
            <motion.button
              key={platform.id}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => !isPosted && togglePlatform(platform.id)}
              disabled={isPosted}
              className={`relative p-4 rounded-xl border-2 transition-all ${
                isPosted
                  ? 'border-emerald-500 bg-emerald-50 cursor-not-allowed shadow-sm'
                  : isSelected
                  ? 'border-blue-500 bg-blue-50 shadow-md shadow-blue-500/20'
                  : 'border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center mb-2.5 mx-auto text-2xl shadow-sm`}>
                {platform.icon}
              </div>
              <div className="text-center">
                <div className={`font-semibold text-xs ${isPosted ? 'text-emerald-700' : isSelected ? 'text-slate-900' : 'text-slate-700'}`}>
                  {platform.name}
                </div>
              </div>
              {isSelected && !isPosted && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center shadow-md"
                >
                  <span className="text-white text-xs font-bold">✓</span>
                </motion.div>
              )}
              {isPosted && (
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center shadow-md">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

