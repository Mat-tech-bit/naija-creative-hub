"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Trophy,
  Users,
  Star,
  Target,
  Heart,
  Zap,
  Award,
  Globe,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Rocket,
  Shield,
} from "lucide-react"

const stats = [
  { icon: Users, value: "10,000+", label: "Contestants" },
  { icon: Star, value: "5M+", label: "Total Votes" },
  { icon: Trophy, value: "₦15M+", label: "Prizes Awarded" },
  { icon: Globe, value: "36", label: "States Represented" },
]

const values = [
  {
    icon: Lightbulb,
    title: "Creativity First",
    description:
      "We believe everyone has creative potential. Our platform provides the stage for that potential to shine.",
  },
  {
    icon: Shield,
    title: "Fair Competition",
    description:
      "Transparent voting, clear rules, and equal opportunities for all contestants regardless of background.",
  },
  {
    icon: Heart,
    title: "Community Driven",
    description:
      "Built by creatives, for creatives. Our community shapes every decision we make.",
  },
  {
    icon: Rocket,
    title: "Career Launch",
    description:
      "Beyond prizes, we connect winners with industry opportunities, mentorship, and exposure.",
  },
]

const team = [
  {
    name: "Adaora Nwosu",
    role: "Founder & CEO",
    bio: "Former creative director with a passion for discovering emerging talent.",
    image: "/team/adaora.jpg",
  },
  {
    name: "Emeka Okafor",
    role: "Head of Operations",
    bio: "Event management expert with 10+ years in the creative industry.",
    image: "/team/emeka.jpg",
  },
  {
    name: "Fatima Ibrahim",
    role: "Creative Director",
    bio: "Award-winning designer and advocate for youth creative education.",
    image: "/team/fatima.jpg",
  },
  {
    name: "Tunde Adeleke",
    role: "Technology Lead",
    bio: "Tech entrepreneur focused on building platforms that empower creators.",
    image: "/team/tunde.jpg",
  },
]

const milestones = [
  {
    year: "2022",
    title: "The Beginning",
    description: "Creative Edge launched with 1,500 contestants and a vision to transform creative competitions in Nigeria.",
  },
  {
    year: "2023",
    title: "Rapid Growth",
    description: "Expanded to 3 categories, partnered with major brands, and reached over 2,000 contestants.",
  },
  {
    year: "2024",
    title: "Going Big",
    description: "Largest edition yet with ₦5M prize pool, international judges, and nationwide university tours.",
  },
  {
    year: "2025",
    title: "The Future",
    description: "Planning West African expansion, launching creator studio, and introducing new competition formats.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
              <Heart className="h-3 w-3 mr-1" />
              Our Story
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Empowering{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Creative Talent
              </span>
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Creative Edge is Nigeria&apos;s premier platform for discovering, celebrating, and
              launching the careers of young creative talents through exciting competitions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-border/50 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge variant="outline" className="mb-4">
                <Target className="h-3 w-3 mr-1" />
                Our Mission
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Discovering Tomorrow&apos;s Creative Leaders Today
              </h2>
              <p className="text-muted-foreground mb-6">
                We started Creative Edge with a simple belief: talent exists everywhere, but
                opportunity doesn&apos;t. Our mission is to bridge that gap by creating a platform where
                creative skills are recognized, celebrated, and rewarded.
              </p>
              <p className="text-muted-foreground mb-8">
                Through our competitions, we&apos;ve seen photographers from rural areas gain
                international recognition, fashion designers launch successful brands, and graphic
                artists land dream jobs at top agencies. These stories drive us forward.
              </p>
              <div className="space-y-3">
                {[
                  "Provide equal opportunities for all creative talents",
                  "Connect emerging artists with industry professionals",
                  "Build a supportive community of like-minded creatives",
                  "Celebrate African creativity on the global stage",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 p-8 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                  {[
                    { icon: Award, label: "Excellence" },
                    { icon: Users, label: "Community" },
                    { icon: Zap, label: "Innovation" },
                    { icon: Heart, label: "Passion" },
                  ].map((item, index) => (
                    <Card key={index} className="bg-background/80 backdrop-blur-sm">
                      <CardContent className="p-6 text-center">
                        <item.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                        <div className="font-medium">{item.label}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <Badge variant="outline" className="mb-4">
              <Star className="h-3 w-3 mr-1" />
              Our Values
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Stand For</h2>
            <p className="text-muted-foreground">
              These core values guide everything we do at Creative Edge.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <Badge variant="outline" className="mb-4">
              <Rocket className="h-3 w-3 mr-1" />
              Our Journey
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Milestones</h2>
            <p className="text-muted-foreground">
              From humble beginnings to Nigeria&apos;s premier creative competition.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {milestone.year}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 h-full bg-primary/20 mt-2" />
                  )}
                </div>
                <Card className="flex-1 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <Badge variant="outline" className="mb-4">
              <Users className="h-3 w-3 mr-1" />
              The Team
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet the People Behind Creative Edge</h2>
            <p className="text-muted-foreground">
              A passionate team dedicated to empowering creative talents across Nigeria.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden bg-card/50 backdrop-blur-sm">
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <div className="w-24 h-24 bg-background/50 rounded-full flex items-center justify-center">
                      <Users className="h-12 w-12 text-primary/50" />
                    </div>
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-primary text-sm mb-2">{member.role}</p>
                    <p className="text-muted-foreground text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 border-primary/30 overflow-hidden">
            <CardContent className="p-12 text-center relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Community</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Whether you&apos;re a contestant, supporter, or potential partner, there&apos;s a place
                  for you in the Creative Edge family.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                    <Link href="/register">
                      Become a Contestant
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/contact">Partner With Us</Link>
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
