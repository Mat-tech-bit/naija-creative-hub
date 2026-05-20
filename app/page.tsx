import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/landing/hero-section"
import { CurrentEditionSection } from "@/components/landing/current-edition-section"
import { FeaturedContestantsSection } from "@/components/landing/featured-contestants-section"
import { CategoriesSection } from "@/components/landing/categories-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { PrizePoolSection } from "@/components/landing/prize-pool-section"
import { WinnersShowcaseSection } from "@/components/landing/winners-showcase-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { FAQSection } from "@/components/landing/faq-section"
import { SponsorsSection } from "@/components/landing/sponsors-section"
import { VoterGuideSection } from "@/components/landing/voter-guide-section"
import { CTANewsletter } from "@/components/landing/cta-newsletter"
import { StatTicker } from "@/components/landing/stat-ticker"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <StatTicker />
      <CurrentEditionSection />
      <FeaturedContestantsSection />
      <VoterGuideSection />
      <CategoriesSection />
      <HowItWorksSection />
      <PrizePoolSection />
      <WinnersShowcaseSection />
      <TestimonialsSection />
      <FAQSection />
      <SponsorsSection />
      <CTANewsletter />
      <Footer />
    </main>
  )
}
