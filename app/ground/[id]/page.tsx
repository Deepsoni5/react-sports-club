"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Calendar,
  X,
  Plus,
  Minus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

const GROUND_IMAGES = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4ji1dn4AopYdeAmjY77v18yLZtkXL6.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4ji1dn4AopYdeAmjY77v18yLZtkXL6.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4ji1dn4AopYdeAmjY77v18yLZtkXL6.png",
];

const AVAILABLE_SPORTS = [
  {
    id: "cricket",
    name: "Cricket",
    icon: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "football",
    name: "Football",
    icon: "/placeholder.svg?height=40&width=40",
  },
];

const TIME_SLOTS = [
  "6 AM - 8 AM",
  "8 AM - 10 AM",
  "10 AM - 12 PM",
  "2 PM - 4 PM",
  "4 PM - 6 PM",
  "6 PM - 8 PM",
];

export default function GroundPage() {
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [duration, setDuration] = useState(2);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % GROUND_IMAGES.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + GROUND_IMAGES.length) % GROUND_IMAGES.length
    );
  };

  const handleSportSelect = (sportId: string) => {
    if (!selectedSports.includes(sportId)) {
      setSelectedSports([...selectedSports, sportId]);
    }
  };

  const handleRemoveSport = (sportId: string) => {
    setSelectedSports(selectedSports.filter((id) => id !== sportId));
  };

  const handleDurationChange = (increment: boolean) => {
    setDuration((prev) => {
      const newValue = increment ? prev + 1 : prev - 1;
      return Math.min(Math.max(1, newValue), 8); // Limit between 1 and 8 hours
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextImage();
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, [nextImage]); // Added nextImage to dependencies

  return (
    <div className="min-h-screen bg-[#000314]">
      <SiteHeader />
      <main className="container mx-auto px-4 pt-20 pb-12">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Ground Name and Location */}
            <div>
              <h1 className="text-2xl font-bold text-white md:text-3xl">
                Ground name
              </h1>
              <p className="mt-2 flex items-center text-gray-400">
                <span className="mr-2">⭐</span>
                4.5 (50 ratings) Rate now
              </p>
            </div>

            {/* Sports Available */}
            <div>
              <h2 className="mb-4 text-lg font-semibold text-white">
                Sports available
              </h2>
              <div className="flex gap-4">
                {AVAILABLE_SPORTS.map((sport) => (
                  <div
                    key={sport.id}
                    className="flex h-16 w-16 items-center justify-center rounded-lg bg-[#1032B9]/20 p-3"
                  >
                    <Image
                      src={sport.icon || "/placeholder.svg"}
                      alt={sport.name}
                      width={40}
                      height={40}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Facilities */}
            <div>
              <h2 className="mb-4 text-lg font-semibold text-white">
                Facilities
              </h2>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 rounded-full bg-[#1032B9]/20 px-4 py-2 text-white">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  Washrooms
                </div>
                <div className="flex items-center gap-2 rounded-full bg-[#1032B9]/20 px-4 py-2 text-white">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  Parking
                </div>
                <div className="flex items-center gap-2 rounded-full bg-[#1032B9]/20 px-4 py-2 text-white">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  Shoes
                </div>
              </div>
            </div>

            {/* About Venue */}
            <div>
              <h2 className="mb-4 text-lg font-semibold text-white">
                About venue
              </h2>
              <div className="flex flex-wrap gap-4">
                <div className="rounded-lg bg-[#1032B9]/20 px-4 py-2 text-white">
                  • condition
                </div>
                <div className="rounded-lg bg-[#1032B9]/20 px-4 py-2 text-white">
                  • condition
                </div>
                <div className="rounded-lg bg-[#1032B9]/20 px-4 py-2 text-white">
                  • condition
                </div>
              </div>
            </div>

            {/* More Details */}
            <div>
              <h2 className="mb-4 text-lg font-semibold text-white">
                More about (Ground name here)
              </h2>
              <ul className="list-inside list-disc space-y-2 text-gray-400">
                <li>Points here</li>
                <li>Points here</li>
                <li>Points here</li>
                <li>Points here</li>
              </ul>
              <p className="mt-4 text-gray-400">
                Invite your favorite people and enjoy the game together!👋
                <br />
                Share now 📱 🎮 📞
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Image Carousel */}
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
              <Image
                src={GROUND_IMAGES[currentImage] || "/placeholder.svg"}
                alt="Ground"
                fill
                className="object-cover"
              />
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/70"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/70"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {GROUND_IMAGES.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "h-1.5 w-1.5 rounded-full transition-all",
                      currentImage === index ? "bg-white" : "bg-white/50"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Booking Panel */}
            <div className="rounded-2xl bg-[#1032B9]/10 p-6 backdrop-blur-sm">
              <div className="mb-6 flex justify-between">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10"
                >
                  Monthly/Yearly
                </Button>
                <Button className="bg-white text-[#1032B9] hover:bg-white/90">
                  Book now
                </Button>
              </div>

              {/* Booking Form */}
              <div className="space-y-4">
                {/* Sports Selection */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400 mr-2">Sports</span>
                    <Select onValueChange={handleSportSelect}>
                      <SelectTrigger className="w-[140px] bg-[#1032B9]/20 border-0 text-white">
                        <SelectValue placeholder="Select sport" />
                      </SelectTrigger>
                      <SelectContent>
                        {AVAILABLE_SPORTS.map((sport) => (
                          <SelectItem key={sport.id} value={sport.id}>
                            {sport.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-end">
                    {selectedSports.map((sportId) => {
                      const sport = AVAILABLE_SPORTS.find(
                        (s) => s.id === sportId
                      );
                      return sport ? (
                        <div key={sport.id} className="flex items-center gap-2">
                          <span className="rounded-full bg-[#1032B9]/20 px-4 py-1 text-sm text-white">
                            {sport.name}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-white"
                            onClick={() => handleRemoveSport(sport.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>

                {/* Time Slot */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400 mr-3">Time</span>
                    <Select onValueChange={setSelectedTimeSlot}>
                      <SelectTrigger className="w-[140px] bg-[#1032B9]/20 border-0 text-white">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_SLOTS.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {selectedTimeSlot && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-white" />
                      <span className="rounded-full bg-[#1032B9]/20 px-4 py-1 text-sm text-white">
                        {selectedTimeSlot}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-white"
                        onClick={() => setSelectedTimeSlot(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400 mr-4">Date</span>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-auto bg-[#1032B9]/20 border-0 text-white"
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {selectedDate
                            ? format(selectedDate, "PPP")
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  {selectedDate && (
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-[#1032B9]/20 px-4 py-1 text-sm text-white">
                        {format(selectedDate, "dd-MM-yyyy")}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-white"
                        onClick={() => setSelectedDate(undefined)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Duration */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Duration</span>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 rounded-full bg-[#1032B9]/20 px-4 py-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-white hover:bg-white/10"
                        onClick={() => handleDurationChange(false)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-sm text-white">{duration} hrs</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-white hover:bg-white/10"
                        onClick={() => handleDurationChange(true)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <Button className="mt-4 w-full bg-[#1032B9] text-white hover:bg-[#1032B9]/90">
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
