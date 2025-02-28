import { Navbar } from "./navbar"
import { MobileNav } from "./mobile-nav"

export function SiteHeader() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-sm">
      <div className="container flex h-14 items-center justify-between">
        <Navbar />
        <MobileNav />
      </div>
    </header>
  )
}

