import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

import FeaturedCarousel from "./featured-carousel";
import { Gear } from "@/types/gear";
import { Button } from "../ui/button";
import HeroSlideshow from "./hero-slideshow";

async function getGears(): Promise<Gear[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/gears`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch gears");
  }

  const data = await res.json();

  return data.data;
}

export default async function HeroSection() {
  const gears = await getGears();

  return (
    <section className="container mx-auto max-w-6xl px-6 py-12 sm:py-16 lg:grid lg:min-h-175 lg:grid-cols-2 lg:items-center lg:gap-12">
      {/* Left Content */}
      <div className="space-y-6 text-center lg:text-left">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
          <Sparkles className="size-4" />
          Premium Gear Rental Platform
        </div>

        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Rent the gear you need.
          <span className="block text-primary">Adventure starts here.</span>
        </h1>

        <p className="mx-auto max-w-xl text-base text-muted-foreground sm:text-lg lg:mx-0">
          Access quality sports, camping, and outdoor equipment without the
          hassle of buying expensive gear. Find, rent, and enjoy professional
          equipment whenever you need it.
        </p>

        {/* Buttons */}
        <div className="flex lg:flex-col justify-center gap-4 sm:flex-row lg:justify-start">
          <Button className="flex items-center justify-center gap-2 px-6 py-3 font-semibold">
            Explore Gears
            <ArrowRight className="size-5" />
          </Button>

          <Button
            variant="outline"
            className="bg-accent px-6 py-3 font-semibold"
          >
            Become a Provider
          </Button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 pt-4 lg:justify-start">
          <div className="text-center lg:text-left">
            <p className="text-2xl font-bold sm:text-3xl">500+</p>
            <p className="text-sm text-muted-foreground">Available Gears</p>
          </div>

          <div className="text-center lg:text-left">
            <p className="text-2xl font-bold sm:text-3xl">24/7</p>
            <p className="text-sm text-muted-foreground">Support</p>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="size-8 text-primary" />

            <div>
              <p className="font-semibold">Secure</p>
              <p className="text-sm text-muted-foreground">Rental Process</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="mt-12 flex justify-center lg:mt-0">
        <HeroSlideshow />
      </div>
    </section>
  );
}
