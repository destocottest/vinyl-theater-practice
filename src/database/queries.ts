import db from "@/database/db";
import { User } from "next-auth";
import { generateDisplayName } from "@/lib/utils";

export const getUserByEmail = async (email: string) => {
  return await db.user.findUnique({
    where: { email },
    select: { id: true, password: true },
  });
};

export const getProfileByDisplay = async (display: string) => {
  return await db.profile.findUnique({
    where: { display },
    select: { id: true },
  });
};

export const getProfileBySessionUserId = async (id: string | undefined) => {
  if (!id) return;

  try {
    const profile = await db.profile.findUnique({
      where: { id },
    });
    return profile;
  } catch (error) {
    throw new Error("Profile does not exist for this user");
  }
};

export const createProfileFromOAuthUser = async (user: User) => {
  const profile = await getProfileBySessionUserId(user.id);
  if (profile) return;

  let display = generateDisplayName(user.name);

  let isDisplayTaken = Boolean(await getProfileByDisplay(display));
  while (isDisplayTaken) {
    const randomTwoNumbers = Math.floor(Math.random() * 90) + 10;
    display += randomTwoNumbers;
    isDisplayTaken = Boolean(await getProfileByDisplay(display));
  }

  await db.profile.create({
    data: {
      id: user.id,
      display,
      image: user.image,
    },
  });
};
