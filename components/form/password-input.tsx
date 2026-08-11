"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function PasswordInput({ className, ...props }: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        {...props}
        type={show ? "text" : "password"}
        className={`${className} pr-10`}
      />

      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
      >
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}
