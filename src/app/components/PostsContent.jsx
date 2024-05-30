"use client"
import { useEffect, useState } from 'react'
import AppWriteDB from '@/appwrite/database.service';
import BlogPostHeader from './BlogPostHeader';
import { appwriteClient } from "@/appwrite";
import PostsContainer from './PostsContainer';

const PostsContent = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetchPostsData();
    const unsubscribe = appwriteClient.subscribe(
      `databases.drugboard-beta.collections.posts.documents`,
      (response) => {
        if (
          response?.events?.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          response?.payload &&
            setPosts((previousState) => {
              if (previousState == null) {
                return [response?.payload];
              } else {
                return [response?.payload, ...previousState];
              }
          });
        }
      }
    );

    return () => {
      fetchPostsData();
      unsubscribe();
    };
  }, []);

  const fetchPostsData = async () => {
    const db = new AppWriteDB();
    const postsData = await db.getAllDocsByDesc("drugboard-beta", "posts");
    postsData?.length > 0 && setPosts(postsData);
    postsData?.length > 0 && console.log(postsData);
  };

  return (
    <section className="w-[70%] bg-white border border-[#6EE7B7] rounded-md shadow-sm flex flex-col h-full">
      {/* Filters and Create Button */}
      <BlogPostHeader />
      {/* Posts & Blogs Listing Container */}
      <PostsContainer posts={posts} />
    </section>
  );
};

export default PostsContent;