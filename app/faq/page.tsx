"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ChevronDown, ChevronUp, Search, HelpCircle, Download, Shield, Settings, Bug } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const faqCategories = [
    {
      title: "General Questions",
      icon: HelpCircle,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      questions: [
        {
          question: "What is DownloadHub?",
          answer:
            "DownloadHub is a free software download platform that provides safe and reliable downloads of popular software applications. We offer a wide variety of software across different categories including productivity tools, multimedia software, development tools, and more.",
        },
        {
          question: "Is DownloadHub free to use?",
          answer:
            "Yes, DownloadHub is completely free to use. You can browse, search, and download software without any registration or payment required. We believe in providing free access to essential software for everyone.",
        },
        {
          question: "Do I need to create an account?",
          answer:
            "No, you don't need to create an account to download software from DownloadHub. However, creating an account would allow you to track your download history and receive notifications about software updates (feature coming soon).",
        },
        {
          question: "How often is the software updated?",
          answer:
            "We regularly update our software collection to ensure you have access to the latest versions. Most popular software is updated within 24-48 hours of the official release. You can check the 'Latest' section to see recently updated software.",
        },
      ],
    },
    {
      title: "Download Issues",
      icon: Download,
      color: "text-green-600",
      bgColor: "bg-green-50",
      questions: [
        {
          question: "Why is my download slow?",
          answer:
            "Download speeds can be affected by several factors including your internet connection, server load, and time of day. Try downloading during off-peak hours or check your internet connection. If the problem persists, try using a download manager like IDM.",
        },
        {
          question: "The download link is not working. What should I do?",
          answer:
            "If a download link is broken, please contact us immediately through our contact form. Include the software name and the specific link that's not working. We typically fix broken links within 24 hours.",
        },
        {
          question: "How do I download multi-part files?",
          answer:
            "For multi-part downloads, you need to download ALL parts before extracting. Download each part to the same folder, then extract the first part (.part1.rar or .001). The extraction software will automatically combine all parts.",
        },
        {
          question: "Can I resume interrupted downloads?",
          answer:
            "This depends on your browser and the download method. We recommend using a download manager like Internet Download Manager (IDM) which supports resume functionality for interrupted downloads.",
        },
      ],
    },
    {
      title: "Security & Safety",
      icon: Shield,
      color: "text-red-600",
      bgColor: "bg-red-50",
      questions: [
        {
          question: "Are the downloads safe and virus-free?",
          answer:
            "We scan all files with multiple antivirus engines before making them available for download. However, we recommend running your own antivirus scan on downloaded files as an additional safety measure. We cannot guarantee 100% safety as new threats emerge constantly.",
        },
        {
          question: "Why does my antivirus flag the downloaded file?",
          answer:
            "Sometimes antivirus software may flag legitimate files as false positives, especially for cracked or modified software. This is common with keygens, patches, and cracks. However, always err on the side of caution and scan files thoroughly.",
        },
        {
          question: "What should I do if I downloaded malware?",
          answer:
            "If you suspect you've downloaded malware, immediately disconnect from the internet, run a full system scan with your antivirus, and consider using additional malware removal tools. Report the issue to us so we can investigate and remove the problematic file.",
        },
        {
          question: "Do you collect personal information?",
          answer:
            "We collect minimal information as outlined in our Privacy Policy. We don't require registration for downloads, and we don't sell personal information to third parties. Check our Privacy Policy for complete details.",
        },
      ],
    },
    {
      title: "Technical Support",
      icon: Settings,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      questions: [
        {
          question: "The software won't install. What should I do?",
          answer:
            "Installation issues can be caused by insufficient permissions, incompatible system requirements, or conflicting software. Try running the installer as administrator, check system requirements, and temporarily disable antivirus during installation.",
        },
        {
          question: "How do I check system requirements?",
          answer:
            "System requirements are listed on each software's detail page. Compare these with your system specifications. On Windows, you can check your specs by right-clicking 'This PC' and selecting 'Properties'.",
        },
        {
          question: "The software crashes after installation. Why?",
          answer:
            "Software crashes can be caused by compatibility issues, missing dependencies, or system conflicts. Try running the software in compatibility mode, update your drivers, or check if additional runtime libraries are needed.",
        },
        {
          question: "How do I uninstall software properly?",
          answer:
            "Use the Windows 'Add or Remove Programs' feature or the software's built-in uninstaller. For stubborn software, you might need specialized uninstaller tools. Always create a system restore point before installing new software.",
        },
      ],
    },
    {
      title: "Troubleshooting",
      icon: Bug,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      questions: [
        {
          question: "The website is loading slowly. What can I do?",
          answer:
            "Slow loading can be caused by high traffic, your internet connection, or browser issues. Try clearing your browser cache, disabling browser extensions, or accessing the site during off-peak hours.",
        },
        {
          question: "I can't find a specific software. Can you add it?",
          answer:
            "We're always looking to expand our software collection. Use our contact form to request specific software, and we'll do our best to add it to our catalog. Popular requests are prioritized.",
        },
        {
          question: "The search function isn't working properly.",
          answer:
            "If search isn't returning expected results, try using different keywords, check spelling, or browse by category instead. If the problem persists, please report it to our technical team.",
        },
        {
          question: "How do I report a bug or issue?",
          answer:
            "You can report bugs through our contact form. Please include as much detail as possible: what you were doing, what browser you're using, error messages, and steps to reproduce the issue.",
        },
      ],
    },
  ]

  const filteredCategories = faqCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Page Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <HelpCircle className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Find answers to common questions about DownloadHub, software downloads, and troubleshooting.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Search */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search FAQ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-lg py-3"
                />
              </div>
            </CardContent>
          </Card>

          {/* FAQ Categories */}
          <div className="space-y-8">
            {filteredCategories.map((category, categoryIndex) => (
              <Card key={categoryIndex}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${category.bgColor} rounded-lg flex items-center justify-center`}>
                      <category.icon className={`w-5 h-5 ${category.color}`} />
                    </div>
                    <span>{category.title}</span>
                    <span className="text-sm text-gray-500">({category.questions.length})</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.questions.map((faq, faqIndex) => {
                    const globalIndex = categoryIndex * 100 + faqIndex
                    const isOpen = openItems.includes(globalIndex)

                    return (
                      <div key={faqIndex} className="border border-gray-200 rounded-lg">
                        <button
                          onClick={() => toggleItem(globalIndex)}
                          className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-medium text-gray-900">{faq.question}</span>
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4">
                            <div className="pt-2 border-t border-gray-100">
                              <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {searchTerm && filteredCategories.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any FAQ items matching "{searchTerm}". Try different keywords or browse all
                  categories.
                </p>
                <button onClick={() => setSearchTerm("")} className="text-blue-600 hover:text-blue-700 font-medium">
                  Clear search and show all FAQs
                </button>
              </CardContent>
            </Card>
          )}

          {/* Contact Support */}
          <Card className="mt-12">
            <CardContent className="p-8 text-center">
              <HelpCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Still need help?</h3>
              <p className="text-gray-600 mb-6">
                Can't find the answer you're looking for? Our support team is here to help you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Contact Support
                </a>
                <a
                  href="mailto:support@downloadhub.com"
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Email Us
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
