import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/landing/hero-section"
import { CurrentEditionSection } from "@/components/landing/current-edition-section"
import { CategoriesSection } from "@/components/landing/categories-section"
import { FeaturedContestantsSection } from "@/components/landing/featured-contestants-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { PrizePoolSection } from "@/components/landing/prize-pool-section"
import { WinnersShowcaseSection } from "@/components/landing/winners-showcase-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { FAQSection } from "@/components/landing/faq-section"
import { SponsorsSection } from "@/components/landing/sponsors-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <SponsorsSection />
      <CurrentEditionSection />
      <CategoriesSection />
      <FeaturedContestantsSection />
      <HowItWorksSection />
      <PrizePoolSection />
      <WinnersShowcaseSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </main>
  )
}
