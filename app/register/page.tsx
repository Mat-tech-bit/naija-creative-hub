"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Trophy, 
  ArrowLeft, 
  ArrowRight, 
  Upload, 
  User, 
  Mail, 
  Lock, 
  Camera, 
  Palette, 
  Brush,
  CheckCircle,
  Image as ImageIcon,
  FileText,
  Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const categories = [
  { id: "photography", name: "Photography", icon: Camera, color: "from-blue-500 to-cyan-500" },
  { id: "fashion", name: "Fashion Design", icon: Palette, color: "from-pink-500 to-rose-500" },
  { id: "graphics", name: "Graphics Design", icon: Brush, color: "from-purple-500 to-indigo-500" },
]

const steps = [
  { id: 1, name: "Personal Info", icon: User },
  { id: 2, name: "Category", icon: Sparkles },
  { id: 3, name: "Your Work", icon: ImageIcon },
  { id: 4, name: "Review", icon: CheckCircle },
]

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    category: "",
    interest: "",
    workImage: null as File | null,
    workTheme: "",
    experience: "",
    inspiration: "",
  })
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (file: File | null) => {
    if (file) {
      setFormData({ ...formData, workImage: file })
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      handleFileChange(file)
    }
  }

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    // Redirect to profile page after successful registration
    window.location.href = "/contestant/new"
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-muted/30">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-[100px]" />
        
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
            Join the Next Generation of{" "}
            <span className="gradient-text">Creative Icons</span>
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Register to compete, showcase your talent, and win amazing prizes. Your creative journey starts here.
          </p>

          {/* Features */}
          <div className="space-y-4">
            {[
              "Compete in Photography, Fashion, or Graphics Design",
              "Get votes from supporters worldwide",
              "Win cash prizes up to ₦300,000",
              "Gain exposure and recognition",
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm">{feature}</span>
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

        <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-lg">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                      currentStep >= step.id 
                        ? "gradient-primary text-white" 
                        : "bg-muted text-muted-foreground"
                    )}>
                      <step.icon className="w-5 h-5" />
                    </div>
                    {index < steps.length - 1 && (
                      <div className={cn(
                        "w-8 sm:w-16 h-0.5 mx-2",
                        currentStep > step.id ? "bg-primary" : "bg-muted"
                      )} />
                    )}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Step {currentStep} of {steps.length}: {steps[currentStep - 1].name}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {/* Step 1: Personal Info */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold mb-2">Create Your Account</h2>
                      <p className="text-muted-foreground">Enter your personal information to get started</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <div className="relative mt-2">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            id="fullName"
                            name="fullName"
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="pl-10 h-12"
                            required
                          />
                        </div>
                      </div>

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
                        <Label htmlFor="password">Password</Label>
                        <div className="relative mt-2">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            className="pl-10 h-12"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <div className="relative mt-2">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="pl-10 h-12"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Category Selection */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold mb-2">Choose Your Category</h2>
                      <p className="text-muted-foreground">Select the creative field you want to compete in</p>
                    </div>

                    <div className="grid gap-4">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, category: category.id })}
                          className={cn(
                            "flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left",
                            formData.category === category.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          )}
                        >
                          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                            <category.icon className="w-7 h-7 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{category.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Compete in {category.name.toLowerCase()}
                            </p>
                          </div>
                          <div className={cn(
                            "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                            formData.category === category.id
                              ? "border-primary bg-primary"
                              : "border-muted"
                          )}>
                            {formData.category === category.id && (
                              <CheckCircle className="w-4 h-4 text-primary-foreground" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>

                    <div>
                      <Label htmlFor="interest">Why are you interested in this category?</Label>
                      <Textarea
                        id="interest"
                        name="interest"
                        placeholder="Tell us about your passion for this creative field..."
                        value={formData.interest}
                        onChange={handleChange}
                        className="mt-2 min-h-[100px]"
                        required
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Upload Work */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold mb-2">Upload Your Work</h2>
                      <p className="text-muted-foreground">Share your best creative piece with the world</p>
                    </div>

                    {/* Upload Zone */}
                    <div
                      onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleDrop}
                      className={cn(
                        "relative border-2 border-dashed rounded-xl p-8 text-center transition-colors",
                        isDragging ? "border-primary bg-primary/5" : "border-border",
                        previewUrl && "border-solid"
                      )}
                    >
                      {previewUrl ? (
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => { setPreviewUrl(null); setFormData({ ...formData, workImage: null }) }}
                            className="absolute top-2 right-2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                          >
                            <ArrowLeft className="w-4 h-4 rotate-45" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="w-16 h-16 mx-auto rounded-2xl bg-muted flex items-center justify-center mb-4">
                            <Upload className="w-8 h-8 text-muted-foreground" />
                          </div>
                          <p className="font-medium mb-2">Drop your image here</p>
                          <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                        </>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="workTheme">Theme of Your Work</Label>
                        <Input
                          id="workTheme"
                          name="workTheme"
                          placeholder="e.g., Nature, Urban Life, Abstract..."
                          value={formData.workTheme}
                          onChange={handleChange}
                          className="mt-2 h-12"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="experience">Years of Experience</Label>
                        <Input
                          id="experience"
                          name="experience"
                          type="number"
                          placeholder="e.g., 2"
                          value={formData.experience}
                          onChange={handleChange}
                          className="mt-2 h-12"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="inspiration">What Inspired This Work?</Label>
                        <Textarea
                          id="inspiration"
                          name="inspiration"
                          placeholder="Share the story behind your creation..."
                          value={formData.inspiration}
                          onChange={handleChange}
                          className="mt-2 min-h-[100px]"
                          required
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Review */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold mb-2">Review Your Entry</h2>
                      <p className="text-muted-foreground">Make sure everything looks good before submitting</p>
                    </div>

                    <div className="space-y-4">
                      {/* Personal Info Summary */}
                      <div className="glass rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <User className="w-5 h-5 text-primary" />
                          <h3 className="font-semibold">Personal Information</h3>
                        </div>
                        <div className="space-y-2 text-sm">
                          <p><span className="text-muted-foreground">Name:</span> {formData.fullName}</p>
                          <p><span className="text-muted-foreground">Email:</span> {formData.email}</p>
                        </div>
                      </div>

                      {/* Category Summary */}
                      <div className="glass rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Sparkles className="w-5 h-5 text-primary" />
                          <h3 className="font-semibold">Category</h3>
                        </div>
                        <p className="text-sm">
                          {categories.find(c => c.id === formData.category)?.name || "Not selected"}
                        </p>
                      </div>

                      {/* Work Summary */}
                      <div className="glass rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <ImageIcon className="w-5 h-5 text-primary" />
                          <h3 className="font-semibold">Your Work</h3>
                        </div>
                        {previewUrl && (
                          <div className="aspect-video rounded-lg overflow-hidden mb-3">
                            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="space-y-2 text-sm">
                          <p><span className="text-muted-foreground">Theme:</span> {formData.workTheme}</p>
                          <p><span className="text-muted-foreground">Experience:</span> {formData.experience} years</p>
                        </div>
                      </div>

                      {/* Terms */}
                      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl">
                        <input type="checkbox" id="terms" required className="mt-1" />
                        <label htmlFor="terms" className="text-sm text-muted-foreground">
                          I agree to the{" "}
                          <Link href="/terms" className="text-primary hover:underline">
                            Terms & Conditions
                          </Link>{" "}
                          and understand that votes are non-refundable.
                        </label>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="flex-1 h-12"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                )}
                {currentStep < 4 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="flex-1 h-12 gradient-primary border-0 text-white"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="flex-1 h-12 gradient-primary border-0 text-white"
                  >
                    Submit Registration
                    <CheckCircle className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </form>

            {/* Login Link */}
            <p className="text-center text-sm text-muted-foreground mt-8">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
