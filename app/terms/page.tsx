import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Scale, AlertTriangle, CheckCircle, XCircle, Users } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Scale className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Please read these terms carefully before using our services. By accessing DownloadHub, you agree to these
              terms.
            </p>
            <div className="mt-4 text-sm opacity-75">Last updated: December 2024</div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Agreement */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <span>Agreement to Terms</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using DownloadHub ("we," "our," or "us"), you accept and agree to be bound by the terms
                and provision of this agreement. If you do not agree to abide by the above, please do not use this
                service.
              </p>
            </CardContent>
          </Card>

          {/* Use License */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Use License</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Permission is granted to:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Download software for personal, non-commercial use</li>
                  <li>Access and browse our website content</li>
                  <li>Share links to our software pages</li>
                  <li>Contact us for support and inquiries</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <strong className="text-green-900">Free for Personal Use</strong>
                    <p className="text-green-700 text-sm mt-1">
                      All software downloads are provided free of charge for personal, non-commercial use.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Restrictions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <XCircle className="w-5 h-5 text-red-600" />
                <span>Restrictions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">You may NOT:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Redistribute or resell any software obtained from our site</li>
                  <li>Use our services for commercial purposes without permission</li>
                  <li>Attempt to reverse engineer or modify downloaded software</li>
                  <li>Upload malicious content or attempt to hack our systems</li>
                  <li>Use automated tools to mass-download content</li>
                  <li>Violate any applicable laws or regulations</li>
                </ul>
              </div>
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <strong className="text-red-900">Important Notice</strong>
                    <p className="text-red-700 text-sm mt-1">
                      Violation of these restrictions may result in immediate termination of your access to our
                      services.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Software Disclaimer */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <span>Software Disclaimer</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Third-Party Software</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                    <li>We do not own the software we distribute</li>
                    <li>Software is provided by original developers</li>
                    <li>We are not responsible for software functionality</li>
                    <li>Check original licenses before use</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Security & Safety</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                    <li>All files are scanned for malware</li>
                    <li>We cannot guarantee 100% safety</li>
                    <li>Use antivirus software on downloads</li>
                    <li>Download at your own risk</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Responsibilities */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-purple-600" />
                <span>User Responsibilities</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">System Requirements</h4>
                  <p className="text-sm text-blue-700">
                    Ensure your system meets software requirements before downloading and installing.
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Legal Compliance</h4>
                  <p className="text-sm text-green-700">
                    Comply with all applicable laws and software licenses in your jurisdiction.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Data Backup</h4>
                  <p className="text-sm text-purple-700">
                    Back up important data before installing new software on your system.
                  </p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-2">Responsible Use</h4>
                  <p className="text-sm text-orange-700">
                    Use downloaded software responsibly and in accordance with its intended purpose.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                In no event shall DownloadHub or its suppliers be liable for any damages (including, without limitation,
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability
                to use the materials on DownloadHub's website.
              </p>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <strong className="text-yellow-900">Maximum Liability:</strong>
                <p className="text-yellow-700 text-sm mt-1">
                  Our total liability to you for any damages shall not exceed the amount you paid for our services
                  (which is $0 for free users).
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Modifications */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Modifications to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                DownloadHub may revise these terms of service at any time without notice. By using this website, you are
                agreeing to be bound by the then current version of these terms of service.
              </p>
              <div className="p-4 bg-blue-50 rounded-lg">
                <strong className="text-blue-900">Stay Updated:</strong>
                <p className="text-blue-700 text-sm mt-1">
                  We recommend checking this page periodically for any changes to our terms of service.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Questions About Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <strong className="text-gray-900">Email:</strong>
                  <div className="text-gray-700">legal@downloadhub.com</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <strong className="text-gray-900">Subject Line:</strong>
                  <div className="text-gray-700">"Terms of Service Inquiry"</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
