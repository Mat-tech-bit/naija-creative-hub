"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Trophy, Calendar, Medal } from "lucide-react"
import { Button } from "@/components/ui/button"

const pastWinners = [
  {
    id: "1",
    name: "Adaeze Nwachukwu",
    category: "Photography",
    edition: 4,
    prize: "₦300,000",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop",
    work: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop",
  },
  {
    id: "2",
    name: "Chukwuemeka Obi",
    category: "Graphics Design",
    edition: 4,
    prize: "₦300,000",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    work: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
  },
  {
    id: "3",
    name: "Folake Adeleke",
    category: "Fashion Design",
    edition: 4,
    prize: "₦300,000",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    work: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
  },
]

export function WinnersShowcaseSection() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-secondary font-medium mb-2 block"
            >
              Hall of Fame
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold text-balance"
            >
              Previous Winners
            </motion.h2>
          </div>
          <Link href="/winners">
            <Button variant="outline">View All Winners</Button>
          </Link>
        </div>

        {/* Winners Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {pastWinners.map((winner, index) => (
            <motion.div
              key={winner.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <Link href={`/contestant/${winner.id}`} className="group block">
                <div className="relative rounded-2xl overflow-hidden bg-card border border-border">
                  {/* Work Image */}
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                      src={winner.work}
                      alt={`${winner.name}'s winning work`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Trophy Badge */}
                    <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-secondary-foreground" />
                    </div>

                    {/* Edition Badge */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full glass">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-medium">Edition {winner.edition}</span>
                    </div>
                  </div>

                  {/* Winner Info */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-secondary">
                        <Image
                          src={winner.image}
                          alt={winner.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{winner.name}</h3>
                        <p className="text-sm text-muted-foreground">{winner.category}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-secondary">
                        <Medal className="w-5 h-5" />
                        <span className="font-bold">1st Place</span>
                      </div>
                      <span className="font-bold text-lg">{winner.prize}</span>
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
