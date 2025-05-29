import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Eye, TrendingUp, FlameIcon as Fire } from "lucide-react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Sidebar } from "@/components/sidebar"
import softwareData from "@/data/software.json"
import Link from "next/link"

export default function PopularPage() {
  // Sort software by downloads (most popular first)
  const popularSoftware = [...softwareData.software].sort((a, b) => b.downloads - a.downloads)

  const getPopularityBadge = (downloads: number) => {
    if (downloads > 1000000) return { text: "Viral", color: "bg-red-500" }
    if (downloads > 500000) return { text: "Hot", color: "bg-orange-500" }
    if (downloads > 100000) return { text: "Popular", color: "bg-blue-500" }
    return { text: "Rising", color: "bg-green-500" }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Page Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Fire className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">Popular Software</h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Explore the most downloaded and trending software. Join millions of users who trust these applications.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar categories={softwareData.categories} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Top 3 Most Popular */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🏆 Top 3 Most Downloaded</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {popularSoftware.slice(0, 3).map((software, index) => {
                  const badges = ["🥇 #1", "🥈 #2", "🥉 #3"]
                  const colors = [
                    "from-yellow-400 to-yellow-600",
                    "from-gray-300 to-gray-500",
                    "from-orange-400 to-orange-600",
                  ]

                  return (
                    <Card
                      key={software.id}
                      className="overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1"
                    >
                      <div className={`bg-gradient-to-r ${colors[index]} p-4 text-white text-center`}>
                        <div className="text-2xl font-bold">{badges[index]}</div>
                        <div className="text-sm opacity-90">{software.downloads.toLocaleString()} downloads</div>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <Image
                            src={software.image || "/placeholder.svg"}
                            alt={software.name}
                            width={48}
                            height={48}
                            className="rounded-lg border"
                          />
                          <div>
                            <h3 className="font-bold text-lg">{software.name}</h3>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">{software.rating}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{software.description}</p>
                        <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                          <Link href={`/software/${software.id}`}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* All Popular Software */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">All Popular Software ({popularSoftware.length})</h2>
              <div className="flex items-center space-x-4">
                <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                  <option value="downloads">Most Downloaded</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name A-Z</option>
                  <option value="date">Latest</option>
                </select>
              </div>
            </div>

            {/* Software Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularSoftware.map((software, index) => {
                const popularity = getPopularityBadge(software.downloads)

                return (
                  <Card key={software.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Image
                            src={software.image || "/placeholder.svg"}
                            alt={software.name}
                            width={48}
                            height={48}
                            className="rounded-lg border"
                          />
                          <div className="absolute -top-2 -right-2 text-lg">#{index + 1}</div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">{software.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              v{software.version}
                            </Badge>
                            <Badge className={`text-xs text-white ${popularity.color}`}>{popularity.text}</Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">{software.description}</p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Downloads:</span>
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="w-3 h-3 text-green-500" />
                            <span className="font-medium text-green-600">{software.downloads.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Size:</span>
                          <span className="font-medium">{software.softwareInformation?.fileSize || "Unknown"}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Rating:</span>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium ml-1">{software.rating}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                          <Link href={`/software/${software.id}`}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
