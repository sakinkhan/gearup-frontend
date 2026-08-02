export function GearSpecs({
  gear,
}: {
  gear: {
    brand: string;
    condition: string;
    stock: number;
    availableStock: number;
  };
}) {
  const specs = {
    Brand: gear.brand,
    Condition: gear.condition,
    "Total Stock": gear.stock,
    "Available Now": gear.availableStock,
  };

  return (
    <div className="rounded-lg border p-4">
      <h2 className="mb-3 font-semibold">Specifications</h2>
      <dl className="grid grid-cols-2 gap-y-2 text-sm">
        {Object.entries(specs).map(([key, value]) => (
          <div key={key} className="contents">
            <dt className="text-muted-foreground">{key}</dt>
            <dd className="font-medium">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
