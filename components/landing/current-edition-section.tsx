"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Clock, Calendar, Trophy, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

// Set contest end date (30 days from now for demo)
const CONTEST_END_DATE = new Date("2024-12-31T23:59:59")

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
  const [stats, setStats] = useState({ contestants: "...", votes: "...", daysLeft: "..." })

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    const fetchStats = async () => {
      try {
        const usersRef = collection(db, "users")
        const snapshot = await getDocs(usersRef)
        const contestants = snapshot.docs.map(doc => doc.data())
        const totalVotes = contestants.reduce((acc: number, curr: any) => acc + (curr.votes || 0), 0)
        
        const diff = CONTEST_END_DATE.getTime() - new Date().getTime()
        const daysLeft = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)))

        setStats({
          contestants: contestants.length.toString(),
          votes: totalVotes.toLocaleString(),
          daysLeft: daysLeft.toString()
        })
      } catch (error) {
        console.error("Error fetching edition stats:", error)
      }
    }
    fetchStats()

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
              { icon: Users, value: stats.contestants, label: "Participants" },
              { icon: Trophy, value: "₦1M+", label: "Prize Pool" },
              { icon: Calendar, value: stats.daysLeft, label: "Days Left" },
              { icon: Clock, value: stats.votes, label: "Total Votes" },
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
            <Link href="/editions">
              <Button size="lg" className="gradient-primary border-0 text-white hover:opacity-90 px-8 h-14 rounded-xl font-bold shadow-lg shadow-primary/20">
                View Current Edition
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
