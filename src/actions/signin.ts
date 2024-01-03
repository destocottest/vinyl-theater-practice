"use server";
import { signIn } from "@/lib/auth";
import { signinSchema, signinSchemaType } from "@/schemas";
import { AuthError } from "next-auth";

export async function signinAction(values: signinSchemaType) {
  const parsed = signinSchema.safeParse(values);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }
  const { email, password } = parsed.data;

  try {
    await signIn("credentials", { email, password, redirectTo: "/" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "Oops! Something went wrong..." };
      }
    }
    throw error;
  }
}
