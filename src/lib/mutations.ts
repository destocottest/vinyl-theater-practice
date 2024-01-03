import db from "@/lib/db";
import { User } from "next-auth";

const vinylWordList = [
  "vinyl",
  "record",
  "groove",
  "turntable",
  "spin",
  "platter",
];

const musicWordList = [
  "melody",
  "rhythm",
  "beat",
  "note",
  "chord",
  "lyric",
  "harmony",
];

const createDisplayName = (name: string | null | undefined, id: string) => {
  let display = "";

  if (name) {
    display = name.toLowerCase();
    display = display.replace(/\s/g, "");
  } else {
    const randomVinylWord =
      vinylWordList[Math.floor(Math.random() * vinylWordList.length)];
    const randomMusicWord =
      musicWordList[Math.floor(Math.random() * musicWordList.length)];
    display += randomVinylWord;
    display += randomMusicWord;
  }
  display += id.slice(-2);

  return display;
};

export const createProfileFromOAuthUser = async (user: User) => {
  const display = createDisplayName(user.name, user.id);

  await db.profile.create({
    data: {
      id: user.id,
      display,
      image: user.image,
    },
  });
};
