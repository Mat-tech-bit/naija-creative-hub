"use client"

import { motion } from "framer-motion"
import { Plus, Minus } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "How do I register for the competition?",
    answer: "Click the 'Register Now' button, fill out the multi-step registration form with your details, select your category (Photography, Fashion Design, or Graphics Design), upload your creative work, and submit. You'll receive a confirmation email once your registration is approved.",
  },
  {
    question: "How does voting work?",
    answer: "Voting is done through our secure payment system. Each vote costs ₦50, and supporters can purchase multiple votes at once. Votes are counted in real-time and displayed on the leaderboard. The contestant with the most votes in each category at the end of the voting period wins.",
  },
  {
    question: "Are votes refundable?",
    answer: "No, votes are non-refundable once purchased. This is clearly stated in our Terms & Conditions. Please ensure you're voting for the correct contestant before completing your purchase.",
  },
  {
    question: "Can I participate in multiple categories?",
    answer: "No, each contestant can only participate in one category per edition. However, you may participate in a different category in future editions.",
  },
  {
    question: "How are winners determined?",
    answer: "Winners are determined solely by the number of votes received during the voting period. The contestant with the highest number of votes in each category wins. In case of a tie, the contestant who reached that vote count first wins.",
  },
  {
    question: "When and how are prizes distributed?",
    answer: "Prizes are distributed within 7 business days after the official announcement of winners. Winners will be contacted via their registered email and phone number to verify their identity and provide payment details.",
  },
]

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="border-b border-border"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 text-left"
      >
        <span className="font-medium pr-8">{faq.question}</span>
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors",
          isOpen ? "bg-primary text-primary-foreground" : "bg-muted"
        )}>
          {isOpen ? (
            <Minus className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
        </div>
      </button>
      <div className={cn(
        "overflow-hidden transition-all duration-300",
        isOpen ? "max-h-96 pb-6" : "max-h-0"
      )}>
        <p className="text-muted-foreground leading-relaxed pr-16">
          {faq.answer}
        </p>
      </div>
    </motion.div>
  )
}

export function FAQSection() {
  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-medium mb-2 block"
            >
              Got Questions?
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold mb-4 text-balance"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground"
            >
              Everything you need to know about the competition.
            </motion.p>
          </div>

          {/* FAQs */}
          <div className="divide-y divide-border border-t border-border">
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
