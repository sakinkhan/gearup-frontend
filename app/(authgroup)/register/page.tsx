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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Sign Up for an account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials below to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
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
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" required />
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
          </form>
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
              <Link href="/login">Login</Link>
            </Button>
          </CardAction>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;
