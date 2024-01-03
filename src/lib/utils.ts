import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export const generateDisplayName = (name: string | null | undefined) => {
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

  return display;
};
