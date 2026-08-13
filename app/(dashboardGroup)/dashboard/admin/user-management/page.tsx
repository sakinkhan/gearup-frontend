"use client";

import { useEffect, useState } from "react";
import type { User } from "@/types/user";
import { fetchAllUsers } from "@/lib/api/admin";
import { UsersTable } from "../_components/users-table";
import { Skeleton } from "@/components/ui/skeleton";

function UserManagementSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-52" />
        <Skeleton className="h-4 w-80" />
      </div>

      {/* Users table */}
      <div className="rounded-xl border bg-card">
        {/* Table header */}
        <div className="flex items-center justify-between border-b p-6">
          <div className="space-y-2">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-56" />
          </div>

          <Skeleton className="h-9 w-28" />
        </div>

        {/* Table rows */}
        <div className="divide-y">
          {[1, 2, 3, 4, 5, 6, 7].map((row) => (
            <div key={row} className="flex items-center gap-4 p-4">
              {/* Avatar */}
              <Skeleton className="size-10 shrink-0 rounded-full" />

              {/* User info */}
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>

              {/* Role */}
              <Skeleton className="h-6 w-20 rounded-full" />

              {/* Status */}
              <Skeleton className="h-6 w-20 rounded-full" />

              {/* Action */}
              <Skeleton className="h-9 w-9 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AdminUserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        setError("");

        const data = await fetchAllUsers();
        setUsers(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to load users",
        );
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  if (loading) {
    return <UserManagementSkeleton />;
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Management</h1>

          <p className="text-muted-foreground">
            Manage registered GearUp users and account status.
          </p>
        </div>

        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">User Management</h1>

        <p className="text-muted-foreground">
          Manage registered GearUp users and account status.
        </p>
      </div>

      <UsersTable initialUsers={users} />
    </div>
  );
}
