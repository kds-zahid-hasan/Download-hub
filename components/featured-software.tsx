import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Eye } from "lucide-react"
import Image from "next/image"

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

interface FeaturedSoftwareProps {
  software: Software[]
}

export function FeaturedSoftware({ software }: FeaturedSoftwareProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Software</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {software.slice(0, 4).map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="rounded-lg border"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg text-gray-900 truncate">{item.name}</h3>
                    <Badge variant="secondary">{item.version}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">
                        {item.softwareInformation?.fileSize || item.size || "Unknown"}
                      </span>
                    </div>
                    <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <a href={`/software/${item.id}`}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
