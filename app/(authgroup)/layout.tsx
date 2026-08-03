import React from "react";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return <main className="min-h-screen">{children}</main>;
};

export default AuthLayout;
