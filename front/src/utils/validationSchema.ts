import { z } from "zod";

export const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
  repassword: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});
export const recoverPassSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
  repassword: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export const userSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  phoneNumber: z
    .string()
    .min(10, { message: "Must be a valid mobile number" })
    .max(14, { message: "Must be a valid mobile number" }),
  address: z.string(),
  profile_img: z.string(),
});

export const deliveryUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  phoneNumber: z
    .string()
    .min(10, { message: "Must be a valid mobile number" })
    .max(14, { message: "Must be a valid mobile number" }),
  address: z.string(),
  additionalInfo: z.string().optional(),
});
