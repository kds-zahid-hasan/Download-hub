"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Eye, TrendingUp, Shield } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface SoftwareInformation {
  fileSize?: string
}

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
  softwareInformation?: SoftwareInformation
}

interface EnhancedFeaturedSoftwareProps {
  software: Software[]
}

export function EnhancedFeaturedSoftware({ software }: EnhancedFeaturedSoftwareProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const getFeatureReasons = (software: Software) => [
    { icon: TrendingUp, text: "Most downloaded in category", color: "text-green-600" },
    { icon: Star, text: "Exceptional user ratings", color: "text-yellow-600" },
    { icon: Shield, text: "Industry standard tool", color: "text-blue-600" },
  ]

  return (
    <div className="mb-12">
      <div
        className={`transform transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          ✨ Featured Software
          <span className="block text-lg font-normal text-gray-600 mt-2">
            Handpicked applications that stand out for their quality and popularity
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {software.slice(0, 4).map((item, index) => (
          <div
            key={item.id}
            className={`transform transition-all duration-1000 delay-${index * 200} ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 border-2 border-transparent hover:border-yellow-200">
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

              <div className="relative bg-white rounded-lg m-0.5">
                <CardContent className="p-8">
                  {/* Header Section */}
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="relative group-hover:scale-110 transition-transform duration-300">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-2xl shadow-lg object-contain bg-gray-50 p-2"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {item.name}
                      </h3>
                      <div className="flex items-center space-x-2 mb-3">
                        <Badge variant="outline" className="text-sm font-medium">
                          v{item.version}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{item.description}</p>
                    </div>
                  </div>

                  {/* Stats Section */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600 mb-1">{item.downloads.toLocaleString()}</div>
                      <div className="text-sm text-blue-700 font-medium">Downloads</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                        <span className="text-2xl font-bold text-yellow-600">{item.rating}</span>
                      </div>
                      <div className="text-sm text-yellow-700 font-medium">Rating</div>
                    </div>
                  </div>

                  {/* Why It's Featured Section */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-100 via-blue-100 to-green-100 rounded-2xl transform rotate-1 opacity-50"></div>
                    <div className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                      <h4 className="font-bold text-gray-900 mb-4 text-center">Why It's Featured</h4>
                      <div className="space-y-3">
                        {getFeatureReasons(item).map((reason, reasonIndex) => (
                          <div key={reasonIndex} className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                              <reason.icon className={`w-4 h-4 ${reason.color}`} />
                            </div>
                            <span className="text-sm text-gray-700 font-medium">{reason.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex mt-6">
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
    </div>
  )
}
