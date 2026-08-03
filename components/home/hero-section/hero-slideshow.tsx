"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const images = [
  "/hero-image-1.jpg",
  "/hero-image-2.jpg",
  "/hero-image-3.jpg",
  "/hero-image-4.jpg",
  "/hero-image-5.jpg",
];

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="relative mx-auto h-80 w-full max-w-130 sm:h-105 lg:h-130"
    >
      {/* background glow */}
      <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl" />

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 0.92, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 1.05, rotate: 3 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <div className="relative h-full w-full overflow-hidden rounded-[2rem] border bg-card shadow-2xl">
            <Image
              src={images[current]}
              alt="Adventure"
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 520px"
              className="object-cover"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* indicators */}
      <div className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all ${
              current === index
                ? "w-8 bg-primary"
                : "w-2 bg-muted-foreground/40"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
