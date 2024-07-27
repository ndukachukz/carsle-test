import { DataSnapshot } from "firebase/database";
import FirebaseService from "./services/firebase-service";

import { useUserStore } from "@/store/user-store";
import { useAppStore } from "@/store/app-store";
import { ERRORS } from "./constants";

export async function handleTransfer(
  fromUid: string,
  toUid: string,
  amount: number
) {
  try {
    const fromUser = await FirebaseService.getUser(fromUid);
    const toUser = await FirebaseService.getUser(toUid);

    if (!fromUser || !toUser)
      throw new Error(
        `invalid transfer: users must be valid transfering from ${fromUser}, to ${toUser}`
      );

    if (fromUser.balance < amount) {
      throw new Error(ERRORS.INSUFFICIENT_CREDITS);
    }

    await FirebaseService.updateUser(fromUser.id, {
      ...fromUser,
      balance: fromUser.balance - amount,
    });

    await FirebaseService.updateUser(toUser.id, {
      ...toUser,
      balance: toUser.balance + amount,
    });
  } catch (error) {
    console.error("Error deducting from user: ", error);
    throw new Error("Failed to deduct from user");
  }
}

export async function handleUpdateCallSummary(updateSummary: CallSummary) {
  await FirebaseService.updateCallSummary(updateSummary);
}

const setUser = useUserStore.getState().setUser;

export const handleUserValueChange = (snapshot: DataSnapshot) => {
  if (!snapshot.exists()) return;
  const data = snapshot.val();

  console.log("user value change => ", data);

  setUser(data);
};

const setCallSummary = useAppStore.getState().setCallSummary;

export const handleCallSummaryValueChange = (snapshot: DataSnapshot) => {
  if (!snapshot.exists()) return;
  const data = snapshot.val();
  console.log("call summary value change => ", data);
  setCallSummary(data);
};
