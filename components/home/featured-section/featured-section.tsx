import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import FeaturedCarousel from "./featured-carousel";
import { Gear } from "@/types/gear";

async function getFeaturedGears(): Promise<Gear[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/gears`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch featured gears");
  }

  const data = await res.json();

  return data.data;
}

export default async function FeaturedSection() {
  const gears = await getFeaturedGears();

  return (
    <section className="container mx-auto max-w-6xl px-6 py-20">
      {/* Header */}
      <div className="flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
          <Sparkles className="size-4" />
          Featured Gears
        </div>

        <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Explore our popular gears
        </h2>

        <p className="mt-4 max-w-2xl text-muted-foreground">
          Discover high-quality outdoor and sports equipment from trusted
          providers. Rent what you need for your next adventure without the cost
          of ownership.
        </p>

        <Button variant="outline" asChild className="mt-6 bg-primary">
          <Link href="/gears">
            View All Gears
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </div>

      {/* Featured Cards */}
      <div className="relative mt-16 flex justify-center">
        {/* Glow */}
        <div className="absolute inset-0 -z-10 mx-auto h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

        <FeaturedCarousel gears={gears.slice(0, 3)} />
      </div>
    </section>
  );
}
