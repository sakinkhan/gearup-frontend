import Image from "next/image";

const GearUpLogo = () => {
  return (
    <div className="flex items-center space-x-2">
      <Image src="/logo-icon.png" alt="GearUp Logo" width={40} height={40} />
      <p className="text-[#528f2a] font-extrabold text-xl">
        <span className="text-foreground">Gear</span>Up
      </p>
    </div>
  );
};

export default GearUpLogo;
