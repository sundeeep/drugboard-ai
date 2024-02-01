"use client"
import { useEffect, useState } from 'react'
import AppWriteDB from '@/appwrite/database.service';
import BlogPostHeader from './BlogPostHeader';
import { appwriteClient } from "@/appwrite";
import PostsContainer from './PostsContainer';

const PostsContent = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

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
          console.log(response?.payload);
          response?.payload &&
            setPosts((previousState) => [response.payload, ...previousState]);
          // console.log(posts);
          // window.location.reload();
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
    // postsData && console.log(postsData);
    postsData?.length > 0 && setPosts(postsData);
  };

  return (
    <section className="w-[70%] bg-white border border-[#CBD5E1] rounded-md shadow-sm flex flex-col h-full">
      {/* Filters and Create Button */}
      <BlogPostHeader postsLenght={posts?.length} />
      {/* Posts & Blogs Listing Container */}
      <PostsContainer posts={posts} />
      
    </section>
  );
};

export default PostsContent;