"use client";

import { useEffect, useState } from "react";
import type { User } from "@/types/user";
import { fetchAllUsers } from "@/lib/api/admin";
import { UsersTable } from "../_components/users-table";

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
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Management</h1>

          <p className="text-muted-foreground">
            Manage registered GearUp users and account status.
          </p>
        </div>

        <div className="text-muted-foreground">Loading users...</div>
      </div>
    );
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
