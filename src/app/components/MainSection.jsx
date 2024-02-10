"use client"

import PostContainer from "./PostsContent";
import Header from "./Header";
import Leaderboard from "./Leaderboard";
import AdsCard from "./AdsCard";

const MainSection = ({setCurrentUserData, currentUserData }) => {
  return (
    <div className="h-full w-[84%] flex-1 flex flex-col">
      {/* Header */}
      <Header
        setCurrentUserData={setCurrentUserData}
        currentUserData={currentUserData}
      />

      {/* Main Section */}
      <main className="h-[90%] bg-white flex-1 rounded-bl-md rounded-br-md flex gap-3 p-3">
        <PostContainer />
        <section className="w-[30%] flex flex-col basis-1/3 gap-3 h-full">
          <AdsCard />
          <Leaderboard />
        </section>
      </main>
    </div>
  );
};

export default MainSection;