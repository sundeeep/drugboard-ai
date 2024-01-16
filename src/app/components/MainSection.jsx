"use client"
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import Image from "next/image";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import AppWriteAuth from "@/appwrite/auth.service";
import { useState } from "react";

const MainSection = () => {
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
      <div className="h-full flex-1 flex flex-col">
        {/* Header */}
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

        {/* Main Section */}
        <main className="bg-white flex-1 rounded-bl-md rounded-br-md flex gap-3 p-3">
          <section className="basis-2/3 bg-white border border-[#CBD5E1] rounded-md">
            {/* Filters and Create Button */}
            <div className="px-3 py-1 flex justify-between items-center"></div>
            {/* Posts & Blogs Listing Container */}
            <div className="">
              <article></article>
            </div>
          </section>
          <section className="flex flex-col basis-1/3 gap-3 h-full">
            <div className="bg-black/60 rounded-md w-full h-2/6"></div>
            <div className="bg-black/70 rounded-md w-full h-4/6">
              {/* Header */}
              <div></div>
              {/* Leaderboard */}
              <div></div>
            </div>
          </section>
        </main>
      </div>
    );
}

export default MainSection;