"use client"

import { motion } from "framer-motion"

const sponsors = [
  { name: "TechCorp" },
  { name: "DesignHub" },
  { name: "CreativeStudio" },
  { name: "MediaPro" },
  { name: "BrandWorks" },
  { name: "VisualArts" },
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
              className="relative px-6 py-3 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all"
            >
              <div className="bg-muted rounded-lg flex items-center justify-center border border-border">
                <span className="text-sm font-bold text-muted-foreground p-2">{sponsor.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
