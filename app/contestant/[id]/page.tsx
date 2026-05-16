"use client"

import { useState, useEffect, Suspense } from "react"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { toast } from "sonner"
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
  MessageCircle,
  ChevronUp,
  Award,
  Loader2,
  CheckCircle,
  LogOut,
  Sparkles
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { VoteModal } from "@/components/vote-modal"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Supporter {
  name: string
  votes: number
  image?: string
}

interface RecentVoter {
  name: string
  votes: number
  time: string
}

interface Contestant {
  id: string
  name: string
  category: string
  categoryId: string
  image: string
  work: string
  votes: number
  rank: number
  totalContestants: number
  edition: number
  workTheme: string
  experience: string
  story: string
  inspiration: string
  joinedDate: string
  referralLink: string
  topSupporters: Supporter[]
  recentVoters: RecentVoter[]
}

const categoryIcons: Record<string, React.ElementType> = {
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

function ContestantProfileContent() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [copied, setCopied] = useState(false)
  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false)
  const [showFloatingVote, setShowFloatingVote] = useState(false)
  const [contestant, setContestant] = useState<Contestant | null>(null)
  const [loading, setLoading] = useState(true)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isOwner, setIsOwner] = useState(false)

  const reference = searchParams?.get("reference")

  useEffect(() => {
    const fetchContestant = async () => {
      if (!params?.id) return
      try {
        const docRef = doc(db, "users", params.id as string)
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists()) {
          const data = docSnap.data()
          const currentVotes = data.votes || 0
          
          // Calculate Rank
          const usersRef = collection(db, "users")
          const q = query(usersRef, where("votes", ">", currentVotes))
          const higherSnapshot = await getDocs(q)
          const rank = higherSnapshot.size + 1
          
          // Get Total Contestants
          const allSnapshot = await getDocs(query(usersRef))
          const total = allSnapshot.size
          
          setContestant({ 
            ...data, 
            id: docSnap.id, 
            rank, 
            totalContestants: total 
          } as Contestant)
        }
      } catch (error) {
        console.error("Error fetching contestant:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchContestant()
  }, [params?.id])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.uid === params?.id) {
        setIsOwner(true)
      } else {
        setIsOwner(false)
      }
    })
    return () => unsubscribe()
  }, [params?.id])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      toast.success("Successfully logged out")
      router.push("/login")
    } catch (error) {
      toast.error("Error logging out")
    }
  }

  const verifyPayment = async (manualRef?: string) => {
    const refToVerify = manualRef || reference
    if (refToVerify && params?.id && !isVerifying) {
      setIsVerifying(true)
      const loadingToast = toast.loading("Verifying your payment...")
      try {
        const response = await fetch(`/api/paystack/verify?reference=${refToVerify}`)
        const data = await response.json()

        if (data.status) {
          toast.success(data.message || "Votes updated!", { id: loadingToast })
          // Re-fetch data to show new votes and rank
          const docRef = doc(db, "users", params.id as string)
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            const data = docSnap.data()
            const usersRef = collection(db, "users")
            const q = query(usersRef, where("votes", ">", data.votes || 0))
            const higherSnapshot = await getDocs(q)
            setContestant({ 
              ...data, 
              id: docSnap.id, 
              rank: higherSnapshot.size + 1 
            } as Contestant)
          }
        } else {
          toast.error(data.message || "Verification failed.", { id: loadingToast })
        }
      } catch (error) {
        console.error("Verification Error:", error)
        toast.error("Network error. Please click 'Retry Verification'.", { id: loadingToast })
      } finally {
        setIsVerifying(false)
        if (!manualRef) {
          const newUrl = window.location.pathname;
          window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
        }
      }
    }
  }

  useEffect(() => {
    if (reference) verifyPayment()
  }, [reference, params?.id])


  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingVote(window.scrollY > 500)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    )
  }

  if (!contestant) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Trophy className="w-16 h-16 text-muted-foreground" />
        <h2 className="text-xl font-bold">Contestant not found</h2>
        <p className="text-muted-foreground">This profile does not exist or has been removed.</p>
        <Link href="/leaderboard">
          <Button variant="outline">Back to Leaderboard</Button>
        </Link>
      </div>
    )
  }

  const CategoryIcon = categoryIcons[contestant.categoryId] || Camera

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
      
      {/* Verification Overlay */}
      {isVerifying && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/80 backdrop-blur-md">
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
            <Heart className="absolute inset-0 m-auto w-8 h-8 text-primary animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold mt-8 mb-2">Verifying Your Vote</h2>
          <p className="text-muted-foreground animate-pulse text-center px-4">Connecting to Paystack... <br/>(This may take a moment if your network is slow)</p>
        </div>
      )}

      {/* Manual Verification UI (if automatic fails or is slow) */}
      {!isVerifying && reference && (
        <div className="container mx-auto px-4 mt-24 -mb-16 relative z-10">
          <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold">Wait, did you just pay?</h3>
                <p className="text-sm text-muted-foreground">If your votes haven't counted yet, you can manually trigger verification.</p>
              </div>
            </div>
            <Button 
              onClick={() => verifyPayment(reference)}
              className="gradient-primary border-0 text-white shrink-0"
            >
              Verify Payment Manually
            </Button>
          </div>
        </div>
      )}

      <main className={cn("min-h-screen pt-20", isVerifying && "blur-sm")}>
        {/* Back Button */}
        <div className="container mx-auto px-4 py-6">
          <Link 
            href="/leaderboard"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Leaderboard
          </Link>

          {isOwner && (
            <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="rounded-xl text-red-500 border-red-500/20 hover:bg-red-500/5 hover:text-red-600 transition-all font-bold"
            >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
            </Button>
          )}
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
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                {contestant.work ? (
                  <Image
                    src={contestant.work}
                    alt={`${contestant.name}'s work - ${contestant.workTheme}`}
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Camera className="w-16 h-16 text-muted-foreground" />
                  </div>
                )}
                
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
                    Rank #{contestant.rank || "—"}
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
              {contestant.workTheme && (
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">Theme</p>
                  <h2 className="text-xl font-bold">{contestant.workTheme}</h2>
                </div>
              )}
            </motion.div>

            {/* Contestant Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-primary/20 bg-muted shrink-0 shadow-xl">
                {contestant.image ? (
                  <Image
                    src={contestant.image}
                    alt={contestant.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-10 h-10 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-1">{contestant.name}</h1>
                <p className="text-muted-foreground flex items-center justify-center sm:justify-start gap-2 text-sm font-medium">
                  <Calendar className="w-4 h-4 text-primary" />
                  Joined {contestant.joinedDate}
                </p>
              </div>
            </div>

            {/* Vote Stats */}
            <div className="glass rounded-3xl p-6 sm:p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/10 transition-colors" />
              
              <div className="text-center mb-8 relative z-10">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 opacity-70">Current Standing</p>
                <div className="text-6xl sm:text-7xl font-black gradient-text tracking-tighter mb-2">
                  <AnimatedVoteCounter votes={contestant.votes ?? 0} />
                </div>
                <div className="flex items-center justify-center gap-2 text-sm font-bold text-foreground bg-muted/50 w-fit mx-auto px-4 py-1.5 rounded-full">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  {contestant.rank ? `Rank #${contestant.rank} of ${contestant.totalContestants}` : "Unranked"}
                </div>
              </div>

              {/* Vote Button */}
              <Button
                onClick={() => setIsVoteModalOpen(true)}
                className="w-full h-16 rounded-2xl gradient-primary border-0 text-white text-xl font-black shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all duration-300 group"
              >
                <Heart className="w-6 h-6 mr-3 fill-current group-hover:animate-ping" />
                VOTE NOW
              </Button>
              <div className="flex items-center justify-center gap-2 mt-4 text-xs font-bold text-muted-foreground/80 uppercase tracking-tighter">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                1 vote = ₦50 | Help {contestant.name.split(" ")[0]} win!
              </div>
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
                  <Button variant="outline" className="flex-1" onClick={() => shareOnSocial("facebook")}>
                    <Facebook className="w-4 h-4 text-blue-600" />
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => shareOnSocial("twitter")}>
                    <Twitter className="w-4 h-4 text-sky-500" />
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => shareOnSocial("whatsapp")}>
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
        <section className="py-12 sm:py-20 bg-muted/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card/50 backdrop-blur-sm rounded-3xl p-6 sm:p-10 border border-border/50 shadow-xl"
              >
                <h2 className="text-2xl sm:text-3xl font-black mb-8 flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary/10">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  My Story
                </h2>
                <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
                  <p className="text-muted-foreground leading-relaxed mb-8 text-lg sm:text-xl font-medium italic border-l-4 border-primary/30 pl-6 py-2">
                    "{contestant.story || contestant.inspiration || "I am passionate about creating impactful work that speaks to the heart of our culture."}"
                  </p>
                  
                  {contestant.inspiration && contestant.story !== contestant.inspiration && (
                    <div className="mt-10">
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-secondary" />
                        The Inspiration
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {contestant.inspiration}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-3 mt-10 pt-8 border-t border-border/50">
                  {contestant.experience && (
                    <div className="px-5 py-2.5 bg-primary/5 rounded-2xl border border-primary/10 flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Exp:</span>
                      <span className="font-bold text-sm text-primary">{contestant.experience} {Number(contestant.experience) === 1 ? "Year" : "Years"}</span>
                    </div>
                  )}
                  {contestant.category && (
                    <div className="px-5 py-2.5 bg-secondary/10 rounded-2xl border border-secondary/10 flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Field:</span>
                      <span className="font-bold text-sm text-secondary-foreground">{contestant.category}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Supporters Section */}
        <section className="py-12 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-black mb-4">Wall of Support</h2>
              <p className="text-muted-foreground">The incredible people backing {contestant.name.split(' ')[0]}'s journey.</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Top Supporters */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass rounded-3xl p-6 sm:p-8"
              >
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/10">
                    <Trophy className="w-5 h-5 text-amber-500" />
                  </div>
                  Top Benefactors
                </h3>
                {contestant.topSupporters && contestant.topSupporters.length > 0 ? (
                  <div className="space-y-4">
                    {contestant.topSupporters.map((supporter, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-muted/30 hover:bg-muted/50 rounded-2xl transition-all group">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0 border border-white/5">
                            <User className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                          {index < 3 && (
                            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-secondary text-[10px] font-black flex items-center justify-center border-2 border-background shadow-lg">
                              {index + 1}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-black text-sm sm:text-base truncate">{supporter.name}</p>
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{supporter.votes} Votes</p>
                        </div>
                        <div className="text-xl font-black gradient-text">
                          #{index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 px-4 bg-muted/20 rounded-3xl border border-dashed border-border">
                    <Heart className="w-10 h-10 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground font-bold">No supporters yet.</p>
                    <p className="text-xs text-muted-foreground mt-1 px-4">Be the first to fuel this creative spark!</p>
                  </div>
                )}
              </motion.div>

              {/* Recent Voters */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="glass rounded-3xl p-6 sm:p-8"
              >
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary/10">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  Recent Activity
                </h3>
                {contestant.recentVoters && contestant.recentVoters.length > 0 ? (
                  <div className="space-y-4">
                    {contestant.recentVoters.map((voter, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-4 min-w-0">
                          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                            <User className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-sm sm:text-base truncate">{voter.name}</p>
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase">
                              <Calendar className="w-3 h-3" />
                              {voter.time}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20 shrink-0">
                          <Heart className="w-3 h-3 fill-primary text-primary animate-pulse" />
                          <span className="font-black text-xs text-primary">+{voter.votes}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 px-4 bg-muted/20 rounded-3xl border border-dashed border-border">
                    <Clock className="w-10 h-10 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground font-bold">Quiet at the moment.</p>
                  </div>
                )}
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
            <p className="text-xl font-bold">{(contestant.votes ?? 0).toLocaleString()}</p>
          </div>
          <Button
            onClick={() => {
              window.history.replaceState({}, '', window.location.pathname);
              setIsVoteModalOpen(true);
            }}
            className="flex-1 h-12 gradient-primary border-0 text-white font-bold shadow-lg shadow-primary/20"
          >
            <Heart className="w-5 h-5 mr-2 fill-current" />
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
          id: contestant.id,
          name: contestant.name,
          image: contestant.image,
          category: contestant.category,
        }}
      />
    </>
  )
}

export default function ContestantProfilePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        <p className="text-muted-foreground">Initializing profile...</p>
      </div>
    }>
      <ContestantProfileContent />
    </Suspense>
  )
}

