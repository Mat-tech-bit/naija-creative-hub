"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Calendar } from "lucide-react"

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing and using the Creative Edge platform ("Platform"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.

These Terms of Service ("Terms") govern your access to and use of our website, services, and applications (collectively, the "Services"). Please read these Terms carefully before using our Services.`,
  },
  {
    title: "2. Eligibility",
    content: `To participate in Creative Edge competitions, you must:

• Be at least 16 years of age
• Be a legal resident of Nigeria
• Have a valid email address and phone number
• Not have been previously disqualified from any Creative Edge competition
• For contestants under 18, parental or guardian consent is required

We reserve the right to verify eligibility and disqualify any participant who does not meet these requirements.`,
  },
  {
    title: "3. Registration and Account",
    content: `When you register for an account, you agree to:

• Provide accurate, current, and complete information
• Maintain the security of your password and account
• Accept responsibility for all activities under your account
• Notify us immediately of any unauthorized use

You may not transfer your account to anyone else. We reserve the right to suspend or terminate accounts that violate these terms.`,
  },
  {
    title: "4. Competition Rules",
    content: `All participants must adhere to the following competition rules:

• Submit only original work that you have created
• Not plagiarize or infringe on any intellectual property rights
• Not use AI-generated content as your primary submission
• Submit entries within the specified deadline
• Maintain appropriate and respectful content
• Not engage in vote manipulation or fraudulent activities

Violation of these rules may result in immediate disqualification and permanent ban from future competitions.`,
  },
  {
    title: "5. Voting System",
    content: `Our voting system operates as follows:

• Each vote costs ₦50 (Nigerian Naira)
• Votes are non-refundable once cast
• Multiple votes for the same contestant are allowed
• Votes cannot be transferred between contestants
• We reserve the right to invalidate suspicious voting activity
• Final vote counts are determined by Creative Edge and are final

We employ fraud detection systems to ensure fair competition. Any attempt to manipulate votes will result in disqualification.`,
  },
  {
    title: "6. Prizes and Awards",
    content: `Prize distribution is subject to the following conditions:

• Winners must verify their identity before receiving prizes
• Cash prizes will be transferred to Nigerian bank accounts only
• Prizes are non-transferable and cannot be exchanged for cash alternatives
• Tax obligations on prizes are the responsibility of the winner
• Prizes must be claimed within 30 days of winner announcement
• We reserve the right to substitute prizes of equal or greater value`,
  },
  {
    title: "7. Intellectual Property",
    content: `Regarding intellectual property rights:

• You retain ownership of your submitted content
• By submitting, you grant Creative Edge a non-exclusive license to use, display, and promote your work
• This license includes use in marketing materials, social media, and promotional content
• You warrant that your submission does not infringe on any third-party rights
• Creative Edge branding and materials are our exclusive property`,
  },
  {
    title: "8. Privacy and Data Protection",
    content: `We are committed to protecting your privacy:

• Personal information is collected and processed in accordance with our Privacy Policy
• We do not sell your personal information to third parties
• Your data may be used to improve our services and communicate with you
• You have the right to access, correct, or delete your personal information
• Payment information is processed securely through our payment partners`,
  },
  {
    title: "9. Payment Terms",
    content: `All payments are subject to these terms:

• Payments are processed through secure third-party payment providers
• All transactions are in Nigerian Naira (₦)
• Registration fees (if applicable) are non-refundable
• Voting payments are non-refundable
• We are not responsible for payment failures due to third-party issues
• Receipts are available upon request`,
  },
  {
    title: "10. Limitation of Liability",
    content: `Creative Edge shall not be liable for:

• Any indirect, incidental, or consequential damages
• Loss of data, revenue, or profits
• Technical failures or service interruptions
• Actions of third parties or other users
• Content submitted by other users

Our total liability shall not exceed the amount you have paid to us in the past 12 months.`,
  },
  {
    title: "11. Modifications to Terms",
    content: `We reserve the right to modify these Terms at any time:

• Changes will be posted on this page with an updated revision date
• Continued use of the Platform after changes constitutes acceptance
• Material changes will be communicated via email or platform notification
• It is your responsibility to review these Terms periodically`,
  },
  {
    title: "12. Termination",
    content: `We may terminate or suspend your access to the Platform:

• For violation of these Terms
• For fraudulent or illegal activity
• At our sole discretion with or without notice
• Upon your request to close your account

Upon termination, your right to use the Platform ceases immediately.`,
  },
  {
    title: "13. Governing Law",
    content: `These Terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising from these Terms shall be resolved in the courts of Lagos State, Nigeria.`,
  },
  {
    title: "14. Contact Information",
    content: `For questions about these Terms, please contact us:

Email: legal@creativeedge.ng
Address: 15 Creative Hub Avenue, Victoria Island, Lagos, Nigeria
Phone: +234 801 234 5678`,
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
              <FileText className="h-3 w-3 mr-1" />
              Legal
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Terms of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Service
              </span>
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Please read these terms carefully before using our platform.
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Last updated: November 1, 2024
            </div>
          </motion.div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-12 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Quick Navigation */}
            <Card className="mb-8 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h2 className="font-semibold mb-4">Quick Navigation</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {sections.map((section, index) => (
                    <a
                      key={index}
                      href={`#section-${index + 1}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {section.title}
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Terms Sections */}
            <div className="space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  id={`section-${index + 1}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6 md:p-8">
                      <h2 className="text-xl font-semibold mb-4 text-primary">{section.title}</h2>
                      <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                        {section.content}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Footer Note */}
            <Card className="mt-8 bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">
                  By using Creative Edge, you acknowledge that you have read, understood, and agree
                  to be bound by these Terms of Service. If you have any questions, please{" "}
                  <Link href="/contact" className="text-primary hover:underline">
                    contact us
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
