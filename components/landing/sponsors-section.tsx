"use client"

import { motion } from "framer-motion"
import Image from "next/image"

// Demo sponsor logos (using placeholder images since we can't use real logos)
const sponsors = [
  { name: "TechCorp", logo: "https://images.unsplash.com/photo-1614680376739-414d95ff43df?w=200&h=100&fit=crop" },
  { name: "DesignHub", logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=200&h=100&fit=crop" },
  { name: "CreativeStudio", logo: "https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=200&h=100&fit=crop" },
  { name: "MediaPro", logo: "https://images.unsplash.com/photo-1614680376739-414d95ff43df?w=200&h=100&fit=crop" },
  { name: "BrandWorks", logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=200&h=100&fit=crop" },
  { name: "VisualArts", logo: "https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=200&h=100&fit=crop" },
]

export function SponsorsSection() {
  return (
    <section className="py-16 bg-muted/30 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mb-8"
        >
          Trusted by leading brands and organizations
        </motion.p>
        
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative w-24 h-12 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all"
            >
              <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
                <span className="text-xs font-medium text-muted-foreground">{sponsor.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
