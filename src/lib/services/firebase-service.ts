import { update, ref, set, get, child } from "firebase/database";

import { db } from "../config/firebase";
import { userRef } from "../utils";

export default class FirebaseService {
  static async createUser(user: User): Promise<void> {
    try {
      await set(userRef(user.id), user);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create user");
    }
  }

  static async getUsers(): Promise<User[] | null> {
    try {
      const userSnapshot = await get(child(ref(db), "users"));

      if (!userSnapshot.exists()) return null;

      const usersObj = userSnapshot.val();

      const users = Object.values(usersObj).map((user) => user as User);

      return users;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get users");
    }
  }

  static async getUser(id: string): Promise<User | null> {
    try {
      const userSnapshot = await get(child(ref(db), `users/${id}`));

      if (!userSnapshot.exists()) return null;

      return userSnapshot.val();
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get user");
    }
  }

  static async updateUser(id: string, user: User): Promise<void> {
    try {
      await update(ref(db, `users/${id}`), user);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to update user");
    }
  }

  static async createCallSummary(call: CallSummary): Promise<void> {
    try {
      await set(ref(db, `calls/${call.id}`), call);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create call");
    }
  }

  static async getCallSummary(callId: string): Promise<CallSummary | null> {
    try {
      const snapshot = await get(child(ref(db), `calls/${callId}`));

      if (!snapshot.exists()) return null;

      return snapshot.val();
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create call");
    }
  }

  static async updateCallSummary(data: CallSummary): Promise<void> {
    try {
      await update(
        ref(db, `calls/${data.callerId}:${data.receiverId}/${data.id}`),
        data
      );
    } catch (error) {
      console.error(error);
      throw new Error("Failed to update call");
    }
  }
}
