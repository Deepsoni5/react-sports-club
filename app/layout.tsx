import type React from "react"
import "@/styles/globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-[#000314]`}>
        <Provider>
        {children}</Provider></body>
    </html>
  )
}



import './globals.css'
import Provider from "@/components/providers/providers"

export const metadata = {
      generator: 'v0.dev'
    };
