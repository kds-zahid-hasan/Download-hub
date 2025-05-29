"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Home, Search, ArrowLeft, HelpCircle, Compass, RefreshCw } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { useRouter } from "next/navigation"
import softwareData from "@/data/software.json"

export default function NotFound() {
  const [searchTerm, setSearchTerm] = useState("")
  const [suggestions, setSuggestions] = useState<any[]>([])
  const router = useRouter()

  // Get random suggestions
  useEffect(() => {
    const randomSoftware = [...softwareData.software].sort(() => 0.5 - Math.random()).slice(0, 6)
    setSuggestions(randomSoftware)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/?search=${encodeURIComponent(searchTerm)}`)
    }
  }

  const popularCategories = [
    { name: "Development", href: "/categories/development", icon: "💻" },
    { name: "Multimedia", href: "/categories/multimedia", icon: "🎵" },
    { name: "Graphic Design", href: "/categories/graphic", icon: "🎨" },
    { name: "Security", href: "/categories/security", icon: "🔒" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Main 404 Section */}
          <div className="text-center mb-16">
            {/* Animated 404 */}
            <div className="relative mb-8">
              <div className="text-9xl font-bold text-gray-200 select-none">404</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
                  <Search className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">Oops! Page Not Found</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              The page you're looking for seems to have vanished into the digital void. But don't worry, we'll help you
              find what you need!
            </p>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/">
                  <Home className="w-5 h-5 mr-2" />
                  Go Home
                </Link>
              </Button>
              <Button variant="outline" size="lg" onClick={() => router.back()}>
                <ArrowLeft className="w-5 h-5 mr-2" />
                Go Back
              </Button>
              <Button variant="outline" size="lg" onClick={() => window.location.reload()}>
                <RefreshCw className="w-5 h-5 mr-2" />
                Refresh Page
              </Button>
            </div>
          </div>

          {/* Search Section */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Search for Software</h2>
                <p className="text-gray-600">Maybe we can help you find what you were looking for</p>
              </div>

              <form onSubmit={handleSearch} className="max-w-md mx-auto">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Search for software..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Popular Categories */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Compass className="w-8 h-8 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Browse Popular Categories</h2>
                <p className="text-gray-600">Explore our most popular software categories</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {popularCategories.map((category) => (
                  <Link key={category.name} href={category.href}>
                    <div className="p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center group">
                      <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{category.icon}</div>
                      <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Suggested Software */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HelpCircle className="w-8 h-8 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">You Might Be Looking For</h2>
                <p className="text-gray-600">Here are some popular software you might find interesting</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {suggestions.map((software) => (
                  <Link key={software.id} href={`/software/${software.id}`}>
                    <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow group">
                      <div className="flex items-center space-x-3 mb-3">
                        <img
                          src={software.image || "/placeholder.svg"}
                          alt={software.name}
                          className="w-12 h-12 rounded-lg object-contain bg-gray-50 p-1"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                            {software.name}
                          </h3>
                          <p className="text-sm text-gray-500">v{software.version}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{software.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Help Section */}
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                If you're still having trouble finding what you need, our support team is here to help. You can also
                check our FAQ for common questions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="outline">
                  <Link href="/contact">Contact Support</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/faq">View FAQ</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Fun Facts */}
          <div className="mt-12 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-blue-600 mb-2">{softwareData.software.length}+</div>
                <div className="text-gray-600">Software Available</div>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-green-600 mb-2">{softwareData.categories.length}</div>
                <div className="text-gray-600">Categories</div>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {softwareData.software.reduce((sum, s) => sum + s.downloads, 0).toLocaleString()}
                </div>
                <div className="text-gray-600">Total Downloads</div>
              </div>
            </div>
          </div>

          {/* Error Code */}
          <div className="mt-12 text-center text-sm text-gray-400">
            <p>Error Code: 404 | Page Not Found</p>
            <p>If you believe this is an error, please contact our support team.</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
