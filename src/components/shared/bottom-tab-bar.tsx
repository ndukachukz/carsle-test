import { GPSIcon, HomeIcon, UserIcon, WalletIcon } from "@/assets/icons";
import { useAuth } from "@/hooks/useAuth";
import { LogInIcon } from "lucide-react";

function BottomTabBar() {
  const { user, signIn, signOut } = useAuth();
  return (
    <nav className="lg:hidden bg-white p-4 flex justify-between items-center fixed bottom-0 left-0 right-0 rounded-t-lg shadow-2xl shadow-top">
      <a href="/">
        <HomeIcon className="size-8" />
      </a>
      <a href="">
        <GPSIcon className="size-8" />
      </a>
      <a href="">
        <WalletIcon className="size-8" />
      </a>
      {!user && <LogInIcon onClick={signIn} className="size-8" />}
      {user && <UserIcon onClick={signOut} className="size-8" />}
    </nav>
  );
}

export default BottomTabBar;
