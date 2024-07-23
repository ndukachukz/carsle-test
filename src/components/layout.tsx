import { Outlet } from "react-router-dom";
import Sidebar from "./shared/sidebar";
import BottomTabBar from "./shared/bottom-tab-bar";

function RootLayout() {
  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />
      <main className="flex-1 px-6 py-11 mb-14">
        <Outlet />
      </main>
      <BottomTabBar />
    </div>
  );
}

export default RootLayout;
