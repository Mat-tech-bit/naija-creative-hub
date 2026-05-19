"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Calendar } from "lucide-react"

const sections = [
  {
    title: "1. Information We Collect",
    content: `We collect information you provide directly to us, including:

• Personal Information: Name, email address, phone number, date of birth, and location when you register for an account or competition.

• Profile Information: Photos, bio, social media links, and portfolio work that you choose to share.

• Payment Information: Payment method details (processed securely by third-party providers), transaction history, and billing address.

• Communications: Messages you send to us, other users, or through our platform.

• Usage Data: Information about how you use our platform, including pages visited, features used, and actions taken.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use the information we collect to:

• Provide, maintain, and improve our services
• Process your competition registration and entries
• Process voting transactions and distribute prizes
• Communicate with you about competitions, updates, and promotions
• Respond to your comments, questions, and support requests
• Monitor and analyze trends, usage, and activities
• Detect, investigate, and prevent fraudulent transactions and abuse
• Personalize and improve your experience
• Comply with legal obligations`,
  },
  {
    title: "3. Information Sharing",
    content: `We may share your information in the following circumstances:

• Public Profile: Your contestant profile, including name, photo, and portfolio, is publicly visible during competitions.

• Voting: Voters may see contestant profiles and vote counts.

• Service Providers: We share information with third-party vendors who perform services on our behalf (payment processing, analytics, customer support).

• Legal Requirements: We may disclose information if required by law or to protect the rights, property, or safety of NaijaCreativeHub, our users, or others.

• Business Transfers: In connection with any merger, acquisition, or sale of assets.

We do not sell your personal information to third parties.`,
  },
  {
    title: "4. Data Security",
    content: `We implement appropriate security measures to protect your personal information:

• Encryption of sensitive data in transit and at rest
• Regular security assessments and audits
• Access controls and authentication measures
• Secure payment processing through certified providers
• Employee training on data protection

While we strive to protect your information, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.`,
  },
  {
    title: "5. Your Rights and Choices",
    content: `You have the following rights regarding your personal information:

• Access: Request a copy of your personal data we hold
• Correction: Update or correct inaccurate information
• Deletion: Request deletion of your personal information
• Opt-out: Unsubscribe from marketing communications
• Data Portability: Request a copy of your data in a portable format
• Withdrawal of Consent: Withdraw consent for data processing where applicable

To exercise these rights, contact us at hello@naijacreativehub.com`,
  },
  {
    title: "6. Cookies and Tracking",
    content: `We use cookies and similar tracking technologies to:

• Keep you logged in
• Remember your preferences
• Analyze how our platform is used
• Deliver personalized content and ads

Types of cookies we use:
• Essential Cookies: Required for the platform to function
• Analytics Cookies: Help us understand how you use our platform
• Marketing Cookies: Used to deliver relevant advertisements

You can manage cookie preferences through your browser settings.`,
  },
  {
    title: "7. Data Retention",
    content: `We retain your personal information for as long as necessary to:

• Provide our services to you
• Comply with legal obligations
• Resolve disputes and enforce agreements
• Maintain records for tax and accounting purposes

After account deletion:
• Profile data is removed within 30 days
• Transaction records are retained for 7 years (legal requirement)
• Anonymized analytics data may be retained indefinitely`,
  },
  {
    title: "8. Children's Privacy",
    content: `Our platform is not intended for children under 16 years of age:

• We do not knowingly collect personal information from children under 16
• Participants aged 16-17 require parental or guardian consent
• If we learn we have collected information from a child under 16, we will delete it promptly

If you believe we have information about a child under 16, please contact us immediately.`,
  },
  {
    title: "9. International Data Transfers",
    content: `Your information may be transferred to and processed in countries other than Nigeria:

• We use cloud service providers with servers in various locations
• We ensure appropriate safeguards are in place for international transfers
• By using our platform, you consent to such transfers

We comply with applicable data protection laws regarding international transfers.`,
  },
  {
    title: "10. Third-Party Links",
    content: `Our platform may contain links to third-party websites:

• We are not responsible for the privacy practices of third-party sites
• We encourage you to read the privacy policies of any website you visit
• Social media features may collect your IP address and set cookies

Third-party services we integrate with have their own privacy policies.`,
  },
  {
    title: "11. Updates to This Policy",
    content: `We may update this Privacy Policy from time to time:

• Changes will be posted on this page with an updated revision date
• Material changes will be communicated via email or platform notification
• Continued use after changes constitutes acceptance of the new policy
• We encourage you to review this policy periodically`,
  },
  {
    title: "12. Contact Us",
    content: `For questions or concerns about this Privacy Policy or our data practices:

Email: hello@naijacreativehub.com
Address: Lagos, Nigeria
Phone: +234 800 000 0000

For data protection inquiries, you may also contact our Data Protection Officer at dpo@naijacreativehub.com`,
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
              <Shield className="h-3 w-3 mr-1" />
              Legal
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Privacy{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Policy
              </span>
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Last updated: November 1, 2024
            </div>
          </motion.div>
        </div>
      </section>

      {/* Privacy Content */}
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
                      href={`#privacy-section-${index + 1}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {section.title}
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Policy Sections */}
            <div className="space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  id={`privacy-section-${index + 1}`}
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
                  By using NaijaCreativeHub, you consent to the collection and use of your information
                  as described in this Privacy Policy. If you have any questions, please{" "}
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
