import { Suspense } from "react"
import { EnhancedSoftwareGrid } from "@/components/enhanced-software-grid"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { EnhancedFeaturedSoftware } from "@/components/enhanced-featured-software"
import { HeroSection } from "@/components/hero-section"
import softwareData from "@/data/software.json"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Header />
      <HeroSection />
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Sidebar categories={softwareData.categories} />
          </div>
          <div className="lg:col-span-3">
            <Suspense fallback={<div>Loading...</div>}>
              <EnhancedFeaturedSoftware software={softwareData.software.filter((s) => s.featured)} />
              <EnhancedSoftwareGrid software={softwareData.software} categories={softwareData.categories} />
            </Suspense>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
