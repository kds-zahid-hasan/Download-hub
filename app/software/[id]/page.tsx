"use client"

import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Download,
  Star,
  Calendar,
  HardDrive,
  Monitor,
  User,
  Shield,
  Package,
  AlertCircle,
  Eye,
  TrendingUp,
  Award,
  ArrowRight,
} from "lucide-react"
import Image from "next/image"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import softwareData from "@/data/software.json"
import Link from "next/link"
import { Footer } from "@/components/footer"

interface SoftwareDetailPageProps {
  params: {
    id: string
  }
}

export default function SoftwareDetailPage({ params }: SoftwareDetailPageProps) {
  const software = softwareData.software.find((s) => s.id === params.id)

  if (!software) {
    notFound()
  }

  const category = softwareData.categories.find((c) => c.id === software.category)

  const scrollToDownload = () => {
    const downloadSection = document.getElementById("download-section")
    if (downloadSection) {
      downloadSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const getFeatureReasons = () => {
    const reasons = []

    if (software.downloads > 10000) {
      reasons.push({
        icon: TrendingUp,
        text: "Most downloaded in category",
        color: "bg-green-100 text-green-600",
      })
    }

    if (software.rating >= 4.5) {
      reasons.push({
        icon: Star,
        text: "Exceptional user ratings",
        color: "bg-yellow-100 text-yellow-600",
      })
    }

    if (software.tags.includes("professional")) {
      reasons.push({
        icon: Award,
        text: "Industry standard tool",
        color: "bg-blue-100 text-blue-600",
      })
    }

    // Add a default reason if none of the above apply
    if (reasons.length === 0) {
      reasons.push({
        icon: Award,
        text: "Editor's choice",
        color: "bg-purple-100 text-purple-600",
      })
    }

    return reasons
  }

  const getRelatedSoftware = () => {
    // Get software from the same category, excluding current software
    const sameCategorySoftware = softwareData.software.filter(
      (s) => s.category === software.category && s.id !== software.id,
    )

    // Get featured software from other categories
    const featuredSoftware = softwareData.software.filter(
      (s) => s.featured && s.id !== software.id && s.category !== software.category,
    )

    // Combine and limit to 6 items
    const related = [...sameCategorySoftware, ...featuredSoftware].slice(0, 6)

    return related
  }

  const featureReasons = getFeatureReasons()
  const relatedSoftware = getRelatedSoftware()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="text-sm text-gray-600">
            <span>Home</span>
            <span className="mx-2">•</span>
            <span>{category?.name}</span>
            <span className="mx-2">•</span>
            <span className="text-blue-600">{software.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar categories={softwareData.categories} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Software Card - New Design */}
            <Card className="mb-6 overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border border-gray-200 shadow-lg">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  <div className="lg:col-span-2">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="flex-shrink-0">
                        <Image
                          src={software.image || "/placeholder.svg"}
                          alt={software.name}
                          width={80}
                          height={80}
                          className="rounded-xl shadow-md object-contain bg-white p-2"
                          unoptimized
                        />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h1 className="text-2xl font-bold text-gray-900">{software.fullName || software.name}</h1>
                          {software.featured && <Badge className="bg-yellow-500 text-white">Featured</Badge>}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">v{software.version}</div>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {category?.name}
                          </Badge>
                          {software.softwareInformation?.license && (
                            <Badge variant="outline" className="text-xs">
                              {software.softwareInformation.license}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-6">{software.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-3 bg-white/60 rounded-lg shadow-sm">
                        <div className="text-2xl font-bold text-blue-600">{software.downloads.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Downloads</div>
                      </div>
                      <div className="text-center p-3 bg-white/60 rounded-lg shadow-sm">
                        <div className="flex items-center justify-center space-x-1">
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          <span className="text-2xl font-bold text-yellow-600">{software.rating}</span>
                        </div>
                        <div className="text-sm text-gray-600">Rating</div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={scrollToDownload}>
                        <Download className="w-5 h-5 mr-2" />
                        Download Now
                      </Button>
                      {/*  
                        <Button variant="outline" size="lg" className="border-2">
                          <Eye className="w-5 h-5 mr-2" />
                          View Details
                        </Button>
                      */}
                    </div>
                  </div>

                  {/* Why It's Featured Card */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl transform rotate-3"></div>
                    <div className="relative bg-white p-6 rounded-2xl shadow-lg">
                      <h4 className="font-bold text-gray-900 mb-4">Why It's Popular</h4>
                      <div className="space-y-3">
                        {featureReasons.map((reason, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <div
                              className={`w-8 h-8 ${reason.color.split(" ")[0]} rounded-full flex items-center justify-center`}
                            >
                              <reason.icon className={`w-4 h-4 ${reason.color.split(" ")[1]}`} />
                            </div>
                            <span className="text-sm text-gray-700">{reason.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent className="p-8">
                {/* Description Section */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 text-right">{/* First Description */}</h2>
                  <div className="prose max-w-none text-right" dir="rtl">
                    <p className="text-gray-700 leading-relaxed text-justify">{software.descriptionFa}</p>
                  </div>
                </div>

                <Separator className="my-8" />

                {/* English Description */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                  <p className="text-gray-700 leading-relaxed text-justify mb-4">{software.detailedDescription}</p>
                </div>

                {/* Features */}
                {software.features && (
                  <>
                    <Separator className="my-8" />
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {software.features.map((feature, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* System Requirements */}
                {software.systemRequirements && (
                  <>
                    <Separator className="my-8" />
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">System Requirements</h2>
                      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                        {software.systemRequirements.windows && (
                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center space-x-2">
                                <Monitor className="w-5 h-5" />
                                <span>Windows</span>
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <div>
                                <strong>OS:</strong> {software.systemRequirements.windows.os}
                              </div>
                              <div>
                                <strong>Processor:</strong> {software.systemRequirements.windows.processor}
                              </div>
                              <div>
                                <strong>Memory:</strong> {software.systemRequirements.windows.memory}
                              </div>
                              <div>
                                <strong>Storage:</strong> {software.systemRequirements.windows.storage}
                              </div>
                              <div>
                                <strong>Graphics:</strong> {software.systemRequirements.windows.graphics}
                              </div>
                              <div>
                                <strong>Display:</strong> {software.systemRequirements.windows.display}
                              </div>
                            </CardContent>
                          </Card>
                        )}
                        {software.systemRequirements.mac && (
                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center space-x-2">
                                <Monitor className="w-5 h-5" />
                                <span>macOS</span>
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <div>
                                <strong>OS:</strong> {software.systemRequirements.mac.os}
                              </div>
                              <div>
                                <strong>Processor:</strong> {software.systemRequirements.mac.processor}
                              </div>
                              <div>
                                <strong>Memory:</strong> {software.systemRequirements.mac.memory}
                              </div>
                              <div>
                                <strong>Storage:</strong> {software.systemRequirements.mac.storage}
                              </div>
                              <div>
                                <strong>Graphics:</strong> {software.systemRequirements.mac.graphics}
                              </div>
                              <div>
                                <strong>Display:</strong> {software.systemRequirements.mac.display}
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* What's New */}
                {software.changelog && (
                  <>
                    <Separator className="my-8" />
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">What's New</h2>
                      <ul className="space-y-2">
                        {software.changelog.map((change, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{change}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}

                {/* Software Information */}
                <Separator className="my-8" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Software Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <User className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-500">Developer</div>
                        <div className="font-medium">{software.softwareInformation?.developer || "Unknown"}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Shield className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-500">License</div>
                        <div className="font-medium">{software.softwareInformation?.license || "Unknown"}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Package className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-500">File Format</div>
                        <div className="font-medium">{software.softwareInformation?.fileFormat || "Unknown"}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Monitor className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-500">Architecture</div>
                        <div className="font-medium">{software.softwareInformation?.architecture || "Unknown"}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <HardDrive className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-500">File Size</div>
                        <div className="font-medium">{software.softwareInformation?.fileSize || "Unknown"}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-500">Release Date</div>
                        <div className="font-medium">
                          {software.softwareInformation?.releaseDate
                            ? new Date(software.softwareInformation.releaseDate).toLocaleDateString()
                            : "Unknown"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <Separator className="my-8" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {software.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="px-3 py-1">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Download Section at Bottom */}
            <Card id="download-section" className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200 mb-8">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <Download className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Download Links</h2>
                  <p className="text-gray-600 mb-6">Choose your preferred version and download below.</p>
                </div>

                {/* Download Versions */}
                {software.downloadVersions ? (
                  <div className="space-y-6">
                    {software.downloadVersions.map((version, versionIndex) => {
                      const isSingleFile = version.parts.length === 1

                      return (
                        <div key={versionIndex} className="bg-white rounded-lg p-6 shadow-sm">
                          <div className="mb-4">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{version.name}</h3>
                            <div className="flex">
                              <Badge variant="outline" className="text-sm">
                                {isSingleFile
                                  ? `File Size: ${version.parts[0].size}`
                                  : `Total Size: ${version.parts
                                      .reduce((total, part) => {
                                        const size = part.size
                                        const match = size.match(/(\d+(\.\d+)?)\s*(MB|GB)/)
                                        if (match) {
                                          const value = Number.parseFloat(match[1])
                                          const unit = match[3]
                                          return total + (unit === "GB" ? value : value / 1024)
                                        }
                                        return total
                                      }, 0)
                                      .toFixed(2)} GB`}
                              </Badge>
                            </div>
                          </div>

                          {isSingleFile ? (
                            // Single File Download Design
                            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border-2 border-blue-200 hover:border-blue-300 transition-colors">
                              <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                                  <Download className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                  <div className="font-bold text-gray-900 text-lg">Download {software.name}</div>
                                  <div className="text-sm text-gray-600">
                                    {version.name} • {version.parts[0].size}
                                  </div>
                                </div>
                              </div>
                              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3" asChild>
                                <Link href={`/download/${software.id}/${version.parts[0].part}`} target="_blank">
                                  <Download className="w-5 h-5 mr-2" />
                                  Download Now
                                </Link>
                              </Button>
                            </div>
                          ) : (
                            // Multi-Part Download Design
                            <div className="space-y-3">
                              {version.parts.map((part, partIndex) => (
                                <div
                                  key={partIndex}
                                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border"
                                >
                                  <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                      <span className="text-blue-600 font-bold">{part.part}</span>
                                    </div>
                                    <div>
                                      <div className="font-medium text-gray-900">Download Part {part.part}</div>
                                      <div className="text-sm text-gray-500">{part.size}</div>
                                    </div>
                                  </div>
                                  <Button className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                                    <Link href={`/download/${software.id}/${part.part}`} target="_blank">
                                      <Download className="w-4 h-4 mr-2" />
                                      Download
                                    </Link>
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center p-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">No download links available for this software.</p>
                  </div>
                )}

                {/* Download Notice */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-left mt-8">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-1">Download Notice</h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• Make sure your system meets the minimum requirements</li>
                        <li>• For split archives, download all parts and extract the first file</li>
                        <li>• Disable antivirus temporarily if download is blocked</li>
                        <li>• Always scan downloaded files before installation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Software Section */}
            {relatedSoftware.length > 0 && (
              <Card className="mb-8 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 border border-gray-200">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Related Software
                      <span className="block text-sm font-normal text-gray-600 mt-1">
                        You might also be interested in these applications
                      </span>
                    </h2>
                    <Link
                      href="/categories"
                      className="text-blue-600 hover:text-blue-700 flex items-center space-x-1 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <span>View All</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedSoftware.map((relatedSoft, index) => {
                      const relatedCategory = softwareData.categories.find((c) => c.id === relatedSoft.category)
                      return (
                        <div key={relatedSoft.id} className="group relative">
                          {/* Gradient Border Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

                          <Card className="relative m-0.5 h-full hover:shadow-xl transition-all duration-500 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50 border-2 border-transparent group-hover:border-blue-200">
                            <Link href={`/software/${relatedSoft.id}`} className="block h-full">
                              <CardContent className="p-6 h-full flex flex-col">
                                {/* Header Section */}
                                <div className="flex items-start space-x-4 mb-4">
                                  <div className="relative group-hover:scale-110 transition-transform duration-300">
                                    <Image
                                      src={relatedSoft.image || "/placeholder.svg"}
                                      alt={relatedSoft.name}
                                      width={50}
                                      height={50}
                                      className="rounded-xl shadow-md object-contain bg-gray-50 p-2"
                                      unoptimized
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                                      {relatedSoft.name}
                                    </h3>
                                    <div className="flex items-center space-x-2 mt-1">
                                      <Badge variant="outline" className="text-xs">
                                        v{relatedSoft.version}
                                      </Badge>
                                      <Badge variant="secondary" className="text-xs">
                                        {relatedCategory?.name}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>

                                <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
                                  {relatedSoft.description}
                                </p>

                                {/* Stats Section */}
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                  <div className="text-center p-2 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                                    <div className="text-sm font-bold text-blue-600">
                                      {relatedSoft.downloads.toLocaleString()}
                                    </div>
                                    <div className="text-xs text-blue-700 font-medium">Downloads</div>
                                  </div>
                                  <div className="text-center p-2 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg">
                                    <div className="flex items-center justify-center">
                                      <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                                      <span className="text-sm font-bold text-yellow-600 ml-1">
                                        {relatedSoft.rating}
                                      </span>
                                    </div>
                                    <div className="text-xs text-yellow-700 font-medium">Rating</div>
                                  </div>
                                </div>

                                {/* Action Button */}
                                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all">
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </Button>
                              </CardContent>
                            </Link>
                          </Card>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
