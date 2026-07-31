"use client";
import React, { useActionState, useEffect, useState } from "react";
import { AuthState, loginAction } from "../_actions/authAction";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Marker, MarkerContent } from "@/components/ui/marker";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [state, action, pending] = useActionState<AuthState | false, FormData>(
    loginAction,
    false,
  );
  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message || "Login Successful");
    }
    if (!state.success) {
      toast.error(state.message || "Login Failed");
    }
  }, [state]);
  return (
    <div className="w-full max-w-sm">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Login to your account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials below to login to your account
          </CardDescription>
        </CardHeader>
        <form action={action}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>

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
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2 mt-8">
            <Button type="submit" className="w-full">
              {pending ? "Logging in..." : "Login"}
            </Button>
            <Marker variant="separator" className="mt-5">
              <MarkerContent>Don't have an account?</MarkerContent>
            </Marker>
            <CardAction className="mx-auto">
              <Button variant="link">
                <Link href="/auth/register">Sign Up</Link>
              </Button>
            </CardAction>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginForm;
