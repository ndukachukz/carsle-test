import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { faker } from "@faker-js/faker";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function genId() {
  return faker.string.uuid();
}

export const formatDuration = (durationInSeconds: number) => {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = Math.floor(durationInSeconds % 60);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export async function getUserMedia() {
  return await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
}
