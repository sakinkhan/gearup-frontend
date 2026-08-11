import { z } from "zod";

export const updateProfileSchema = z
  .object({
    name: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
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
