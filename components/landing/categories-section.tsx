"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Camera, Palette, Brush, ArrowRight } from "lucide-react"

const categories = [
  {
    name: "Photography",
    description: "Capture moments that tell powerful stories. From portraits to landscapes, showcase your unique perspective.",
    icon: Camera,
    color: "from-blue-500 to-cyan-500",
    contestants: 52,
    href: "/leaderboard?category=photography",
  },
  {
    name: "Fashion Design",
    description: "Create stunning fashion pieces that push boundaries. From sketches to finished designs, let your creativity shine.",
    icon: Palette,
    color: "from-pink-500 to-rose-500",
    contestants: 48,
    href: "/leaderboard?category=fashion",
  },
  {
    name: "Graphics Design",
    description: "Design visual masterpieces that communicate ideas. Digital art, branding, illustrations and more.",
    icon: Brush,
    color: "from-purple-500 to-indigo-500",
    contestants: 56,
    href: "/leaderboard?category=graphics",
  },
]

export function CategoriesSection() {
  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at center, currentColor 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-medium mb-2 block"
          >
            Competition Categories
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold mb-4 text-balance"
          >
            Three Paths to Glory
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground"
          >
            Choose your creative arena and compete against the best young talent in the country.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <Link href={category.href} className="block group h-full">
                <div className="relative h-full bg-card rounded-2xl border border-border p-8 overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                  {/* Gradient Background */}
                  <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${category.color} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`} />
                  
                  {/* Icon */}
                  <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-6`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3">{category.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {category.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-sm text-muted-foreground">
                      {category.contestants} contestants
                    </span>
                    <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
