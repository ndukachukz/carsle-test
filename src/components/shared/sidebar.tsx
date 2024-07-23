/* eslint-disable react-hooks/rules-of-hooks */
import { useLocation } from "react-router-dom";
import { LogoutIcon } from "../../assets/icons";
import { NAV_MENUS } from "../../lib/constants";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

function Sidebar() {
  const location = useLocation();
  return (
    <aside className="sticky top-0 left-0  hidden lg:flex flex-col w-64 h-screen py-8 overflow-y-auto overflow-x-hidden bg-secondary border-r rtl:border-r-0 rtl:border-l">
      <div className="flex flex-col justify-between flex-1 w-full mt-6">
        <nav className="-mx-3 space-y-3 ">
          {NAV_MENUS.map(({ icon: Icon, ...menu }, index) => {
            const active = location.pathname === menu.href;

            return (
              <a
                key={index}
                className={cn(
                  `px-10 flex items-center gap-5  py-2 text-primary transition-colors duration-300 transform `,
                  !active &&
                    "text-gray-600 hover:bg-gray-100 hover:text-gray-700",
                  active && "bg-gray-300"
                )}
                href={menu.href}
              >
                <Icon />

                <span
                  className={cn(
                    `mx-2 text-xl font-medium`,
                    active && "font-extrabold "
                  )}
                >
                  {menu.label}
                </span>
              </a>
            );
          })}
        </nav>

        <div>
          <div className="flex flex-col items-center ">
            <Button className="gap-5 bg-[#FA6C6C]" size={"lg"}>
              <LogoutIcon className="size-30" /> Logout
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
