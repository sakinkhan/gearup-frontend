"use client";
import { Eye, EyeOff } from "lucide-react";
import {
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Marker, MarkerContent } from "@/components/ui/marker";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { AuthState, registerAction } from "../_actions/authAction";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const items = [
    { label: "Admin", value: "ADMIN" },
    { label: "Author", value: "AUTHOR" },
    { label: "User", value: "USER" },
  ];

  const [role, setRole] = useState("USER");
  const [state, action, pending] = useActionState<AuthState | false, FormData>(
    registerAction,
    false,
  );
  const router = useRouter();

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message || "Registration Successful");
      router.push("/login");
    }
    if (!state.success) {
      toast.error(state.message || "Registration Failed");
    }
  }, [state, router]);

  return (
    <form action={action} className="space-y-4 w-full max-w-sm">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Sign Up for an account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials below to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" placeholder="John Doe" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>

              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Type your password"
                  className="pr-10"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>

              <div className="relative">
                <Input
                  id="confirm-password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-type your password"
                  className="pr-10"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="provider">Provider</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
          <Button variant="outline" className="w-full">
            Sign Up with Google
          </Button>
          <Marker variant="separator" className="mt-5">
            <MarkerContent>Already have an account?</MarkerContent>
          </Marker>
          <CardAction className="mx-auto">
            <Button variant="link">
              <Link href="/auth/login">Login</Link>
            </Button>
          </CardAction>
        </CardFooter>
      </Card>
    </form>
  );
};

export default RegisterForm;
