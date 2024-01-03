"use server";
import { signupSchema, signupSchemaType } from "@/schemas";
import * as bcrypt from "bcryptjs";
import db from "@/lib/db";

export const signupAction = async (values: signupSchemaType) => {
  const parsed = signupSchema.safeParse(values);

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    const { username, email, password } = parsed.data;
    const isEmailTaken = await db.user.findUnique({
      where: { email },
    });
    if (isEmailTaken) {
      return { error: "Email is already in use." };
    }

    const isUsernameTaken = await db.user.findUnique({
      where: { name: username },
    });
    if (isUsernameTaken) {
      return { error: "Username is already taken." };
    }

    const hashed = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        email,
        name: username,
        password: hashed,
      },
    });
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Oops! Something went wrong..." };
  }
};
