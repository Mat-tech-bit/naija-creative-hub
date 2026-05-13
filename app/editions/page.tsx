"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Users,
  Trophy,
  Camera,
  Palette,
  PenTool,
  ArrowRight,
  Clock,
  CheckCircle2,
  Star,
} from "lucide-react"

const editions = [
  {
    id: "2024",
    name: "Creative Edge 2024",
    status: "active",
    theme: "Breaking Boundaries",
    startDate: "November 1, 2024",
    endDate: "December 15, 2024",
    contestants: 2847,
    totalVotes: 1250000,
    prizePool: "₦5,000,000",
    categories: ["Photography", "Fashion Design", "Graphics Design"],
    description:
      "Our biggest edition yet! Creative Edge 2024 brings together the most talented young creatives from across Nigeria to compete for glory and incredible prizes.",
    highlights: [
      "Largest prize pool ever",
      "International judges panel",
      "Live voting events",
      "Brand partnership opportunities",
    ],
  },
  {
    id: "2023",
    name: "Creative Edge 2023",
    status: "completed",
    theme: "Digital Renaissance",
    startDate: "October 15, 2023",
    endDate: "November 30, 2023",
    contestants: 2156,
    totalVotes: 890000,
    prizePool: "₦3,500,000",
    categories: ["Photography", "Fashion Design", "Graphics Design"],
    description:
      "The Digital Renaissance edition celebrated the fusion of traditional creativity with modern digital tools, showcasing incredible talent from emerging artists.",
    highlights: [
      "Record-breaking participation",
      "Celebrity judge appearances",
      "University tour events",
      "Social media challenges",
    ],
    winners: [
      { name: "Adaeze Okonkwo", category: "Photography", prize: "₦500,000" },
      { name: "Chukwuemeka Adeyemi", category: "Fashion Design", prize: "₦500,000" },
      { name: "Funke Adeleke", category: "Graphics Design", prize: "₦500,000" },
    ],
  },
  {
    id: "2022",
    name: "Creative Edge 2022",
    status: "completed",
    theme: "New Horizons",
    startDate: "September 1, 2022",
    endDate: "October 31, 2022",
    contestants: 1543,
    totalVotes: 620000,
    prizePool: "₦2,000,000",
    categories: ["Photography", "Fashion Design"],
    description:
      "Our inaugural edition that started it all. New Horizons introduced Nigeria to a new way of celebrating creative talent through community-driven competitions.",
    highlights: [
      "First ever edition",
      "Groundbreaking format",
      "Media partnerships",
      "Talent discovery",
    ],
    winners: [
      { name: "Oluwaseun Bakare", category: "Photography", prize: "₦300,000" },
      { name: "Ngozi Eze", category: "Fashion Design", prize: "₦300,000" },
    ],
  },
]

const categoryIcons: Record<string, React.ReactNode> = {
  Photography: <Camera className="h-4 w-4" />,
  "Fashion Design": <Palette className="h-4 w-4" />,
  "Graphics Design": <PenTool className="h-4 w-4" />,
}

export default function EditionsPage() {
  const [selectedEdition, setSelectedEdition] = useState(editions[0])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
              <Calendar className="h-3 w-3 mr-1" />
              Competition History
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Competition{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Editions
              </span>
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Explore our journey through the years. Each edition brings new themes, bigger prizes,
              and more opportunities for creative talents to shine.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Edition Selector */}
      <section className="py-12 border-y border-border/50 bg-muted/30">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="2024" onValueChange={(v) => setSelectedEdition(editions.find((e) => e.id === v) || editions[0])}>
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-background/50">
              {editions.map((edition) => (
                <TabsTrigger
                  key={edition.id}
                  value={edition.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {edition.id}
                  {edition.status === "active" && (
                    <span className="ml-2 h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            {editions.map((edition) => (
              <TabsContent key={edition.id} value={edition.id} className="mt-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Edition Header */}
                  <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <Badge
                          variant={edition.status === "active" ? "default" : "secondary"}
                          className={edition.status === "active" ? "bg-green-500/20 text-green-400 border-green-500/30" : ""}
                        >
                          {edition.status === "active" ? (
                            <>
                              <Clock className="h-3 w-3 mr-1" />
                              Currently Active
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Completed
                            </>
                          )}
                        </Badge>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-2">{edition.name}</h2>
                      <p className="text-xl text-primary mb-4">Theme: {edition.theme}</p>
                      <p className="text-muted-foreground mb-6">{edition.description}</p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {edition.categories.map((category) => (
                          <Badge key={category} variant="outline" className="flex items-center gap-1">
                            {categoryIcons[category]}
                            {category}
                          </Badge>
                        ))}
                      </div>

                      {edition.status === "active" && (
                        <div className="flex flex-wrap gap-4">
                          <Button asChild size="lg">
                            <Link href="/register">
                              Join Now
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                          <Button asChild variant="outline" size="lg">
                            <Link href="/leaderboard">View Leaderboard</Link>
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                        <CardContent className="p-6 text-center">
                          <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                          <div className="text-3xl font-bold">{edition.contestants.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">Contestants</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
                        <CardContent className="p-6 text-center">
                          <Star className="h-8 w-8 text-accent mx-auto mb-2" />
                          <div className="text-3xl font-bold">{(edition.totalVotes / 1000000).toFixed(1)}M</div>
                          <div className="text-sm text-muted-foreground">Total Votes</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-yellow-500/20">
                        <CardContent className="p-6 text-center">
                          <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                          <div className="text-3xl font-bold">{edition.prizePool}</div>
                          <div className="text-sm text-muted-foreground">Prize Pool</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
                        <CardContent className="p-6 text-center">
                          <Calendar className="h-8 w-8 text-green-500 mx-auto mb-2" />
                          <div className="text-lg font-bold">{edition.startDate.split(" ")[0]} {edition.startDate.split(" ")[1]}</div>
                          <div className="text-sm text-muted-foreground">Start Date</div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Edition Highlights */}
                  <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <Card className="bg-card/50 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                          <Star className="h-5 w-5 text-primary" />
                          Edition Highlights
                        </h3>
                        <ul className="space-y-3">
                          {edition.highlights.map((highlight, index) => (
                            <li key={index} className="flex items-center gap-3">
                              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-card/50 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-primary" />
                          Timeline
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="w-3 h-3 bg-green-500 rounded-full" />
                            <div>
                              <div className="font-medium">Registration Opens</div>
                              <div className="text-sm text-muted-foreground">{edition.startDate}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="w-3 h-3 bg-primary rounded-full" />
                            <div>
                              <div className="font-medium">Voting Period</div>
                              <div className="text-sm text-muted-foreground">Throughout competition</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                            <div>
                              <div className="font-medium">Winners Announced</div>
                              <div className="text-sm text-muted-foreground">{edition.endDate}</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Winners Section (for completed editions) */}
                  {edition.winners && (
                    <div>
                      <h3 className="text-2xl font-bold mb-6 text-center">
                        <Trophy className="inline h-6 w-6 text-yellow-500 mr-2" />
                        Edition Winners
                      </h3>
                      <div className="grid md:grid-cols-3 gap-6">
                        {edition.winners.map((winner, index) => (
                          <Card key={index} className="bg-gradient-to-br from-yellow-500/10 to-transparent border-yellow-500/20 overflow-hidden">
                            <CardContent className="p-6 text-center">
                              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <Trophy className="h-10 w-10 text-white" />
                              </div>
                              <h4 className="font-bold text-lg">{winner.name}</h4>
                              <Badge variant="outline" className="mt-2 mb-3">
                                {winner.category}
                              </Badge>
                              <div className="text-2xl font-bold text-yellow-500">{winner.prize}</div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 border-primary/30 overflow-hidden">
            <CardContent className="p-12 text-center relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Compete?</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join thousands of creative talents and showcase your skills in Nigeria&apos;s premier
                  creative competition.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                    <Link href="/register">
                      Register Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/about">Learn More</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
