"use client"

import PostContainer from "./PostContainer";
import Header from "./Header";
import Leaderboard from "./Leaderboard";
import AdsCard from "./AdsCard";

const MainSection = () => {
    
    return (
      <div className="h-full flex-1 flex flex-col">
        {/* Header */}
        <Header />
        
        {/* Main Section */}
        <main className="bg-white flex-1 rounded-bl-md rounded-br-md flex gap-3 p-3">
          <PostContainer />
          <section className="flex flex-col basis-1/3 gap-3 h-full">
            <AdsCard />
            <Leaderboard />
          </section>
        </main>
      </div>
    );
}

export default MainSection;