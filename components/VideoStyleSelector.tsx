'use client'

import { motion } from 'framer-motion'
import { Briefcase, Brain, GraduationCap } from 'lucide-react'

type VideoStyle = 'professional' | 'brainrot' | 'infoeducational' | null

interface VideoStyleSelectorProps {
  selectedStyle: VideoStyle
  onSelect: (style: VideoStyle) => void
}

const styles = [
  {
    id: 'professional' as const,
    name: 'Professional',
    icon: Briefcase,
    description: 'Business-focused, polished content',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'brainrot' as const,
    name: 'Brainrot',
    icon: Brain,
    description: 'Trendy, viral, meme-worthy',
    color: 'from-pink-500 to-purple-500',
  },
  {
    id: 'infoeducational' as const,
    name: 'Info-Educational',
    icon: GraduationCap,
    description: 'Informative and educational',
    color: 'from-green-500 to-emerald-500',
  },
]

export default function VideoStyleSelector({ selectedStyle, onSelect }: VideoStyleSelectorProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
      <label className="block text-sm font-semibold text-slate-700 mb-4">
        Video Style
      </label>
      <div className="grid grid-cols-3 gap-3">
        {styles.map((style) => {
          const Icon = style.icon
          const isSelected = selectedStyle === style.id
          
          return (
            <motion.button
              key={style.id}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(style.id)}
              className={`relative p-5 rounded-xl border-2 transition-all ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 shadow-md shadow-blue-500/20'
                  : 'border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${style.color} flex items-center justify-center mb-3 mx-auto shadow-sm`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-center">
                <div className={`font-semibold text-sm ${isSelected ? 'text-slate-900' : 'text-slate-700'}`}>
                  {style.name}
                </div>
                <div className="text-xs text-slate-500 mt-1.5 leading-tight">
                  {style.description}
                </div>
              </div>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-md"
                >
                  <span className="text-white text-xs font-bold">✓</span>
                </motion.div>
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

