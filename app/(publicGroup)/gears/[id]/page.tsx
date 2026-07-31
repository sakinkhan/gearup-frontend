import React from "react";

const GearsByIdPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return <div>My Gear: {id}</div>;
};
export default GearsByIdPage;
