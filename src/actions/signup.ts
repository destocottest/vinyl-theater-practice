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
    const { display, email, password } = parsed.data;
    const isEmailTaken = await db.user.findUnique({
      where: { email },
    });
    if (isEmailTaken) {
      return { error: "Email is already in use." };
    }

    const isDisplayNameTaken = await db.profile.findUnique({
      where: { display },
    });
    if (isDisplayNameTaken) {
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
  } catch (error) {
    console.log(error);
    return { error: "Oops! Something went wrong..." };
  }
};
