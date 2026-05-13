"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Heart, 
  Share2, 
  Copy, 
  Check,
  Trophy,
  Camera,
  Palette,
  Brush,
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Facebook,
  Twitter,
  Instagram,
  MessageCircle,
  ChevronUp,
  Award
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { VoteModal } from "@/components/vote-modal"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Demo contestant data
const contestantData = {
  id: "1",
  name: "Sarah Adeyemi",
  category: "Photography",
  categoryId: "photography",
  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  work: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&h=800&fit=crop",
  votes: 1234,
  rank: 1,
  totalContestants: 156,
  edition: 5,
  workTheme: "Nature's Whisper",
  experience: "3 years",
  story: "I've always been fascinated by the way light dances through leaves and how nature tells its own stories. This photograph captures a moment at dawn in the Obudu Mountains, where I spent three days waiting for the perfect conditions. The mist, the golden light, and the silhouette of the trees all came together in this single frame that speaks to the beauty and tranquility of our natural world.",
  inspiration: "Growing up in Lagos, I rarely had the chance to experience nature in its raw form. My first trip to the countryside changed everything. I realized that photography wasn't just about capturing images—it was about preserving moments of wonder that could inspire others to see the world differently.",
  joinedDate: "March 15, 2024",
  referralLink: "https://creativevote.com/vote/sarah-adeyemi-1",
  topSupporters: [
    { name: "John D.", votes: 50, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
    { name: "Ada M.", votes: 45, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
    { name: "Tunde B.", votes: 40, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
  ],
  recentVoters: [
    { name: "Anonymous", votes: 5, time: "2 mins ago" },
    { name: "Chidi O.", votes: 10, time: "5 mins ago" },
    { name: "Blessing N.", votes: 3, time: "12 mins ago" },
    { name: "Anonymous", votes: 1, time: "20 mins ago" },
    { name: "Emeka K.", votes: 15, time: "1 hour ago" },
  ]
}

const categoryIcons = {
  photography: Camera,
  fashion: Palette,
  graphics: Brush,
}

function AnimatedVoteCounter({ votes }: { votes: number }) {
  const [displayVotes, setDisplayVotes] = useState(0)
  
  useEffect(() => {
    const duration = 2000 // 2 seconds
    const steps = 60
    const increment = votes / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= votes) {
        setDisplayVotes(votes)
        clearInterval(timer)
      } else {
        setDisplayVotes(Math.floor(current))
      }
    }, duration / steps)
    
    return () => clearInterval(timer)
  }, [votes])
  
  return (
    <span className="tabular-nums">{displayVotes.toLocaleString()}</span>
  )
}

export default function ContestantProfilePage() {
  const params = useParams()
  const [copied, setCopied] = useState(false)
  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false)
  const [showFloatingVote, setShowFloatingVote] = useState(false)

  const contestant = contestantData // In real app, fetch based on params.id
  const CategoryIcon = categoryIcons[contestant.categoryId as keyof typeof categoryIcons] || Camera

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingVote(window.scrollY > 500)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const copyReferralLink = () => {
    navigator.clipboard.writeText(contestant.referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareOnSocial = (platform: string) => {
    const text = `Vote for ${contestant.name} in the CreativeVote ${contestant.category} competition!`
    const url = contestant.referralLink
    
    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
    }
    
    window.open(urls[platform], "_blank", "width=600,height=400")
  }

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen pt-20">
        {/* Back Button */}
        <div className="container mx-auto px-4 py-6">
          <Link 
            href="/leaderboard"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Leaderboard
          </Link>
        </div>

        {/* Hero Section */}
        <section className="container mx-auto px-4 pb-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Work Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src={contestant.work}
                  alt={`${contestant.name}'s work - ${contestant.workTheme}`}
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Rank Badge */}
                <div className="absolute top-4 left-4">
                  <div className={cn(
                    "px-4 py-2 rounded-full flex items-center gap-2 font-bold",
                    contestant.rank === 1 ? "bg-secondary text-secondary-foreground" :
                    contestant.rank === 2 ? "bg-gray-300 text-gray-800" :
                    contestant.rank === 3 ? "bg-amber-700 text-white" :
                    "glass text-foreground"
                  )}>
                    <Trophy className="w-4 h-4" />
                    Rank #{contestant.rank}
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <div className="px-4 py-2 rounded-full glass flex items-center gap-2">
                    <CategoryIcon className="w-4 h-4 text-primary" />
                    {contestant.category}
                  </div>
                </div>
              </div>
              
              {/* Work Theme */}
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">Theme</p>
                <h2 className="text-xl font-bold">{contestant.workTheme}</h2>
              </div>
            </motion.div>

            {/* Contestant Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              {/* Profile Header */}
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-primary/20">
                  <Image
                    src={contestant.image}
                    alt={contestant.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold">{contestant.name}</h1>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Joined {contestant.joinedDate}
                  </p>
                </div>
              </div>

              {/* Vote Stats */}
              <div className="glass rounded-2xl p-6">
                <div className="text-center mb-6">
                  <p className="text-sm text-muted-foreground mb-2">Total Votes</p>
                  <div className="text-5xl sm:text-6xl font-bold gradient-text">
                    <AnimatedVoteCounter votes={contestant.votes} />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Rank #{contestant.rank} of {contestant.totalContestants} contestants
                  </p>
                </div>

                {/* Vote Button */}
                <Button
                  onClick={() => setIsVoteModalOpen(true)}
                  className="w-full h-14 gradient-primary border-0 text-white text-lg animate-pulse-glow"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Vote Now
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-3">
                  1 vote = ₦50 | Help {contestant.name.split(" ")[0]} win!
                </p>
              </div>

              {/* Share Section */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-primary" />
                    Share & Support
                  </h3>
                </div>

                {/* Referral Link */}
                <div className="flex gap-2 mb-4">
                  <div className="flex-1 p-3 bg-muted rounded-lg text-sm truncate">
                    {contestant.referralLink}
                  </div>
                  <Button
                    variant="outline"
                    onClick={copyReferralLink}
                    className="shrink-0"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                {/* Social Share Buttons */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => shareOnSocial("facebook")}
                  >
                    <Facebook className="w-4 h-4 text-blue-600" />
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => shareOnSocial("twitter")}
                  >
                    <Twitter className="w-4 h-4 text-sky-500" />
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => shareOnSocial("whatsapp")}
                  >
                    <MessageCircle className="w-4 h-4 text-green-500" />
                  </Button>
                </div>
              </div>

              {/* Edition Info */}
              <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-secondary" />
                  <span className="font-medium">Edition {contestant.edition}</span>
                </div>
                <Link href={`/editions/${contestant.edition}`} className="text-primary text-sm hover:underline">
                  View Edition
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <User className="w-6 h-6 text-primary" />
                  My Story
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {contestant.story}
                </p>
                
                <h3 className="text-lg font-semibold mb-4">What Inspired This Work</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {contestant.inspiration}
                </p>

                <div className="flex flex-wrap gap-4">
                  <div className="px-4 py-2 bg-muted rounded-lg">
                    <span className="text-sm text-muted-foreground">Experience: </span>
                    <span className="font-medium">{contestant.experience}</span>
                  </div>
                  <div className="px-4 py-2 bg-muted rounded-lg">
                    <span className="text-sm text-muted-foreground">Category: </span>
                    <span className="font-medium">{contestant.category}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Supporters Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Top Supporters */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-6"
              >
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-secondary" />
                  Top Supporters
                </h3>
                <div className="space-y-3">
                  {contestant.topSupporters.map((supporter, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={supporter.image}
                          alt={supporter.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{supporter.name}</p>
                        <p className="text-sm text-muted-foreground">{supporter.votes} votes</p>
                      </div>
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                        index === 0 ? "bg-secondary text-secondary-foreground" :
                        index === 1 ? "bg-gray-300 text-gray-800" :
                        "bg-amber-700 text-white"
                      )}>
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Recent Voters */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="glass rounded-2xl p-6"
              >
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Recent Votes
                </h3>
                <div className="space-y-3">
                  {contestant.recentVoters.map((voter, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <User className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">{voter.name}</p>
                          <p className="text-xs text-muted-foreground">{voter.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-primary">
                        <Heart className="w-4 h-4 fill-primary" />
                        <span className="font-medium">+{voter.votes}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Vote Button (Mobile) */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: showFloatingVote ? 0 : 100 }}
        className="fixed bottom-0 left-0 right-0 p-4 bg-card/90 backdrop-blur-lg border-t border-border lg:hidden z-40"
      >
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Current Votes</p>
            <p className="text-xl font-bold">{contestant.votes.toLocaleString()}</p>
          </div>
          <Button
            onClick={() => setIsVoteModalOpen(true)}
            className="flex-1 h-12 gradient-primary border-0 text-white"
          >
            <Heart className="w-5 h-5 mr-2" />
            Vote Now
          </Button>
        </div>
      </motion.div>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: showFloatingVote ? 1 : 0 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-24 right-4 lg:bottom-8 w-12 h-12 rounded-full bg-muted border border-border flex items-center justify-center shadow-lg z-30"
      >
        <ChevronUp className="w-5 h-5" />
      </motion.button>

      <Footer />

      {/* Vote Modal */}
      <VoteModal
        isOpen={isVoteModalOpen}
        onClose={() => setIsVoteModalOpen(false)}
        contestant={{
          name: contestant.name,
          image: contestant.image,
          category: contestant.category,
        }}
      />
    </>
  )
}
