import { Calendar, Clock, HeadphonesIcon, Building2, Users, CheckCircle } from "lucide-react"

const features = [
  {
    icon: Calendar,
    title: "Easy Booking",
    description:
      "Book your preferred sports facilities and sessions with just a few clicks through our user-friendly platform.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description:
      "Access our booking system and customer support around the clock, ensuring flexibility for all schedules.",
  },
  {
    icon: HeadphonesIcon,
    title: "Expert Support",
    description: "Get assistance from our knowledgeable support team for any queries or guidance on sports activities.",
  },
  {
    icon: Building2,
    title: "Top Notch Facility",
    description:
      "Experience state-of-the-art sports facilities maintained to the highest standards for optimal performance.",
  },
  {
    icon: Users,
    title: "Community Events",
    description:
      "Participate in regular community events, tournaments, and social gatherings to connect with fellow sports enthusiasts.",
  },
  {
    icon: CheckCircle,
    title: "Instant Confirmation",
    description:
      "Receive immediate confirmation for your bookings, allowing you to plan your sports activities with confidence.",
  },
]

export function WhyChooseSection() {
  return (
    <section className="relative overflow-hidden bg-[#000314] py-16 md:py-24">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1032B9]/10 via-transparent to-transparent" />

      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">Why Choose React Sport Club?</h2>
          <p className="mb-12 text-gray-400">
            Experience the ultimate sports community with unparalleled convenience and quality
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#1032B9]/50 hover:bg-white/10"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1032B9]/0 to-[#1032B9]/0 opacity-0 blur-xl transition-all duration-300 group-hover:from-[#1032B9]/10 group-hover:to-[#1032B9]/10 group-hover:opacity-100" />

                <div className="relative space-y-4">
                  {/* Icon */}
                  <div className="inline-flex rounded-lg bg-[#1032B9]/10 p-3">
                    <Icon className="h-6 w-6 text-[#1032B9]" />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-400">{feature.description}</p>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute right-6 top-6">
                    <Icon className="h-24 w-24 rotate-12 text-white/5" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

