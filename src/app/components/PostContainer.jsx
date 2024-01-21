import React from 'react'
import PostCard from './PostCard'
import AppWriteDB from '@/appwrite/database.service';
import BlogPostHeader from './BlogPostHeader';

const PostContainer = () => {
    const [posts, setPosts] = React.useState([]);

    React.useEffect(() => {
      fetchPostsData();
    }, []);

    const fetchPostsData = async () => {
      const db = new AppWriteDB();
      const postsData = await db.getAllDocs("drugboard-beta", "posts");
      // console.log(data);
      if (postsData?.length > 0) {
        const sortedPosts = [...postsData].sort((a, b) =>
          b.$updatedAt
            .toLocaleString()
            .localeCompare(a.$updatedAt.toLocaleString())
        );
        setPosts(sortedPosts);
      }
      // console.log(postData)
    };
    return (
      <section className="w-[70%] bg-white border border-[#CBD5E1] rounded-md shadow-sm flex flex-col h-full">
        {/* Filters and Create Button */}
        <BlogPostHeader posts={posts} setPosts={setPosts} />
        {/* Posts & Blogs Listing Container */}
        <div className="w-full flex flex-col rounded-lg gap-[14px] h-full overflow-y-auto px-[8px] py-[8px] flex-1">
          {posts.length > 0 &&
            posts?.map((post, index) => <PostCard post={post} key={index} />)}
        </div>
      </section>
    );
}

export default PostContainer