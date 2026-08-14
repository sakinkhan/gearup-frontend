import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function GearCardSkeleton() {
  return (
    <Card className="overflow-hidden pt-0">
      <Skeleton className="aspect-4/3 w-full rounded-none" />
      <CardHeader className="gap-2 px-4">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-4 w-3/4" />
      </CardHeader>
      <CardContent className="px-4">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="mt-2 h-3 w-2/3" />
      </CardContent>
      <CardFooter className="px-4 pb-4">
        <Skeleton className="h-5 w-16" />
      </CardFooter>
    </Card>
  );
}
