"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { 
  Trophy, 
  Medal, 
  Award,
  Calendar,
  ThumbsUp,
  Camera,
  Palette,
  Brush,
  Filter,
  Sparkles
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Demo winners data
const allWinners = [
  // Edition 5 (Current - In Progress)
  // Edition 4
  { id: "w1", name: "Adaeze Nwachukwu", category: "photography", position: 1, prize: "₦300,000", votes: 2456, edition: 4, image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop", work: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop" },
  { id: "w2", name: "Chukwuemeka Obi", category: "graphics", position: 1, prize: "₦300,000", votes: 2234, edition: 4, image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop", work: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop" },
  { id: "w3", name: "Folake Adeleke", category: "fashion", position: 1, prize: "₦300,000", votes: 2123, edition: 4, image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop", work: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop" },
  { id: "w4", name: "Ibrahim Musa", category: "photography", position: 2, prize: "₦150,000", votes: 1987, edition: 4, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", work: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&h=400&fit=crop" },
  { id: "w5", name: "Ngozi Okafor", category: "graphics", position: 2, prize: "₦150,000", votes: 1876, edition: 4, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop", work: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop" },
  { id: "w6", name: "Yusuf Abdullahi", category: "fashion", position: 2, prize: "₦150,000", votes: 1765, edition: 4, image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop", work: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=400&fit=crop" },
  // Edition 3
  { id: "w7", name: "Blessing Okoro", category: "photography", position: 1, prize: "₦250,000", votes: 1890, edition: 3, image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop", work: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop" },
  { id: "w8", name: "Tunde Bakare", category: "graphics", position: 1, prize: "₦250,000", votes: 1756, edition: 3, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", work: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=600&h=400&fit=crop" },
  { id: "w9", name: "Amara Eze", category: "fashion", position: 1, prize: "₦250,000", votes: 1654, edition: 3, image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop", work: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=400&fit=crop" },
  // Edition 2
  { id: "w10", name: "Chidera Nnamdi", category: "photography", position: 1, prize: "₦200,000", votes: 1543, edition: 2, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop", work: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=400&fit=crop" },
  { id: "w11", name: "Hadiza Mohammed", category: "graphics", position: 1, prize: "₦200,000", votes: 1432, edition: 2, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop", work: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=600&h=400&fit=crop" },
  { id: "w12", name: "Emeka Chukwu", category: "fashion", position: 1, prize: "₦200,000", votes: 1321, edition: 2, image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop", work: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop" },
]

const editions = [
  { id: "all", name: "All Editions" },
  { id: 4, name: "Edition 4" },
  { id: 3, name: "Edition 3" },
  { id: 2, name: "Edition 2" },
]

const categoryIcons = {
  photography: Camera,
  fashion: Palette,
  graphics: Brush,
}

function WinnerCard({ winner, index }: { winner: typeof allWinners[0]; index: number }) {
  const Icon = categoryIcons[winner.category as keyof typeof categoryIcons]
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="block group cursor-default">
        <div className="relative bg-card rounded-2xl border border-border overflow-hidden transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
          {/* Work Image */}
          <div className="relative aspect-[3/2] overflow-hidden">
            <Image
              src={winner.work}
              alt={`${winner.name}'s winning work`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            {/* Position Badge */}
            <div className="absolute top-4 left-4">
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center shadow-lg",
                winner.position === 1 ? "bg-yellow-500 text-yellow-950" :
                winner.position === 2 ? "bg-gray-300 text-gray-800" :
                "bg-amber-700 text-white"
              )}>
                {winner.position === 1 ? (
                  <Trophy className="w-6 h-6" />
                ) : winner.position === 2 ? (
                  <Medal className="w-6 h-6" />
                ) : (
                  <Award className="w-6 h-6" />
                )}
              </div>
            </div>

            {/* Edition Badge */}
            <div className="absolute top-4 right-4">
              <div className="px-3 py-1.5 rounded-full glass border border-white/10 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
                <Calendar className="w-3 h-3" />
                Edition {winner.edition}
              </div>
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-white/70" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">
                  {winner.category.replace("graphics", "Graphics Design").replace("fashion", "Fashion Design")}
                </span>
              </div>
            </div>
          </div>

          {/* Winner Info */}
          <div className="p-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-secondary/50 shadow-inner">
                <Image
                  src={winner.image}
                  alt={winner.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                  {winner.name}
                </h3>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {winner.position === 1 ? "1st Place Winner" :
                   winner.position === 2 ? "2nd Place Winner" :
                   "3rd Place Winner"}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4 fill-primary text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  {winner.votes.toLocaleString()} <span className="text-[10px] uppercase opacity-60">votes</span>
                </span>
              </div>
              <span className="font-black text-xl gradient-text">{winner.prize}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function WinnersPage() {
  const [selectedEdition, setSelectedEdition] = useState<number | "all">("all")

  const filteredWinners = allWinners.filter(winner => 
    selectedEdition === "all" || winner.edition === selectedEdition
  )

  // Group winners by position for the featured section
  const firstPlaceWinners = filteredWinners.filter(w => w.position === 1)

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium">Hall of Fame</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Our Champions</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Celebrating the creative talents who rose to the top. These winners have inspired thousands with their exceptional work.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { value: "12", label: "Total Winners" },
              { value: "₦2.5M+", label: "Prizes Awarded" },
              { value: "4", label: "Editions Completed" },
              { value: "15K+", label: "Votes Cast" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-xl p-4 sm:p-6 text-center"
              >
                <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Edition Filter */}
          <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-2">
            <Filter className="w-5 h-5 text-muted-foreground shrink-0" />
            {editions.map((edition) => (
              <Button
                key={edition.id}
                variant={selectedEdition === edition.id ? "default" : "outline"}
                onClick={() => setSelectedEdition(edition.id as number | "all")}
                className={cn(
                  "shrink-0",
                  selectedEdition === edition.id && "gradient-primary border-0 text-white"
                )}
              >
                {edition.name}
              </Button>
            ))}
          </div>

          {/* Featured First Place Winners */}
          {firstPlaceWinners.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Grand Prize Winners
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {firstPlaceWinners.map((winner, index) => (
                  <WinnerCard key={winner.id} winner={winner} index={index} />
                ))}
              </div>
            </div>
          )}

          {/* All Winners */}
          <div>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              All Winners
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWinners.map((winner, index) => (
                <WinnerCard key={winner.id} winner={winner} index={index} />
              ))}
            </div>

            {filteredWinners.length === 0 && (
              <div className="text-center py-12 glass rounded-2xl">
                <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No winners found for this selection</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
