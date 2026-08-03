import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  phone: z
    .string()
    .regex(/^[0-9+\-\s()]*$/, "Enter a valid phone number")
    .optional()
    .or(z.literal("")),
  address: z
    .string()
    .max(255, "Address is too long")
    .optional()
    .or(z.literal("")),
});

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;
