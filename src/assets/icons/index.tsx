import HomeSVG from "./Home_fill.svg";
import GPSSVG from "./Gps_fixed_fill.svg";
import UserSVG from "./User_alt_fill.svg";
import BellSVG from "./Bell_pin_fill.svg";
import WalletSVG from "./Wallet_fill.svg";
import UserAddSVG from "./User_fill_add.svg";
import CheckRoundSVG from "./Check_round_fill.svg";
import SettingSVG from "./Setting_alt_fill.svg";
import LogoutSvg from "./logout.svg";

import { HTMLAttributes } from "react";

type Props = Omit<HTMLAttributes<HTMLImageElement>, "src">;

export const HomeIcon = (props: Props) => {
  return <img src={HomeSVG} alt="" className="w-[44px] h-[44px]" {...props} />;
};

export const GPSIcon = (props: Props) => {
  return <img src={GPSSVG} alt="" className="w-[44px] h-[44px]" {...props} />;
};

export const UserIcon = (props: Props) => {
  return <img src={UserSVG} alt="" className="w-[44px] h-[44px]" {...props} />;
};

export const BellIcon = (props: Props) => {
  return <img src={BellSVG} alt="" className="w-[44px] h-[44px]" {...props} />;
};

export const WalletIcon = (props: Props) => {
  return (
    <img src={WalletSVG} alt="" className="w-[44px] h-[44px]" {...props} />
  );
};

export const UserAddIcon = (props: Props) => {
  return (
    <img src={UserAddSVG} alt="" className="w-[44px] h-[44px]" {...props} />
  );
};

export const CheckRoundIcon = (props: Props) => {
  return (
    <img src={CheckRoundSVG} alt="" className="w-[44px] h-[44px]" {...props} />
  );
};

export const SettingIcon = (props: Props) => {
  return (
    <img src={SettingSVG} alt="" className="w-[44px] h-[44px]" {...props} />
  );
};

export const LogoutIcon = (props: Props) => {
  return (
    <img src={LogoutSvg} alt="" className="w-[44px] h-[44px]" {...props} />
  );
};
