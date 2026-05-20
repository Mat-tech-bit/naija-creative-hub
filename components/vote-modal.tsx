"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  X, 
  Plus, 
  Minus, 
  CreditCard, 
  CheckCircle, 
  Loader2,
  ThumbsUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { auth } from "@/lib/firebase"
import { toast } from "sonner"

interface VoteModalProps {
  isOpen: boolean
  onClose: () => void
  contestant: {
    id: string
    name: string
    image: string
    category: string
  }
}

const VOTE_PRICE = 50 // ₦50 per vote

export function VoteModal({ isOpen, onClose, contestant }: VoteModalProps) {
  const [voteCount, setVoteCount] = useState(10)
  const [email, setEmail] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const totalAmount = voteCount * VOTE_PRICE

  const incrementVotes = () => setVoteCount(prev => prev + 1)
  const decrementVotes = () => setVoteCount(prev => prev > 1 ? prev - 1 : 1)

  useEffect(() => {
    if (auth.currentUser?.email) {
      setEmail(auth.currentUser.email)
    }
  }, [auth.currentUser])

  const handlePayment = async () => {
    const userEmail = email;
    
    if (!userEmail) {
      toast.error("Please enter your email to continue")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
      toast.error("Please enter a valid email address")
      return
    }

    setIsProcessing(true)
    
    try {
      const response = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalAmount,
          email: userEmail,
          contestantId: contestant.id,
          contestantName: contestant.name,
          voteCount: voteCount
        }),
      })

      const data = await response.json()

      if (data.status && data.data.authorization_url) {
        window.location.href = data.data.authorization_url
      } else {
        toast.error(data.message || "Something went wrong. Please try again.")
        setIsProcessing(false)
      }
    } catch (error) {
      console.error("Payment Error:", error)
      toast.error("Network error. Please check your connection.")
      setIsProcessing(false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {isSuccess ? (
            // Success State
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </motion.div>
              </div>
              <h3 className="text-2xl font-bold mb-2">Vote Successful!</h3>
              <p className="text-muted-foreground mb-4">
                Thank you for supporting {contestant.name}!
              </p>
              <div className="text-4xl font-bold gradient-text mb-2">
                +{voteCount} votes
              </div>
              <p className="text-sm text-muted-foreground">
                Your votes have been added to the count
              </p>
            </motion.div>
          ) : (
            // Payment Form
            <>
              {/* Header */}
              <div className="gradient-primary p-6 text-white">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20">
                    <img
                      src={contestant.image}
                      alt={contestant.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Vote for {contestant.name}</h3>
                    <p className="text-white/70 text-sm">{contestant.category}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Email Input */}
                <div className="mb-4">
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full h-12 px-4 rounded-xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    required
                  />
                  <p className="text-[10px] text-muted-foreground mt-1">
                    Receipt and confirmation will be sent to this email.
                  </p>
                </div>

                {/* Vote Counter */}
                <div className="mb-6">
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Number of Votes
                  </label>

                  <div className="flex items-center justify-between gap-4 p-4 bg-muted rounded-xl">
                    <button
                      onClick={decrementVotes}
                      disabled={voteCount <= 1}
                      className="w-12 h-12 rounded-xl bg-background flex items-center justify-center hover:bg-primary/10 transition-colors disabled:opacity-50"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <div className="text-center">
                      <input
                        type="number"
                        min="1"
                        value={voteCount}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          setVoteCount(isNaN(val) || val < 1 ? 1 : val);
                        }}
                        className="w-20 text-center text-4xl font-bold bg-transparent border-none focus:outline-none focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      />
                      <div className="text-xs text-muted-foreground">votes</div>
                    </div>
                    <button
                      onClick={incrementVotes}
                      className="w-12 h-12 rounded-xl bg-background flex items-center justify-center hover:bg-primary/10 transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Quick Add Buttons */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {[5, 10, 20, 50, 500, 1000].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setVoteCount(amount)}
                      className={cn(
                        "flex-1 py-2 rounded-lg text-sm font-medium transition-colors",
                        voteCount === amount
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted hover:bg-muted/80"
                      )}
                    >
                      {amount}
                    </button>
                  ))}
                </div>

                {/* Price Summary */}
                <div className="bg-muted/50 rounded-xl p-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground">Price per vote</span>
                    <span>₦{VOTE_PRICE}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground">Quantity</span>
                    <span>{voteCount} votes</span>
                  </div>
                  <div className="border-t border-border pt-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total</span>
                      <span className="text-2xl font-bold gradient-text">
                        ₦{totalAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Button */}
                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full h-14 gradient-primary border-0 text-white text-lg"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Pay ₦{totalAmount.toLocaleString()}
                    </>
                  )}
                </Button>

                {/* Payment Security Note */}
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Secured by Paystack. Votes are non-refundable.
                </p>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
