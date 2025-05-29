"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Shield, AlertTriangle, FileText, Send, Clock, CheckCircle } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function DMCAPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    address: "",
    phone: "",
    copyrightWork: "",
    infringingUrls: "",
    originalWork: "",
    statement: "",
    signature: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("DMCA form submitted:", formData)
    alert("Your DMCA notice has been submitted. We will review it within 24-48 hours.")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Page Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">DMCA Policy</h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              We respect intellectual property rights and respond to valid DMCA takedown notices in accordance with the
              law.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Overview */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <span>DMCA Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                DownloadHub respects the intellectual property rights of others and expects our users to do the same. In
                accordance with the Digital Millennium Copyright Act (DMCA), we will respond expeditiously to claims of
                copyright infringement committed using our service.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg text-center">
                  <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold text-blue-900">24-48 Hours</div>
                  <div className="text-sm text-blue-700">Response Time</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg text-center">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="font-semibold text-green-900">Valid Claims</div>
                  <div className="text-sm text-green-700">Processed Quickly</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg text-center">
                  <Shield className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="font-semibold text-purple-900">Legal Protection</div>
                  <div className="text-sm text-purple-700">DMCA Compliant</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Filing a DMCA Notice */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <span>Filing a DMCA Takedown Notice</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                If you believe that your copyrighted work has been copied in a way that constitutes copyright
                infringement and is accessible on our site, please notify us by providing the following information:
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h3 className="font-semibold text-yellow-900 mb-2">Required Information</h3>
                  <ul className="list-disc list-inside text-yellow-700 space-y-1 text-sm">
                    <li>Your physical or electronic signature</li>
                    <li>Identification of the copyrighted work claimed to have been infringed</li>
                    <li>Identification of the material that is claimed to be infringing</li>
                    <li>Your contact information (address, phone number, email)</li>
                    <li>A statement of good faith belief that the use is not authorized</li>
                    <li>A statement that the information is accurate and you are authorized to act</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* DMCA Notice Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Send className="w-5 h-5 text-blue-600" />
                <span>Submit DMCA Notice</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full legal name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                        Company/Organization
                      </label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company name (if applicable)"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                      Physical Address *
                    </label>
                    <Textarea
                      id="address"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Your complete physical address"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Copyright Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Copyright Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="copyrightWork" className="block text-sm font-medium text-gray-700 mb-2">
                        Description of Copyrighted Work *
                      </label>
                      <Textarea
                        id="copyrightWork"
                        name="copyrightWork"
                        required
                        value={formData.copyrightWork}
                        onChange={handleChange}
                        placeholder="Describe the copyrighted work that you claim has been infringed"
                        rows={4}
                      />
                    </div>
                    <div>
                      <label htmlFor="infringingUrls" className="block text-sm font-medium text-gray-700 mb-2">
                        URLs of Infringing Material *
                      </label>
                      <Textarea
                        id="infringingUrls"
                        name="infringingUrls"
                        required
                        value={formData.infringingUrls}
                        onChange={handleChange}
                        placeholder="List the specific URLs on our site where the infringing material is located"
                        rows={4}
                      />
                    </div>
                    <div>
                      <label htmlFor="originalWork" className="block text-sm font-medium text-gray-700 mb-2">
                        Location of Original Work *
                      </label>
                      <Textarea
                        id="originalWork"
                        name="originalWork"
                        required
                        value={formData.originalWork}
                        onChange={handleChange}
                        placeholder="Provide the URL or location where the original copyrighted work can be found"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                {/* Statements */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Statements</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="statement" className="block text-sm font-medium text-gray-700 mb-2">
                        Good Faith Statement *
                      </label>
                      <Textarea
                        id="statement"
                        name="statement"
                        required
                        value={formData.statement}
                        onChange={handleChange}
                        placeholder="I have a good faith belief that use of the copyrighted materials described above is not authorized by the copyright owner, its agent, or the law..."
                        rows={4}
                      />
                    </div>
                    <div>
                      <label htmlFor="signature" className="block text-sm font-medium text-gray-700 mb-2">
                        Electronic Signature *
                      </label>
                      <Input
                        id="signature"
                        name="signature"
                        type="text"
                        required
                        value={formData.signature}
                        onChange={handleChange}
                        placeholder="Type your full legal name as your electronic signature"
                      />
                    </div>
                  </div>
                </div>

                {/* Perjury Statement */}
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <strong className="text-red-900">Perjury Warning</strong>
                      <p className="text-red-700 text-sm mt-1">
                        By submitting this form, you swear under penalty of perjury that the information in this
                        notification is accurate and that you are the copyright owner or are authorized to act on behalf
                        of the owner of an exclusive right that is allegedly infringed.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">* Required fields</div>
                  <Button type="submit" className="bg-red-600 hover:bg-red-700">
                    <Send className="w-4 h-4 mr-2" />
                    Submit DMCA Notice
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Counter-Notice */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Counter-Notice Process</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                If you believe that your material was removed or disabled by mistake or misidentification, you may file
                a counter-notice with us.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Counter-Notice Requirements</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                    <li>Your physical or electronic signature</li>
                    <li>Identification of the removed material</li>
                    <li>Statement under penalty of perjury</li>
                    <li>Consent to jurisdiction of federal court</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Process Timeline</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                    <li>Submit counter-notice within 10 days</li>
                    <li>We forward to original complainant</li>
                    <li>Material restored in 10-14 business days</li>
                    <li>Unless court action is filed</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>DMCA Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                For DMCA notices and counter-notices, please contact our designated agent:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <strong className="text-gray-900">DMCA Agent Email:</strong>
                  <div className="text-gray-700">dmca@downloadhub.com</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <strong className="text-gray-900">Response Time:</strong>
                  <div className="text-gray-700">24-48 hours</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <strong className="text-gray-900">Mailing Address:</strong>
                  <div className="text-gray-700">
                    DMCA Agent
                    <br />
                    DownloadHub
                    <br />
                    123 Software Street
                    <br />
                    Tech City, TC 12345
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <strong className="text-gray-900">Phone:</strong>
                  <div className="text-gray-700">+1 (555) 123-4567</div>
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
