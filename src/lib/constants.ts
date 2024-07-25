import { lazy } from "react";

export const NAV_MENUS = [
  {
    label: "Home",
    href: "/",
    icon: lazy(() =>
      import("../assets/icons").then(({ HomeIcon }) => ({ default: HomeIcon }))
    ),
  },
  {
    label: "Explore",
    href: "/explore",
    icon: lazy(() =>
      import("../assets/icons").then(({ GPSIcon }) => ({ default: GPSIcon }))
    ),
  },
  {
    label: "Profile",
    href: "/profile",
    icon: lazy(() =>
      import("../assets/icons").then(({ UserIcon }) => ({ default: UserIcon }))
    ),
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: lazy(() =>
      import("../assets/icons").then(({ BellIcon }) => ({ default: BellIcon }))
    ),
  },
  {
    label: "Wallet",
    href: "/wallet",
    icon: lazy(() =>
      import("../assets/icons").then(({ WalletIcon }) => ({
        default: WalletIcon,
      }))
    ),
  },
  {
    label: "Your circle",
    href: "/circle",
    icon: lazy(() =>
      import("../assets/icons").then(({ UserAddIcon }) => ({
        default: UserAddIcon,
      }))
    ),
  },
  {
    label: "Get verified",
    href: "/verify",
    icon: lazy(() =>
      import("../assets/icons").then(({ CheckRoundIcon }) => ({
        default: CheckRoundIcon,
      }))
    ),
  },
  {
    label: "Settings",
    href: "/settings",
    icon: lazy(() =>
      import("../assets/icons").then(({ SettingIcon }) => ({
        default: SettingIcon,
      }))
    ),
  },
] as const;

export const CHARGE_RATE_PER_SEC = 1 as const;
export const CHARGE_RATE_PER_MIN = CHARGE_RATE_PER_SEC * 60;
