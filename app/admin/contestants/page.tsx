"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Users,
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
  Trophy,
  DollarSign,
  BarChart3,
  Zap,
  Trash2,
  Edit,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data
const allContestants = [
  {
    id: 1,
    name: "Adaeze Okonkwo",
    email: "adaeze@email.com",
    phone: "+234 801 234 5678",
    category: "Photography",
    status: "approved",
    votes: 15234,
    registeredAt: "2024-11-10",
    institution: "University of Lagos",
    image: "/contestants/adaeze.jpg",
  },
  {
    id: 2,
    name: "Chukwuemeka Adeyemi",
    email: "chukwuemeka@email.com",
    phone: "+234 802 345 6789",
    category: "Fashion Design",
    status: "pending",
    votes: 0,
    registeredAt: "2024-11-12",
    institution: "Lagos State University",
    image: "/contestants/chukwuemeka.jpg",
  },
  {
    id: 3,
    name: "Funke Adeleke",
    email: "funke@email.com",
    phone: "+234 803 456 7890",
    category: "Graphics Design",
    status: "approved",
    votes: 12456,
    registeredAt: "2024-11-08",
    institution: "Yaba College of Technology",
    image: "/contestants/funke.jpg",
  },
  {
    id: 4,
    name: "Oluwaseun Bakare",
    email: "seun@email.com",
    phone: "+234 804 567 8901",
    category: "Photography",
    status: "rejected",
    votes: 0,
    registeredAt: "2024-11-11",
    institution: "Federal University of Technology",
    image: "/contestants/seun.jpg",
  },
  {
    id: 5,
    name: "Ngozi Eze",
    email: "ngozi@email.com",
    phone: "+234 805 678 9012",
    category: "Fashion Design",
    status: "approved",
    votes: 9876,
    registeredAt: "2024-11-09",
    institution: "University of Nigeria",
    image: "/contestants/ngozi.jpg",
  },
  {
    id: 6,
    name: "Chidi Nwankwo",
    email: "chidi@email.com",
    phone: "+234 806 789 0123",
    category: "Graphics Design",
    status: "approved",
    votes: 8543,
    registeredAt: "2024-11-07",
    institution: "Covenant University",
    image: "/contestants/chidi.jpg",
  },
  {
    id: 7,
    name: "Amina Yusuf",
    email: "amina@email.com",
    phone: "+234 807 890 1234",
    category: "Photography",
    status: "pending",
    votes: 0,
    registeredAt: "2024-11-13",
    institution: "Ahmadu Bello University",
    image: "/contestants/amina.jpg",
  },
  {
    id: 8,
    name: "Tolu Ogundimu",
    email: "tolu@email.com",
    phone: "+234 808 901 2345",
    category: "Fashion Design",
    status: "approved",
    votes: 7654,
    registeredAt: "2024-11-06",
    institution: "Obafemi Awolowo University",
    image: "/contestants/tolu.jpg",
  },
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
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Users, label: "Contestants", href: "/admin/contestants", active: true },
  { icon: Trophy, label: "Competitions", href: "/admin/competitions" },
  { icon: DollarSign, label: "Transactions", href: "/admin/transactions" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
]

export default function AdminContestantsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedContestants, setSelectedContestants] = useState<number[]>([])
  const [showApproveDialog, setShowApproveDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [selectedContestant, setSelectedContestant] = useState<typeof allContestants[0] | null>(null)

  const filteredContestants = allContestants.filter((contestant) => {
    const matchesSearch =
      contestant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contestant.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || contestant.category === categoryFilter
    const matchesStatus = statusFilter === "all" || contestant.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const toggleSelectAll = () => {
    if (selectedContestants.length === filteredContestants.length) {
      setSelectedContestants([])
    } else {
      setSelectedContestants(filteredContestants.map((c) => c.id))
    }
  }

  const toggleSelect = (id: number) => {
    if (selectedContestants.includes(id)) {
      setSelectedContestants(selectedContestants.filter((cId) => cId !== id))
    } else {
      setSelectedContestants([...selectedContestants, id])
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen bg-card border-r border-border transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex h-full flex-col">
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

          <div className="border-t border-border p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`w-full justify-start gap-3 ${sidebarOpen ? "" : "justify-center"}`}
                >
                  <Avatar className="h-8 w-8">
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
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur px-6">
          <div>
            <h1 className="text-xl font-semibold">Contestants Management</h1>
            <p className="text-sm text-muted-foreground">
              Manage and review all contestant applications
            </p>
          </div>
          <div className="flex items-center gap-4">
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
              </SelectContent>
            </Select>
          </div>
        </header>

        <div className="p-6">
          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-4 mb-6">
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Users className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{allContestants.length}</p>
                  <p className="text-sm text-muted-foreground">Total</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {allContestants.filter((c) => c.status === "approved").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Approved</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-2 rounded-lg bg-yellow-500/10">
                  <Clock className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {allContestants.filter((c) => c.status === "pending").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-2 rounded-lg bg-red-500/10">
                  <XCircle className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {allContestants.filter((c) => c.status === "rejected").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Rejected</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters & Actions */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex flex-col md:flex-row gap-4 justify-between">
                <div className="flex flex-1 gap-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search contestants..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-44">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Photography">Photography</SelectItem>
                      <SelectItem value="Fashion Design">Fashion Design</SelectItem>
                      <SelectItem value="Graphics Design">Graphics Design</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  {selectedContestants.length > 0 && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-500"
                        onClick={() => setShowApproveDialog(true)}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve ({selectedContestants.length})
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500"
                        onClick={() => setShowRejectDialog(true)}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject ({selectedContestants.length})
                      </Button>
                    </>
                  )}
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={
                          selectedContestants.length === filteredContestants.length &&
                          filteredContestants.length > 0
                        }
                        onCheckedChange={toggleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Contestant</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Institution</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Votes</TableHead>
                    <TableHead>Registered</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContestants.map((contestant) => (
                    <TableRow key={contestant.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedContestants.includes(contestant.id)}
                          onCheckedChange={() => toggleSelect(contestant.id)}
                        />
                      </TableCell>
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
                            <p className="text-xs text-muted-foreground">{contestant.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="flex items-center gap-1 w-fit">
                          {categoryIcons[contestant.category]}
                          {contestant.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{contestant.institution}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusColors[contestant.status]}>
                          {contestant.status === "approved" && (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          )}
                          {contestant.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                          {contestant.status === "rejected" && <XCircle className="h-3 w-3 mr-1" />}
                          {contestant.status.charAt(0).toUpperCase() + contestant.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{contestant.votes.toLocaleString()}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {contestant.registeredAt}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/contestant/${contestant.id}`}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Profile
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {contestant.status === "pending" && (
                              <>
                                <DropdownMenuItem
                                  className="text-green-500"
                                  onClick={() => {
                                    setSelectedContestant(contestant)
                                    setShowApproveDialog(true)
                                  }}
                                >
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-500"
                                  onClick={() => {
                                    setSelectedContestant(contestant)
                                    setShowRejectDialog(true)
                                  }}
                                >
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Reject
                                </DropdownMenuItem>
                              </>
                            )}
                            <DropdownMenuItem className="text-red-500">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredContestants.length} of {allContestants.length} contestants
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Approve Dialog */}
      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Contestant{selectedContestants.length > 1 ? "s" : ""}</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve{" "}
              {selectedContestant
                ? selectedContestant.name
                : `${selectedContestants.length} selected contestant${
                    selectedContestants.length > 1 ? "s" : ""
                  }`}
              ? They will be added to the active competition.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApproveDialog(false)}>
              Cancel
            </Button>
            <Button
              className="bg-green-500 hover:bg-green-600"
              onClick={() => {
                setShowApproveDialog(false)
                setSelectedContestant(null)
                setSelectedContestants([])
              }}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Contestant{selectedContestants.length > 1 ? "s" : ""}</DialogTitle>
            <DialogDescription>
              Are you sure you want to reject{" "}
              {selectedContestant
                ? selectedContestant.name
                : `${selectedContestants.length} selected contestant${
                    selectedContestants.length > 1 ? "s" : ""
                  }`}
              ? They will be notified via email.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setShowRejectDialog(false)
                setSelectedContestant(null)
                setSelectedContestants([])
              }}
            >
              <XCircle className="h-4 w-4 mr-2" />
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
