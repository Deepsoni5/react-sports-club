"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const SPORTS = [
  { name: "Badminton", icon: "/badminton.png" },
  { name: "Baseball", icon: "/baseball.png" },
  { name: "Basketball", icon: "/basket ball.png" },
  { name: "Chess", icon: "/chess.png" },
  { name: "Cricket", icon: "/cricket.png" },
  { name: "Football", icon: "/football.png" },
  { name: "Hockey", icon: "/hockey.png" },
  { name: "Swimming", icon: "/swimming.png" },
  { name: "Table Tennis", icon: "/table tennis.png" },
  { name: "Tennis", icon: "/tennis.png" },
] as const;

export function QuickAccess() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let requestId: number;

    const scroll = () => {
      if (!scrollContainer) return;
      scrollContainer.scrollLeft += 1;
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      }
      requestId = requestAnimationFrame(scroll);
    };

    requestId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(requestId);
  }, []);

  return (
    <section className="container py-6 relative -mt-16 md:-mt-24 z-10">
      <Card className="overflow-hidden shadow-lg rounded-xl bg-black/60 relative border-[#1032B9]">
        <CardContent className="p-4 relative h-[120px] flex items-center justify-center">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-hidden items-center whitespace-nowrap"
            style={{ width: "200%" }}
          >
            {[...SPORTS, ...SPORTS].map((sport, index) => (
              <div
                key={`${sport.name}-${index}`}
                className="flex-shrink-0 flex items-center justify-center"
                style={{ width: "150px" }}
              >
                <div className="relative bg-transparent rounded-full p-6 cursor-pointer flex justify-center items-center">
                  <Image
                    src={sport.icon || "/placeholder.svg"}
                    alt={sport.name}
                    width={80}
                    height={80}
                    className="w-auto h-auto transition-transform duration-150 ease-in-out hover:scale-125"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
