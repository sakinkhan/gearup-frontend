import { z } from "zod";

export const updateProfileSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be 100 characters or less"),

    phone: z
      .string()
      .trim()
      .regex(
        /^\+?[0-9]+$/,
        "Phone number can only contain numbers and an optional +",
      )
      .max(30, "Phone number must be 30 characters or less")
      .optional()
      .or(z.literal("")),

    address: z
      .string()
      .trim()
      .max(255, "Address must be 255 characters or less")
      .optional()
      .or(z.literal("")),
    image: z.string().url("Invalid image URL").optional().or(z.literal("")),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .optional()
      .or(z.literal("")),

    confirmPassword: z.string().optional(),
  })
  .refine((data) => !data.password || data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;
