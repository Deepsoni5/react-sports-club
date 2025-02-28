import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, MapPin, Search } from "lucide-react"

export function Navbar() {
  return (
    <nav className="flex items-center justify-between w-full">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-6 w-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-blue-500"
            >
              <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
            </svg>
          </div>
        </Link>

        <div className="hidden md:block">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-white/90 transition-colors duration-200 hover:bg-white/10 hover:text-white"
              >
                Marketplace
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-black/95 text-white">
              <DropdownMenuItem className="focus:bg-white/10">Sports</DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-white/10">Gaming</DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-white/10">Electronics</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <nav className="hidden items-center space-x-4 md:flex">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-white/90 transition-colors duration-200 hover:bg-white/10 hover:text-white"
            >
              <MapPin className="h-4 w-4" />
              <span className="ml-2">Location</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-black/95 text-white">
            <DropdownMenuItem className="focus:bg-white/10">New York</DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-white/10">London</DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-white/10">Tokyo</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          size="sm"
          className="text-white/90 transition-colors duration-200 hover:bg-white/10 hover:text-white"
        >
          <Search className="h-4 w-4" />
        </Button>

        <Link href="/signin">
          <Button
            variant="ghost"
            size="sm"
            className="text-white/90 transition-colors duration-200 hover:bg-white/10 hover:text-white"
          >
            Sign in
          </Button>
        </Link>
        <Link href="/signup">
          <Button
            size="sm"
            className="bg-blue-600 text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700"
          >
            Register
          </Button>
        </Link>
      </nav>
    </nav>
  )
}

