"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Users,
  Trophy,
  DollarSign,
  BarChart3,
  Settings,
  LogOut,
  LayoutDashboard,
  Menu,
  Bell,
  Zap,
  ChevronRight,
  Search,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/admin" },
  { icon: Users, label: "Contestants", href: "/admin/contestants" },
  { icon: Trophy, label: "Competitions", href: "/admin/competitions" },
  { icon: DollarSign, label: "Transactions", href: "/admin/transactions" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [authorized, setAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const pageTitles: Record<string, string> = {
    "/admin": "Dashboard Overview",
    "/admin/contestants": "Manage Contestants",
    "/admin/competitions": "Contest & Awards",
    "/admin/transactions": "Financial Records",
    "/admin/analytics": "System Analytics",
    "/admin/settings": "Portal Settings",
  }

  const currentTitle = pageTitles[pathname || "/admin"] || "Admin Portal"

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Only allow specific admin email
        if (user.email === "thenaijacreativehub@gmail.com") {
          setAuthorized(true)
        } else {
          router.push("/")
        }
      } else {
        router.push("/login")
      }
      setIsLoading(false)
    })
    return () => unsubscribe()
  }, [router])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1100) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (isLoading || !authorized) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-primary/20 rounded-full" />
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0" />
        </div>
        <p className="text-sm font-medium text-muted-foreground animate-pulse">Initializing Portal...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && window.innerWidth < 1100 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden" 
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Desktop & Tablet */}
      <motion.aside
        initial={false}
        animate={{ 
          width: sidebarOpen ? 280 : (window.innerWidth < 1100 ? 0 : 80),
          x: (window.innerWidth < 1100 && !sidebarOpen) ? -280 : 0
        }}
        className={cn(
          "fixed left-0 top-0 z-50 h-screen bg-card border-r border-border transition-all duration-300 ease-in-out group/sidebar",
          !sidebarOpen && window.innerWidth < 1100 && "pointer-events-none border-none"
        )}
      >
        <div className="flex h-full flex-col overflow-hidden">
          {/* Sidebar Header */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-border/50 bg-card/50 backdrop-blur shrink-0">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-lg overflow-hidden shrink-0">
                <img src="/favicon.ico" alt="NaijaCreativeHub Logo" className="h-7 w-7 object-contain" />
              </div>
              {sidebarOpen && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-bold text-lg tracking-tight"
                >
                  Naija<span className="text-primary">Hub</span>
                </motion.span>
              )}
            </Link>
            {sidebarOpen && window.innerWidth < 1100 && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden h-8 w-8 rounded-lg"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 space-y-1.5 p-3 overflow-y-auto custom-scrollbar">
            {sidebarOpen && <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-2 px-3 pt-2">Menu</p>}
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href))
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => window.innerWidth < 1100 && setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 group relative",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className={cn("h-5 w-5 shrink-0 transition-transform group-hover:scale-110", !sidebarOpen && "mx-auto")} />
                  {sidebarOpen && (
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="font-medium text-sm"
                    >
                      {item.label}
                    </motion.span>
                  )}
                  {!sidebarOpen && (
                    <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 border border-border shadow-xl">
                        {item.label}
                    </div>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Admin User Profile */}
          <div className="border-t border-border/50 p-4 bg-muted/20 shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    "w-full flex items-center gap-3 p-1.5 rounded-xl hover:bg-muted/50 transition-colors text-left",
                    !sidebarOpen && "justify-center"
                  )}
                >
                  <div className="relative shrink-0">
                    <Avatar className="h-9 w-9 rounded-xl">
                        <AvatarFallback className="bg-primary/10 text-primary rounded-xl font-bold">MH</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-card rounded-full" />
                  </div>
                  {sidebarOpen && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex-1 overflow-hidden"
                    >
                      <div className="text-sm font-bold truncate">Matthew A.</div>
                      <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Super Admin</div>
                    </motion.div>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side={sidebarOpen ? "top" : "right"} className={cn("w-56", !sidebarOpen && "ml-4")}>
                <DropdownMenuLabel>My Controls</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/admin/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Portal Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500 hover:bg-red-500/10 focus:bg-red-500/10" onClick={() => auth.signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout Securely
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <motion.main 
        initial={false}
        animate={{ 
          marginLeft: (window.innerWidth < 1100) ? 0 : (sidebarOpen ? 280 : 80)
        }}
        className="transition-all duration-300 min-h-screen flex flex-col"
      >
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 backdrop-blur-md px-4 md:px-8 shrink-0">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="h-10 w-10 rounded-xl hover:bg-muted"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            {/* Breadcrumbs / Page Title */}
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/admin" className="hover:text-foreground transition-colors">Admin</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="font-semibold text-foreground truncate max-w-[200px]">{currentTitle}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Global Search Interface */}
            <div className="hidden md:flex items-center relative group">
                <Search className="absolute left-3 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input 
                    type="text" 
                    placeholder="Quick search commands..." 
                    className="h-10 w-48 lg:w-64 pl-10 pr-4 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-xs"
                />
            </div>

            <div className="flex items-center gap-1">
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-xl border border-primary/20 mr-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Active</span>
                </div>
                
                <Button variant="ghost" size="icon" className="relative group rounded-xl">
                    <Bell className="h-5 w-5 group-hover:text-primary transition-colors" />
                    <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-red-500 rounded-full border-2 border-background animate-bounce" />
                </Button>
                
                <Button variant="ghost" size="icon" className="group rounded-xl">
                    <Settings className="h-5 w-5 group-hover:text-primary transition-colors" />
                </Button>

                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="group rounded-xl text-red-500 hover:bg-red-500/10" 
                    onClick={() => auth.signOut()}
                    title="Logout Securely"
                >
                    <LogOut className="h-5 w-5" />
                </Button>
            </div>
          </div>
        </header>

        {/* Dynamic Content Viewport */}
        <div className="flex-1 p-4 md:p-8 overflow-x-hidden">
            <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-7xl mx-auto"
            >
                {children}
            </motion.div>
        </div>

        {/* Footer Area */}
        <footer className="px-8 py-4 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between text-[10px] uppercase font-bold tracking-widest text-muted-foreground shrink-0 gap-2">
            <div>&copy; {new Date().getFullYear()} NaijaCreativeHub Administrative Portal</div>
            <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    v2.4.0 Stable
                </span>
                <span className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Real-time Sync Active
                </span>
            </div>
        </footer>
      </motion.main>
    </div>
  )
}
