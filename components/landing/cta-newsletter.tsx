"use client"

import { motion } from "framer-motion"
import { Send, Bell, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { toast } from "sonner"

export function CTANewsletter() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      toast.success("Thank you for subscribing! We'll keep you posted.")
      setEmail("")
      setLoading(false)
    }, 1500)
  }

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative rounded-[3rem] bg-gradient-to-br from-primary via-primary/90 to-accent p-8 sm:p-16 lg:p-24 overflow-hidden border border-white/10 shadow-2xl">
          {/* Animated Background Elements */}
          <div className="absolute top-0 right-0 w-full h-full opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 0 L100 100 M100 0 L0 100" stroke="white" strokeWidth="0.1" />
            </svg>
          </div>
          
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-[100px]" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/20 rounded-full blur-[100px]" />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-bold mb-8"
            >
              <Bell className="w-4 h-4 animate-bounce" />
              Stay in the Loop
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-8 leading-tight"
            >
              Don't Miss the Next <br /> Big Creative Wave.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-white/80 mb-12 max-w-2xl mx-auto"
            >
              Join 5,000+ creatives and fans getting weekly updates about Edition 5 winners, 
              upcoming categories, and exclusive creative tips.
            </motion.p>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <div className="flex-1 relative group">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="h-16 px-6 rounded-2xl bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 transition-all text-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                disabled={loading}
                className="h-16 px-10 rounded-2xl bg-white text-primary font-black text-lg hover:bg-white/90 transition-all active:scale-95 shrink-0"
              >
                {loading ? "Joining..." : "Join Now"}
                <Send className="ml-3 w-5 h-5" />
              </Button>
            </motion.form>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex items-center justify-center gap-8"
            >
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <Sparkles className="w-4 h-4" />
                No Spam, Ever
              </div>
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <Sparkles className="w-4 h-4" />
                Unsubscribe anytime
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
