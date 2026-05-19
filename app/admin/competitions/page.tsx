"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Calendar, Users, Zap, Plus, Settings } from "lucide-react"

export default function AdminCompetitionsPage() {
  const competitions = [
    {
      id: "comp_2024",
      name: "NaijaCreativeHub 2024",
      status: "active",
      startDate: "Jan 2024",
      endDate: "Dec 2024",
      contestants: 45, // This would ideally be dynamic
      categories: ["Photography", "Fashion Design", "Graphics Design"],
      prize: "₦1,000,000"
    },
    {
      id: "comp_2023",
      name: "NaijaCreativeHub 2023",
      status: "completed",
      startDate: "Jan 2023",
      endDate: "Dec 2023",
      contestants: 120,
      categories: ["Photography", "Fashion Design", "Graphics Design"],
      prize: "₦500,000"
    }
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold font-heading">Competitions</h1>
          <p className="text-sm text-muted-foreground">Manage active and past competition editions</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Competition
        </Button>
      </div>

      <div className="grid gap-6">
        {competitions.map((comp) => (
          <Card key={comp.id} className={comp.status === 'active' ? 'border-primary/50' : ''}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${comp.status === 'active' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                    <Trophy className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold">{comp.name}</CardTitle>
                    <CardDescription>
                      {comp.startDate} - {comp.endDate}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant={comp.status === 'active' ? 'default' : 'secondary'} className="capitalize">
                  {comp.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Users className="h-3 w-3" /> Contestants
                  </p>
                  <p className="text-lg font-semibold">{comp.contestants}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Zap className="h-3 w-3" /> Categories
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {comp.categories.map(cat => (
                      <Badge key={cat} variant="outline" className="text-[10px] px-1.5 py-0">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> Edition
                  </p>
                  <p className="text-lg font-semibold">{comp.id.split('_')[1]}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Settings className="h-3 w-3" /> Grand Prize
                  </p>
                  <p className="text-lg font-semibold text-green-500">{comp.prize}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">View Details</Button>
                {comp.status === 'active' && (
                  <Button size="sm" className="flex-1">Manage Contestants</Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
