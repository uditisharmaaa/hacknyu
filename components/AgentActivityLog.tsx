'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Loader2 } from 'lucide-react'

interface AgentActivityLogProps {
  logs: string[]
}

export default function AgentActivityLog({ logs }: AgentActivityLogProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
          <Bot className="w-4 h-4 text-blue-600" />
        </div>
        <h3 className="text-sm font-semibold text-slate-700">Agent Activity</h3>
      </div>
      <div className="space-y-2.5 max-h-64 overflow-y-auto">
        <AnimatePresence>
          {logs.map((log, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start gap-3 text-sm p-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
              {log.includes('Error') ? (
                <span className="text-red-500 text-base">❌</span>
              ) : log.includes('...') ? (
                <Loader2 className="w-4 h-4 text-blue-500 animate-spin mt-0.5" />
              ) : (
                <span className="text-emerald-500 text-base">✓</span>
              )}
              <span className="text-slate-700 flex-1">{log}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

