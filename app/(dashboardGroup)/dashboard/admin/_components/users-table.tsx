"use client";

import { useMemo, useState } from "react";
import type { User } from "@/types/user";
import { updateUserStatus } from "@/lib/api/admin";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type UsersTableProps = {
  initialUsers: User[];
};

const ITEMS_PER_PAGE = 8;

export function UsersTable({ initialUsers }: UsersTableProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return users;

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query) ||
        user.status.toLowerCase().includes(query),
    );
  }, [users, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / ITEMS_PER_PAGE),
  );

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredUsers.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredUsers, currentPage]);

  function handleSearch(value: string) {
    setSearch(value);
    setCurrentPage(1);
  }

  const formatLabel = (value: string) =>
    value.charAt(0) + value.slice(1).toLowerCase();

  async function handleStatusChange() {
    if (!selectedUser) return;

    const newStatus = selectedUser.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";

    try {
      setIsUpdating(true);

      const updatedUser = await updateUserStatus(selectedUser.id, newStatus);

      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user,
        ),
      );

      setSelectedUser(null);
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error ? error.message : "Failed to update user status",
      );
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <>
      <div className="space-y-4">
        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />

          <Input
            value={search}
            onChange={(event) => handleSearch(event.target.value)}
            placeholder="Search users..."
            className="pl-9"
          />
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="size-8">
                          <AvatarImage
                            src={user.image || undefined}
                            alt={user.name}
                          />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((name) => name[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>

                        <span className="font-medium">{user.name}</span>
                      </div>
                    </TableCell>

                    <TableCell>{user.email}</TableCell>

                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          user.role === "ADMIN"
                            ? "border-purple-500 text-purple-600 dark:text-purple-400"
                            : user.role === "PROVIDER"
                              ? "border-blue-500 text-blue-600 dark:text-blue-400"
                              : "border-green-500 text-green-600 dark:text-green-400"
                        }
                      >
                        {formatLabel(user.role)}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={
                          user.status === "ACTIVE" ? "default" : "destructive"
                        }
                      >
                        {formatLabel(user.status)}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>

                    <TableCell className="text-right">
                      {user.role === "ADMIN" ? (
                        <Button
                          className="text-muted-foreground text-sm"
                          disabled
                          variant="outline"
                        >
                          Protected
                        </Button>
                      ) : (
                        <Button
                          variant={
                            user.status === "ACTIVE" ? "destructive" : "default"
                          }
                          size="sm"
                          onClick={() => setSelectedUser(user)}
                        >
                          {user.status === "ACTIVE" ? "Suspend" : "Activate"}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-sm">
            Showing{" "}
            {filteredUsers.length === 0
              ? 0
              : (currentPage - 1) * ITEMS_PER_PAGE + 1}{" "}
            to {Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length)} of{" "}
            {filteredUsers.length} users
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
            >
              <ChevronLeft />
            </Button>

            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>

            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((page) => page + 1)}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>

      {/* Confirmation dialog */}
      <AlertDialog
        open={!!selectedUser}
        onOpenChange={(open) => {
          if (!open && !isUpdating) {
            setSelectedUser(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {selectedUser?.status === "ACTIVE"
                ? "Suspend this user?"
                : "Activate this user?"}
            </AlertDialogTitle>

            <AlertDialogDescription>
              {selectedUser?.status === "ACTIVE"
                ? `${selectedUser.name} will no longer be able to use their GearUp account until activated again.`
                : `${selectedUser?.name} will be able to use their GearUp account again.`}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isUpdating}>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={handleStatusChange}
              disabled={isUpdating}
              className={
                selectedUser?.status === "ACTIVE"
                  ? "bg-destructive! text-white! hover:bg-destructive/80! hover:text-black!"
                  : "bg-primary hover:bg-green-800! hover:text-white!"
              }
            >
              {isUpdating
                ? "Updating..."
                : selectedUser?.status === "ACTIVE"
                  ? "Suspend User"
                  : "Activate User"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
