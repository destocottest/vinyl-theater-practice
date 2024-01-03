import db from "@/database/db";

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
  if (!id) throw new Error("Profile does not exist for this user");

  try {
    const profile = await db.profile.findUnique({
      where: { id },
    });
    return profile;
  } catch (error) {
    throw new Error("Profile does not exist for this user");
  }
};
