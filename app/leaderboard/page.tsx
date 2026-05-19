"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { motion } from "framer-motion"
import { 
  Trophy, 
  ThumbsUp, 
  Search, 
  Camera,
  Palette,
  Brush,
  TrendingUp,
  Users,
  User
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

import { useSearchParams, useRouter } from "next/navigation"

interface ContestantItem {
  id: string
  name: string
  category: string
  categoryId: string
  image: string
  work: string
  votes: number
  rank: number
}

const categories = [
  { id: "all", name: "All Categories", icon: Users },
  { id: "photography", name: "Photography", icon: Camera },
  { id: "fashion", name: "Fashion Design", icon: Palette },
  { id: "graphics", name: "Graphics Design", icon: Brush },
]

const categoryIcons: Record<string, React.ElementType> = {
  photography: Camera,
  fashion: Palette,
  graphics: Brush,
}

function Top3Spotlight({ contestants }: { contestants: ContestantItem[] }) {
  const top3 = contestants.slice(0, 3)
  const positions = top3.length === 1 ? [0] : top3.length === 2 ? [1, 0] : [1, 0, 2]
  
  return (
    <div className="flex items-end justify-center gap-2 sm:gap-8 mb-12 px-4">
      {positions.map((pos, displayIndex) => {
        const contestant = top3[pos]
        if (!contestant) return null
        
        const isFirst = pos === 0
        const heights = top3.length === 1 ? ["h-44"] : top3.length === 2 ? ["h-32", "h-44"] : ["h-32", "h-44", "h-28"]
        const scales = top3.length === 1 ? ["scale-110"] : top3.length === 2 ? ["scale-[0.9]", "scale-110"] : ["scale-[0.85]", "scale-110", "scale-[0.8]"]
        
        return (
          <motion.div
            key={contestant.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: displayIndex * 0.2 }}
            className={cn("relative", scales[displayIndex])}
          >
            <Link href={`/contestant/${contestant.id}`} className="block group">
              <div className={cn(
                "relative w-24 sm:w-32 rounded-t-2xl flex flex-col items-center justify-start pt-4",
                heights[displayIndex],
                pos === 0 ? "bg-gradient-to-b from-yellow-500/30 to-yellow-500/10" :
                pos === 1 ? "bg-gradient-to-b from-gray-400/30 to-gray-400/10" :
                "bg-gradient-to-b from-amber-700/30 to-amber-700/10"
              )}>
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center mb-2",
                  pos === 0 ? "bg-yellow-500 text-yellow-950" :
                  pos === 1 ? "bg-gray-300 text-gray-800" :
                  "bg-amber-700 text-white"
                )}>
                  <Trophy className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold">#{pos + 1}</div>
                <div className="flex items-center justify-center gap-1 mt-2 text-sm">
                  <ThumbsUp className="w-3 h-3 fill-primary text-primary" />
                  {contestant.votes.toLocaleString()}
                </div>
              </div>
              
              {/* Profile Image */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex justify-center">
                <div className={cn(
                  "relative rounded-full overflow-hidden border-4 transition-transform group-hover:scale-105 bg-muted mx-auto",
                  isFirst ? "w-24 h-24 sm:w-28 sm:h-28 border-yellow-500" : "w-20 h-20 sm:w-24 sm:h-24 border-muted"
                )}>
                  {contestant.image ? (
                    <img src={contestant.image} alt={contestant.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                </div>
                {isFirst && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
                    <span className="text-lg">👑</span>
                  </div>
                )}
              </div>
            </Link>
            
            <p className="text-center font-medium mt-2 text-sm sm:text-base truncate w-24 sm:w-32 mx-auto">
              {contestant.name.split(" ")[0]}
            </p>
          </motion.div>
        )
      })}
    </div>
  )
}

function ContestantRow({ contestant, index }: { contestant: ContestantItem; index: number }) {
  const Icon = categoryIcons[contestant.categoryId] || Camera
  
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
          
          {/* Avatar & Name */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 bg-muted">
              {contestant.image ? (
                <img src={contestant.image} alt={contestant.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-6 h-6 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="min-w-0">
              <p className="font-medium truncate group-hover:text-primary transition-colors">
                {contestant.name}
              </p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Icon className="w-3 h-3" />
                <span>{contestant.category}</span>
              </div>
            </div>
          </div>
          
          {/* Work Preview */}
          {contestant.work && (
            <div className="hidden md:block relative w-20 h-14 rounded-lg overflow-hidden shrink-0 bg-muted">
              <img src={contestant.work} alt={`${contestant.name}'s work`} className="w-full h-full object-cover" />
            </div>
          )}
          
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

function LeaderboardContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const categoryParam = searchParams?.get("category") || "all"
  
  const [selectedCategory, setSelectedCategory] = useState(categoryParam)
  const [searchQuery, setSearchQuery] = useState("")
  const [allContestants, setAllContestants] = useState<ContestantItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setSelectedCategory(categoryParam)
  }, [categoryParam])

  useEffect(() => {
    const fetchContestants = async () => {
      setLoading(true)
      try {
        const q = query(collection(db, "users"), orderBy("votes", "desc"))
        const snapshot = await getDocs(q)
        const data: ContestantItem[] = snapshot.docs.map((docSnap, index) => {
          const d = docSnap.data()
          return {
            id: docSnap.id,
            name: d.name ?? "Unknown",
            category: d.category ?? "",
            categoryId: d.categoryId ?? "",
            image: d.image ?? "",
            work: d.work ?? "",
            votes: d.votes ?? 0,
            rank: index + 1,
          }
        })
        setAllContestants(data)
      } catch (error) {
        console.error("Error fetching leaderboard:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchContestants()
  }, [])

  const filteredContestants = allContestants.filter(contestant => {
    // Basic filter for real data
    const isReal = contestant.name && contestant.name !== "Unknown" && 
                   contestant.category && contestant.id.length > 5;
    
    if (!isReal) return false;

    const matchesCategory = selectedCategory === "all" || contestant.categoryId === selectedCategory
    const matchesSearch = contestant.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  }).map((c, i) => ({ ...c, rank: i + 1 })) // Re-calculate rank based on filtered category

  const handleCategoryChange = (catId: string) => {
    router.push(`/leaderboard?category=${catId}`)
  }

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

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
              <p className="text-muted-foreground">Loading contestants...</p>
            </div>
          ) : allContestants.length === 0 ? (
            <div className="text-center py-24">
              <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">No contestants yet</h2>
              <p className="text-muted-foreground mb-6">Be the first to register and compete!</p>
              <Link href="/register">
                <Button className="gradient-primary border-0 text-white">Register Now</Button>
              </Link>
            </div>
          ) : (
            <>
              {/* Top 3 Spotlight */}
              {filteredContestants.length >= 1 && (
                <div className="pt-20 mb-8">
                  <Top3Spotlight contestants={filteredContestants} />
                </div>
              )}

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search contestants..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
                
                <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      onClick={() => handleCategoryChange(category.id)}
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
                    {filteredContestants.length} contestant{filteredContestants.length !== 1 ? "s" : ""}
                  </span>
                  <span className="text-sm text-muted-foreground">Edition 5</span>
                </div>
                
                <div className="divide-y divide-border">
                  {filteredContestants.slice(3).map((contestant, index) => (
                    <ContestantRow key={contestant.id} contestant={contestant} index={index} />
                  ))}
                </div>

                {filteredContestants.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No contestants found matching your search.</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}

export default function LeaderboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    }>
      <LeaderboardContent />
    </Suspense>
  )
}

