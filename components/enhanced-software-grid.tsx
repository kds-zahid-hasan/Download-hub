"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Filter, Grid, List, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"

interface Software {
  id: string
  name: string
  version: string
  category: string
  description: string
  descriptionFa: string
  image: string
  downloadLink: string
  size: string
  requirements: string
  tags: string[]
  featured: boolean
  rating: number
  downloads: number
  softwareInformation?: {
    fileSize?: string
  }
}

interface Category {
  id: string
  name: string
  nameFa: string
}

interface EnhancedSoftwareGridProps {
  software: Software[]
  categories: Category[]
}

export function EnhancedSoftwareGrid({ software, categories }: EnhancedSoftwareGridProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  // Get search term from URL parameters
  useEffect(() => {
    const search = searchParams.get("search")
    if (search) {
      setSearchTerm(search)
    }
  }, [searchParams])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("downloads")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const filteredSoftware = software.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesSearch =
      !searchTerm ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    return matchesCategory && matchesSearch
  })

  const sortedSoftware = [...filteredSoftware].sort((a, b) => {
    switch (sortBy) {
      case "downloads":
        return b.downloads - a.downloads
      case "rating":
        return b.rating - a.rating
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  return (
    <div
      className={`transform transition-all duration-1000 delay-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">All Software</h2>
          <p className="text-gray-600 mt-1">Discover amazing applications across all categories</p>
        </div>
        <div className="flex items-center space-x-4">
          {/* Search Input */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search software..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </div>
          </div>
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

          {/* Filters */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="downloads">Most Downloaded</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      {searchTerm && (
        <div className="mb-6">
          <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Search className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Search Results</h3>
                <p className="text-sm text-gray-600">
                  Found {filteredSoftware.length} results for "{searchTerm}"
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm("")
                router.push("/")
              }}
              className="text-gray-600 hover:text-gray-900"
            >
              Clear Search
            </Button>
          </div>
        </div>
      )}

      {/* Software Grid */}
      <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
        {sortedSoftware.map((item, index) => (
          <div
            key={item.id}
            className={`transform transition-all duration-500 delay-${index * 50} ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 border-2 border-transparent hover:border-blue-200 h-full">
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

              <div className="relative bg-white rounded-lg m-0.5 h-full">
                <CardContent className="p-6">
                  {/* Header Section */}
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="relative group-hover:scale-110 transition-transform duration-300">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded-xl shadow-lg object-contain bg-gray-50 p-2"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {item.name}
                      </h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline" className="text-xs font-medium">
                          v{item.version}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {categories.find((c) => c.id === item.category)?.name}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{item.description}</p>
                    </div>
                  </div>

                  {/* Stats Section */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-center p-2 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">{item.downloads.toLocaleString()}</div>
                      <div className="text-xs text-blue-700 font-medium">Downloads</div>
                    </div>
                    <div className="text-center p-2 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg">
                      <div className="flex items-center justify-center space-x-1">
                        <span className="text-lg font-bold text-yellow-600">{item.rating}</span>
                      </div>
                      <div className="text-xs text-yellow-700 font-medium">Rating</div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-auto">
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                      <Link href={`/software/${item.id}`}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <Button
          variant="outline"
          size="lg"
          className="bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 border-2 border-gray-200 hover:border-gray-300 rounded-xl font-semibold px-8"
        >
          Load More Software
        </Button>
      </div>
    </div>
  )
}
