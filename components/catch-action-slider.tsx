"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation } from "swiper/modules"
import { ChevronLeft, ChevronRight, Youtube, Twitch, Instagram } from "lucide-react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=1476&q=80",
    title: "Live Match",
    platform: "youtube",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    title: "Tournament Recap",
    platform: "twitch",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1577223625816-7546f13df25d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    title: "Behind the Scenes",
    platform: "instagram",
  },
]

export function CatchActionSlider() {
  const [domLoaded, setDomLoaded] = useState(false)

  useEffect(() => {
    setDomLoaded(true)
  }, [])

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#1032B9]/20 to-[#1032B9]/5 backdrop-blur-sm py-16 md:py-24">
      <div className="container">
        <h2 className="mb-12 text-3xl font-bold text-white md:text-4xl lg:text-5xl">Catch the action</h2>

        {domLoaded && (
          <div className="relative mx-auto max-w-[1200px] px-12">
            {" "}
            {/* Update: Adjusted container padding */}
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                el: ".custom-pagination",
              }}
              navigation={{
                prevEl: ".custom-prev",
                nextEl: ".custom-next",
              }}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
            >
              {slides.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <div className="group relative w-full overflow-hidden rounded-[32px]" style={{ aspectRatio: "21/9" }}>
                    <Image
                      src={slide.image || "/placeholder.svg"}
                      alt={slide.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1032B9]/60 via-[#1032B9]/20 to-transparent" />

                    {/* Platform icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform duration-300 hover:scale-110">
                        {slide.platform === "youtube" && <Youtube className="h-8 w-8 text-white" />}
                        {slide.platform === "twitch" && <Twitch className="h-8 w-8 text-white" />}
                        {slide.platform === "instagram" && <Instagram className="h-8 w-8 text-white" />}
                      </div>
                    </div>

                    {/* Title */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-xl font-bold text-white md:text-2xl lg:text-3xl">{slide.title}</h3>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Navigation Buttons */}
            <button className="custom-prev absolute -left-6 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-[#1032B9]/50 p-3 text-white transition-all hover:bg-[#1032B9]/70">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button className="custom-next absolute -right-6 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-[#1032B9]/50 p-3 text-white transition-all hover:bg-[#1032B9]/70">
              <ChevronRight className="h-6 w-6" />
            </button>
            {/* Custom pagination */}
            <div className="custom-pagination absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 transform gap-2" />
          </div>
        )}
      </div>
    </section>
  )
}

