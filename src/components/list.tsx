import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import ListItem from "./list-item";
import { api } from "@/lib/services/api";

const List = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[] | null>();

  useEffect(() => {
    async function getUsers() {
      const response = await api.getUsers();
      setUsers(response);
    }

    getUsers();
  }, []);

  if (!currentUser) {
    return;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-2 md:gap-7 items-center justify-center">
      {users &&
        users.map(
          (user, index) =>
            user.id !== currentUser.id && <ListItem key={index} {...user} />
        )}
    </div>
  );
};

export default List;
