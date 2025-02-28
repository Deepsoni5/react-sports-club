"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

// This would be replaced with actual 3D icons later
const icons = [
  "https://cdn3d.iconscout.com/3d/premium/thumb/cricket-bat-and-ball-5199058-4345941.png",
  "https://cdn3d.iconscout.com/3d/premium/thumb/football-4997800-4160365.png",
  "https://cdn3d.iconscout.com/3d/premium/thumb/basketball-4997799-4160364.png",
  "https://cdn3d.iconscout.com/3d/premium/thumb/tennis-4997804-4160369.png",
  "https://cdn3d.iconscout.com/3d/premium/thumb/baseball-4997798-4160363.png",
  "https://cdn3d.iconscout.com/3d/premium/thumb/volleyball-4997805-4160370.png",
  // Duplicate for continuous loop
  "https://cdn3d.iconscout.com/3d/premium/thumb/cricket-bat-and-ball-5199058-4345941.png",
  "https://cdn3d.iconscout.com/3d/premium/thumb/football-4997800-4160365.png",
].map((url) => ({ url }))

export function IconSlider() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (!scrollElement) return

    const animate = () => {
      if (isHovered || !scrollElement) return
      scrollElement.scrollLeft += 1
      if (scrollElement.scrollLeft >= (scrollElement.scrollWidth - scrollElement.clientWidth) / 2) {
        scrollElement.scrollLeft = 0
      }
    }

    const intervalId = setInterval(animate, 30)
    return () => clearInterval(intervalId)
  }, [isHovered])

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-black via-[#1032B9]/20 to-black py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex w-full gap-8 overflow-x-hidden scroll-smooth md:gap-16"
        >
          {icons.map((icon, index) => (
            <div
              key={index}
              className="relative h-16 w-16 flex-shrink-0 transform transition-transform duration-300 hover:scale-110 md:h-20 md:w-20"
            >
              <Image
                src={icon.url || "/placeholder.svg"}
                alt={`Sport Icon ${index + 1}`}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

