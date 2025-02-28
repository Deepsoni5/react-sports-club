import { SiteHeader } from "@/components/site-header"
import { HeroSlider } from "@/components/hero-slider"
import { QuickAccess } from "@/components/quick-access"
import { BookSection } from "@/components/book-section"
import { ContinuousVideo } from "@/components/continuous-video"
import { TournamentSection } from "@/components/tournament-section"
import { CatchActionSlider } from "@/components/catch-action-slider"
import { AdvertisementSection } from "@/components/advertisement-section"
import { BlogSection } from "@/components/blog-section"
import { WhyChooseSection } from "@/components/why-choose-section"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <SiteHeader />
      <main>
        <HeroSlider />
        <QuickAccess />
        <BookSection />
        <div className="-mt-4">
          <ContinuousVideo />
        </div>
        <TournamentSection />
        <CatchActionSlider />
        <AdvertisementSection />
        <BlogSection />
        <WhyChooseSection />
      </main>
      <SiteFooter />
    </div>
  )
}

