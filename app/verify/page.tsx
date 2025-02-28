"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useRouter } from "next/navigation"

const COUNTRY_CODES = [
  { value: "91", label: "91" },
  { value: "1", label: "1" },
  { value: "44", label: "44" },
  { value: "61", label: "61" },
] as const

export default function VerifyPage() {
  const router = useRouter()
  const [phoneNumber, setPhoneNumber] = React.useState("")
  const [countryCode, setCountryCode] = React.useState("91")
  const [error, setError] = React.useState("")

  // Format phone number as user types
  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, "")

    // Limit to 10 digits
    const truncated = cleaned.slice(0, 10)

    // Format as: 00000 00000
    let formatted = truncated
    if (truncated.length > 5) formatted = truncated.slice(0, 5) + " " + truncated.slice(5)

    return formatted
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setPhoneNumber(formatted)

    // Clear error when user starts typing
    if (error) setError("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Remove spaces and check length
    const digits = phoneNumber.replace(/\s/g, "")

    if (digits.length !== 10) {
      setError("Please enter a valid 10-digit mobile number")
      return
    }

    // Navigate to OTP page with phone number, including space after country code
    router.push(`/verify/otp?phone=${countryCode} ${digits}`)
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#000314]">
      <SiteHeader />
      <div className="flex-1 container mx-auto my-8 grid lg:grid-cols-2 gap-8 pt-16 md:pt-20">
        {/* Left Panel - Image */}
        <div className="relative hidden lg:block rounded-2xl overflow-hidden">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/signup_main_image.jpg-OaL7SdvSHzslPkOgi7v9x36OTaFawp.jpeg"
            alt="Sports Action"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1032B9]/50 to-transparent" />
        </div>

        {/* Right Panel - Verify Form */}
        <div className="flex items-center justify-center p-8 bg-[#1032B9]/10 backdrop-blur-sm rounded-2xl">
          <div className="w-full max-w-md space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-white">Verify your mobile number</h1>
              <p className="text-gray-400">We have sent you an One Time Password (OTP) on this mobile number</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Select defaultValue={countryCode} onValueChange={setCountryCode}>
                    <SelectTrigger
                      className="w-[90px] bg-white/10 border-white/20 text-white"
                      aria-label="Select country code"
                    >
                      <span className="flex items-center">
                        <span className="mr-1">+</span>
                        <SelectValue placeholder="Code" />
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRY_CODES.map((code) => (
                        <SelectItem key={code.value} value={code.value}>
                          {code.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="tel"
                    placeholder="00000 00000"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    className="flex-1 bg-white/10 border-white/20 text-white placeholder-white/50"
                    aria-label="Phone number"
                    aria-invalid={!!error}
                    aria-describedby={error ? "phone-error" : undefined}
                    maxLength={12} // Account for spaces
                  />
                </div>
                {error && (
                  <p id="phone-error" className="text-sm text-red-500">
                    {error}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-[#1032B9] hover:bg-[#1032B9]/80 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                disabled={phoneNumber.replace(/\s/g, "").length !== 10}
              >
                Get OTP
              </Button>
            </form>

            <p className="text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link href="/signin" className="font-semibold text-[#EF3DF6] hover:text-[#EF3DF6]/80">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}

