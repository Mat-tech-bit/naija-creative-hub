import Link from "next/link"
import { Camera, Palette, Brush, Trophy, Instagram, Twitter, Facebook, Mail, MapPin } from "lucide-react"

const categories = [
  { name: "Photography", icon: Camera, href: "/leaderboard?category=photography" },
  { name: "Fashion Design", icon: Palette, href: "/leaderboard?category=fashion" },
  { name: "Graphics Design", icon: Brush, href: "/leaderboard?category=graphics" },
]

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Editions", href: "/editions" },
  { name: "Leaderboard", href: "/leaderboard" },
  { name: "Winners", href: "/winners" },
  { name: "Contact", href: "/contact" },
]

const legalLinks = [
  { name: "Terms & Conditions", href: "/terms" },
  { name: "Privacy Policy", href: "/terms#privacy" },
  { name: "Contest Rules", href: "/terms#rules" },
]

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/naijacreativehub?igsh=MXhqNW5ueHhrMmRvNQ==" },
  { name: "Twitter", icon: Twitter, href: "https://x.com/Creative1237911" },
  { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/share/1BD9Zhmww5/" },
]

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <img src="/favicon.ico" alt="NaijaCreativeHub Logo" className="w-16 h-16 object-contain mix-blend-screen" />
              <span className="text-2xl font-bold text-foreground tracking-tight">
                Naija<span className="text-primary">Creative</span>Hub
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              The premier creative community platform for Nigeria. Discover and support talented young creatives in Photography, Fashion Design, and Graphics Design.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-6">Categories</h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2"
                  >
                    <category.icon className="w-4 h-4" />
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <h3 className="font-semibold mt-8 mb-6">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>thenaijacreativehub@gmail.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Lagos, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="glass rounded-xl p-6 mb-6">
            <p className="text-sm text-muted-foreground text-center leading-relaxed">
              <strong className="text-foreground">Disclaimer:</strong> Our contests constitute competitions and NOT investment opportunities. We strongly discourage taking extreme measures for the purpose of participation or winning our contests. Participants assume all risks.
            </p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} NaijaCreativeHub. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="/terms#privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
