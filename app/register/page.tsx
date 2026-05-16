"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { auth, db } from "@/lib/firebase"
import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
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
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    category: "",
    interest: "",
    workImage: null as File | null,
    profileImage: null as File | null,
    workTheme: "",
    experience: "",
    inspiration: "",
  })
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [profilePreviewUrl, setProfilePreviewUrl] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [agreedToTerms, setAgreedToTerms] = useState(false)

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

  const handleProfileFileChange = (file: File | null) => {
    if (file) {
      setFormData(prev => ({ ...prev, profileImage: file }))
      const url = URL.createObjectURL(file)
      setProfilePreviewUrl(url)
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
    // Validation for each step
    if (currentStep === 1) {
      if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
        setErrorMsg("Please fill all personal information fields")
        return
      }
      if (!formData.profileImage) {
        setErrorMsg("Please upload a profile picture")
        return
      }
      if (formData.password !== formData.confirmPassword) {
        setErrorMsg("Passwords do not match")
        return
      }
      if (formData.password.length < 6) {
        setErrorMsg("Password must be at least 6 characters")
        return
      }
    } else if (currentStep === 2) {
      if (!formData.category) {
        setErrorMsg("Please select a competition category")
        return
      }
      if (!formData.interest) {
        setErrorMsg("Please tell us about your interest")
        return
      }
    } else if (currentStep === 3) {
      if (!formData.workImage) {
        setErrorMsg("Please upload a sample of your work")
        return
      }
      if (!formData.workTheme || !formData.experience || !formData.inspiration) {
        setErrorMsg("Please fill in all details about your work")
        return
      }
    }
    
    setErrorMsg("")
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  // Upload image to Cloudinary (free, no billing required)
  const uploadToCloudinary = async (file: File): Promise<string> => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    if (!cloudName || !uploadPreset) {
      throw new Error("Cloudinary is not configured. Please set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET in .env.local")
    }
    const form = new FormData()
    form.append("file", file)
    form.append("upload_preset", uploadPreset)
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: form,
    })
    if (!res.ok) throw new Error("Image upload failed")
    const data = await res.json() as { secure_url: string }
    return data.secure_url
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (currentStep < 4) {
      nextStep()
      return
    }
    if (!agreedToTerms) {
      setErrorMsg("Please check the box to agree with the terms and conditions"); return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match"); return;
    }
    setIsLoading(true); setErrorMsg("")
    const loadingToast = toast.loading("Creating your creative profile... Please wait.")
    
    try {
      // 1. Create Auth Account
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      try {
        // 2. Upload images in parallel for better performance
        const uploadPromises: Promise<string>[] = [];
        
        if (formData.workImage) {
          uploadPromises.push(uploadToCloudinary(formData.workImage));
        } else {
          uploadPromises.push(Promise.resolve(""));
        }

        if (formData.profileImage) {
          uploadPromises.push(uploadToCloudinary(formData.profileImage));
        } else {
          uploadPromises.push(Promise.resolve(""));
        }

        const [workImageUrl, profileImageUrl] = await Promise.all(uploadPromises);

        // 3. Save to Firestore
        await setDoc(doc(db, "users", user.uid), {
          id: user.uid,
          name: formData.fullName,
          email: formData.email,
          category: categories.find(c => c.id === formData.category)?.name || "Not selected",
          categoryId: formData.category,
          interest: formData.interest,
          workTheme: formData.workTheme,
          experience: formData.experience,
          inspiration: formData.inspiration,
          work: workImageUrl,
          image: profileImageUrl,
          votes: 0,
          rank: 0,
          totalContestants: 0,
          edition: 5,
          story: formData.interest,
          joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          referralLink: `${window.location.origin}/contestant/${user.uid}`,
          topSupporters: [],
          recentVoters: []
        })

        toast.success("Registration successful! Welcome to the hub.", { id: loadingToast })
        
        // Immediate redirect to login
        router.push('/login')
      } catch (innerErr) {
        // If Firestore write or upload fails, remove the created auth account to avoid orphaned accounts
        await deleteUser(user).catch(() => null)
        throw innerErr
      }
    } catch (err) {
      console.error(err)
      const error = err as { code?: string; message?: string }
      let message = "An error occurred during registration. Please try again."
      
      if (error.code === "auth/email-already-in-use") {
        message = "An account with this email already exists. Please log in instead."
      } else if (error.code === "auth/weak-password") {
        message = "Password must be at least 6 characters."
      } else if (error.message) {
        message = error.message
      }
      
      setErrorMsg(message)
      toast.error(message, { id: loadingToast })
    } finally {
      setIsLoading(false);
    }
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
              <div className="flex items-center justify-between mb-4 px-2 sm:px-0">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center flex-1 last:flex-none">
                    <div className={cn(
                      "w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                      currentStep >= step.id
                        ? "gradient-primary text-white shadow-lg shadow-primary/20 scale-110"
                        : "bg-muted text-muted-foreground"
                    )}>
                      <step.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    {index < steps.length - 1 && (
                      <div className={cn(
                        "flex-1 h-0.5 mx-1 sm:mx-2 rounded-full transition-colors duration-500",
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
                      {/* Profile Picture Upload */}
                      <div>
                        <Label>Profile Picture</Label>
                        <div className="mt-2 flex items-start gap-4">
                          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-dashed border-border flex items-center justify-center bg-muted shrink-0">
                            {profilePreviewUrl ? (
                              <img src={profilePreviewUrl} alt="Profile Preview" className="w-full h-full object-cover" />
                            ) : (
                              <User className="w-8 h-8 text-muted-foreground" />
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleProfileFileChange(e.target.files?.[0] || null)}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                          </div>
                          <div className="flex-1 pt-1">
                            <p className="text-sm font-medium">Upload your profile photo</p>
                            <p className="text-xs text-muted-foreground mt-1">Click the circle to choose a photo. PNG or JPG.</p>
                            {profilePreviewUrl && (
                              <button type="button" onClick={() => { setProfilePreviewUrl(null); setFormData(prev => ({ ...prev, profileImage: null })) }} className="text-xs text-red-400 hover:text-red-300 mt-1">
                                Remove photo
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

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
                        <input 
                          type="checkbox" 
                          id="terms" 
                          checked={agreedToTerms}
                          onChange={(e) => setAgreedToTerms(e.target.checked)}
                          required 
                          className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer" 
                        />
                        <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                          I agree to the{" "}
                          <Link href="/terms" className="text-primary hover:underline" target="_blank">
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
                    disabled={isLoading}
                    className="flex-1 h-12 gradient-primary border-0 text-white"
                  >
                    {isLoading ? "Submitting..." : "Submit Registration"}
                    {!isLoading && <CheckCircle className="w-4 h-4 ml-2" />}
                  </Button>
                )}
              </div>
              {errorMsg && <p className="text-red-500 text-sm mt-4 text-center">{errorMsg}</p>}
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
