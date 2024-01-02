import * as z from "zod";

export const signupSchema = z
  .object({
    username: z.string().min(6, "Username must contain at least 6 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must contain at least 6 characters"),
    confirm: z.string().min(6, "Password must contain at least 6 characters"),
  })
  .refine(({ password, confirm }) => password === confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  })
  .refine(({ password, confirm }) => password === confirm, {
    message: "Passwords don't match",
    path: ["password"],
  });

export type signupSchemaType = z.infer<typeof signupSchema>;
