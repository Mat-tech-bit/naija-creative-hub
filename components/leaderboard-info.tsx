"use client"

import { motion } from "framer-motion"
import { 
  ThumbsUp, 
  Wallet, 
  CheckCircle2, 
  Info,
  ShieldCheck,
  Zap,
  HelpCircle
} from "lucide-react"

const voteSteps = [
  {
    icon: ThumbsUp,
    title: "Choose Contestant",
    description: "Browse the leaderboard and select the creative whose work inspires you most."
  },
  {
    icon: Wallet,
    title: "Secure Payment",
    description: "Each vote costs just ₦50. We use Paystack for safe and secure digital transactions."
  },
  {
    icon: CheckCircle2,
    title: "Instant Verification",
    description: "Your vote is added immediately to the contestant's total after successful payment."
  }
]

export function LeaderboardInfo() {
  return (
    <div className="mt-20 space-y-24 pb-20">
      {/* How to Vote Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How to Vote</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Supporting your favorite talent is easy and secure. Follow these simple steps to cast your vote.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {voteSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl p-8 text-center relative overflow-hidden group hover:border-primary/30 transition-all"
            >
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Rules & Transparency */}
      <section className="glass rounded-[2rem] p-8 sm:p-12 border-primary/10 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary-foreground text-xs font-bold mb-4 uppercase tracking-widest">
              <ShieldCheck className="w-3 h-3" />
              Fair Play Guaranteed
            </div>
            <h2 className="text-3xl font-bold mb-6">Transparency & Rules</h2>
            <div className="space-y-6">
              {[
                {
                  title: "One Vote, Real Impact",
                  desc: "Every vote counts equally. Multiple votes are allowed to help your favorite contestant reach the top faster."
                },
                {
                  title: "Real-time Verification",
                  desc: "Our system synchronizes with the blockchain-inspired Firestore triggers to ensure zero double-counts."
                },
                {
                  title: "Weekly Audits",
                  desc: "The NaijaCreativeHub team performs weekly integrity checks on all vote counts and transaction logs."
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="glass p-6 rounded-2xl bg-green-500/5 border-green-500/10">
                <Zap className="w-6 h-6 text-green-500 mb-3" />
                <h4 className="font-bold text-sm">Fast Payment</h4>
                <p className="text-xs text-muted-foreground">{"Average checkout time < 30 seconds."}</p>
              </div>
              <div className="glass p-6 rounded-2xl bg-blue-500/5 border-blue-500/10">
                <HelpCircle className="w-6 h-6 text-blue-500 mb-3" />
                <h4 className="font-bold text-sm">Need Help?</h4>
                <p className="text-xs text-muted-foreground">24/7 Support via WhatsApp and Email.</p>
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="glass p-6 rounded-2xl bg-amber-500/5 border-amber-500/10">
                <Info className="w-6 h-6 text-amber-500 mb-3" />
                <h4 className="font-bold text-sm">About Prizes</h4>
                <p className="text-xs text-muted-foreground">Winners get 50% of the prize pool share.</p>
              </div>
              <div className="glass p-6 rounded-2xl bg-purple-500/5 border-purple-500/10">
                <ShieldCheck className="w-6 h-6 text-purple-500 mb-3" />
                <h4 className="font-bold text-sm">Secure Data</h4>
                <p className="text-xs text-muted-foreground">Your personal info is never shared.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-10">
        <h3 className="text-2xl font-bold mb-4">Want to be on this Leaderboard?</h3>
        <p className="text-muted-foreground mb-8">It's not too late to join the competition and showcase your talent to the world.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/register">
            <button className="px-8 h-14 rounded-2xl gradient-primary text-white font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all">
              Register to Compete
            </button>
          </a>
          <a href="/contact">
            <button className="px-8 h-14 rounded-2xl glass font-bold hover:bg-white/5 transition-all">
              Enquire More
            </button>
          </a>
        </div>
      </section>
    </div>
  )
}
