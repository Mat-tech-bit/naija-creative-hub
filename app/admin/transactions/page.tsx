"use client"

import { useState, useEffect } from "react"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Download, Filter } from "lucide-react"

interface Transaction {
  id: string
  reference: string
  email: string
  contestantName: string
  voteCount: number
  amount: number
  createdAt: any
  status: string
}

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      const votesRef = collection(db, "votes")
      const q = query(votesRef, orderBy("createdAt", "desc"))
      const snapshot = await getDocs(q)
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Transaction))
      setTransactions(data)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching transactions:", error)
      setIsLoading(false)
    }
  }

  const filteredTransactions = transactions.filter(txn => 
    txn.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    txn.contestantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    txn.reference.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Transactions</h1>
          <p className="text-sm text-muted-foreground">Track all voting activities and revenue</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by email, name or ref..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reference</TableHead>
                <TableHead>Voter</TableHead>
                <TableHead>Contestant</TableHead>
                <TableHead>Votes</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell className="font-mono text-xs">{txn.reference}</TableCell>
                  <TableCell>{txn.email}</TableCell>
                  <TableCell>{txn.contestantName}</TableCell>
                  <TableCell>{txn.voteCount}</TableCell>
                  <TableCell>₦{txn.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {txn.createdAt?.toDate ? txn.createdAt.toDate().toLocaleString() : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                      {txn.status || "success"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              {filteredTransactions.length === 0 && !isLoading && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                    No transactions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
