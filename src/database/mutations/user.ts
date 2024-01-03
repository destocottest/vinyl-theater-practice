import db from "@/database/db";
import { User } from "next-auth";
import { generateDisplayName } from "@/lib/utils";
import {
  getProfileByDisplay,
  getProfileBySessionUserId,
} from "../queries/user";

export const createProfileFromOAuthUser = async (user: User) => {
  const profile = await getProfileBySessionUserId(user.id);
  if (profile) return;

  let display = generateDisplayName(user.name);

  let isDisplayTaken = Boolean(await getProfileByDisplay(display));
  while (isDisplayTaken) {
    display += Math.floor(Math.random() * Date.now())
      .toString()
      .slice(-2);
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
