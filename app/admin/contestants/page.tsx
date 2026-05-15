"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { db } from "@/lib/firebase"
import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore"
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
  Camera,
  Palette,
  PenTool,
  Trash2,
  Edit,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Contestant {
  id: string
  name: string
  email: string
  category: string
  status: "approved" | "pending" | "rejected"
  votes: number
  institution?: string
  image?: string
  createdAt?: any
}

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

export default function AdminContestantsPage() {
  const [contestants, setContestants] = useState<Contestant[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedContestantIds, setSelectedContestantIds] = useState<string[]>([])
  const [showApproveDialog, setShowApproveDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [targetContestant, setTargetContestant] = useState<Contestant | null>(null)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    fetchContestants()
  }, [])

  const fetchContestants = async () => {
    try {
      const usersRef = collection(db, "users")
      const q = query(usersRef, orderBy("votes", "desc"))
      const snapshot = await getDocs(q)
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        status: doc.data().status || "approved"
      } as Contestant))
      setContestants(data)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching contestants:", error)
      setIsLoading(false)
    }
  }

  const handleStatusUpdate = async (id: string, newStatus: "approved" | "rejected") => {
    setActionLoading(true)
    try {
      const docRef = doc(db, "users", id)
      await updateDoc(docRef, { status: newStatus })
      setContestants(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c))
      setShowApproveDialog(false)
      setShowRejectDialog(false)
      setTargetContestant(null)
    } catch (error) {
      console.error("Error updating status:", error)
    } finally {
      setActionLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    setActionLoading(true)
    try {
      await deleteDoc(doc(db, "users", id))
      setContestants(prev => prev.filter(c => c.id !== id))
      setShowDeleteDialog(false)
      setTargetContestant(null)
    } catch (error) {
      console.error("Error deleting contestant:", error)
    } finally {
      setActionLoading(false)
    }
  }

  const filteredContestants = contestants.filter((contestant) => {
    const name = contestant.name || ""
    const email = contestant.email || ""
    const matchesSearch =
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || contestant.category === categoryFilter
    const matchesStatus = statusFilter === "all" || contestant.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const toggleSelectAll = () => {
    if (selectedContestantIds.length === filteredContestants.length) {
      setSelectedContestantIds([])
    } else {
      setSelectedContestantIds(filteredContestants.map((c) => c.id))
    }
  }

  const toggleSelect = (id: string) => {
    if (selectedContestantIds.includes(id)) {
      setSelectedContestantIds(selectedContestantIds.filter((cId) => cId !== id))
    } else {
      setSelectedContestantIds([...selectedContestantIds, id])
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Contestants Management</h1>
          <p className="text-sm text-muted-foreground">Review and manage all competition participants</p>
        </div>
        <Link href="/register">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Contestant
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500"><Users className="h-5 w-5" /></div>
            <div><p className="text-xl font-bold">{contestants.length}</p><p className="text-xs text-muted-foreground">Total</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 rounded-lg bg-green-500/10 text-green-500"><CheckCircle className="h-5 w-5" /></div>
            <div><p className="text-xl font-bold">{contestants.filter(c => c.status === 'approved').length}</p><p className="text-xs text-muted-foreground">Approved</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500"><Clock className="h-5 w-5" /></div>
            <div><p className="text-xl font-bold">{contestants.filter(c => c.status === 'pending').length}</p><p className="text-xs text-muted-foreground">Pending</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 rounded-lg bg-red-500/10 text-red-500"><XCircle className="h-5 w-5" /></div>
            <div><p className="text-xl font-bold">{contestants.filter(c => c.status === 'rejected').length}</p><p className="text-xs text-muted-foreground">Rejected</p></div>
          </CardContent>
        </Card>
      </div>

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
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" /> Export</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox 
                    checked={selectedContestantIds.length === filteredContestants.length && filteredContestants.length > 0}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>Contestant</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Votes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContestants.map((contestant) => (
                <TableRow key={contestant.id}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedContestantIds.includes(contestant.id)} 
                      onCheckedChange={() => toggleSelect(contestant.id)} 
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={contestant.image} />
                        <AvatarFallback>{contestant.name?.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{contestant.name}</p>
                        <p className="text-xs text-muted-foreground">{contestant.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="flex items-center gap-1 w-fit">
                      {categoryIcons[contestant.category] || <Zap className="h-3 w-3" />}
                      {contestant.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColors[contestant.status]}>
                      {contestant.status === 'approved' && <CheckCircle className="h-3 w-3 mr-1" />}
                      {contestant.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                      {contestant.status === 'rejected' && <XCircle className="h-3 w-3 mr-1" />}
                      {contestant.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{contestant.votes?.toLocaleString() || 0}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link href={`/contestant/${contestant.id}`}><DropdownMenuItem><Eye className="h-4 w-4 mr-2" /> View Profile</DropdownMenuItem></Link>
                        <DropdownMenuSeparator />
                        {contestant.status !== 'approved' && (
                          <DropdownMenuItem className="text-green-500" onClick={() => { setTargetContestant(contestant); setShowApproveDialog(true); }}>
                            <CheckCircle className="h-4 w-4 mr-2" /> Approve
                          </DropdownMenuItem>
                        )}
                        {contestant.status !== 'rejected' && (
                          <DropdownMenuItem className="text-yellow-500" onClick={() => { setTargetContestant(contestant); setShowRejectDialog(true); }}>
                            <XCircle className="h-4 w-4 mr-2" /> Reject
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-red-500" onClick={() => { setTargetContestant(contestant); setShowDeleteDialog(true); }}>
                          <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Action Dialogs */}
      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Approve Contestant</DialogTitle><DialogDescription>Are you sure you want to approve {targetContestant?.name}?</DialogDescription></DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApproveDialog(false)}>Cancel</Button>
            <Button onClick={() => handleStatusUpdate(targetContestant!.id, 'approved')} disabled={actionLoading}>Confirm Approval</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Reject Contestant</DialogTitle><DialogDescription>Are you sure you want to reject {targetContestant?.name}?</DialogDescription></DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => handleStatusUpdate(targetContestant!.id, 'rejected')} disabled={actionLoading}>Confirm Rejection</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Delete Contestant</DialogTitle><DialogDescription>This action is permanent. Are you sure you want to delete {targetContestant?.name}?</DialogDescription></DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => handleDelete(targetContestant!.id)} disabled={actionLoading}>Delete Permanently</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
