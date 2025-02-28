"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlayIcon, ChevronLeft, ChevronRight } from "lucide-react";

const sports = [
  {
    name: "Cricket",
    image: "/Cricket_hero.jpg",
  },
  {
    name: "Badminton",
    image: "/Badminton_hero.jpg",
  },
  {
    name: "Basketball",
    image: "/BasketBall_hero.jpg",
  },
  {
    name: "Football",
    image: "/FootBall_hero.jpg",
  },
  {
    name: "Swimming",
    image: "/Swimming_hero.jpg",
  },
];

export function HeroSlider() {
  const [currentSport, setCurrentSport] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSport((prev) => (prev + 1) % sports.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSport = () => {
    setCurrentSport((prev) => (prev + 1) % sports.length);
  };

  const prevSport = () => {
    setCurrentSport((prev) => (prev - 1 + sports.length) % sports.length);
  };

  return (
    <section className="relative h-[85vh] md:h-screen">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={sports[currentSport].image || "/placeholder.svg"}
          alt={`${sports[currentSport].name} Player with Neon Effects`}
          className="h-full w-full object-cover object-center transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative flex h-full items-center">
        <div className="max-w-2xl pt-20">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white transition-opacity duration-300 sm:text-5xl md:text-6xl lg:text-7xl">
            {sports[currentSport].name}
          </h1>
          <div className="flex items-center gap-4">
            <Button
              size="lg"
              className="bg-blue-600 text-base text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50 md:text-lg"
            >
              <PlayIcon className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              Play now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-blue-500 text-base text-blue-500 transition-all duration-300 hover:scale-105 hover:bg-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/50 md:text-lg"
            >
              Learn more
            </Button>
          </div>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="ml-2 rounded-full text-white opacity-75 transition-all duration-300 hover:scale-110 hover:bg-white/20 hover:opacity-100 md:ml-4"
          onClick={prevSport}
        >
          <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
        </Button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 rounded-full text-white opacity-75 transition-all duration-300 hover:scale-110 hover:bg-white/20 hover:opacity-100 md:mr-4"
          onClick={nextSport}
        >
          <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
        </Button>
      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-20 left-1/2 flex -translate-x-1/2 items-center gap-2 md:bottom-28">
        {sports.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 w-1.5 rounded-full transition-all duration-300 md:h-2 md:w-2 ${
              index === currentSport
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
