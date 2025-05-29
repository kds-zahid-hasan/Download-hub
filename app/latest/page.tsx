import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Eye, Calendar, Clock } from "lucide-react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Sidebar } from "@/components/sidebar"
import softwareData from "@/data/software.json"
import Link from "next/link"

export default function LatestPage() {
  // Sort software by release date (newest first)
  const latestSoftware = softwareData.software
    .filter((software) => software.softwareInformation?.releaseDate)
    .sort((a, b) => {
      const dateA = new Date(a.softwareInformation?.releaseDate || 0)
      const dateB = new Date(b.softwareInformation?.releaseDate || 0)
      return dateB.getTime() - dateA.getTime()
    })

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "1 day ago"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`
    return `${Math.ceil(diffDays / 365)} years ago`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">Latest Software</h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Discover the newest software releases and updates. Stay up-to-date with the latest versions of your
              favorite applications.
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
            {/* Filter Options */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Latest Releases ({latestSoftware.length})</h2>
              <div className="flex items-center space-x-4">
                <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                  <option value="date">Latest First</option>
                  <option value="downloads">Most Downloaded</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>
            </div>

            {/* Software Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestSoftware.map((software) => (
                <Card key={software.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={software.image || "/placeholder.svg"}
                        alt={software.name}
                        width={48}
                        height={48}
                        className="rounded-lg border"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{software.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            v{software.version}
                          </Badge>
                          <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                            New
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">{software.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Released:</span>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className="font-medium">
                            {software.softwareInformation?.releaseDate
                              ? getTimeAgo(software.softwareInformation.releaseDate)
                              : "Unknown"}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Size:</span>
                        <span className="font-medium">{software.softwareInformation?.fileSize || "Unknown"}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Downloads:</span>
                        <span className="font-medium">{software.downloads.toLocaleString()}</span>
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
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Software
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
