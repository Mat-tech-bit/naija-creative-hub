"use client"

import { motion } from "framer-motion"
import { 
  Search, 
  CreditCard, 
  Trophy, 
  Share2,
  CheckCircle2,
  Zap,
  ShieldCheck
} from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Discover",
    description: "Explore the different categories and find a creative whose work resonates with you.",
    color: "bg-blue-500/10 text-blue-500"
  },
  {
    icon: CreditCard,
    title: "Cast Vote",
    description: "Support them with as little as ₦50. Use our secure Paystack gateway for transactions.",
    color: "bg-primary/10 text-primary"
  },
  {
    icon: Trophy,
    title: "Win Together",
    description: "Your support increases their chances of winning. Watch them move up the leaderboard!",
    color: "bg-amber-500/10 text-amber-500"
  },
  {
    icon: Share2,
    title: "Spread Word",
    description: "Share the contestant's profile with your network to multiply the impact of your vote.",
    color: "bg-purple-500/10 text-purple-500"
  }
]

export function VoterGuideSection() {
  return (
    <section className="py-16 bg-muted/20 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] -ml-64 -mb-64" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4 uppercase tracking-widest"
          >
            <Zap className="w-3 h-3" />
            For Supporters
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black mb-6"
          >
            How to Support <br className="hidden sm:block" /> Your Favorite Talent
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            Supporting a creative is simple, secure, and has a lasting impact on their career journey.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-8 rounded-3xl border-white/5 hover:border-primary/20 transition-all group"
            >
              <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <step.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 p-8 rounded-[2rem] glass border-primary/10 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h4 className="font-bold">100% Secure Payments</h4>
              <p className="text-sm text-muted-foreground">Transactions processed via Paystack</p>
            </div>
          </div>
          
          <div className="hidden md:block h-12 w-px bg-border/50" />

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h4 className="font-bold">Privacy Guaranteed</h4>
              <p className="text-sm text-muted-foreground">Your data is never shared with third parties</p>
            </div>
          </div>

          <div className="hidden md:block h-12 w-px bg-border/50" />

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <h4 className="font-bold">Instant Updates</h4>
              <p className="text-sm text-muted-foreground">Votes reflect on leaderboard immediately</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
