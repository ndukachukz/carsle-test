import Sidebar from "./shared/sidebar";
import BottomTabBar from "./shared/bottom-tab-bar";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />
      <Outlet />
      <BottomTabBar />
    </div>
  );
}

export default RootLayout;
