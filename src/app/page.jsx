"use client";
import { StyledEngineProvider } from "@mui/material";
import Aside from "./components/Aside";
import MainSection from "./components/MainSection";
import { ToastContainer } from "react-toastify";

const Home = () => {
  return (
    <StyledEngineProvider injectFirst>
      <div className="h-screen w-screen bg-[#0F172A] lg:h-screen lg:w-screen flex items-start justify-between gap-3 p-3">
        <Aside />
        <MainSection />
      </div>
      <ToastContainer />
    </StyledEngineProvider>
  );
};

export default Home;
