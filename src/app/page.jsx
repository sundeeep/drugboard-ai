"use client";
import Aside from "./components/Aside";
import MainSection from "./components/MainSection";

const Home = () => {
  return (
    <div className="bg-[#0F172A] lg:h-screen lg:w-screen flex items-start justify-between">
      <Aside />
      <MainSection />
    </div>
  );
};

export default Home;
