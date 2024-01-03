"use server";
import { signupSchema, signupSchemaType } from "@/schemas";
import * as bcrypt from "bcryptjs";
import db from "@/database/db";
import { getProfileByDisplay, getUserByEmail } from "@/database/queries/user";

export const signupAction = async (values: signupSchemaType) => {
  const parsed = signupSchema.safeParse(values);

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    const { display, email, password } = parsed.data;

    const user = await getUserByEmail(email);
    if (user) {
      return { error: "Email is already in use." };
    }

    const profile = await getProfileByDisplay(display);
    if (profile) {
      return { error: "Display name is already taken." };
    }

    const hashed = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        email,
        password: hashed,
        Profile: {
          create: [
            {
              display,
            },
          ],
        },
      },
    });

    return { success: true };
  } catch (e) {
    return { error: "Oops! Something went wrong..." };
  }
};
