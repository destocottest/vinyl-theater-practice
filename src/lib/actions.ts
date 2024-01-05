"use server";
import { signIn } from "@/lib/auth";
import { signinSchema, signinSchemaType } from "@/schemas";
import { AuthError } from "next-auth";
import { signupSchema, signupSchemaType } from "@/schemas";
import * as bcrypt from "bcryptjs";
import db from "@/database/db";
import { getProfileByDisplay, getUserByEmail } from "@/database/queries";
import { auth } from "@/lib/auth";
import { getAlbumFromDiscogsMasterId } from "@/lib/discogs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

export const addAlbumToProfile = async (masterId: number) => {
  const session = await auth();
  if (!session) return redirect("/signin");

  try {
    const isAlbumAlreadyAdded = await db.profile.findUnique({
      where: {
        id: session.user.id,
        collection: {
          some: { masterId },
        },
      },
    });

    if (isAlbumAlreadyAdded) return { error: "Album already collection" };

    const data = await getAlbumFromDiscogsMasterId(masterId);

    const albumMetaData = {
      title: data.title,
      artist: data.artists[0].name,
      cover: data.images[0].uri,
      year: data.year,
    };

    const isAlbumInDatabase = await db.album.findUnique({
      where: {
        masterId,
      },
    });

    if (isAlbumInDatabase) {
      await db.profile.update({
        where: {
          id: session.user.id,
        },
        data: {
          collection: {
            connect: {
              masterId: isAlbumInDatabase.masterId,
            },
          },
        },
      });
    } else {
      await db.album.create({
        data: {
          masterId,
          ...albumMetaData,
          profile: {
            connect: {
              id: session.user.id,
            },
          },
        },
      });
    }

    revalidatePath("/");
    return { success: "Album added to collection" };
  } catch (error) {
    console.log(error);
    return { error: "Oops! Something went wrong..." };
  }
};
