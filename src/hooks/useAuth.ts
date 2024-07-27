import { useEffect } from "react";
import { useUserStore } from "@/store/user-store";
import FirebaseService from "@/lib/services/firebase-service";

export function useAuth() {
  const { setUser, user } = useUserStore();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      FirebaseService.getUser(storedUserId)
        .then(setUser)
        .catch((error) => {
          console.error("Failed to fetch users: ", error);
          localStorage.removeItem("userId");
        });
    }
  }, []);

  const signIn = async () => {
    try {
      const users = await FirebaseService.getUsers();

      if (!users) return;

      const randomUser = users[Math.floor(Math.random() * users.length)];

      setUser(randomUser);
      localStorage.setItem("userId", randomUser.id);
    } catch (error) {
      console.error("unable to login User", error);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("userId");
  };

  return { user, signIn, signOut };
}
