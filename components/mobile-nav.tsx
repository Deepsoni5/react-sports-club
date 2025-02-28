"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Link from "next/link"

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5 text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-black/95 text-white">
        <div className="flex h-full flex-col gap-6 pt-6">
          <Link href="/" className="text-lg font-semibold hover:text-blue-400">
            Marketplace
          </Link>
          <Link href="/" className="text-lg font-semibold hover:text-blue-400">
            Location
          </Link>
          <Link href="/signin" className="text-lg font-semibold hover:text-blue-400">
            Sign in
          </Link>
          <Link href="/" className="text-lg font-semibold hover:text-blue-400">
            Register
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}

