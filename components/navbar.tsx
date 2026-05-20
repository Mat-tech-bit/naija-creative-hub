"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Camera, Palette, Brush, Trophy, Users, ChevronDown, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Editions", href: "/editions" },
  { name: "Leaderboard", href: "/leaderboard" },
  { name: "Winners", href: "/winners" },
  { name: "Contact", href: "/contact" },
]

const categories = [
  { 
    name: "Photography", 
    icon: Camera, 
    href: "/leaderboard?category=photography",
    description: "Capturing moments through the lens"
  },
  { 
    name: "Fashion Design", 
    icon: Palette, 
    href: "/leaderboard?category=fashion",
    description: "Style, elegance, and innovation"
  },
  { 
    name: "Graphics Design", 
    icon: Brush, 
    href: "/leaderboard?category=graphics",
    description: "Visual communication & digital art"
  },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menus on path change
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsCategoriesOpen(false)
  }, [pathname])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled 
            ? "glass-strong py-3 shadow-lg border-b border-white/5" 
            : "bg-transparent py-5"
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group relative z-50">
              <div className="relative">
                <div className="flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                  <img src="/favicon.ico" alt="NaijaCreativeHub Logo" className="w-12 h-12 sm:w-14 sm:h-14 object-contain" />
                </div>
                <div className="absolute inset-0 rounded-xl bg-primary/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity animate-pulse" />
              </div>
              <span className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Naija<span className="text-primary">Creative</span>Hub
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 bg-muted/30 p-1 rounded-xl border border-white/5">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group",
                    pathname === item.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {item.name}
                  {pathname === item.href && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                    />
                  )}
                </Link>
              ))}
              
              {/* Categories Dropdown */}
              <div className="relative">
                <button
                  onMouseEnter={() => setIsCategoriesOpen(true)}
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1",
                    isCategoriesOpen ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  Categories
                  <ChevronDown className={cn(
                    "w-4 h-4 transition-transform duration-300",
                    isCategoriesOpen && "rotate-180"
                  )} />
                </button>
                
                <AnimatePresence>
                  {isCategoriesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      onMouseLeave={() => setIsCategoriesOpen(false)}
                      className="absolute top-[calc(100%+8px)] right-0 w-80 glass-strong rounded-2xl p-3 shadow-2xl border border-white/10 overflow-hidden"
                    >
                      <div className="p-2 mb-2 border-b border-white/5 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Competitions</span>
                      </div>
                      <div className="grid gap-1">
                        {categories.map((category) => (
                          <Link
                            key={category.name}
                            href={category.href}
                            className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 transition-all duration-300 group"
                          >
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm shadow-primary/20">
                              <category.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-sm group-hover:text-primary transition-colors">{category.name}</div>
                              <div className="text-[10px] text-muted-foreground line-clamp-1">{category.description}</div>
                            </div>
                            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right Side Tools */}
            <div className="flex items-center gap-4">
              {/* Auth Buttons - Desktop */}
              <div className="hidden lg:flex items-center gap-3">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="font-medium hover:bg-white/5">
                    Log In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="gradient-primary border-0 text-white hover:opacity-90 shadow-lg shadow-primary/25 px-6 font-semibold">
                    Register
                  </Button>
                </Link>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden relative z-50 w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-primary/20 transition-all duration-300 border border-white/10"
                aria-label="Toggle menu"
              >
                <div className="relative w-6 h-6">
                  <motion.span
                    animate={isMobileMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
                    className="absolute top-1/2 left-0 w-full h-0.5 bg-foreground rounded-full origin-center"
                  />
                  <motion.span
                    animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                    className="absolute top-1/2 left-0 w-full h-0.5 bg-foreground rounded-full origin-center"
                  />
                  <motion.span
                    animate={isMobileMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
                    className="absolute top-1/2 left-0 w-full h-0.5 bg-foreground rounded-full origin-center"
                  />
                </div>
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Sidebar Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden pr-12"
          >
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/95 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Content Container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300, mass: 1 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-card/50 border-l border-white/10 shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="flex flex-col h-full overflow-y-auto px-6 py-20 pb-28">
                {/* Mobile Menu Links */}
                <div className="space-y-1 mb-10">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-4 px-4">Navigation</p>
                  {navigation.map((item, idx) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center justify-between px-4 py-4 rounded-2xl text-xl font-bold transition-all duration-300",
                          pathname === item.href
                            ? "text-primary bg-primary/10"
                            : "text-foreground hover:bg-white/5"
                        )}
                      >
                        {item.name}
                        {pathname === item.href && <Trophy className="w-5 h-5 text-primary" />}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile Categories */}
                <div className="space-y-4 pt-10 border-t border-white/5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-2 px-4">Creative Paths</p>
                  <div className="grid gap-3">
                    {categories.map((category, idx) => (
                      <motion.div
                        key={category.name}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + idx * 0.05 }}
                      >
                        <Link
                          href={category.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 active:scale-95 transition-all"
                        >
                          <div className="w-12 h-12 rounded-xl gradient-primary/20 flex items-center justify-center text-primary group-active:scale-110 transition-transform">
                            <category.icon className="w-6 h-6" />
                          </div>
                          <div>
                            <span className="font-bold block">{category.name}</span>
                            <span className="text-[10px] text-muted-foreground">{category.description}</span>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-auto space-y-3 pt-10">
                  <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                  >
                    <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button className="w-full h-14 rounded-2xl gradient-primary text-white font-bold text-lg shadow-xl shadow-primary/20">
                            Register Now
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                  </motion.div>
                  <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="flex gap-3"
                  >
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex-1">
                        <Button variant="outline" className="w-full h-14 rounded-2xl font-bold border-white/10 hover:bg-white/5">
                            Log In
                        </Button>
                    </Link>
                    <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center border border-white/10">
                        <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
