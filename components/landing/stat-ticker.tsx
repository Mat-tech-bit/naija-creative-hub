"use client"

import { motion } from "framer-motion"

const items = [
  "₦1,000,000+ TOTAL PRIZE POOL",
  "500+ CREATIVE SUBMISSIONS",
  "10,000+ VOTES CAST",
  "EDITION 5 IS LIVE",
  "NIGERIA'S LARGEST CREATIVE CONTEST",
  "SPONSORED BY TOP BRANDS",
  "JOIN THE MOVEMENT",
  "SUPPORT LOCAL TALENT"
]

export function StatTicker() {
  return (
    <div className="bg-primary/5 py-5 border-y border-white/5 overflow-hidden relative">
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          className="flex gap-24 items-center px-8"
        >
          {items.concat(items).map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-primary/70">
                {item}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Gradients to mask edges */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
    </div>
  )
}
