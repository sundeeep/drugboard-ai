"use client";
import { StyledEngineProvider } from "@mui/material";
import Aside from "./components/Aside";
import MainSection from "./components/MainSection";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import AppWriteAuth from "@/appwrite/auth.service";
import { useRouter } from "next/navigation";

const Home = () => {
  const auth = new AppWriteAuth();
  const [currentUserData, setCurrentUserData] = useState(null);
  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = await auth.getUser();
        user && console.log(user);
        setCurrentUserData(user);
      } catch (err) {
        if (err.response) {
          console.log(err.response)
        }
      }
    };
    getUserData();
  },[]);
  return (
    <StyledEngineProvider injectFirst>
      <div className="h-screen w-screen bg-[#0F172A] lg:h-screen lg:w-screen flex items-start justify-between gap-3 p-3">
        <Aside
          currentUserData={currentUserData}
          setCurrentUserData={setCurrentUserData}
        />
        <MainSection
          currentUserData={currentUserData}
          setCurrentUserData={setCurrentUserData}
        />
      </div>
      <ToastContainer />
    </StyledEngineProvider>
  );
};

export default Home;
