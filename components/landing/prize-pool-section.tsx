"use client"

import { motion } from "framer-motion"
import { Trophy, Medal, Award, Gift, Star } from "lucide-react"

const prizes = [
  {
    position: "1st Place",
    prize: "₦300,000",
    icon: Trophy,
    color: "from-yellow-400 to-amber-500",
    perks: ["Cash Prize", "Professional Photoshoot", "Media Feature", "Certificate"],
    featured: true,
  },
  {
    position: "2nd Place",
    prize: "₦150,000",
    icon: Medal,
    color: "from-gray-300 to-gray-400",
    perks: ["Cash Prize", "Media Feature", "Certificate"],
    featured: false,
  },
  {
    position: "3rd Place",
    prize: "₦50,000",
    icon: Award,
    color: "from-amber-600 to-amber-700",
    perks: ["Cash Prize", "Certificate"],
    featured: false,
  },
]

export function PrizePoolSection() {
  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-secondary/10 blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-primary/10 blur-[100px]" />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-secondary font-medium mb-2 block"
          >
            Win Big
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold mb-4 text-balance"
          >
            Prize Pool Worth ₦500,000+
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground"
          >
            Top performers in each category take home amazing prizes and recognition.
          </motion.p>
        </div>

        {/* Prizes Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto items-end">
          {/* 2nd Place */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="order-2 md:order-1"
          >
            <PrizeCard prize={prizes[1]} />
          </motion.div>

          {/* 1st Place (Featured) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="order-1 md:order-2"
          >
            <PrizeCard prize={prizes[0]} />
          </motion.div>

          {/* 3rd Place */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="order-3"
          >
            <PrizeCard prize={prizes[2]} />
          </motion.div>
        </div>

        {/* Additional Perks */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="glass rounded-2xl p-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Gift className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Plus More Rewards</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              All top 10 finalists receive exclusive perks and opportunities.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {["Social Media Feature", "Brand Partnerships", "Mentorship Access", "Community Recognition"].map((perk) => (
                <span
                  key={perk}
                  className="px-4 py-2 rounded-full bg-muted text-sm font-medium"
                >
                  {perk}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function PrizeCard({ prize }: { prize: typeof prizes[0] }) {
  return (
    <div className={`relative bg-card rounded-2xl border ${prize.featured ? 'border-secondary' : 'border-border'} p-6 sm:p-8 text-center ${prize.featured ? 'scale-105 shadow-2xl shadow-secondary/20' : ''}`}>
      {prize.featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-bold">
          GRAND PRIZE
        </div>
      )}
      
      {/* Icon */}
      <div className={`relative w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${prize.color} flex items-center justify-center mb-6 ${prize.featured ? 'w-24 h-24' : ''}`}>
        <prize.icon className={`text-white ${prize.featured ? 'w-12 h-12' : 'w-10 h-10'}`} />
        {prize.featured && (
          <div className="absolute -top-1 -right-1">
            <Star className="w-6 h-6 text-secondary fill-secondary" />
          </div>
        )}
      </div>

      {/* Position */}
      <div className="text-sm text-muted-foreground mb-2">{prize.position}</div>

      {/* Prize Amount */}
      <div className={`font-bold mb-6 ${prize.featured ? 'text-4xl gradient-text' : 'text-2xl'}`}>
        {prize.prize}
      </div>

      {/* Perks */}
      <ul className="space-y-2">
        {prize.perks.map((perk) => (
          <li key={perk} className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {perk}
          </li>
        ))}
      </ul>
    </div>
  )
}
