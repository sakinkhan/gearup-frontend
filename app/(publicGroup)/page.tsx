import HeroSection from "@/components/home/hero-section/hero-section";
import GlobalLoading from "../loading";
import FeaturedSection from "@/components/home/featured-section/featured-section";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <FeaturedSection />
    </div>
  );
}
