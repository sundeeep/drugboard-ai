"use client";
import Aside from "./components/Aside";
import MainSection from "./components/MainSection";

const Home = () => {
  return (
    <div className="h-screen w-screen bg-[#0F172A] lg:h-screen lg:w-screen flex items-start justify-between gap-3 p-3">
      <Aside />
      <MainSection />
    </div>
  );
};

export default Home;
