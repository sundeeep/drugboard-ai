"use client"
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import Image from "next/image";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import { useEffect, useState } from "react";
import AppWriteAuth from "@/appwrite/auth.service";
import ProfileCard from "./ProfileCard";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import SecondaryButton from "@/components/ui/buttons/SecondaryButton";

const Header = ({setCurrentUserData, currentUserData}) => {
  const [logInLoader, setLogInLoader] = useState(false);
  const appwrite = new AppWriteAuth();
  
    const handleSignIn = async () => {
        setLogInLoader(true);
        const response = await appwrite.SignInWithGoogle(
            `http://localhost:3000/`,
            "http://localhost:3000/"
        );
      if (response) {
        const user = await appwrite.getUser();
        console.log(user);
        if (user) {
            setCurrentUserData(user);
            setLogInLoader(false);
        }
      }
  };
  
    return (
      <header className="h-[10%] flex items-center justify-between text-white font-semibold bg-white rounded-tr-md rounded-tl-md border border-b-[#CBD5E1]">
        <div className="px-3">
          <h3 className="text-[#C026D3] font-bold text-2xl">
            Scientific Connect
          </h3>
        </div>

        {/* Search Bar */}
        <form className="flex items-center gap-2 border border-[#CBD5E1] bg-white px-3 py-2 lg:w-[500px] rounded-md text-[#0F172A]">
          <label htmlFor="search">
            <SearchRoundedIcon className="text-[#334155]" />
          </label>
          <input
            id="search"
            type="search"
            className="flex-1 outline-none border-0 text-[#334155]"
            required
          />
        </form>

        {/* Notifications and User Profile */}
        <div className="flex items-center gap-2 px-3">
          <button>
            <NotificationsActiveRoundedIcon className="text-[#334155]" />
          </button>

          {currentUserData ? (
            <ProfileCard currentUserData={currentUserData} />
          ) : (
            <div className="flex items-center gap-2">
              <PrimaryButton
                onClick={handleSignIn}
                icon={<VpnKeyRoundedIcon />}
              >
                Sign In
              </PrimaryButton>
              <SecondaryButton
                onClick={handleSignIn}
                icon={<VpnKeyRoundedIcon />}
              >
                Register
              </SecondaryButton>
            </div>
          )}
        </div>
      </header>
    );
};

export default Header;
