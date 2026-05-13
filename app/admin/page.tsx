"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Users,
  Trophy,
  DollarSign,
  TrendingUp,
  MoreHorizontal,
  Search,
  Plus,
  Download,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  LayoutDashboard,
  Settings,
  LogOut,
  Menu,
  Bell,
  Calendar,
  Camera,
  Palette,
  PenTool,
  ChevronDown,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

// Mock data
const stats = [
  {
    title: "Total Contestants",
    value: "2,847",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Total Votes",
    value: "1,250,430",
    change: "+23.1%",
    trend: "up",
    icon: Trophy,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Revenue",
    value: "₦62,521,500",
    change: "+18.7%",
    trend: "up",
    icon: DollarSign,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Pending Approvals",
    value: "47",
    change: "-5.2%",
    trend: "down",
    icon: Clock,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
]

const recentContestants = [
  {
    id: 1,
    name: "Adaeze Okonkwo",
    email: "adaeze@email.com",
    category: "Photography",
    status: "approved",
    votes: 15234,
    registeredAt: "2024-11-10",
    image: "/contestants/adaeze.jpg",
  },
  {
    id: 2,
    name: "Chukwuemeka Adeyemi",
    email: "chukwuemeka@email.com",
    category: "Fashion Design",
    status: "pending",
    votes: 0,
    registeredAt: "2024-11-12",
    image: "/contestants/chukwuemeka.jpg",
  },
  {
    id: 3,
    name: "Funke Adeleke",
    email: "funke@email.com",
    category: "Graphics Design",
    status: "approved",
    votes: 12456,
    registeredAt: "2024-11-08",
    image: "/contestants/funke.jpg",
  },
  {
    id: 4,
    name: "Oluwaseun Bakare",
    email: "seun@email.com",
    category: "Photography",
    status: "rejected",
    votes: 0,
    registeredAt: "2024-11-11",
    image: "/contestants/seun.jpg",
  },
  {
    id: 5,
    name: "Ngozi Eze",
    email: "ngozi@email.com",
    category: "Fashion Design",
    status: "approved",
    votes: 9876,
    registeredAt: "2024-11-09",
    image: "/contestants/ngozi.jpg",
  },
]

const recentTransactions = [
  { id: "TXN001", voter: "John D.", contestant: "Adaeze O.", votes: 50, amount: "₦2,500", time: "2 mins ago" },
  { id: "TXN002", voter: "Mary A.", contestant: "Funke A.", votes: 100, amount: "₦5,000", time: "5 mins ago" },
  { id: "TXN003", voter: "Peter O.", contestant: "Chidi N.", votes: 20, amount: "₦1,000", time: "8 mins ago" },
  { id: "TXN004", voter: "Sarah E.", contestant: "Ngozi E.", votes: 200, amount: "₦10,000", time: "12 mins ago" },
  { id: "TXN005", voter: "David K.", contestant: "Adaeze O.", votes: 30, amount: "₦1,500", time: "15 mins ago" },
]

const categoryStats = [
  { name: "Photography", contestants: 1024, votes: 456789, percentage: 36 },
  { name: "Fashion Design", contestants: 892, votes: 398654, percentage: 32 },
  { name: "Graphics Design", contestants: 931, votes: 394987, percentage: 32 },
]

const categoryIcons: Record<string, React.ReactNode> = {
  Photography: <Camera className="h-4 w-4" />,
  "Fashion Design": <Palette className="h-4 w-4" />,
  "Graphics Design": <PenTool className="h-4 w-4" />,
}

const statusColors: Record<string, string> = {
  approved: "bg-green-500/20 text-green-500 border-green-500/30",
  pending: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
  rejected: "bg-red-500/20 text-red-500 border-red-500/30",
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin", active: true },
  { icon: Users, label: "Contestants", href: "/admin/contestants" },
  { icon: Trophy, label: "Competitions", href: "/admin/competitions" },
  { icon: DollarSign, label: "Transactions", href: "/admin/transactions" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
]

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen bg-card border-r border-border transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b border-border px-4">
            {sidebarOpen && (
              <Link href="/admin" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Zap className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-lg">Admin</span>
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="ml-auto"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors ${
                  item.active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            ))}
          </nav>

          {/* User Section */}
          <div className="border-t border-border p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`w-full justify-start gap-3 ${sidebarOpen ? "" : "justify-center"}`}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/admin/avatar.jpg" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  {sidebarOpen && (
                    <div className="flex-1 text-left">
                      <div className="text-sm font-medium">Admin User</div>
                      <div className="text-xs text-muted-foreground">Super Admin</div>
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}>
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur px-6">
          <div>
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Welcome back! Here&apos;s what&apos;s happening with Creative Edge.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="w-64 pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
            </Button>
            <Select defaultValue="2024">
              <SelectTrigger className="w-40">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Edition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">Edition 2024</SelectItem>
                <SelectItem value="2023">Edition 2023</SelectItem>
                <SelectItem value="2022">Edition 2022</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Stats Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                        <stat.icon className={`h-5 w-5 ${stat.color}`} />
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          stat.trend === "up"
                            ? "bg-green-500/10 text-green-500 border-green-500/30"
                            : "bg-red-500/10 text-red-500 border-red-500/30"
                        }
                      >
                        {stat.trend === "up" ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        {stat.change}
                      </Badge>
                    </div>
                    <div className="mt-4">
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Contestants Table */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Contestants</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Contestant</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Votes</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentContestants.map((contestant) => (
                        <TableRow key={contestant.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9">
                                <AvatarImage src={contestant.image} />
                                <AvatarFallback>
                                  {contestant.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{contestant.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {contestant.email}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="flex items-center gap-1 w-fit">
                              {categoryIcons[contestant.category]}
                              {contestant.category}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={statusColors[contestant.status]}
                            >
                              {contestant.status === "approved" && (
                                <CheckCircle className="h-3 w-3 mr-1" />
                              )}
                              {contestant.status === "pending" && (
                                <Clock className="h-3 w-3 mr-1" />
                              )}
                              {contestant.status === "rejected" && (
                                <XCircle className="h-3 w-3 mr-1" />
                              )}
                              {contestant.status.charAt(0).toUpperCase() +
                                contestant.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{contestant.votes.toLocaleString()}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Profile
                                </DropdownMenuItem>
                                {contestant.status === "pending" && (
                                  <>
                                    <DropdownMenuItem className="text-green-500">
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Approve
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-500">
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Reject
                                    </DropdownMenuItem>
                                  </>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Category Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Category Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {categoryStats.map((category) => (
                    <div key={category.name}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {categoryIcons[category.name]}
                          <span className="text-sm font-medium">{category.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {category.percentage}%
                        </span>
                      </div>
                      <Progress value={category.percentage} className="h-2" />
                      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                        <span>{category.contestants} contestants</span>
                        <span>{category.votes.toLocaleString()} votes</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Transactions */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.map((txn) => (
                      <div
                        key={txn.id}
                        className="flex items-center justify-between pb-4 border-b border-border last:border-0 last:pb-0"
                      >
                        <div>
                          <p className="text-sm font-medium">
                            {txn.voter} voted for {txn.contestant}
                          </p>
                          <p className="text-xs text-muted-foreground">{txn.time}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-green-500">{txn.amount}</p>
                          <p className="text-xs text-muted-foreground">{txn.votes} votes</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
