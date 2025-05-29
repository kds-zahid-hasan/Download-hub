"use client"

import { useState, useEffect } from "react"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Star,
  Eye,
  Monitor,
  Palette,
  Code,
  Shield,
  FileText,
  Gamepad2,
  Settings,
  Wrench,
  Filter,
  Grid,
  List,
  TrendingUp,
} from "lucide-react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import softwareData from "@/data/software.json"
import Link from "next/link"
import { Footer } from "@/components/footer"

const categoryIcons = {
  general: Monitor,
  graphic: Palette,
  development: Code,
  security: Shield,
  office: FileText,
  games: Gamepad2,
  system: Settings,
  multimedia: Wrench,
  utilities: Wrench,
}

const categoryColors = {
  general: "from-blue-500 to-cyan-500",
  graphic: "from-pink-500 to-rose-500",
  development: "from-green-500 to-emerald-500",
  security: "from-red-500 to-orange-500",
  office: "from-purple-500 to-violet-500",
  games: "from-yellow-500 to-amber-500",
  system: "from-gray-500 to-slate-500",
  multimedia: "from-indigo-500 to-blue-500",
  utilities: "from-teal-500 to-cyan-500",
}

interface CategoryPageProps {
  params: {
    categoryId: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("downloads")

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const category = softwareData.categories.find((c) => c.id === params.categoryId)

  if (!category) {
    notFound()
  }

  const categorySoftware = softwareData.software.filter((s) => s.category === params.categoryId)
  const IconComponent = categoryIcons[category.id as keyof typeof categoryIcons] || Monitor
  const gradientColor = categoryColors[category.id as keyof typeof categoryColors] || "from-blue-500 to-purple-500"

  const sortedSoftware = [...categorySoftware].sort((a, b) => {
    switch (sortBy) {
      case "downloads":
        return b.downloads - a.downloads
      case "rating":
        return b.rating - a.rating
      case "name":
        return a.name.localeCompare(b.name)
      case "date":
        return (
          new Date(b.softwareInformation?.releaseDate || 0).getTime() -
          new Date(a.softwareInformation?.releaseDate || 0).getTime()
        )
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Header />

      {/* Enhanced Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <nav className="text-sm text-gray-600 flex items-center space-x-2">
            <Link href="/" className="hover:text-blue-600 transition-colors font-medium">
              Home
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/categories" className="hover:text-blue-600 transition-colors font-medium">
              Categories
            </Link>
            <span className="text-gray-400">•</span>
            <span className="text-blue-600 font-semibold">{category.name}</span>
          </nav>
        </div>
      </div>

      {/* Enhanced Category Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-20 right-20 w-80 h-80 bg-pink-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-yellow-300/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative container mx-auto px-4 py-16">
          <div
            className={`transform transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="flex items-center space-x-8 text-white">
              <div
                className={`w-24 h-24 bg-gradient-to-br ${gradientColor} rounded-3xl flex items-center justify-center shadow-2xl animate-pulse`}
              >
                <IconComponent className="w-12 h-12 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                  {category.name}
                </h1>
                <p className="text-xl text-blue-100 mb-6 max-w-2xl leading-relaxed">{category.description}</p>
                <div className="flex items-center space-x-6">
                  <div className="bg-white/20 backdrop-blur-lg rounded-2xl px-4 py-2 border border-white/30">
                    <span className="font-bold text-lg">{categorySoftware.length}</span>
                    <span className="text-blue-100 ml-2">Software Available</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-lg rounded-2xl px-4 py-2 border border-white/30">
                    <span className="font-bold text-lg">
                      {categorySoftware.reduce((sum, software) => sum + software.downloads, 0).toLocaleString()}
                    </span>
                    <span className="text-blue-100 ml-2">Total Downloads</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden">
          <svg viewBox="0 0 1440 120" className="w-full h-20 fill-gray-50 block" preserveAspectRatio="none">
            <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
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
            {/* Enhanced Filter and Sort */}
            <div
              className={`transform transition-all duration-1000 delay-300 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {category.name} Software ({categorySoftware.length})
                  </h2>
                  <p className="text-gray-600 mt-1">Discover the best {category.name.toLowerCase()} applications</p>
                </div>
                <div className="flex items-center space-x-4">
                  {/* View Mode Toggle */}
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-md transition-all ${
                        viewMode === "grid" ? "bg-white shadow-sm text-blue-600" : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-md transition-all ${
                        viewMode === "list" ? "bg-white shadow-sm text-blue-600" : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Sort Dropdown */}
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="downloads">Most Downloaded</option>
                      <option value="rating">Highest Rated</option>
                      <option value="name">Name A-Z</option>
                      <option value="date">Latest</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Software Grid */}
            {categorySoftware.length > 0 ? (
              <div
                className={`transform transition-all duration-1000 delay-500 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
              >
                <div
                  className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
                >
                  {sortedSoftware.map((software, index) => (
                    <div
                      key={software.id}
                      className={`transform transition-all duration-500 delay-${index * 50} ${
                        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                      }`}
                    >
                      <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white border border-gray-200 hover:border-blue-200">
                        <CardHeader className="pb-3">
                          <div className="flex items-center space-x-3">
                            <div className="relative group-hover:scale-110 transition-transform duration-300">
                              <Image
                                src={software.image || "/placeholder.svg"}
                                alt={software.name}
                                width={48}
                                height={48}
                                className="rounded-lg border shadow-sm object-contain bg-gray-50 p-1"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                                {software.name}
                              </h3>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  v{software.version}
                                </Badge>
                                {software.featured && (
                                  <Badge className="text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                                    ⭐ Featured
                                  </Badge>
                                )}
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
                              <span className="text-gray-500">Size:</span>
                              <span className="font-medium">
                                {software.size || software.softwareInformation?.fileSize}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-500">Downloads:</span>
                              <div className="flex items-center space-x-1">
                                <TrendingUp className="w-3 h-3 text-green-500" />
                                <span className="font-medium text-green-600">
                                  {software.downloads.toLocaleString()}
                                </span>
                              </div>
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
                              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg"
                            >
                              <Link href={`/software/${software.id}`}>
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <IconComponent className="w-16 h-16 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">No Software Found</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  We don't have any software in the {category.name} category yet. Check back soon for updates!
                </p>
                <Button asChild variant="outline" size="lg" className="rounded-xl">
                  <Link href="/categories">Browse Other Categories</Link>
                </Button>
              </div>
            )}

            {/* Related Categories */}
            {categorySoftware.length > 0 && (
              <div
                className={`mt-16 transform transition-all duration-1000 delay-700 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Related Categories</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {softwareData.categories
                    .filter((c) => c.id !== category.id)
                    .slice(0, 3)
                    .map((relatedCategory) => {
                      const RelatedIcon = categoryIcons[relatedCategory.id as keyof typeof categoryIcons] || Monitor
                      const relatedGradient =
                        categoryColors[relatedCategory.id as keyof typeof categoryColors] ||
                        "from-blue-500 to-purple-500"
                      const relatedCount = softwareData.software.filter((s) => s.category === relatedCategory.id).length

                      return (
                        <Link key={relatedCategory.id} href={`/categories/${relatedCategory.id}`}>
                          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden">
                            <CardContent className="p-6">
                              <div className="flex items-center space-x-4">
                                <div
                                  className={`w-14 h-14 bg-gradient-to-br ${relatedGradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                                >
                                  <RelatedIcon className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                  <h4 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                                    {relatedCategory.name}
                                  </h4>
                                  <p className="text-sm text-gray-600">{relatedCount} software available</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      )
                    })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
