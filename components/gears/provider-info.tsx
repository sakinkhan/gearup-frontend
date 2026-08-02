import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gear } from "@/types/gear";

export function ProviderInfo({ provider }: { provider: Gear["provider"] }) {
    
  return (
    <Card>
      <CardHeader>
        <CardTitle>Provided by</CardTitle>
      </CardHeader>

      <CardContent className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={provider.image ?? ""} />
          <AvatarFallback>
            {provider.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div>
          <p className="font-semibold">{provider.name}</p>
          <p className="text-sm text-muted-foreground">{provider.email}</p>

          {provider.phone && (
            <p className="text-sm text-muted-foreground">{provider.phone}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
