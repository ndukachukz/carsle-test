import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { faker } from "@faker-js/faker";
import { ref } from "firebase/database";

import { db } from "./config/firebase";

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
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });

  return stream;
}

export function closeUserMedia(stream: MediaStream | null) {
  if (stream) stream.getTracks().forEach((track) => track.stop());
}

export const userRef = (uid: string) => ref(db, `users/${uid}`);
export const usersRef = ref(db, `users/`);
export const callRef = (callerId: string, receiverId: string, callId: string) =>
  ref(db, `calls/${callerId}:${receiverId}/${callId}`);

export const startTimer = (
  setStateCb: React.Dispatch<React.SetStateAction<number>>
) => {
  const interval = setInterval(() => {
    setStateCb((time) => time + 1);
  }, 1000);

  return interval;
};

export const stopTimer = (interval: NodeJS.Timeout) => clearInterval(interval);
