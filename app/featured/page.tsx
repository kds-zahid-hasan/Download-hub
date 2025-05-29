import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Star, Eye, Crown, Award, Zap, TrendingUp } from "lucide-react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Sidebar } from "@/components/sidebar"
import softwareData from "@/data/software.json"
import Link from "next/link"

export default function FeaturedPage() {
  // Get featured software
  const featuredSoftware = softwareData.software.filter((software) => software.featured)

  // Sort by downloads for better presentation
  const sortedFeatured = [...featuredSoftware].sort((a, b) => b.downloads - a.downloads)

  const getFeatureReason = (software: any) => {
    if (software.downloads > 1000000) return { text: "Most Downloaded", icon: TrendingUp, color: "bg-red-500" }
    if (software.rating >= 4.8) return { text: "Highest Rated", icon: Star, color: "bg-yellow-500" }
    if (software.tags.includes("professional"))
      return { text: "Professional Choice", icon: Award, color: "bg-purple-500" }
    return { text: "Editor's Choice", icon: Crown, color: "bg-blue-500" }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Page Header */}
      <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Crown className="w-10 h-10" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6">Featured Software</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              Discover our handpicked selection of the best software applications. These are the tools that stand out
              for their quality, popularity, and user satisfaction.
            </p>
            <div className="mt-8 flex justify-center space-x-8 text-sm">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>Quality Assured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5" />
                <span>Highly Rated</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Most Popular</span>
              </div>
            </div>
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
            {/* Hero Featured Software */}
            {sortedFeatured.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Crown className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">⭐ Featured Spotlight</h2>
                </div>

                <Card className="overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-2 border-yellow-200 shadow-xl">
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                      <div className="text-center lg:text-left">
                        <div className="flex items-center justify-center lg:justify-start space-x-3 mb-4">
                          <Image
                            src={sortedFeatured[0].image || "/placeholder.svg"}
                            alt={sortedFeatured[0].name}
                            width={80}
                            height={80}
                            className="rounded-2xl shadow-lg object-contain bg-white p-2"
                          />
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">{sortedFeatured[0].name}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline" className="text-sm">
                                v{sortedFeatured[0].version}
                              </Badge>
                              <Badge className="bg-yellow-500 text-white text-sm">🏆 Featured</Badge>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-700 text-lg leading-relaxed mb-6">{sortedFeatured[0].description}</p>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="text-center p-3 bg-white/60 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">
                              {sortedFeatured[0].downloads.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-600">Downloads</div>
                          </div>
                          <div className="text-center p-3 bg-white/60 rounded-lg">
                            <div className="flex items-center justify-center space-x-1">
                              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                              <span className="text-2xl font-bold text-yellow-600">{sortedFeatured[0].rating}</span>
                            </div>
                            <div className="text-sm text-gray-600">Rating</div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button
                            asChild
                            size="lg"
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                          >
                            <Link href={`/software/${sortedFeatured[0].id}`}>
                              <Eye className="w-5 h-5 mr-2" />
                              View Details
                            </Link>
                          </Button>
                          <Button variant="outline" size="lg" className="border-2">
                            <Download className="w-5 h-5 mr-2" />
                            Quick Download
                          </Button>
                        </div>
                      </div>

                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl transform rotate-3"></div>
                        <div className="relative bg-white p-6 rounded-2xl shadow-lg">
                          <h4 className="font-bold text-gray-900 mb-4">Why It's Featured</h4>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                <TrendingUp className="w-4 h-4 text-green-600" />
                              </div>
                              <span className="text-sm text-gray-700">Most downloaded in category</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                                <Star className="w-4 h-4 text-yellow-600" />
                              </div>
                              <span className="text-sm text-gray-700">Exceptional user ratings</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <Award className="w-4 h-4 text-blue-600" />
                              </div>
                              <span className="text-sm text-gray-700">Industry standard tool</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Featured Categories */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured by Category</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl">
                  <Award className="w-8 h-8 mb-2" />
                  <div className="font-bold">Professional Tools</div>
                  <div className="text-sm opacity-90">Industry-standard software</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl">
                  <TrendingUp className="w-8 h-8 mb-2" />
                  <div className="font-bold">Most Popular</div>
                  <div className="text-sm opacity-90">Highest download counts</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl">
                  <Star className="w-8 h-8 mb-2" />
                  <div className="font-bold">Top Rated</div>
                  <div className="text-sm opacity-90">Best user reviews</div>
                </div>
              </div>
            </div>

            {/* All Featured Software */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">All Featured Software ({featuredSoftware.length})</h2>
              <div className="flex items-center space-x-4">
                <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                  <option value="downloads">Most Downloaded</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name A-Z</option>
                  <option value="date">Latest</option>
                </select>
              </div>
            </div>

            {/* Featured Software Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedFeatured.map((software, index) => {
                const feature = getFeatureReason(software)
                const category = softwareData.categories.find((c) => c.id === software.category)

                return (
                  <Card
                    key={software.id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-yellow-100 hover:border-yellow-200"
                  >
                    <div className="relative">
                      <div className="absolute top-3 right-3 z-10">
                        <Badge className={`${feature.color} text-white text-xs`}>
                          <feature.icon className="w-3 h-3 mr-1" />
                          {feature.text}
                        </Badge>
                      </div>
                      <div className="absolute top-3 left-3 z-10">
                        <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-yellow-900 font-bold text-sm">
                          #{index + 1}
                        </div>
                      </div>
                    </div>

                    <CardHeader className="pb-3 pt-12">
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
                            <Badge variant="secondary" className="text-xs">
                              {category?.name}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">{software.description}</p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {software.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

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
                        <Button
                          asChild
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
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

            {/* Why Featured Section */}
            <Card className="mt-12">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Why These Software Are Featured</h3>
                    <p className="text-gray-600">Our selection criteria for featured software</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">High Download Count</h4>
                    <p className="text-sm text-gray-600">
                      Software with exceptional download numbers and user adoption
                    </p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Star className="w-6 h-6 text-yellow-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Excellent Ratings</h4>
                    <p className="text-sm text-gray-600">Consistently high user ratings and positive feedback</p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="w-6 h-6 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Industry Standard</h4>
                    <p className="text-sm text-gray-600">
                      Professional tools used by industry experts and professionals
                    </p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Crown className="w-6 h-6 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Editor's Choice</h4>
                    <p className="text-sm text-gray-600">Handpicked by our team for exceptional quality and features</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
