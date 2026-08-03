"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCurrentUser, useUpdateProfile } from "@/hooks/useUser";
import {
  updateProfileSchema,
  UpdateProfileFormValues,
} from "@/lib/validations/profile";
import { Button } from "@/components/ui/button";

function getInitials(name?: string) {
  if (!name) return "?";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function roleBadgeClasses(role?: string) {
  switch (role?.toUpperCase()) {
    case "ADMIN":
      return "bg-primary/10 text-primary";
    case "PROVIDER":
      return "bg-secondary text-secondary-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
}

function statusBadgeClasses(status?: string) {
  switch (status?.toUpperCase()) {
    case "ACTIVE":
      return "bg-primary/10 text-primary";
    case "SUSPENDED":
    case "BLOCKED":
      return "bg-destructive/10 text-destructive";
    default:
      return "bg-muted text-muted-foreground";
  }
}

function ProfileSkeleton() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="animate-pulse overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        {/* Header */}
        <div className="h-26 bg-muted" />

        <div className="px-8 pb-8">
          <div className="-mt-12 flex items-end justify-between">
            <div className="h-24 w-24 rounded-full border-4 border-card bg-muted" />
            <div className="mt-14 h-9 w-28 rounded-lg bg-muted" />
          </div>

          {/* Name / badges / email */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-5 w-32 rounded bg-muted" />
              <div className="h-5 w-16 rounded-full bg-muted" />
              <div className="h-5 w-16 rounded-full bg-muted" />
            </div>
            <div className="h-4 w-44 rounded bg-muted" />
          </div>

          {/* Info grid */}
          <div className="mt-6 grid grid-cols-1 gap-4 border-t border-border pt-6 sm:grid-cols-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 w-16 rounded bg-muted" />
                <div className="h-4 w-32 rounded bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { data: user, isLoading, isError, error, refetch } = useCurrentUser();
  const updateProfile = useUpdateProfile();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { name: "", phone: "", address: "" },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name ?? "",
        phone: user.phone ?? "",
        address: user.address ?? "",
      });
    }
  }, [user, reset]);

  const onSubmit = (values: UpdateProfileFormValues) => {
    updateProfile.mutate(
      {
        name: values.name,
        phone: values.phone || undefined,
        address: values.address || undefined,
      },
      {
        onSuccess: () => setIsEditing(false),
      },
    );
  };

  const handleCancel = () => {
    if (user) {
      reset({
        name: user.name ?? "",
        phone: user.phone ?? "",
        address: user.address ?? "",
      });
    }
    setIsEditing(false);
  };

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <div className="rounded-2xl border border-destructive/20 bg-destructive/10 p-8 text-center">
          <p className="font-medium text-destructive">
            Couldn&apos;t load your profile
          </p>
          <p className="mt-1 text-sm text-destructive/80">
            {error instanceof Error ? error.message : "Something went wrong."}
          </p>
          <Button
            onClick={() => refetch()}
            className="mt-4 bg-destructive text-sm font-medium text-destructive-foreground hover:bg-destructive/90"
          >
            Try again
          </Button>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm">
        {/* Header */}
        <div className="bg-linear-to-r from-primary to-primary/70 px-8 pb-16 pt-8">
          <h1 className="text-xl font-semibold text-primary-foreground">
            My Profile
          </h1>
        </div>

        <div className="px-8 pb-8">
          {/* Avatar */}
          <div className="-mt-12 flex items-end justify-between">
            <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-card bg-primary text-2xl font-semibold text-primary-foreground shadow-md">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              ) : (
                getInitials(user.name || user.email)
              )}
            </div>

            {!isEditing && (
              <Button
                onClick={() => setIsEditing(true)}
                className="mt-14 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                Edit Profile
              </Button>
            )}
          </div>

          {/* Name / role / status / email (always visible) */}
          <div className="mt-4">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold text-foreground">
                {user.name}
              </h2>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${roleBadgeClasses(
                  user.role,
                )}`}
              >
                {user.role?.toLowerCase()}
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusBadgeClasses(
                  user.status,
                )}`}
              >
                {user.status?.toLowerCase()}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>

          {/* View mode */}
          {!isEditing && (
            <dl className="mt-6 grid grid-cols-1 gap-4 border-t border-border pt-6 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Phone
                </dt>
                <dd className="mt-1 text-sm text-foreground">
                  {user.phone || "Not set"}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Address
                </dt>
                <dd className="mt-1 text-sm text-foreground">
                  {user.address || "Not set"}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Member since
                </dt>
                <dd className="mt-1 text-sm text-foreground">
                  {new Date(user.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </dd>
              </div>
            </dl>
          )}

          {/* Edit mode */}
          {isEditing && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-6 space-y-4 border-t border-border pt-6"
              noValidate
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground"
                >
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name")}
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-foreground"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-foreground"
                >
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  {...register("address")}
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
                />
                {errors.address && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={!isDirty || updateProfile.isPending}
                  className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {updateProfile.isPending ? "Saving..." : "Save changes"}
                </Button>
                <Button
                  onClick={handleCancel}
                  disabled={updateProfile.isPending}
                  className="font-medium bg-accent text-foreground hover:bg-accent-foreground hover:text-accent"
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
