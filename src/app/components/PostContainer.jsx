import React from 'react'
import PostCard from './PostCard'

const PostContainer = () => {
    return (
        <section className="basis-2/3 bg-white border border-[#CBD5E1] rounded-md">
            {/* Filters and Create Button */}
            <div className="px-3 py-1 flex justify-between items-center"></div>
            {/* Posts & Blogs Listing Container */}
            <div className="">
                <PostCard />
            </div>
        </section>
    );
}

export default PostContainer