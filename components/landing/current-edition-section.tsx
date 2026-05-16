"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Clock, Calendar, Trophy, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

// Set contest end date (30 days from now for demo)
const CONTEST_END_DATE = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

function calculateTimeLeft(): TimeLeft {
  const difference = CONTEST_END_DATE.getTime() - new Date().getTime()
  
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }
  
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl glass flex items-center justify-center">
          <span className="text-3xl sm:text-4xl font-bold gradient-text">
            {value.toString().padStart(2, "0")}
          </span>
        </div>
        <div className="absolute -inset-1 rounded-2xl bg-primary/20 blur-xl -z-10" />
      </div>
      <span className="text-xs sm:text-sm text-muted-foreground mt-3 uppercase tracking-wider">
        {label}
      </span>
    </div>
  )
}

export function CurrentEditionSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          {/* Edition Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass mb-6">
              <Trophy className="w-5 h-5 text-secondary" />
              <span className="font-semibold">Edition 5</span>
              <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
                LIVE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">
              The Ultimate Creative Showdown
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Edition 5 is in full swing! Cast your votes and help crown the next creative champions.
            </p>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex items-center justify-center gap-2 text-muted-foreground mb-6">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Voting ends in</span>
            </div>
            <div className="flex items-center justify-center gap-4 sm:gap-6">
              <CountdownUnit value={timeLeft.days} label="Days" />
              <span className="text-2xl font-bold text-muted-foreground mt-[-20px]">:</span>
              <CountdownUnit value={timeLeft.hours} label="Hours" />
              <span className="text-2xl font-bold text-muted-foreground mt-[-20px]">:</span>
              <CountdownUnit value={timeLeft.minutes} label="Minutes" />
              <span className="text-2xl font-bold text-muted-foreground mt-[-20px] hidden sm:block">:</span>
              <div className="hidden sm:block">
                <CountdownUnit value={timeLeft.seconds} label="Seconds" />
              </div>
            </div>
          </motion.div>

          {/* Edition Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {[
              { icon: Users, value: "156", label: "Contestants" },
              { icon: Trophy, value: "₦500K", label: "Grand Prize" },
              { icon: Calendar, value: "30", label: "Days Left" },
              { icon: Clock, value: "8,432", label: "Total Votes" },
            ].map((stat, index) => (
              <div
                key={index}
                className="glass rounded-xl p-4 sm:p-6 text-center"
              >
                <stat.icon className="w-6 h-6 text-primary mx-auto mb-3" />
                <div className="text-xl sm:text-2xl font-bold">{stat.value}</div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <Link href="/editions/5">
              <Button size="lg" className="gradient-primary border-0 text-white hover:opacity-90">
                View Current Edition
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
