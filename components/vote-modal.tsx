"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  X, 
  Plus, 
  Minus, 
  CreditCard, 
  CheckCircle, 
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface VoteModalProps {
  isOpen: boolean
  onClose: () => void
  contestant: {
    name: string
    image: string
    category: string
  }
}

const VOTE_PRICE = 50 // ₦50 per vote

export function VoteModal({ isOpen, onClose, contestant }: VoteModalProps) {
  const [voteCount, setVoteCount] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const totalAmount = voteCount * VOTE_PRICE

  const incrementVotes = () => setVoteCount(prev => prev + 1)
  const decrementVotes = () => setVoteCount(prev => prev > 1 ? prev - 1 : 1)

  const handlePayment = async () => {
    setIsProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsProcessing(false)
    setIsSuccess(true)
    
    // Reset after showing success
    setTimeout(() => {
      setIsSuccess(false)
      setVoteCount(1)
      onClose()
    }, 3000)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 shadow-2xl"
      >
        <div 
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {isSuccess ? (
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
              <p className="text-muted-foreground mb-4 font-medium">
                Thank you for supporting {contestant.name}!
              </p>
              <div className="text-4xl font-bold gradient-text mb-2 animate-bounce">
                +{voteCount} votes
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                Your votes have been added to the count
              </p>
            </motion.div>
          ) : (
            <>
              <div className="gradient-primary p-6 text-white">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/20">
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

              <div className="p-6">
                <div className="mb-6">
                  <label className="text-sm text-muted-foreground mb-2 block font-medium">
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
                      <div className="text-4xl font-bold">{voteCount}</div>
                      <div className="text-xs text-muted-foreground font-bold">votes</div>
                    </div>
                    <button
                      onClick={incrementVotes}
                      className="w-12 h-12 rounded-xl bg-background flex items-center justify-center hover:bg-primary/10 transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex gap-2 mb-6">
                  {[5, 10, 20, 50].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setVoteCount(amount)}
                      className={cn(
                        "flex-1 py-2 rounded-lg text-sm font-bold transition-colors",
                        voteCount === amount
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted hover:bg-muted/80"
                      )}
                    >
                      {amount}
                    </button>
                  ))}
                </div>

                <div className="bg-muted/50 rounded-xl p-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground font-medium">Price per vote</span>
                    <span className="font-bold">₦{VOTE_PRICE}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground font-medium">Quantity</span>
                    <span className="font-bold">{voteCount} votes</span>
                  </div>
                  <div className="border-t border-border pt-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Total</span>
                      <span className="text-2xl font-bold gradient-text">
                        ₦{totalAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full h-14 gradient-primary border-0 text-white text-lg font-bold"
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

                <p className="text-xs text-muted-foreground text-center mt-4 font-medium italic">
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
