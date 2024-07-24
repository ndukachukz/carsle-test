import { useEffect } from "react";
import { api } from "../lib/services/api";
import { useUserStore } from "@/store/user-store";

export function useAuth() {
  const { setUser, user } = useUserStore(({ user, setUser }) => ({
    user,
    setUser,
  }));

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      api.getUser(storedUserId).then(setUser);
    }
  }, []);

  const signIn = async () => {
    const users = await api.getUsers();
    const randomUser = users[Math.floor(Math.random() * users.length)];
    setUser(randomUser);
    localStorage.setItem("userId", randomUser.id);
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("userId");
  };

  return { user, signIn, signOut };
}
