/* eslint-disable react-hooks/rules-of-hooks */
import { useLocation } from "react-router-dom";
import { LogoutIcon } from "../../assets/icons";
import { NAV_MENUS } from "../../lib/constants";

function Sidebar() {
  const location = useLocation();
  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen py-8 overflow-y-auto bg-[#F2F2F26B] border-r rtl:border-r-0 rtl:border-l">
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav className="-mx-3 space-y-3 ">
          {NAV_MENUS.map(({ icon: Icon, ...menu }, index) => {
            const active = location.pathname === menu.href;

            return (
              <a
                key={index}
                className={`px-10 flex items-center gap-5  py-2 text-primary transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700 ${
                  active && "bg-gray-300"
                }`}
                href={menu.href}
              >
                <Icon />

                <span
                  className={`mx-2 text-xl font-medium ${
                    active && "font-bold "
                  }`}
                >
                  {menu.label}
                </span>
              </a>
            );
          })}
        </nav>

        <div>
          <div className="flex flex-col items-center ">
            <button className="flex gap-5 items-center bg-danger py-3 px-4 rounded-lg text-white">
              <LogoutIcon className="size-30" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
