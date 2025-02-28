import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Clock, ChevronDown, MapPin } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const bookingCards = [
  {
    title: "Hockey Training",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8c252e9b488d36c998ee6c40df41865b.jpg-Vhu4GvxoJsckxZioMu64oTMY0R3hiX.jpeg",
    venue: "City Sports Complex",
    address: "123 Main St, Metropolis",
  },
  {
    title: "Hockey Match",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8c252e9b488d36c998ee6c40df41865b.jpg-Vhu4GvxoJsckxZioMu64oTMY0R3hiX.jpeg",
    venue: "National Stadium",
    address: "456 Park Ave, Sportsville",
  },
  {
    title: "Hockey Practice",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8c252e9b488d36c998ee6c40df41865b.jpg-Vhu4GvxoJsckxZioMu64oTMY0R3hiX.jpeg",
    venue: "Community Ice Rink",
    address: "789 Ice Road, Wintertown",
  },
]

export function BookSection() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1032B9]/20 via-[#1032B9]/10 to-transparent" />

      <div className="container relative z-10">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <h2 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
            Book <span className="text-[#EF3DF6]">•</span> Play <span className="text-[#EF3DF6]">•</span> Repeat
          </h2>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-white/20 bg-[#1032B9]/20 text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-[#1032B9]/30"
                >
                  Filters <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#1032B9]/80 text-white backdrop-blur-sm">
                <DropdownMenuItem className="focus:bg-white/10">Popular</DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-white/10">Newest</DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-white/10">Price: Low to High</DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-white/10">Price: High to Low</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookingCards.map((card, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#1032B9]/10 backdrop-blur-sm transition-all duration-300 hover:border-[#EF3DF6]/50 hover:bg-[#1032B9]/20"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1032B9]/0 to-[#EF3DF6]/0 opacity-0 blur-xl transition-all duration-300 group-hover:from-[#1032B9]/10 group-hover:to-[#EF3DF6]/10 group-hover:opacity-100" />

              <div className="p-4">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
                  <Image
                    src={card.image || "/placeholder.svg"}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{card.venue}</h3>
                    <p className="text-sm text-gray-300 flex items-center">
                      <MapPin className="mr-1 h-3 w-3" /> {card.address}
                    </p>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Clock className="h-6 w-6" />
                  </div>
                </div>
                <Button className="w-full bg-[#1032B9]/30 text-white backdrop-blur-sm transition-all duration-300 hover:bg-[#1032B9]/50 hover:scale-[1.02]">
                  Book Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button
            variant="outline"
            className="border-white/20 bg-[#1032B9]/20 text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-[#1032B9]/30 hover:scale-105"
          >
            Show more
          </Button>
        </div>
      </div>
    </section>
  )
}

