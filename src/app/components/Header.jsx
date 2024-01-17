"use client"
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import Image from "next/image";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import { useState } from "react";
import AppWriteAuth from "@/appwrite/auth.service";

const Header = () => {
    const [logInLoader, setLogInLoader] = useState(false);
    const appwrite = new AppWriteAuth();

    const handleSignIn = async () => {
        setLogInLoader(true);
        const response = await appwrite.SignInWithGoogle(
            "http://localhost:3000/jobs/",
            "http://localhost:3000/"
        );
        if (response) {
            const user = await appwrite.getUser();
            if (user) {
            setLogInLoader(false);
            }
        }
    };
    return (
        <header className="py-2 flex items-center justify-between text-white font-semibold bg-white rounded-tr-md rounded-tl-md border border-b-[#CBD5E1]">
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
                <NotificationsActiveRoundedIcon className="text-[#334155] text-[32px]" />
                </button>
                {/* User Profile or SignIn With Google Button*/}
                <article className="flex gap-2 items-center">
                <Image
                    src="/UserProfileSample.jpg"
                    alt="UserProfileSample"
                    width="60"
                    height="150"
                    className="rounded-md object-cover"
                />
                <div className="flex flex-col items-start">
                    <h2 className="text-black font-bold">Dr.Prasad, PhD</h2>
                    <p className="text-black/60 text-sm font-semibold">
                    Med-Chem Scientist
                    </p>
                </div>
                </article>

                <button
                className="flex items-center gap-2 bg-gradient-to-r rounded-full from-[#9333EA] to-[#A21CAF] px-6 py-2"
                onClick={handleSignIn}
                >
                <VpnKeyRoundedIcon />
                <p className="text-xl font-semibold">Sign In</p>
                </button>
            </div>
        </header>
    );
};

export default Header;
