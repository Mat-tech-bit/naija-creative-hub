"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { 
  Trophy, 
  Heart, 
  Search, 
  Filter,
  Camera,
  Palette,
  Brush,
  TrendingUp,
  Users,
  ArrowUp,
  ArrowDown,
  Minus
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

// Demo contestants data
const allContestants = [
  { id: "1", name: "Sarah Adeyemi", category: "photography", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop", work: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop", votes: 1234, rank: 1, change: "up" },
  { id: "2", name: "Michael Okonkwo", category: "graphics", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop", work: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=300&fit=crop", votes: 1156, rank: 2, change: "up" },
  { id: "3", name: "Chioma Eze", category: "fashion", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop", work: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop", votes: 1089, rank: 3, change: "same" },
  { id: "4", name: "David Nnamdi", category: "photography", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop", work: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=300&fit=crop", votes: 987, rank: 4, change: "down" },
  { id: "5", name: "Fatima Hassan", category: "graphics", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop", work: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop", votes: 876, rank: 5, change: "up" },
  { id: "6", name: "Emmanuel Obi", category: "fashion", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop", work: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=300&fit=crop", votes: 765, rank: 6, change: "same" },
  { id: "7", name: "Grace Amadi", category: "photography", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop", work: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop", votes: 723, rank: 7, change: "up" },
  { id: "8", name: "Oluwaseun Bello", category: "graphics", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop", work: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop", votes: 698, rank: 8, change: "down" },
  { id: "9", name: "Adaeze Nwankwo", category: "fashion", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop", work: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=300&fit=crop", votes: 654, rank: 9, change: "same" },
  { id: "10", name: "Tochukwu Ike", category: "photography", image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&h=200&fit=crop", work: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop", votes: 612, rank: 10, change: "up" },
  { id: "11", name: "Blessing Okoro", category: "graphics", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop", work: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=300&fit=crop", votes: 589, rank: 11, change: "down" },
  { id: "12", name: "Ikenna Chukwu", category: "fashion", image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop", work: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop", votes: 534, rank: 12, change: "same" },
]

const categories = [
  { id: "all", name: "All Categories", icon: Users },
  { id: "photography", name: "Photography", icon: Camera },
  { id: "fashion", name: "Fashion Design", icon: Palette },
  { id: "graphics", name: "Graphics Design", icon: Brush },
]

function Top3Spotlight({ contestants }: { contestants: typeof allContestants }) {
  const top3 = contestants.slice(0, 3)
  const positions = [1, 0, 2] // Order: 2nd, 1st, 3rd for visual display
  
  return (
    <div className="flex items-end justify-center gap-4 sm:gap-8 mb-12">
      {positions.map((pos, displayIndex) => {
        const contestant = top3[pos]
        if (!contestant) return null
        
        const isFirst = pos === 0
        const heights = ["h-32", "h-44", "h-28"]
        const scales = ["scale-100", "scale-110", "scale-100"]
        
        return (
          <motion.div
            key={contestant.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: displayIndex * 0.2 }}
            className={cn("relative", scales[displayIndex])}
          >
            <Link href={`/contestant/${contestant.id}`} className="block group">
              {/* Podium */}
              <div className={cn(
                "relative w-24 sm:w-32 rounded-t-2xl flex flex-col items-center justify-start pt-4",
                heights[displayIndex],
                pos === 0 ? "bg-gradient-to-b from-yellow-500/30 to-yellow-500/10" :
                pos === 1 ? "bg-gradient-to-b from-gray-400/30 to-gray-400/10" :
                "bg-gradient-to-b from-amber-700/30 to-amber-700/10"
              )}>
                {/* Trophy */}
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center mb-2",
                  pos === 0 ? "bg-yellow-500 text-yellow-950" :
                  pos === 1 ? "bg-gray-300 text-gray-800" :
                  "bg-amber-700 text-white"
                )}>
                  <Trophy className="w-6 h-6" />
                </div>
                
                {/* Position */}
                <div className="text-2xl font-bold">#{pos + 1}</div>
                
                {/* Votes */}
                <div className="flex items-center gap-1 mt-2 text-sm">
                  <Heart className="w-3 h-3 fill-red-500 text-red-500" />
                  {contestant.votes.toLocaleString()}
                </div>
              </div>
              
              {/* Profile Image - Positioned above podium */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2">
                <div className={cn(
                  "relative rounded-full overflow-hidden border-4 transition-transform group-hover:scale-105",
                  isFirst ? "w-24 h-24 sm:w-28 sm:h-28 border-yellow-500" : "w-20 h-20 sm:w-24 sm:h-24 border-muted"
                )}>
                  <Image
                    src={contestant.image}
                    alt={contestant.name}
                    fill
                    className="object-cover"
                  />
                </div>
                {isFirst && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
                    <span className="text-lg">👑</span>
                  </div>
                )}
              </div>
            </Link>
            
            {/* Name */}
            <p className="text-center font-medium mt-2 text-sm sm:text-base truncate w-24 sm:w-32">
              {contestant.name.split(" ")[0]}
            </p>
          </motion.div>
        )
      })}
    </div>
  )
}

function ContestantRow({ contestant, index }: { contestant: typeof allContestants[0]; index: number }) {
  const categoryIcons = {
    photography: Camera,
    fashion: Palette,
    graphics: Brush,
  }
  const Icon = categoryIcons[contestant.category as keyof typeof categoryIcons]
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/contestant/${contestant.id}`} className="block group">
        <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors">
          {/* Rank */}
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0",
            contestant.rank <= 3 
              ? contestant.rank === 1 ? "bg-yellow-500 text-yellow-950" :
                contestant.rank === 2 ? "bg-gray-300 text-gray-800" :
                "bg-amber-700 text-white"
              : "bg-muted text-muted-foreground"
          )}>
            {contestant.rank}
          </div>
          
          {/* Change Indicator */}
          <div className="w-6 shrink-0">
            {contestant.change === "up" && <ArrowUp className="w-4 h-4 text-green-500" />}
            {contestant.change === "down" && <ArrowDown className="w-4 h-4 text-red-500" />}
            {contestant.change === "same" && <Minus className="w-4 h-4 text-muted-foreground" />}
          </div>
          
          {/* Avatar & Name */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
              <Image
                src={contestant.image}
                alt={contestant.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="font-medium truncate group-hover:text-primary transition-colors">
                {contestant.name}
              </p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Icon className="w-3 h-3" />
                <span className="capitalize">{contestant.category.replace("graphics", "Graphics Design").replace("fashion", "Fashion Design").replace("photography", "Photography")}</span>
              </div>
            </div>
          </div>
          
          {/* Work Preview (hidden on mobile) */}
          <div className="hidden md:block relative w-20 h-14 rounded-lg overflow-hidden shrink-0">
            <Image
              src={contestant.work}
              alt={`${contestant.name}'s work`}
              fill
              className="object-cover"
            />
          </div>
          
          {/* Votes */}
          <div className="text-right shrink-0">
            <div className="font-bold text-lg">{contestant.votes.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">votes</div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function LeaderboardPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredContestants = allContestants.filter(contestant => {
    const matchesCategory = selectedCategory === "all" || contestant.category === selectedCategory
    const matchesSearch = contestant.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

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
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Live Rankings</span>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Leaderboard</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Real-time rankings of all contestants. Vote for your favorites to help them climb to the top!
            </p>
          </motion.div>

          {/* Top 3 Spotlight */}
          <div className="pt-20 mb-8">
            <Top3Spotlight contestants={filteredContestants} />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search contestants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "shrink-0",
                    selectedCategory === category.id && "gradient-primary border-0 text-white"
                  )}
                >
                  <category.icon className="w-4 h-4 mr-2" />
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Leaderboard List */}
          <div className="glass rounded-2xl p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 px-4">
              <span className="text-sm text-muted-foreground">
                {filteredContestants.length} contestants
              </span>
              <span className="text-sm text-muted-foreground">
                Edition 5
              </span>
            </div>
            
            <div className="divide-y divide-border">
              {filteredContestants.slice(3).map((contestant, index) => (
                <ContestantRow key={contestant.id} contestant={contestant} index={index} />
              ))}
            </div>

            {filteredContestants.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No contestants found</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
