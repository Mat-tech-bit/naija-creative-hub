"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Heart, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useRef } from "react"

// Demo featured contestants data
const featuredContestants = [
  {
    id: "1",
    name: "Sarah Adeyemi",
    category: "Photography",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    work: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&h=800&fit=crop",
    votes: 1234,
    rank: 1,
  },
  {
    id: "2",
    name: "Michael Okonkwo",
    category: "Graphics Design",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    work: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=600&h=800&fit=crop",
    votes: 1156,
    rank: 2,
  },
  {
    id: "3",
    name: "Chioma Eze",
    category: "Fashion Design",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    work: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop",
    votes: 1089,
    rank: 3,
  },
  {
    id: "4",
    name: "David Nnamdi",
    category: "Photography",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    work: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=800&fit=crop",
    votes: 987,
    rank: 4,
  },
  {
    id: "5",
    name: "Fatima Hassan",
    category: "Graphics Design",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    work: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=800&fit=crop",
    votes: 876,
    rank: 5,
  },
  {
    id: "6",
    name: "Emmanuel Obi",
    category: "Fashion Design",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    work: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop",
    votes: 765,
    rank: 6,
  },
]

function ContestantCard({ contestant, index }: { contestant: typeof featuredContestants[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative flex-shrink-0 w-[280px] sm:w-[320px]"
    >
      <Link href={`/contestant/${contestant.id}`}>
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
          {/* Work Image */}
          <Image
            src={contestant.work}
            alt={`${contestant.name}'s work`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Rank Badge */}
          <div className="absolute top-4 left-4">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
              ${contestant.rank === 1 ? 'bg-secondary text-secondary-foreground' :
                contestant.rank === 2 ? 'bg-gray-300 text-gray-800' :
                contestant.rank === 3 ? 'bg-amber-700 text-white' :
                'bg-muted text-muted-foreground'}
            `}>
              #{contestant.rank}
            </div>
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 rounded-full glass text-xs font-medium">
              {contestant.category}
            </span>
          </div>

          {/* Bottom Info */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex items-end justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
                  <Image
                    src={contestant.image}
                    alt={contestant.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{contestant.name}</h3>
                  <div className="flex items-center gap-1.5 text-white/70 text-sm">
                    <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                    <span>{contestant.votes.toLocaleString()} votes</span>
                  </div>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export function FeaturedContestantsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 340
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
      setTimeout(checkScroll, 300)
    }
  }

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
              className="text-primary font-medium mb-2 block"
            >
              Top Talent
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold text-balance"
            >
              Featured Contestants
            </motion.h2>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {featuredContestants.map((contestant, index) => (
            <ContestantCard key={contestant.id} contestant={contestant} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/leaderboard">
            <Button variant="outline" size="lg">
              View All Contestants
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
