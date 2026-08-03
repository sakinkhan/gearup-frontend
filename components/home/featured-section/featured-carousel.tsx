"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Gear } from "@/types/gear";
import FeaturedCard from "./featured-card";

type FeaturedCarouselProps = {
  gears: Gear[];
};

export default function FeaturedCarousel({ gears }: FeaturedCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev === gears.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(timer);
  }, [gears.length]);

  const positions = [
    "left-0 bottom-8 rotate-[-8deg] z-10",
    "left-1/2 top-0 -translate-x-1/2 scale-110 z-30",
    "right-0 bottom-8 rotate-[8deg] z-10",
  ];

  return (
    <>
      {/* Desktop Fan Layout */}
      <div
        className="
          relative
          hidden
          h-[520px]
          w-full
          max-w-3xl
          overflow-visible
          md:block
        "
      >
        {gears.slice(0, 3).map((gear, i) => (
          <motion.div
            key={gear.id}
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
            className={`absolute ${positions[i]}`}
          >
            <FeaturedCard gear={gear} index={i} />
          </motion.div>
        ))}
      </div>

      {/* Mobile Single Card Carousel */}
      <div
        className="
          flex
          h-105
          items-center
          justify-center
          overflow-hidden
          md:hidden
        "
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={gears[activeIndex].id}
            initial={{
              opacity: 0,
              x: 60,
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: [0, -12, 0],
            }}
            exit={{
              opacity: 0,
              x: -60,
            }}
            transition={{
              duration: 0.5,
              y: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <FeaturedCard gear={gears[activeIndex]} index={0} />
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
