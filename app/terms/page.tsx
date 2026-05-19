"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { 
  ShieldCheck, 
  Scale, 
  AlertCircle, 
  Vote, 
  Trophy, 
  UserCheck, 
  FileText,
  ChevronRight,
  ArrowLeft
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function TermsPage() {
  const sections = [
    {
      id: "eligibility",
      icon: UserCheck,
      title: "1. Eligibility",
      content: "To participate in NaijaCreativeHub contests, you must be a resident of Nigeria. By registering, you warrant that you have the legal authority to enter this agreement and abide by all rules. NaijaCreativeHub reserves the right to disqualify any participant who provides false information."
    },
    {
      id: "nature",
      icon: Scale,
      title: "2. Nature of Competition",
      content: "NaijaCreativeHub provides a platform for skill-based talent competitions. We strongly emphasize that these contests are for entertainment and talent discovery only. Participation constitutes entry into a competition and NOT an investment opportunity. We discourage taking financial risks beyond your means for participation."
    },
    {
      id: "refunds",
      icon: AlertCircle,
      title: "3. No Refund Policy",
      content: "By participating and purchasing votes, you willfully and wholeheartedly agree that all payments for votes that have been counted are final. UNDER NO CIRCUMSTANCES will refunds be issued once votes are successfully cast for a contestant.",
      highlight: true
    },
    {
      id: "rules",
      icon: ShieldCheck,
      title: "4. Contest Rules",
      items: [
        "Create & Own: You must only upload content created by you. Copyright infringement will lead to immediate disqualification.",
        "Winning Cool-off: Winners and their immediate relatives (sharing same surname) must wait 6 months before participating again. If you win in January, you can only enter again starting July.",
        "Conduct: Respect all community members. Threatening, harassing, or inappropriate behavior will result in account termination.",
        "Authenticity: Your profile must not contain inappropriate content, logos from other websites, or be used for unrelated commercial sales."
      ]
    },
    {
      id: "privacy",
      icon: ShieldCheck,
      title: "5. Privacy Policy",
      content: "We value your privacy. NaijaCreativeHub collects and stores information you provide during registration (email, name, category, and submissions). We do not share your private contact information with third parties. Anonymous data regarding platform usage may be used to improve our services."
    },
    {
      id: "voting",
      icon: Vote,
      title: "6. Voting System",
      content: "Voting begins as soon as a contest opens. We provide both free and paid voting options. Any form of automated voting, bot usage, multiple account abuse, or voting exchanges (vote-for-vote techniques) is strictly prohibited and will lead to an immediate ban and forfeiture of entries."
    },
    {
      id: "prizes",
      icon: Trophy,
      title: "7. Prizes & Redemption",
      content: "Winners will be notified within 24 hours of contest completion. Prizes are non-transferable and must be redeemed by the account holder. Cash prizes are typically processed within 30 days. If a prize remains unclaimed for 21 days, it will be awarded to the runner-up."
    },
    {
      id: "usage",
      icon: FileText,
      title: "8. Rights & Intellectual Property",
      content: "By submitting content, you grant NaijaCreativeHub the right to use and republish your name and photographs/videos in our marketing materials and across our platform. You warrant that you have obtained all necessary permissions from anyone else appearing in your submissions."
    }
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        {/* Hero Section */}
        <div className="relative overflow-hidden mb-12">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-primary/5 blur-[120px] rounded-full" />
          
          <div className="container mx-auto px-6 relative z-10">
            <Link 
              href="/" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-foreground">
                Terms & <span className="text-primary italic">Conditions</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Please read these terms carefully. By using our platform or participating in any contest, 
                you agree to be bound by these legally binding terms.
              </p>
              <div className="flex items-center gap-2 mt-8 text-sm text-muted-foreground">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Last updated: May 15, 2024
              </div>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Table of Contents - Sticky Sidebar */}
            <aside className="lg:w-1/4 hidden lg:block">
              <div className="sticky top-28 space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 px-3">Sections</p>
                {sections.map((section) => (
                  <a 
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-muted transition-all text-sm group"
                  >
                    <span className="text-muted-foreground group-hover:text-primary">{section.title.split('. ')[1]}</span>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-primary" />
                  </a>
                ))}
              </div>
            </aside>

            {/* Main Content Areas */}
            <div className="lg:w-3/4 space-y-8">
              {/* Introduction Card */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="p-8 rounded-2xl bg-card border border-border/50 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-24 h-24 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-foreground">Welcome to NaijaCreativeHub</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    These Terms & Conditions constitute a legally binding agreement between you ("User", "Participant", or "Contestant") 
                    and NaijaCreativeHub ("we", "us", or "our").
                  </p>
                  <p>
                    By accessing NaijaCreativeHub, browsing the website, or participating in any contest, you acknowledge that you 
                    have read, understood, and agree to be bound by these terms. If you do not agree, please discontinue use immediately.
                  </p>
                </div>
              </motion.div>

              {/* Sections */}
              {sections.map((section, idx) => (
                <motion.section
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-8 rounded-2xl border transition-all duration-300 ${
                    section.highlight 
                    ? "bg-primary/5 border-primary/20 ring-1 ring-primary/20" 
                    : "bg-card border-border/50 hover:border-primary/20"
                  }`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-2 rounded-lg ${section.highlight ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'}`}>
                      <section.icon className="w-6 h-6" />
                    </div>
                    <h2 className={`text-xl font-bold ${section.highlight ? 'text-primary' : 'text-foreground'}`}>
                      {section.title}
                    </h2>
                  </div>
                  
                  {section.content && (
                    <p className="text-muted-foreground leading-relaxed italic">
                      {section.content}
                    </p>
                  )}

                  {section.items && (
                    <ul className="space-y-3 mt-4">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex gap-3 text-muted-foreground leading-relaxed text-sm">
                          <span className="mt-1.5 w-1.5 h-1.5 flex-shrink-0 rounded-full bg-primary/40" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.section>
              ))}

              {/* Conclusion Footer */}
              <div className="p-8 rounded-2xl bg-muted/30 border border-dashed border-border text-center">
                <h3 className="font-bold mb-2 text-foreground">Have Questions?</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  If you have any questions regarding these terms, please contact our support team.
                </p>
                <Link href="/contact">
                  <Button variant="outline" className="rounded-full px-8">
                    Contact Support
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
