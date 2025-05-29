"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Monitor,
  Palette,
  Code,
  Shield,
  FileText,
  Gamepad2,
  Settings,
  Wrench,
  Sparkles,
  TrendingUp,
} from "lucide-react"
import { Header } from "@/components/header"
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

export default function CategoriesPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const categoriesWithCounts = softwareData.categories.map((category) => {
    const softwareCount = softwareData.software.filter((software) => software.category === category.id).length
    return { ...category, count: softwareCount }
  })

  const totalSoftware = softwareData.software.length
  const totalDownloads = softwareData.software.reduce((sum, software) => sum + software.downloads, 0)
  const featuredCount = softwareData.software.filter((s) => s.featured).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Header />

      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-80 h-80 bg-pink-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-yellow-300/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative container mx-auto px-4 py-20">
          <div
            className={`text-center text-white transform transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm animate-bounce">
                <Sparkles className="w-10 h-10" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Software Categories
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Explore our comprehensive collection of software organized by categories. Find the perfect tools for your
              needs across {categoriesWithCounts.length} different categories.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-12">
              <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 border border-white/30">
                <div className="text-3xl font-bold mb-1">{totalSoftware}+</div>
                <div className="text-sm text-blue-100">Total Software</div>
              </div>
              <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 border border-white/30">
                <div className="text-3xl font-bold mb-1">{categoriesWithCounts.length}</div>
                <div className="text-sm text-blue-100">Categories</div>
              </div>
              <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 border border-white/30">
                <div className="text-3xl font-bold mb-1">{totalDownloads.toLocaleString()}</div>
                <div className="text-sm text-blue-100">Downloads</div>
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

      <div className="container mx-auto px-4 py-12">
        {/* Categories Grid */}
        <div
          className={`transform transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each category is carefully curated with the best software applications to meet your specific needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoriesWithCounts.map((category, index) => {
              const IconComponent = categoryIcons[category.id as keyof typeof categoryIcons] || Monitor
              const gradientColor =
                categoryColors[category.id as keyof typeof categoryColors] || "from-blue-500 to-purple-500"

              return (
                <div
                  key={category.id}
                  className={`transform transition-all duration-500 delay-${index * 100} ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
                >
                  <Link href={`/categories/${category.id}`}>
                    <Card
                      className="group h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer overflow-hidden relative"
                      onMouseEnter={() => setHoveredCard(category.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      {/* Gradient Background Effect */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${gradientColor} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                      ></div>

                      {/* Animated Border */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>

                      <CardHeader className="text-center pb-4 relative z-10">
                        <div
                          className={`mx-auto w-20 h-20 bg-gradient-to-br ${gradientColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}
                        >
                          <IconComponent className="w-10 h-10 text-white" />
                        </div>
                        <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 group-hover:bg-clip-text transition-all duration-300">
                          {category.name}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-2 group-hover:text-gray-700 transition-colors">
                          {category.description}
                        </p>
                      </CardHeader>
                      <CardContent className="pt-0 relative z-10">
                        <div className="text-center space-y-4">
                          <div className="flex items-center justify-center space-x-2">
                            <Badge
                              variant="secondary"
                              className={`text-lg px-4 py-2 bg-gradient-to-r ${gradientColor} text-white border-0 group-hover:scale-110 transition-transform duration-300`}
                            >
                              {category.count} Software
                            </Badge>
                          </div>
                          <Button
                            variant="outline"
                            className="w-full group-hover:bg-gradient-to-r group-hover:from-purple-50 group-hover:to-blue-50 group-hover:border-purple-300 group-hover:text-purple-700 transition-all duration-300 font-semibold"
                          >
                            Explore Category
                            <TrendingUp className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>

        {/* Enhanced Statistics Section */}
        <div
          className={`mt-20 transform transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl opacity-90"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>

            <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold text-white text-center mb-8">Platform Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center group">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Monitor className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{totalSoftware}</div>
                  <div className="text-blue-100">Total Software</div>
                </div>
                <div className="text-center group">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{categoriesWithCounts.length}</div>
                  <div className="text-blue-100">Categories</div>
                </div>
                <div className="text-center group">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{totalDownloads.toLocaleString()}</div>
                  <div className="text-blue-100">Total Downloads</div>
                </div>
                <div className="text-center group">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Badge className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">★</span>
                    </Badge>
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{featuredCount}</div>
                  <div className="text-blue-100">Featured Software</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Categories Showcase */}
        <div
          className={`mt-20 transform transition-all duration-1000 delay-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Most Popular Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriesWithCounts
              .sort((a, b) => b.count - a.count)
              .slice(0, 6)
              .map((category, index) => {
                const IconComponent = categoryIcons[category.id as keyof typeof categoryIcons] || Monitor
                const gradientColor =
                  categoryColors[category.id as keyof typeof categoryColors] || "from-blue-500 to-purple-500"

                return (
                  <Link key={category.id} href={`/categories/${category.id}`}>
                    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-16 h-16 bg-gradient-to-br ${gradientColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                          >
                            <IconComponent className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                              {category.name}
                            </h3>
                            <p className="text-sm text-gray-600">{category.count} software available</p>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline" className="font-bold">
                              #{index + 1}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
