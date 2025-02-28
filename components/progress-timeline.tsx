"use client"

import { useEffect, useState } from "react"

export function ProgressTimeline() {
  const [activeIndex, setActiveIndex] = useState(0)
  const totalDots = 12

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalDots)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative mx-auto max-w-5xl px-4 md:px-6">
      <div className="relative rounded-xl border border-blue-500/50 bg-black/40 p-6 backdrop-blur-sm">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
        <div className="absolute inset-px rounded-[11px] border border-blue-500/50" />

        {/* Glow Effect */}
        <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-xl" />

        <div className="relative">
          <h3 className="mb-6 text-center text-xl font-semibold tracking-wide text-white md:text-2xl">
            Ready <span className="text-blue-400">•</span> Set <span className="text-blue-400">•</span> Go
          </h3>

          <div className="grid grid-cols-6 gap-2 md:grid-cols-12 md:gap-4">
            {Array.from({ length: totalDots }).map((_, index) => (
              <div key={index} className="group relative aspect-square cursor-pointer">
                <div
                  className={`absolute inset-0 rounded-lg transition-transform duration-300 group-hover:scale-110 ${
                    index <= activeIndex ? "bg-gradient-to-r from-blue-500 to-purple-500" : "bg-white/20"
                  }`}
                />
                <div
                  className={`absolute inset-px rounded-lg bg-black/40 transition-opacity duration-300 ${
                    index <= activeIndex ? "opacity-0" : "opacity-100"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

