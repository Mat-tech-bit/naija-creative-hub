"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { auth, db } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Users,
  Trophy,
  DollarSign,
  TrendingUp,
  MoreHorizontal,
  Plus,
  Download,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Camera,
  Palette,
  PenTool,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  UserPlus,
  BarChart3
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface Contestant {
  id: string
  name?: string
  email?: string
  image?: string
  category?: string
  votes?: number
  status?: "approved" | "pending" | "rejected"
}

interface CategoryStat {
  name: string
  contestants: number
  votes: number
  percentage: number
}

interface Transaction {
  id: string
  reference: string
  email: string
  contestantName: string
  voteCount: number
  amount: number
  createdAt: any
}

const categoryIcons: Record<string, any> = {
  Photography: Camera,
  "Fashion Design": Palette,
  "Graphics Design": PenTool,
}

const statusColors: Record<string, string> = {
  approved: "bg-green-500/10 text-green-500 border-green-500/20",
  pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  rejected: "bg-red-500/10 text-red-500 border-red-500/20",
}

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState<any[]>([])
  const [recentContestants, setRecentContestants] = useState<Contestant[]>([])
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([])
  const [categoryStats, setCategoryStats] = useState<CategoryStat[]>([])

  useEffect(() => {
    fetchRealData()
  }, [])

  const fetchRealData = async () => {
    try {
      // Fetch Contestants
      const usersRef = collection(db, "users")
      const userSnapshot = await getDocs(query(usersRef, orderBy("votes", "desc")))
      const contestants = userSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        status: doc.data().status || "approved"
      })) as Contestant[]
      
      setRecentContestants(contestants.slice(0, 5))

      // Fetch Transactions
      const votesRef = collection(db, "votes")
      const voteSnapshot = await getDocs(query(votesRef, orderBy("createdAt", "desc")))
      const votesData = voteSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Transaction[]

      setRecentTransactions(votesData.slice(0, 5))

      // Calculate Real Stats
      const totalContestants = contestants.length
      const totalVotes = contestants.reduce((acc, curr) => acc + (curr.votes || 0), 0)
      const totalRevenue = votesData.reduce((acc, curr) => acc + (curr.amount || 0), 0)
      const avgVotes = totalContestants > 0 ? (totalVotes / totalContestants).toFixed(1) : 0

      setStats([
        { title: "Total Talent", value: totalContestants.toString(), change: "+12.5%", trend: "up", icon: Users, color: "text-blue-500", bgColor: "bg-blue-500/10" },
        { title: "Public Votes", value: totalVotes.toLocaleString(), change: "+4.2%", trend: "up", icon: Trophy, color: "text-amber-500", bgColor: "bg-amber-500/10" },
        { title: "Net Revenue", value: `₦${totalRevenue.toLocaleString()}`, change: "+18.3%", trend: "up", icon: DollarSign, color: "text-green-500", bgColor: "bg-green-500/10" },
        { title: "Engagement", value: `${avgVotes} v/u`, change: "+2.1%", trend: "up", icon: TrendingUp, color: "text-purple-500", bgColor: "bg-purple-500/10" },
      ])

      // Category Distribution
      const categories = ["Photography", "Fashion Design", "Graphics Design"]
      const catStats = categories.map(cat => {
        const count = contestants.filter(c => c.category === cat).length
        const catVotes = contestants.filter(c => c.category === cat).reduce((acc, curr) => acc + (curr.votes || 0), 0)
        const percentage = totalContestants > 0 ? Math.round((count / totalContestants) * 100) : 0
        return {
          name: cat,
          contestants: count,
          votes: catVotes,
          percentage: percentage
        }
      })
      setCategoryStats(catStats)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching admin data:", error)
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <DashboardSkeleton />
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Portal Overview</h1>
          <p className="text-muted-foreground">Monitor your platform's creative growth and performance.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl hidden sm:flex">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Link href="/register">
            <Button className="gradient-primary text-white border-0 rounded-xl shadow-lg shadow-primary/20">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Contestant
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className={cn(
                    "flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full",
                    stat.trend === "up" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                  )}>
                    {stat.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {stat.change}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Layout */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Top Contestants Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-sm overflow-hidden bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 bg-muted/20 px-6 py-4">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                Featured Talent
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-xs font-bold text-primary">View All</Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="px-6 font-bold uppercase text-[10px]">Contestant</TableHead>
                      <TableHead className="font-bold uppercase text-[10px] hidden sm:table-cell">Category</TableHead>
                      <TableHead className="font-bold uppercase text-[10px]">Status</TableHead>
                      <TableHead className="font-bold uppercase text-[10px] text-right">Votes</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentContestants.map((user) => (
                      <TableRow key={user.id} className="group hover:bg-muted/30 transition-colors">
                        <TableCell className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 rounded-xl">
                              <AvatarImage src={user.image} className="object-cover" />
                              <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold">
                                {user.name?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="font-bold text-sm tracking-tight">{user.name}</span>
                              <span className="text-[10px] text-muted-foreground">{user.email}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <div className="flex items-center gap-2 text-xs">
                             {categoryIcons[user.category || ""] && <div className="p-1.5 rounded-lg bg-muted flex items-center justify-center shrink-0">
                                {(() => {
                                    const Icon = categoryIcons[user.category || ""];
                                    return <Icon className="w-3.5 h-3.5" />;
                                })()}
                             </div>}
                             <span className="font-medium whitespace-nowrap">{user.category}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={cn("px-2 py-0.5 text-[10px] font-bold rounded-lg border-0 shadow-none capitalize", statusColors[user.status || "approved"])}>
                            {user.status || "approved"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-mono font-bold text-sm">
                          {user.votes?.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuLabel>Talent Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <Link href={`/contestant/${user.id}`}>
                                <DropdownMenuItem>
                                    <Eye className="w-4 h-4 mr-2" /> View Public Page
                                </DropdownMenuItem>
                              </Link>
                              <DropdownMenuItem className="text-green-500"><CheckCircle className="w-4 h-4 mr-2" /> Approve Content</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-500"><XCircle className="w-4 h-4 mr-2" /> Reject Entry</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Mobile Optimized Cards (Visible only on very small screens if needed, but the table above handles sm: well) */}
        </div>

        {/* Sidebar Sections */}
        <div className="space-y-6">
          {/* Categories Chart Card */}
          <Card className="border-none shadow-sm bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 pb-4">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">Category Insight</CardTitle>
              <BarChart3 className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {categoryStats.map((cat) => (
                <div key={cat.name} className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold flex items-center gap-2 uppercase tracking-wide">
                        {(() => {
                            const Icon = categoryIcons[cat.name];
                            return <Icon className="w-3.5 h-3.5 text-primary" />;
                        })()}
                        {cat.name}
                    </span>
                    <span className="font-mono font-bold">{cat.percentage}%</span>
                  </div>
                  <div className="relative h-2 w-full bg-muted rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${cat.percentage}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="absolute h-full bg-primary rounded-full" 
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-muted-foreground font-bold">
                    <span>{cat.contestants} Talent</span>
                    <span className="text-primary">{cat.votes.toLocaleString()} Votes</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Ledger Feed */}
          <Card className="border-none shadow-sm bg-card/50 backdrop-blur overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 bg-muted/10 pb-4 pt-5">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">Live Ledger</CardTitle>
              <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-500/10 rounded-full border border-green-500/20">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[9px] font-bold text-green-500 uppercase tracking-tighter">Syncing</span>
              </div>
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y divide-border/30">
                  {recentTransactions.map((txn, index) => (
                    <div key={index} className="p-4 hover:bg-muted/20 transition-colors flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                            <DollarSign className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="font-bold text-xs truncate leading-tight">{txn.email.split('@')[0]} supported {txn.contestantName}</div>
                            <div className="text-[10px] text-muted-foreground font-mono mt-0.5">
                                {txn.createdAt?.toDate ? txn.createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'} · {txn.voteCount} Votes
                            </div>
                        </div>
                        <div className="font-mono font-bold text-xs text-green-500 whitespace-nowrap">
                            +₦{txn.amount.toLocaleString()}
                        </div>
                    </div>
                  ))}
                  {recentTransactions.length === 0 && (
                      <div className="p-8 text-center text-[10px] font-bold text-muted-foreground uppercase opacity-50">No recent activity</div>
                  )}
               </div>
               <Button variant="ghost" className="w-full h-10 rounded-none text-xs font-bold text-muted-foreground border-t border-border/50 hover:bg-muted/30">
                   View Full Audit Trail
               </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function DashboardSkeleton() {
    return (
        <div className="space-y-8 animate-pulse text-transparent">
            <div className="flex justify-between items-center">
                <div className="space-y-2">
                    <Skeleton className="h-9 w-48 rounded-xl bg-muted animate-pulse" />
                    <Skeleton className="h-4 w-64 rounded-lg bg-muted/60 animate-pulse" />
                </div>
                <Skeleton className="h-10 w-32 rounded-xl bg-muted animate-pulse" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 w-full rounded-2xl bg-muted animate-pulse" />)}
            </div>
            <div className="grid gap-8 lg:grid-cols-3">
                <Skeleton className="lg:col-span-2 h-[400px] w-full rounded-2xl bg-muted animate-pulse" />
                <div className="space-y-6">
                    <Skeleton className="h-[250px] w-full rounded-2xl bg-muted animate-pulse" />
                    <Skeleton className="h-[250px] w-full rounded-2xl bg-muted animate-pulse" />
                </div>
            </div>
        </div>
    )
}
