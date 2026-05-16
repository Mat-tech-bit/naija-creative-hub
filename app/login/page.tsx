"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { auth, db } from "@/lib/firebase"
import { signInWithEmailAndPassword, deleteUser } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { motion } from "framer-motion"
import { Trophy, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true); setErrorMsg("")
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      
      if (user.email === "thenaijacreativehub@gmail.com") {
        router.push("/admin");
      } else {
        router.push(`/contestant/${user.uid}`);
      }
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setErrorMsg("Invalid email or password");
      } else {
        setErrorMsg(err.message || "Failed to log in");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-muted/30">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
        <div className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-accent/10 blur-[100px]" />
        
        <div className="relative z-10 flex flex-col justify-center p-12 xl:p-16">
          <Link href="/" className="flex items-center gap-2 mb-12">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">
              Creative<span className="gradient-text">Vote</span>
            </span>
          </Link>
          
          <h1 className="text-4xl xl:text-5xl font-bold mb-6 text-balance">
            Welcome Back,{" "}
            <span className="gradient-text">Creative</span>
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Sign in to check your votes, share your profile, and track your ranking in the competition.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { value: "10K+", label: "Votes Cast" },
              { value: "500+", label: "Contestants" },
              { value: "₦2M+", label: "Prize Pool" },
              { value: "5", label: "Editions" },
            ].map((stat, index) => (
              <div key={index} className="glass rounded-xl p-4">
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <div className="lg:hidden p-4 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Trophy className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold">
              Creative<span className="gradient-text">Vote</span>
            </span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 sm:p-10 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black tracking-tight mb-3">Sign In</h2>
              <p className="text-sm text-muted-foreground font-medium">Enter your credentials to access your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 pr-10 h-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 gradient-primary border-0 text-white"
              >
                {isLoading ? (
                  "Signing in..."
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
            {errorMsg && <p className="text-red-500 text-sm mt-4 text-center">{errorMsg}</p>}

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  New to CreativeVote?
                </span>
              </div>
            </div>

            {/* Register Link */}
            <Link href="/register">
              <Button variant="outline" className="w-full h-12">
                Create an Account
              </Button>
            </Link>

            {/* Back to Home */}
            <p className="text-center text-sm text-muted-foreground mt-8">
              <Link href="/" className="text-primary hover:underline">
                Back to Home
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
