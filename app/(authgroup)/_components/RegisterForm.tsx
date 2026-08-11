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

import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { AuthState, registerAction } from "../_actions/authAction";

const RegisterForm = () => {
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");
  const defaultRole = roleParam === "PROVIDER" ? "PROVIDER" : "CUSTOMER";

  const [role, setRole] = useState(defaultRole);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [state, action, pending] = useActionState<AuthState | false, FormData>(
    registerAction,
    false,
  );

  const router = useRouter();

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Registration Successful");
      router.push("/auth/login");
    } else {
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
            Enter your details below to create a new account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-6">
            {/* Name */}
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Your full name"
                required
              />
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="email@example.com"
                required
              />
            </div>

            {/* Phone */}
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+61 400 000 000"
              />
            </div>

            {/* Address */}
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                type="text"
                placeholder="Your address"
              />
            </div>

            {/* Image */}
            <div className="grid gap-2">
              <Label htmlFor="image">Profile Image URL</Label>
              <Input
                id="image"
                name="image"
                type="url"
                placeholder="https://example.com/profile.jpg"
              />
            </div>

            {/* Password */}
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
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>

              <div className="relative">
                <Input
                  id="confirmPassword"
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
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Role */}
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>

              <Select value={role} onValueChange={setRole}>
                <SelectTrigger id="role" className="w-full">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="CUSTOMER">Customer</SelectItem>
                    <SelectItem value="PROVIDER">Provider</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <input type="hidden" name="role" value={role} />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Creating Account..." : "Sign Up"}
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
