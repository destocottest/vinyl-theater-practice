import db from "@/lib/db";

export async function getUserByEmail(email: string) {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function getProfileByUserId(id: string) {
  try {
    const profile = await db.profile.findFirst({
      where: { id },
    });
    return profile;
  } catch (error) {
    throw new Error("Profile does not exist for this user");
  }
}
