"use client"

import { motion } from "framer-motion"
import { UserPlus, Upload, Vote, Trophy } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    title: "Register",
    description: "Sign up with your details and choose your creative category.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Upload,
    title: "Submit Your Work",
    description: "Upload your best creative work along with your story and inspiration.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Vote,
    title: "Get Votes",
    description: "Share your profile and gather votes from friends, family, and fans.",
    color: "from-purple-500 to-indigo-500",
  },
  {
    icon: Trophy,
    title: "Win Prizes",
    description: "Top contestants win cash prizes, recognition, and amazing opportunities.",
    color: "from-amber-500 to-orange-500",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-6 border border-primary/20"
          >
            The Roadmap
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-balance tracking-tighter leading-tight"
          >
            How It <span className="gradient-text">Works</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-medium opacity-80"
          >
            A simple four-step process designed to empower your creative journey and connect you with global recognition.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-transparent via-border to-transparent" />
          
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative text-center"
            >
              {/* Step Number */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold z-10">
                {index + 1}
              </div>

              {/* Icon */}
              <div className={`relative w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6`}>
                <step.icon className="w-10 h-10 text-white" />
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-30 blur-xl`} />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
