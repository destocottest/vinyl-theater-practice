import * as z from "zod";

const validateDisplayName = (name: string) => {
  const regex = /^[a-z0-9]+$/;
  return regex.test(name);
};

export const signupSchema = z
  .object({
    display: z
      .string()
      .min(6, "Display name must contain at least 6 characters"),
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
  })
  .refine(({ display }) => validateDisplayName(display), {
    message: "Display name must include only letters (a-z) and numbers (0-9)",
    path: ["display"],
  });

export type signupSchemaType = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Invalid password"),
});

export type signinSchemaType = z.infer<typeof signinSchema>;
