"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const steps = ["Ready", "Set", "Go", "Play", "Win", "Celebrate", "Repeat"]

export function ReadySetGo() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 2000) // Change step every 2 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative py-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#1032B9] to-[#EF3DF6] opacity-20" />
      <div className="container relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">
          Ready <span className="text-[#EF3DF6]">•</span> Set <span className="text-[#EF3DF6]">•</span> Go
        </h2>
        <div className="flex justify-center items-center space-x-2 md:space-x-4">
          {steps.map((step, index) => (
            <div key={step} className="flex flex-col items-center">
              <motion.div
                className={`w-4 h-4 md:w-6 md:h-6 rounded-full ${index <= activeStep ? "bg-[#EF3DF6]" : "bg-gray-600"}`}
                initial={false}
                animate={{
                  scale: index === activeStep ? 1.2 : 1,
                  transition: { duration: 0.3 },
                }}
              />
              <div className="h-1 w-8 md:w-12 bg-gray-600 mt-2" />
              <p className="text-xs md:text-sm text-white mt-2">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

