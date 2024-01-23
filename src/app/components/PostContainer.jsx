import React from 'react'
import PostCard from './PostCard'
import AppWriteDB from '@/appwrite/database.service';
import BlogPostHeader from './BlogPostHeader';
import { appwriteClient } from "@/appwrite";

const PostContainer = () => {
    const [posts, setPosts] = React.useState(null);

    React.useEffect(() => {
      fetchPostsData();
      const unsubscribe = appwriteClient.subscribe(
        `databases.drugboard-beta.collections.posts.documents`,
        (response) => {
          if (
            response?.events?.includes(
              "databases.*.collections.*.documents.*.create"
            )
          ) {
            console.log(response?.payload);
            posts && setPosts((previousState) => [
              response?.payload,
              ...previousState,
            ]);
          }
        }
      );

      return () => {
        unsubscribe();
      };
      }, []);

    const fetchPostsData = async () => {
      const db = new AppWriteDB();
      const postsData = await db.getAllDocsByDesc("drugboard-beta", "posts");
      postsData && console.log(postsData);
      postsData?.length > 0 && setPosts(postsData);
    }
  
    return (
      <section className="w-[70%] bg-white border border-[#CBD5E1] rounded-md shadow-sm flex flex-col h-full">
        {/* Filters and Create Button */}
        <BlogPostHeader/>
        {/* Posts & Blogs Listing Container */}
        <div className="w-full flex flex-col rounded-lg gap-[14px] h-full overflow-y-auto px-[8px] py-[8px] flex-1">
          {posts &&
            posts?.map((post, index) => <PostCard post={post} key={index} />)}
        </div>
      </section>
    );
}

export default PostContainer