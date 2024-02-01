"use client";

import PostCard from "./PostCard";

const PostsContainer = ({posts}) => {
    return (
        <div className="w-full flex flex-col rounded-lg gap-[14px] h-full overflow-y-auto px-[8px] py-[8px] flex-1">
            {posts?.map((post) => <PostCard post={post} key={post?.$id} />)}
        </div>
    );
}

export default PostsContainer