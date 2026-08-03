"use client";

import FeaturedCard from "./featured-card";
import { motion } from "framer-motion";
import { Gear } from "@/types/gear";

type FeaturedCarouselProps = {
  gears: Gear[];
};

export default function FeaturedCarousel({ gears }: FeaturedCarouselProps) {
  return (
    <motion.div
      animate={{
        y: [0, -12, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="relative flex items-end justify-center"
    >
      {gears.map((gear, i) => (
        <FeaturedCard key={gear.id} gear={gear} index={i} />
      ))}
    </motion.div>
  );
}
