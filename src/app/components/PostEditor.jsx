import { Button } from "@mui/material";
import AppWriteDB from "../../appwrite/database.service";
import { useState } from "react";

const PostEditor = ({ CloseModal, posts, setPosts }) => {
  const [postTitle, setPostTitle] = useState();
  const [postContent, setPostContent] = useState();

  const create_post = async (event) => {
    event.preventDefault();
    const db = new AppWriteDB();
    const payload = {
      postTitle,
      postContent,
    };
    const post = await db.createDoc("drugboard-beta", "posts", payload);
    // console.log("Post Editor: ", post)
    if (post) {
      const sortedPosts = [...posts, post].sort((a, b) =>
        b.$updatedAt
          .toLocaleString()
          .localeCompare(a.$updatedAt.toLocaleString())
      );
      setPosts(sortedPosts);
      CloseModal();
    }
  };

  return (
    <form onSubmit={create_post} className="flex p-2 gap-2">
      <div className="w-[350px] h-[500px] bg-gray-300 rounded-md"></div>
      <div className="flex flex-col h-[500px] overflow-y-auto justify-between">
        <div className="flex flex-col gap-2">
          <textarea
            className="w-[500px] outline-none text-[#1E293B] text-xl bg-gray-100 rounded-md font-bold p-1"
            type="text"
            value={postTitle}
            maxLength={70}
            rows={2}
            onChange={(event) => setPostTitle(event.target.value)}
            placeholder="Enter the Post Title here..."
            required
          />
          <textarea
            className="w-[500px] outline-none border-none p-1 font-semibold bg-gray-100 rounded-md text-[#0F172A]"
            placeholder="Write your Post Content here... (15000 Characters)"
            onChange={(event) => setPostContent(event.target.value)}
            maxLength={15000}
            value={postContent}
            rows={6}
            type="text"
            required
          />
        </div>
        <div className="flex justify-end gap-2 items-center p-2 pt-3">
          <Button
            onClick={CloseModal}
            size="small"
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
          <Button type="submit" size="small" variant="outlined" color="success">
            Create Post
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PostEditor;
