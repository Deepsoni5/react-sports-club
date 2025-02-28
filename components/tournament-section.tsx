import { Button } from "@/components/ui/button"
import { MapPin, Calendar, BarChart2, MessageSquare } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

const tournaments = [
  {
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    status: {
      label: "Upcoming",
      color: "bg-blue-500",
    },
    rating: "9/12",
    organizer: "City Sports League",
    points: "500 Points",
    location: "Central Stadium",
    datetime: "Aug 15, 2023 • 14:00",
    skillLevel: "Intermediate",
    action: "Book Now",
  },
  {
    image:
      "https://images.unsplash.com/photo-1519766304817-4f37bda74a26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    status: {
      label: "Live",
      color: "bg-green-500",
    },
    rating: "8/10",
    organizer: "National Athletics",
    points: "750 Points",
    location: "Olympic Arena",
    datetime: "Aug 16, 2023 • 15:30",
    skillLevel: "Advanced",
    action: "View Live Scores",
  },
  {
    image:
      "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1468&q=80",
    status: {
      label: "Filling Fast",
      color: "bg-orange-500",
    },
    rating: "11/12",
    organizer: "Global Sports Inc.",
    points: "1000 Points",
    location: "International Dome",
    datetime: "Aug 17, 2023 • 18:00",
    skillLevel: "Pro",
    action: "Register Now",
  },
]

function TournamentCard({
  image,
  status,
  rating,
  organizer,
  points,
  location,
  datetime,
  skillLevel,
  action,
}: (typeof tournaments)[0]) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#1032B9]/10 p-4 backdrop-blur-sm transition-all duration-300 hover:border-[#EF3DF6]/50 hover:bg-[#1032B9]/20">
      {/* Glow effect on hover */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1032B9]/0 to-[#EF3DF6]/0 opacity-0 blur-xl transition-all duration-300 group-hover:from-[#1032B9]/10 group-hover:to-[#EF3DF6]/10 group-hover:opacity-100" />

      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-gradient-to-b from-[#1032B9]/50 to-[#1032B9]/30">
        {/* Status Badge */}
        <div className="absolute left-3 top-3 z-10">
          <Badge className={`${status.color} px-2 py-1 text-xs font-semibold text-white`}>{status.label}</Badge>
        </div>

        {/* Rating Badge */}
        <div className="absolute right-3 top-3 z-10">
          <Badge
            variant="outline"
            className="border-white/20 bg-[#1032B9]/50 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm"
          >
            {rating}
          </Badge>
        </div>

        <Image
          src={image || "/placeholder.svg"}
          alt="Tournament Event"
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-white">{organizer}</p>
          <p className="text-sm font-medium text-[#EF3DF6]">{points}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Calendar className="h-4 w-4" />
            <span>{datetime}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <BarChart2 className="h-4 w-4" />
            <span>{skillLevel}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            className={`flex-1 transition-all duration-300 ${
              action === "Book Now" || action === "Register Now"
                ? "bg-[#1032B9] hover:bg-[#1032B9]/90"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
          >
            {action}
          </Button>
          <Button
            variant="outline"
            className="border-white/20 bg-[#1032B9]/20 text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-[#1032B9]/30"
          >
            <MessageSquare className="h-4 w-4" />
            <span className="sr-only md:not-sr-only md:ml-2">Chatroom</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export function TournamentSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1032B9]/20 via-[#1032B9]/10 to-transparent" />

      <div className="container relative z-10">
        <h2 className="mb-8 text-2xl font-bold text-white md:text-3xl lg:text-4xl">Events and Tournaments</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tournaments.map((tournament, index) => (
            <TournamentCard key={index} {...tournament} />
          ))}
        </div>
      </div>
    </section>
  )
}

