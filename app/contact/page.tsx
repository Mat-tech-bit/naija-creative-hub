"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  HelpCircle,
  Users,
  Handshake,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  CheckCircle2,
} from "lucide-react"

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: ["support@creativeedge.ng", "partnerships@creativeedge.ng"],
    description: "We typically respond within 24 hours",
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+234 801 234 5678", "+234 802 345 6789"],
    description: "Mon - Fri, 9am - 6pm WAT",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["15 NaijaCreativeHub Avenue", "Victoria Island, Lagos, Nigeria"],
    description: "By appointment only",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Monday - Friday: 9am - 6pm", "Saturday: 10am - 4pm"],
    description: "Closed on Sundays & Public Holidays",
  },
]

const inquiryTypes = [
  { value: "general", label: "General Inquiry", icon: MessageSquare },
  { value: "support", label: "Technical Support", icon: HelpCircle },
  { value: "partnership", label: "Partnership", icon: Handshake },
  { value: "contestant", label: "Contestant Support", icon: Users },
]

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com/creativeedge", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com/creativeedge", label: "Twitter" },
  { icon: Facebook, href: "https://facebook.com/creativeedge", label: "Facebook" },
  { icon: Linkedin, href: "https://linkedin.com/company/creativeedge", label: "LinkedIn" },
]

const faqs = [
  {
    question: "How long does it take to get a response?",
    answer: "We typically respond to all inquiries within 24-48 business hours.",
  },
  {
    question: "Can I visit your office without an appointment?",
    answer: "We recommend scheduling an appointment beforehand to ensure someone is available to assist you.",
  },
  {
    question: "How can I become a sponsor or partner?",
    answer: "Select 'Partnership' as your inquiry type in the contact form, and our partnerships team will reach out with more information.",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

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
              <MessageSquare className="h-3 w-3 mr-1" />
              Get in Touch
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Contact{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Us
              </span>
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Have questions, feedback, or interested in partnering with us? We&apos;d love to hear
              from you. Reach out and let&apos;s create something amazing together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 border-y border-border/50 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-foreground">
                        {detail}
                      </p>
                    ))}
                    <p className="text-sm text-muted-foreground mt-2">{info.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="h-8 w-8 text-green-500" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground mb-6">
                        Thank you for reaching out. We&apos;ll get back to you within 24-48 hours.
                      </p>
                      <Button onClick={() => setIsSubmitted(false)} variant="outline">
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              placeholder="Your name"
                              value={formData.name}
                              onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                              }
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="your@email.com"
                              value={formData.email}
                              onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                              }
                              required
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="+234 XXX XXX XXXX"
                              value={formData.phone}
                              onChange={(e) =>
                                setFormData({ ...formData, phone: e.target.value })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="inquiryType">Inquiry Type</Label>
                            <Select
                              value={formData.inquiryType}
                              onValueChange={(value) =>
                                setFormData({ ...formData, inquiryType: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                {inquiryTypes.map((type) => (
                                  <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Input
                            id="subject"
                            placeholder="What is this about?"
                            value={formData.subject}
                            onChange={(e) =>
                              setFormData({ ...formData, subject: e.target.value })
                            }
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
                            placeholder="Tell us more..."
                            rows={5}
                            value={formData.message}
                            onChange={(e) =>
                              setFormData({ ...formData, message: e.target.value })
                            }
                            required
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full"
                          size="lg"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>Sending...</>
                          ) : (
                            <>
                              Send Message
                              <Send className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </form>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Social Links */}
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                  <p className="text-muted-foreground mb-6">
                    Stay connected with NaijaCreativeHub on social media for updates, behind-the-scenes
                    content, and more.
                  </p>
                  <div className="flex gap-4">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                        aria-label={social.label}
                      >
                        <social.icon className="h-5 w-5 text-primary" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-4">Quick FAQs</h3>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index}>
                        <h4 className="font-medium mb-1">{faq.question}</h4>
                        <p className="text-sm text-muted-foreground">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card className="bg-card/50 backdrop-blur-sm overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-primary/50 mx-auto mb-2" />
                    <p className="text-muted-foreground">Victoria Island, Lagos</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
