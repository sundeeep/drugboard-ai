"use client"
import { Autocomplete, Button } from "@mui/material";
import AppWriteDB from "../../appwrite/database.service";
import { useEffect, useState } from "react";
import AppWriteAuth from "@/appwrite/auth.service";
import TextField from "@mui/material/TextField";

const PostEditor = ({ CloseModal }) => {
  const [postTitle, setPostTitle] = useState(null);
  const [postContent, setPostContent] = useState(null);
  const [mentions, setMentions] = useState([]);
  const [file, setFiles] = useState([]);
  const [links, setLinks] = useState([]);
  const [tags, setTags] = useState([]);

  const create_post = async (event) => {
    event.preventDefault();
    const auth = new AppWriteAuth();
    try {
      const user = auth.getUser();
      if (user) {
        const db = new AppWriteDB();
        const payload = {
          postTitle,
          postContent,
        };
        const post = await db.createDoc("drugboard-beta", "posts", payload);
        
        CloseModal();
    }
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await
    }
    fetchUsers();
  }, [])

  return (
    <form
      onSubmit={create_post}
      autoComplete="off"
      className="flex flex-col w-[360px] h-[500px] overflow-y-auto justify-between"
    >
      <div className="flex flex-col gap-2 p-2 w-full">
        <TextField
          id="postTitle"
          label="Post Title"
          fullWidth
          value={postTitle}
          onChange={(event) => setPostTitle(event.target.value)}
          variant="filled"
        />

        <TextField
          id="postContent"
          label="Post Content"
          fullWidth
          value={postContent}
          onChange={(event) => setPostContent(event.target.value)}
          multiline
          maxRows={6}
          variant="filled"
        />

        <Autocomplete
          multiple
          id="mentions"
          options={top100Films}
          getOptionLabel={(option) => option.title}
          defaultValue={[top100Films[13]]}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Multiple values"
              placeholder="Favorites"
            />
          )}
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
    </form>
  );
};

export default PostEditor;
