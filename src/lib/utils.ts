import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateDisplayName = (name: string | null | undefined) => {
  let display = "";

  if (name) {
    display = name.toLowerCase();
    display = display.replace(/\s/g, "");
  } else {
    const randomIndex = Math.floor(Math.random() * defaultDisplayNames.length);
    display += defaultDisplayNames[randomIndex];
  }

  return display;
};

const defaultDisplayNames = [
  "vinylmelody",
  "vinylrhythm",
  "vinylbeat",
  "vinylnote",
  "vinylchord",
  "vinyllyric",
  "vinylharmony",
  "recordmelody",
  "recordrhythm",
  "recordbeat",
  "recordnote",
  "recordchord",
  "recordlyric",
  "recordharmony",
  "groovemelody",
  "grooverhythm",
  "groovebeat",
  "groovenote",
  "groovechord",
  "groovelyric",
  "grooveharmony",
  "turntablemelody",
  "turntablerhythm",
  "turntablebeat",
  "turntablenote",
  "turntablechord",
  "turntablelyric",
  "turntableharmony",
];
