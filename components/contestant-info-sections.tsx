"use client"

import { motion } from "framer-motion"
import { 
  Zap, 
  Heart, 
  MessageSquare, 
  Star,
  ShieldCheck,
  CreditCard,
  History
} from "lucide-react"

const benefits = [
  {
    icon: Star,
    title: "Boost Visibility",
    description: "Your vote helps this creative reach the top of the leaderboard, gaining exposure to thousands of industry professionals."
  },
  {
    icon: Heart,
    title: "Support Dreams",
    description: "NaijaCreativeHub is about more than just a contest; it's about providing a platform for growth and recognition."
  },
  {
    icon: Zap,
    title: "Instant Impact",
    description: "Ranking up increases the chances of winning the grand prize and securing future creative opportunities."
  }
]

export function ContestantInfoSections() {
  return (
    <div className="mt-20 space-y-24 pb-20">
      {/* Why Support? */}
      <section>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black mb-4">The Impact of Your Support</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every vote is more than just a number—it's a step toward local creative excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-secondary/5 border border-secondary/10 hover:bg-secondary/10 transition-colors group"
            >
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                <benefit.icon className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Simplified Voting Guide */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-8 sm:p-16 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] -ml-48 -mb-48" />
        
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black mb-6">How to Vote effectively</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              New to NaijaCreativeHub? Here's the most secure way to make sure your support counts.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: CreditCard, t: "Use Secure Checkout", d: "Click 'Vote Now' and choose the number of votes. Pay securely via Paystack." },
                { icon: ShieldCheck, t: "Automatic Verification", d: "Wait for the success message. Our system verifies payment in real-time." },
                { icon: History, t: "Check the Feed", d: "See your name appear on the Wall of Support instantly!" }
              ].map((item, i) => (
                <div key={i} className="flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-background border border-white/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">{item.t}</h4>
                    <p className="text-muted-foreground text-sm">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="glass rounded-[2rem] p-8 space-y-6 border-white/10">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              </div>
              <p className="text-sm font-medium">Verified by Paystack Gateway</p>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-blue-500" />
              </div>
              <p className="text-sm font-medium">SSL Encrypted Transactions</p>
            </div>
            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
              <h4 className="font-bold flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-primary" />
                Pro-Tip
              </h4>
              <p className="text-sm text-muted-foreground italic">
                "Sharing the link with 5 friends can triple the contestant's rank in hours!"
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function CheckCircle2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
