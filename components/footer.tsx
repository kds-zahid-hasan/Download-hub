"use client"
import { Separator } from "@/components/ui/separator"
import { Heart, Download, Shield, Users } from "lucide-react"
import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">DownloadHub</h3>
                <p className="text-sm text-gray-400">Software Download Center</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted source for safe and reliable software downloads. We provide the latest versions of popular
              software with secure download links.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-300 hover:text-white transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <a href="/latest" className="text-gray-300 hover:text-white transition-colors">
                  Latest Software
                </a>
              </li>
              <li>
                <a href="/popular" className="text-gray-300 hover:text-white transition-colors">
                  Popular Downloads
                </a>
              </li>
              <li>
                <a href="/featured" className="text-gray-300 hover:text-white transition-colors">
                  Featured Software
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Popular Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/categories/development" className="text-gray-300 hover:text-white transition-colors">
                  Development Tools
                </Link>
              </li>
              <li>
                <Link href="/categories/multimedia" className="text-gray-300 hover:text-white transition-colors">
                  Multimedia
                </Link>
              </li>
              <li>
                <Link href="/categories/graphic" className="text-gray-300 hover:text-white transition-colors">
                  Graphic Design
                </Link>
              </li>
              <li>
                <Link href="/categories/security" className="text-gray-300 hover:text-white transition-colors">
                  Security & Antivirus
                </Link>
              </li>
              <li>
                <Link href="/categories/office" className="text-gray-300 hover:text-white transition-colors">
                  Office & Productivity
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Support & Info</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/dmca" className="text-gray-300 hover:text-white transition-colors">
                  DMCA Policy
                </a>
              </li>
              <li>
                <a href="faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="text-center p-4 bg-gray-800 rounded-lg">
            <div className="flex justify-center mb-2">
              <Download className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-white">1000+</div>
            <div className="text-sm text-gray-400">Software Available</div>
          </div>
          <div className="text-center p-4 bg-gray-800 rounded-lg">
            <div className="flex justify-center mb-2">
              <Users className="w-6 h-6 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-white">50K+</div>
            <div className="text-sm text-gray-400">Happy Users</div>
          </div>
          <div className="text-center p-4 bg-gray-800 rounded-lg">
            <div className="flex justify-center mb-2">
              <Shield className="w-6 h-6 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-white">100%</div>
            <div className="text-sm text-gray-400">Safe Downloads</div>
          </div>
          <div className="text-center p-4 bg-gray-800 rounded-lg">
            <div className="flex justify-center mb-2">
              <Heart className="w-6 h-6 text-red-400" />
            </div>
            <div className="text-2xl font-bold text-white">24/7</div>
            <div className="text-sm text-gray-400">Support</div>
          </div>
        </div>

        <Separator className="bg-gray-700 mb-6" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-400">© {currentYear} DownloadHub. All rights reserved.</div>
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-400 fill-current" />
            <span>for software enthusiasts</span>
          </div>
          <div className="text-sm text-gray-400">Secure downloads • Virus-free • Always updated</div>
        </div>
      </div>
    </footer>
  )
}
