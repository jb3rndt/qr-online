import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Platform } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPlatform(userAgent: string): Platform {
  if (/Macintosh|Mac OS X/.test(userAgent)) {
    return "macos";
  } else if (/Windows/.test(userAgent)) {
    return "windows";
  } else if (/Linux/.test(userAgent)) {
    return "linux";
  } else if (/iPhone|iPad|Android/.test(userAgent)) {
    return "mobile";
  } else {
    return "other";
  }
}
