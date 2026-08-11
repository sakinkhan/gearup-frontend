import { PasswordInput } from "@/components/form/password-input";
import { Button } from "@/components/ui/button";
import { UpdateProfileFormValues } from "@/lib/validations/profile";
import React from "react";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

type ProfileEditFormProps = {
  register: UseFormRegister<UpdateProfileFormValues>;
  errors: FieldErrors<UpdateProfileFormValues>;
  handleSubmit: UseFormHandleSubmit<UpdateProfileFormValues>;
  onSubmit: (values: UpdateProfileFormValues) => void;
  onCancel: () => void;
  isDirty: boolean;
  isPending: boolean;
};

const ProfileEditForm = ({
  register,
  errors,
  handleSubmit,
  onSubmit,
  onCancel,
  isDirty,
  isPending,
}: ProfileEditFormProps) => {
  return (
    <div>
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
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-foreground"
          >
            Profile Image URL
          </label>
          <input
            id="image"
            type="url"
            {...register("image")}
            placeholder="https://example.com/profile.jpg"
            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
          />
          {errors.image && (
            <p className="mt-1 text-xs text-destructive">
              {errors.image.message}
            </p>
          )}
        </div>
        <PasswordInput
          id="password"
          placeholder="Leave blank to keep current password"
          {...register("password")}
          className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
        />

        <PasswordInput
          id="confirmPassword"
          placeholder="Confirm password"
          {...register("confirmPassword")}
          className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
        />

        <div className="flex items-center gap-3 pt-2">
          <Button
            type="submit"
            disabled={!isDirty || isPending}
            className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "Saving..." : "Save changes"}
          </Button>
          <Button
            onClick={onCancel}
            disabled={isPending}
            className="font-medium bg-accent text-foreground hover:bg-accent-foreground hover:text-accent"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditForm;
