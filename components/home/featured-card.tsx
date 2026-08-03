"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Gear } from "@/types/gear";

type Props = {
  gear: Gear;
  index: number;
};

export default function FeaturedCard({ gear, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: index * 0.12,
      }}
      whileHover={{
        y: -12,
        scale: 1.03,
      }}
      className="relative w-65 sm:w-72 rounded-2xl border bg-card p-2 shadow-xl"
      style={{ rotate: `${index === 1 ? 0 : (index - 1) * 5}deg` }}
    >
      <button className="absolute right-5 top-5">
        <Heart className="size-5 text-muted-foreground" />
      </button>

      <div className="relative h-52">
        <Image
          fill
          src={gear.image || "/placeholder.png"}
          alt={gear.name}
          className="object-contain rounded-xl"
          sizes="288px"
        />
      </div>

      <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
        {gear.condition}
      </span>

      <h3 className="mt-4 text-2xl font-heading font-bold">{gear.name}</h3>

      <p className="text-muted-foreground">
        {typeof gear.categoryName === "object"
          ? gear.categoryName
          : gear.categoryName}
      </p>

      <div className="mt-5 flex items-center justify-between">
        <div>
          <span className="text-3xl font-bold text-primary">
            ${gear.rentalPricePerDay}
          </span>

          <span className="text-muted-foreground">/day</span>
        </div>
      </div>
    </motion.div>
  );
}
