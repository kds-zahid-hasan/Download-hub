"use client"

import { useEffect, useState } from "react"
import { notFound } from "next/navigation"
import { Download, Shield, AlertTriangle, ExternalLink, CheckCircle, Clock, Zap } from "lucide-react"
import Image from "next/image"
import { Header } from "@/components/header"
import softwareData from "@/data/software.json"
import { Footer } from "@/components/footer"

interface DownloadPageProps {
  params: {
    id: string
    part: string
  }
}

export default function DownloadPage({ params }: DownloadPageProps) {
  const [countdown, setCountdown] = useState(3)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  // Find the software and download part
  const software = softwareData.software.find((s) => s.id === params.id)

  if (!software) {
    notFound()
  }

  // Find the first version that has the requested part
  const version = software.downloadVersions?.find((v) => v.parts.some((p) => p.part === Number.parseInt(params.part)))
  const part = version?.parts.find((p) => p.part === Number.parseInt(params.part))

  if (!version || !part) {
    notFound()
  }

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Start countdown when component mounts
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
        setProgress(((3 - countdown + 1) / 3) * 100)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      setIsRedirecting(true)
      // Redirect to the actual download link after countdown
      window.open(part.link, "_blank")
    }
  }, [countdown, part.link])

  return (
    <div className="min-h-screen bg-[#e0e5ec]">
      <Header />

      {/* Neumorphic Header */}
      <div className="relative py-16 bg-[#e0e5ec]">
        <div className="container mx-auto px-4">
          <div
            className={`transform transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-[#e0e5ec] flex items-center justify-center shadow-[8px_8px_16px_#b8bec5,-8px_-8px_16px_#ffffff] animate-pulse">
                <Download className="w-10 h-10 text-[#6d7b92]" />
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#6d7b92]">Preparing Your Download</h1>
              <div className="max-w-3xl mx-auto px-8 py-6 rounded-2xl bg-[#e0e5ec] shadow-[8px_8px_16px_#b8bec5,-8px_-8px_16px_#ffffff]">
                <p className="text-xl text-[#6d7b92]">
                  Your download of <span className="font-semibold">{software.name}</span> (Part {params.part}) will
                  begin automatically in <span className="font-bold text-[#5b6baa]">{countdown}</span> seconds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Neumorphic Download Card */}
          <div
            className={`transform transition-all duration-1000 delay-300 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="mb-8 rounded-3xl bg-[#e0e5ec] p-8 shadow-[8px_8px_16px_#b8bec5,-8px_-8px_16px_#ffffff]">
              {/* Software Info */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#b8bec5,inset_-4px_-4px_8px_#ffffff] p-2 flex items-center justify-center">
                    <Image
                      src={software.image || "/placeholder.svg"}
                      alt={software.name}
                      width={80}
                      height={80}
                      className="rounded-xl object-contain"
                      unoptimized
                    />
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold mb-2 text-[#6d7b92]">{software.name}</h2>
                  <p className="text-[#8a96a8] mb-2">
                    {version.name} - Part {part.part}
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-3 text-sm">
                    <span className="px-4 py-2 rounded-full bg-[#e0e5ec] shadow-[4px_4px_8px_#b8bec5,-4px_-4px_8px_#ffffff] text-[#6d7b92]">
                      {part.size}
                    </span>
                    <span className="px-4 py-2 rounded-full bg-[#e0e5ec] shadow-[4px_4px_8px_#b8bec5,-4px_-4px_8px_#ffffff] text-[#6d7b92]">
                      Safe Download
                    </span>
                  </div>
                </div>
              </div>

              {/* Countdown Progress */}
              <div className="mb-8 p-6 rounded-2xl bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#b8bec5,inset_-4px_-4px_8px_#ffffff]">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-[#e0e5ec] shadow-[4px_4px_8px_#b8bec5,-4px_-4px_8px_#ffffff] flex items-center justify-center">
                      <Clock className="w-5 h-5 text-[#6d7b92]" />
                    </div>
                    <div>
                      <span className="text-lg font-semibold text-[#6d7b92]">
                        Download starting in {countdown} seconds...
                      </span>
                      <div className="text-sm text-[#8a96a8]">Please wait while we prepare your file</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#5b6baa]">{countdown}</div>
                    <div className="text-sm text-[#8a96a8]">{3 - countdown}/3</div>
                  </div>
                </div>

                {/* Neumorphic Progress Bar */}
                <div className="h-4 rounded-full bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#b8bec5,inset_-4px_-4px_8px_#ffffff] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#5b6baa] to-[#8a96a8] transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Download Info with Icons */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-5 rounded-2xl bg-[#e0e5ec] shadow-[8px_8px_16px_#b8bec5,-8px_-8px_16px_#ffffff]">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-[#e0e5ec] shadow-[4px_4px_8px_#b8bec5,-4px_-4px_8px_#ffffff] flex items-center justify-center">
                      <Download className="w-6 h-6 text-[#6d7b92]" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#6d7b92]">File Name</div>
                      <div className="text-sm text-[#8a96a8]">
                        {software.name} - Part {part.part}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-[#e0e5ec] shadow-[8px_8px_16px_#b8bec5,-8px_-8px_16px_#ffffff]">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-[#e0e5ec] shadow-[4px_4px_8px_#b8bec5,-4px_-4px_8px_#ffffff] flex items-center justify-center">
                      <Zap className="w-6 h-6 text-[#6d7b92]" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#6d7b92]">File Size</div>
                      <div className="text-sm text-[#8a96a8]">{part.size}</div>
                    </div>
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-[#e0e5ec] shadow-[8px_8px_16px_#b8bec5,-8px_-8px_16px_#ffffff]">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-[#e0e5ec] shadow-[4px_4px_8px_#b8bec5,-4px_-4px_8px_#ffffff] flex items-center justify-center">
                      <Shield className="w-6 h-6 text-[#6d7b92]" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#6d7b92]">Security</div>
                      <div className="text-sm text-[#8a96a8]">Virus Scanned</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-6">
                <button
                  className="flex-1 h-14 rounded-full bg-[#e0e5ec] text-[#5b6baa] font-semibold flex items-center justify-center gap-2 shadow-[8px_8px_16px_#b8bec5,-8px_-8px_16px_#ffffff] hover:shadow-[4px_4px_8px_#b8bec5,-4px_-4px_8px_#ffffff] active:shadow-[inset_4px_4px_8px_#b8bec5,inset_-4px_-4px_8px_#ffffff] transition-all duration-300"
                  onClick={() => window.open(part.link, "_blank")}
                >
                  <Download className="w-5 h-5 text-green-500" />
                  <span className="text-green-500" >Download Now</span>
                </button>
                <button
                  className="flex-1 h-14 rounded-full bg-[#e0e5ec] text-[#8a96a8] font-semibold flex items-center justify-center shadow-[8px_8px_16px_#b8bec5,-8px_-8px_16px_#ffffff] hover:shadow-[4px_4px_8px_#b8bec5,-4px_-4px_8px_#ffffff] active:shadow-[inset_4px_4px_8px_#b8bec5,inset_-4px_-4px_8px_#ffffff] transition-all duration-300"
                  onClick={() => window.close()}
                >
                  Cancel Download
                </button>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div
            className={`transform transition-all duration-1000 delay-500 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="mb-8 rounded-3xl bg-[#e0e5ec] p-8 shadow-[8px_8px_16px_#b8bec5,-8px_-8px_16px_#ffffff]">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="w-16 h-16 rounded-full bg-[#e0e5ec] shadow-[4px_4px_8px_#b8bec5,-4px_-4px_8px_#ffffff] flex items-center justify-center flex-shrink-0">
                  <Shield className="w-8 h-8 text-[#6d7b92]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#6d7b92] mb-4 flex items-center justify-center md:justify-start">
                    Safe & Secure Download
                    <CheckCircle className="w-5 h-5 text-[#5b6baa] ml-2" />
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "Scanned with multiple antivirus engines",
                      "SSL encrypted download connection",
                      "No malware or unwanted software",
                      "Regular security updates",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 rounded-xl bg-[#e0e5ec] shadow-[inset_2px_2px_5px_#b8bec5,inset_-2px_-2px_5px_#ffffff]"
                      >
                        <div className="w-3 h-3 rounded-full bg-[#5b6baa] shadow-[1px_1px_2px_#b8bec5,-1px_-1px_2px_#ffffff]"></div>
                        <span className="text-sm text-[#6d7b92]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Download Instructions */}
          <div
            className={`transform transition-all duration-1000 delay-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="rounded-3xl bg-[#e0e5ec] p-8 shadow-[8px_8px_16px_#b8bec5,-8px_-8px_16px_#ffffff]">
              <h3 className="text-xl font-bold text-[#6d7b92] mb-6 flex items-center">
                <AlertTriangle className="w-6 h-6 text-[#e9b872] mr-3" />
                Download Instructions
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  {[
                    "If download doesn't start automatically, click 'Download Now'",
                    "For multi-part files, download ALL parts to the same folder",
                    "Extract the first part (.part1.rar or .001) to combine all parts",
                    "Some browsers may show security warnings - this is normal",
                  ].map((instruction, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-4 rounded-xl bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#b8bec5,inset_-4px_-4px_8px_#ffffff]"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#e0e5ec] shadow-[4px_4px_8px_#b8bec5,-4px_-4px_8px_#ffffff] flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-[#6d7b92] text-sm">{index + 1}</span>
                      </div>
                      <p className="text-[#6d7b92] font-medium">{instruction}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-6">
                  <div className="p-6 rounded-xl bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#b8bec5,inset_-4px_-4px_8px_#ffffff]">
                    <h4 className="font-bold text-[#6d7b92] mb-3">💡 Pro Tips</h4>
                    <ul className="text-sm text-[#8a96a8] space-y-2">
                      {[
                        "Use a download manager for faster speeds",
                        "Temporarily disable antivirus if needed",
                        "Check system requirements before installing",
                        "Create a backup before installation",
                      ].map((tip, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-[#5b6baa] mr-2"></div>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-6 rounded-xl bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#b8bec5,inset_-4px_-4px_8px_#ffffff]">
                    <h4 className="font-bold text-[#6d7b92] mb-3">✅ After Download</h4>
                    <ul className="text-sm text-[#8a96a8] space-y-2">
                      {[
                        "Scan the file with your antivirus",
                        "Follow installation instructions",
                        "Run as administrator if required",
                        "Enjoy your new software!",
                      ].map((step, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-[#5b6baa] mr-2"></div>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Return to software page */}
              <div className="mt-8 pt-6 border-t border-[#d0d5dc] text-center">
                <a
                  href={`/software/${software.id}`}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#e0e5ec] text-[#5b6baa] font-semibold shadow-[4px_4px_8px_#b8bec5,-4px_-4px_8px_#ffffff] hover:shadow-[2px_2px_4px_#b8bec5,-2px_-2px_4px_#ffffff] active:shadow-[inset_2px_2px_4px_#b8bec5,inset_-2px_-2px_4px_#ffffff] transition-all duration-300"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Return to {software.name} page
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
