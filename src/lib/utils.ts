import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateDisplayName(name: string) {
  const regex = /^[a-z0-9]+$/;
  return regex.test(name);
}
