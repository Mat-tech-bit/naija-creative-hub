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
  MessageCircle,
  ChevronUp,
  Award
} from "lucide-react"
import Facebook from "@mui/icons-material/Facebook"
import Twitter from "@mui/icons-material/Twitter"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { VoteModal } from "@/components/vote-modal"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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
  referralLink: "https://naijacreativehub.com/vote/sarah-adeyemi-1",
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
    const duration = 2000
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

  const contestant = contestantData
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
    const text = `Vote for ${contestant.name} in the CreativeHub ${contestant.category} competition!`
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
        <div className="container mx-auto px-4 py-6">
          <Link
            href="/leaderboard"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Leaderboard
          </Link>
        </div>

        <section className="container mx-auto px-4 pb-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={contestant.work}
                  alt={`${contestant.name}'s work`}
                  fill
                  className="object-cover"
                  priority
                />
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
                <div className="absolute top-4 right-4">
                  <div className="px-4 py-2 rounded-full glass flex items-center gap-2 font-bold">
                    <CategoryIcon className="w-4 h-4 text-primary" />
                    {contestant.category}
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground font-bold uppercase transition-spacing tracking-widest">Theme</p>
                <h2 className="text-xl font-bold gradient-text">{contestant.workTheme}</h2>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
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
                  <p className="text-muted-foreground flex items-center gap-2 font-medium">
                    <Calendar className="w-4 h-4" />
                    Joined {contestant.joinedDate}
                  </p>
                </div>
              </div>

              <div className="glass rounded-2xl p-6 shadow-xl">
                <div className="text-center mb-6">
                  <p className="text-sm text-muted-foreground mb-2 font-bold uppercase tracking-widest">Total Votes</p>
                  <div className="text-5xl sm:text-6xl font-bold gradient-text">
                    <AnimatedVoteCounter votes={contestant.votes} />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 font-bold">
                    Rank #{contestant.rank} of {contestant.totalContestants} contestants
                  </p>
                </div>

                <Button
                  onClick={() => setIsVoteModalOpen(true)}
                  className="w-full h-14 gradient-primary border-0 text-white text-lg font-bold animate-pulse-glow"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Vote Now
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-3 font-bold italic">
                  1 vote = ₦50 | Help {contestant.name.split(" ")[0]} win!
                </p>
              </div>

              <div className="glass rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-primary" />
                    Share & Support
                  </h3>
                </div>
                <div className="flex gap-2 mb-4">
                  <div className="flex-1 p-3 bg-muted rounded-lg text-sm truncate font-medium">
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
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => shareOnSocial("facebook")}><Facebook className="w-4 h-4 text-blue-600" /></Button>
                  <Button variant="outline" className="flex-1" onClick={() => shareOnSocial("twitter")}><Twitter className="w-4 h-4 text-sky-500" /></Button>
                  <Button variant="outline" className="flex-1" onClick={() => shareOnSocial("whatsapp")}><MessageCircle className="w-4 h-4 text-green-500" /></Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted rounded-xl border border-border shadow-sm">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-secondary" />
                  <span className="font-bold">Edition {contestant.edition}</span>
                </div>
                <Link href={`/editions/${contestant.edition}`} className="text-primary text-sm hover:underline font-bold">
                  View Edition
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-12 bg-muted/30 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 uppercase tracking-wide">
                  <User className="w-6 h-6 text-primary" />
                  My Story
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6 font-medium">
                  {contestant.story}
                </p>

                <h3 className="text-lg font-bold mb-4 uppercase tracking-wide">What Inspired This Work</h3>
                <p className="text-muted-foreground leading-relaxed mb-6 font-medium">
                  {contestant.inspiration}
                </p>

                <div className="flex flex-wrap gap-4">
                  <div className="px-4 py-2 bg-muted rounded-lg border border-border font-bold text-sm">
                    <span className="text-muted-foreground">Experience: </span>{contestant.experience}
                  </div>
                  <div className="px-4 py-2 bg-muted rounded-lg border border-border font-bold text-sm">
                    <span className="text-muted-foreground">Category: </span>{contestant.category}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-6 shadow-xl"
              >
                <h3 className="font-bold mb-4 flex items-center gap-2 uppercase tracking-wide">
                  <Trophy className="w-5 h-5 text-secondary" />
                  Top Supporters
                </h3>
                <div className="space-y-3">
                  {contestant.topSupporters.map((supporter, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors border border-border/50">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image src={supporter.image} alt={supporter.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-sm">{supporter.name}</p>
                        <p className="text-xs text-muted-foreground font-bold">{supporter.votes} votes</p>
                      </div>
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs",
                        index === 0 ? "bg-yellow-500 text-yellow-950" :
                          index === 1 ? "bg-gray-300 text-gray-800" :
                            "bg-amber-700 text-white"
                      )}>
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="glass rounded-2xl p-6 shadow-xl"
              >
                <h3 className="font-bold mb-4 flex items-center gap-2 uppercase tracking-wide">
                  <Clock className="w-5 h-5 text-primary" />
                  Recent Votes
                </h3>
                <div className="space-y-3">
                  {contestant.recentVoters.map((voter, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border/50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <User className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-bold text-sm">{voter.name}</p>
                          <p className="text-[10px] text-muted-foreground font-bold uppercase">{voter.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-primary">
                        <Heart className="w-4 h-4 fill-primary" />
                        <span className="font-bold">+{voter.votes}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <motion.div
        initial={{ y: 100 }}
        animate={{ y: showFloatingVote ? 0 : 100 }}
        className="fixed bottom-0 left-0 right-0 p-4 bg-card/90 backdrop-blur-lg border-t border-border lg:hidden z-40 shadow-2xl"
      >
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Votes</p>
            <p className="text-xl font-bold">{contestant.votes.toLocaleString()}</p>
          </div>
          <Button
            onClick={() => setIsVoteModalOpen(true)}
            className="flex-1 h-12 gradient-primary border-0 text-white font-bold"
          >
            <Heart className="w-5 h-5 mr-2" />
            Vote Now
          </Button>
        </div>
      </motion.div>

      <Footer />

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
