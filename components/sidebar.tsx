import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface Category {
  id: string
  name: string
  nameFa: string
}

interface SidebarProps {
  categories: Category[]
}

export function Sidebar({ categories }: SidebarProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
            >
              <span className="text-sm font-medium">{category.name}</span>
              <Badge variant="secondary" className="text-xs">
                {Math.floor(Math.random() * 50) + 10}
              </Badge>
            </Link>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Popular Downloads</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { name: "Internet Download Manager", downloads: "125K" },
            { name: "Visual Studio Code", downloads: "156K" },
            { name: "Google Chrome", downloads: "234K" },
            { name: "Mozilla Firefox", downloads: "89K" },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{item.name}</span>
              <Badge variant="outline" className="text-xs">
                {item.downloads}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
