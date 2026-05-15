"use client"

import { useState, useEffect } from "react"
import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Trophy, 
  DollarSign, 
  ArrowUpRight,
  PieChart as PieChartIcon,
  Calendar
} from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function AdminAnalyticsPage() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalContestants: 0,
    totalVotes: 0,
    totalRevenue: 0,
    categoryData: [] as {name: string, count: number, votes: number, percentage: number}[]
  })

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const usersRef = collection(db, "users")
      const snapshot = await getDocs(usersRef)
      const contestants = snapshot.docs.map(doc => doc.data())
      
      const totalContestants = contestants.length
      const totalVotes = contestants.reduce((acc, curr) => acc + (curr.votes || 0), 0)
      const totalRevenue = totalVotes * 50

      const cats = ["Photography", "Fashion Design", "Graphics Design"]
      const categoryData = cats.map(cat => {
        const count = contestants.filter(c => c.category === cat).length
        const votes = contestants.filter(c => c.category === cat).reduce((acc, curr) => acc + (curr.votes || 0), 0)
        const percentage = totalContestants > 0 ? Math.round((count / totalContestants) * 100) : 0
        return { name: cat, count, votes, percentage }
      })

      setStats({
        totalContestants,
        totalVotes,
        totalRevenue,
        categoryData
      })
      setLoading(false)
    } catch (error) {
      console.error("Error fetching analytics:", error)
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold font-heading">Analytics Overview</h1>
          <p className="text-sm text-muted-foreground">Deep dive into the competition performance</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Calendar className="h-4 w-4" />
          Last 30 Days
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12%</div>
            <p className="text-xs text-muted-foreground">From last month</p>
            <div className="mt-4 h-1 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[12%]"></div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Contestants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalContestants}</div>
            <p className="text-xs text-muted-foreground">Total registered</p>
            <div className="mt-1 flex items-center gap-1 text-green-500 text-xs">
                <ArrowUpRight className="h-3 w-3" />
                <span>Active</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Engagement</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVotes.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total votes cast</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estimated Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">₦{stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Calculated from ₦50/vote</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
            <CardDescription>Distribution of contestants across categories</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {stats.categoryData.map(cat => (
              <div key={cat.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{cat.name}</span>
                  <span className="text-muted-foreground">{cat.percentage}% ({cat.count})</span>
                </div>
                <Progress value={cat.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Engagement by Category</CardTitle>
            <CardDescription>Real-time voting activity per category</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             {stats.categoryData.map(cat => (
                <div key={cat.name} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                            <BarChart3 className="h-4 w-4" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">{cat.name}</p>
                            <p className="text-xs text-muted-foreground">{cat.votes.toLocaleString()} votes</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-bold text-green-500">₦{(cat.votes * 50).toLocaleString()}</p>
                        <p className="text-[10px] text-muted-foreground text-xs">Revenue</p>
                    </div>
                </div>
             ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
