"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUserClient, updateCurrentUser } from "@/lib/api/user";
import { UpdateUserPayload, User } from "@/types/user";
import { toast } from "sonner";

export const CURRENT_USER_KEY = ["currentUser"] as const;

export function useCurrentUser() {
  return useQuery({
    queryKey: CURRENT_USER_KEY,
    queryFn: getCurrentUserClient,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateUserPayload) => updateCurrentUser(payload),
    onSuccess: (updatedUser: User) => {
      queryClient.setQueryData(CURRENT_USER_KEY, updatedUser);
      toast.success("Profile updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update profile");
    },
  });
}
