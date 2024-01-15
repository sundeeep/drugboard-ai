"use client"
import Image from "next/image";
import AppWriteAuth from "@/appwrite/auth.service";
import { useState } from "react";

const Aside = () => {
    const [logInLoader, setLogInLoader] = useState(false);
    const appwrite = new AppWriteAuth();

    const handleSignIn =async () => {
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
        <aside className="flex flex-col justify-between items-start">
            {/* Logo */} 
            <div className="">
            <Image
                src="/drugboardLogo.png"
                alt="Drugboard.ai Logo"
                width="250"
                height="100"
            />
            </div>

            <button
            className="bg-white text-black font-semibold uppercase px-3 py-2"
            onClick={handleSignIn}
            >
            {logInLoader ? <h1>Signing Up ....</h1> : <h1>SignIn With Google</h1>}
            </button>

            {/* Navbar */}
            <nav>
            <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
            </nav>
            {/* Logout Button */}
        </aside>
    );
}

export default Aside;