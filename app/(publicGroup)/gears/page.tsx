import React from "react";

const GearsPage = async () => {
  const data = await fetch("http://localhost:5000/api/gears");
  const gears = await data.json();
  console.log(gears);
  return <div>GearsPage</div>;
};

export default GearsPage;
