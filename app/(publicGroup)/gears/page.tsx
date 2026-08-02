import { GearsExplorer } from "@/components/gears/gears-explorer";

export const metadata = {
  title: "Browse Gears | GearUp",
  description: "Find and rent sports & outdoor gear near you.",
};

export default function GearsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Browse Gears</h1>
        <p className="text-sm text-muted-foreground">
          Find the right gear for your next adventure.
        </p>
      </div>
      <GearsExplorer />
    </div>
  );
}