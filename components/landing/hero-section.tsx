"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Play, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"

// const alumni = [alumni, setalumni] = usestate()

export function HeroSection() {
  const [stats, setStats] = useState({ votes: "...", contestants: "...", editions: "5", prize: "₦2M+" })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const usersRef = collection(db, "users")
        const snapshot = await getDocs(usersRef)
        const contestants = snapshot.docs.map(doc => doc.data())
        const totalVotes = contestants.reduce((acc: number, curr: any) => acc + (curr.votes || 0), 0)
        
        setStats({
          votes: totalVotes > 1000 ? `${(totalVotes / 1000).toFixed(1)}K+` : totalVotes.toLocaleString(),
          contestants: contestants.length.toLocaleString(),
          editions: "5",
          prize: "₦2M+"
        })
      } catch (error) {
        console.error("Error fetching hero stats:", error)
      }
    }
    fetchStats()
  }, [])

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-24 pb-12">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>
      
      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/20 blur-[100px] animate-float-delayed" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-secondary/20 blur-[80px] animate-float" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground mb-6 brush-stroke shadow-lg"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-wider">Edition 5 Now Live</span>
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-6 text-balance"
          >
            Naija <span className="gradient-text">Creates.</span><br />
            The World <span className="gradient-text">Celebrates.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed text-balance"
          >
            Join thousands of young creatives competing in Photography, Fashion Design, and Graphics Design. 
            Vote for your favorites and help shape the next generation of creative icons.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/register">
              <Button size="lg" className="gradient-primary border-0 text-white hover:opacity-90 h-14 px-8 text-base">
                Register Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/leaderboard">
              <Button size="lg" variant="outline" className="h-14 px-8 text-base group">
                Vote Contestants
                <span className="ml-2 w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Play className="w-4 h-4" />
                </span>
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 mt-16"
          >
            {[
              { value: stats.votes, label: "Votes Cast" },
              { value: stats.contestants, label: "Contestants" },
              { value: stats.editions, label: "Editions" },
              { value: stats.prize, label: "Prize Pool" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 rounded-full bg-primary"
          />
        </div>
      </motion.div>
    </section>
  )
}
