"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Download, Star, Shield, Zap } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function HeroSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const stats = [
    { icon: Download, label: "Downloads", value: "1M+", color: "text-blue-600" },
    { icon: Star, label: "Software", value: "1000+", color: "text-yellow-600" },
    { icon: Shield, label: "Safe", value: "100%", color: "text-green-600" },
    { icon: Zap, label: "Fast", value: "24/7", color: "text-purple-600" },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      // Navigate to homepage with search parameter
      router.push(`/?search=${encodeURIComponent(searchTerm.trim())}`)
    }
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-300/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative container mx-auto px-4 py-20">
        <div className="text-center text-white">
          {/* Main Title with Animation */}
          <div
            className={`transform transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              DownloadHub
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Your ultimate destination for safe, fast, and reliable software downloads. Discover thousands of
              applications across all categories.
            </p>
          </div>

          {/* Search Bar with Animation */}
          <div
            className={`transform transition-all duration-1000 delay-300 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-white/20 backdrop-blur-lg rounded-2xl p-2 border border-white/30">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                      <Input
                        type="text"
                        placeholder="Search for software..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-12 bg-white/10 border-0 text-white placeholder-white/70 text-lg py-4 rounded-xl focus:bg-white/20 transition-all"
                      />
                    </div>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold px-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                      <Search className="w-5 h-5 mr-2" />
                      Search
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Quick Actions */}
          <div
            className={`transform transition-all duration-1000 delay-500 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm rounded-xl"
              >
                <Link href="/categories">Browse Categories</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm rounded-xl"
              >
                <Link href="/featured">Featured Software</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm rounded-xl"
              >
                <Link href="/latest">Latest Releases</Link>
              </Button>
            </div>
          </div>

          {/* Stats Section */}
          <div
            className={`transform transition-all duration-1000 delay-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`group transform transition-all duration-500 delay-${index * 100} hover:scale-105`}
                >
                  <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 hover:bg-white/30 transition-all">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <stat.icon className={`w-6 h-6 ${stat.color.replace("text-", "text-white")}`} />
                      </div>
                      <div className="text-2xl font-bold mb-1">{stat.value}</div>
                      <div className="text-sm text-blue-100">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Wave Bottom */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden">
        <svg viewBox="0 0 1440 120" className="w-full h-20 fill-gray-50 block" preserveAspectRatio="none">
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </div>
    </div>
  )
}
