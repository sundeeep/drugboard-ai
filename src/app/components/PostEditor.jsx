"use client"
import { Autocomplete, Button, IconButton, Typography } from "@mui/material";
import AppWriteDB from "../../appwrite/database.service";
import { useEffect, useMemo, useState } from "react";
import AppWriteAuth from "@/appwrite/auth.service";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Client, Functions } from "appwrite";
import AppWriteStorage from "@/appwrite/storage.service";

const PostEditor = ({ CloseModal }) => {

  const [postTitle, setPostTitle] = useState(null);
  const [postContent, setPostContent] = useState(null);
  const [tags, setTags] = useState([]);
  const [mentions, setMentions] = useState([]);
  const [fileIDs, setFileIDs] = useState([]);
  const [linkIDs, setLinkIDs] = useState([]);

  const [files, setFiles] = useState([{ name: "", file: null }]);
  const [links, setLinks] = useState([{ name: "", link: "" }]);

  const [drugboardUsers, setDrugboardUsers] = useState([]);
  const [drugboardTags, setDrugboardTags] = useState([]);

  //Fetching all drugboard tags...
  useEffect(() => {
    //TODO: In future change this to debouncing... 
    const fetchPostTags = async () => {
      const db = new AppWriteDB();
      const allTags = await db.getAllDocs("drugboard-beta", "post-tags");
      allTags && setDrugboardTags([...allTags]);
    };
    fetchPostTags();
  }, []);

  //Fetching all the drugboard users...
  useEffect(() => {
    //TODO: In future change it to debouncing...
    const client = new Client();
    const functions = new Functions(client);

    client
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject("65a22a9e2eaa88f35d94");

    const fetchAllUsers = async () => {
      try {
        const response = await functions.createExecution(
          "664918620033ec51caf3", "GET"
        );
        const body = response.responseBody;
        const data = JSON.parse(body);
        const users = data.users;
        if (users?.length > 0) {
          setDrugboardUsers(users);
          // console.log("Users:", users);
        }
      } catch (error) {
        console.error("Error executing function:", error);
      }
    };

    fetchAllUsers();
  },[])

  const handleFileChange = (index, event) => {
    const newFiles = [...files];
    newFiles[index].file = event.target.files[0];
    setFiles(newFiles);
  };

  const handleFileNameChange = (index, event) => {
    const newFiles = [...files];
    newFiles[index].name = event.target.value;
    setFiles(newFiles);
  };

  const handleLinkChange = (index, event) => {
    const newLinks = [...links];
    newLinks[index].link = event.target.value;
    setLinks(newLinks);
  };

  const handleLinkNameChange = (index, event) => {
    const newLinks = [...links];
    newLinks[index].name = event.target.value;
    setLinks(newLinks);
  };

  const addFileField = () => {
    setFiles([...files, { name: "", file: null }]);
  };

  const addLinkField = () => {
    setLinks([...links, { name: "", link: "" }]);
  };

  const removeFileField = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const removeLinkField = (index) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    setLinks(newLinks);
  };

  const saveFiles = async () => {
    files?.map(async(file, index) => {
      const storage = new AppWriteStorage();
      const auth = new AppWriteAuth();
      const db = new AppWriteDB();
      try {
        const user = await auth.getCurrentUserSession();
        if (user) {
          const [fileID, fileURL] = await storage.uploadFile(
            "user-post-files",
            file?.file
          );
          if (fileID && fileURL) {
            try {
              const payload = {
                fileURL,
                fileName: file?.name,
                fileID,
                storageBucketID: "user-post-files",
                storageName: "APPWRITE"
              };
              const response = await db.createDoc("drugboard-beta", "files", payload);
              response && setFileIDs([...fileIDs, response?.$id]);
            } catch (err) {
              await storage.deleteFile("user-post-files", fileID);
            }
          }
        }
      } catch (error) {
        // TODO: Toast Message: Some went wrong while Uploading Files.
        console.log("Error while uploading files: ",error);
      }
    })
  }

  const saveLinks = async () => {
    links?.map(async (link, index) => {
      const auth = new AppWriteAuth();
      const db = new AppWriteDB();
      try {
        const user = await auth.getCurrentUserSession();
        if (user) {
          try {
            const payload = {
              externalURL: link?.name,
              linkName: link?.link
            };
            const response = await db.createDoc(
              "drugboard-beta",
              "external-links",
              payload
            );
            response && setLinkIDs([...linkIDs, response?.$id]);
          } catch (err) {
            console.log("Error in savin one link", err);
          }
        }
      } catch (err) {
        console.log("Error in saving links", err);
      }
    })
  }

  //Creating the Post.
  const create_post = async (event) => {
    event.preventDefault();
    const auth = new AppWriteAuth();
    try {
      const user = await auth.getCurrentUserSession();
      // console.log(user);
      if (user) {
        try {
          await saveFiles();
          await saveLinks();
          const db = new AppWriteDB();
          const payload = {
            postTitle,
            postContent,
            tags,
            postedByUserID: user.userId,
            users_mentioned: mentions,
          };
          console.log(payload);
          const post = await db.createDoc("drugboard-beta", "posts", payload);
          console.log("Saved post: ", post);
          CloseModal();
        } catch (err) {
          //TODO: Toast Message - Something went wrong! Post Again
          console.log("Error in Saving Entire Post: ",err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelectTags = (event, value, reason) => {
    const tagIDs = [];
    value.map((tag) => tagIDs.push(tag?.$id));
    if (value?.length > 0) {
      setTags([...tagIDs]);
    }
  };

  const handleMentionUsers = (event, value, reason) => {
    const userIDs = [];
    value.map((user) => userIDs.push(user?.$id));
    if (value?.length > 0) {
      setMentions([...userIDs]);
    }
  };

  return (
    <form
      onSubmit={create_post}
      autoComplete="off"
      className="flex flex-col w-[500px] h-[500px] overflow-y-auto justify-between"
    >
      <div className="flex flex-col gap-4 p-4 w-full">
        <TextField
          id="postTitle"
          label="Post Title"
          fullWidth
          value={postTitle}
          onChange={(event) => setPostTitle(event.target.value)}
          variant="filled"
          color="secondary"
          
        />

        <TextField
          color="secondary"
          id="postContent"
          label="Post Content"
          fullWidth
          value={postContent}
          onChange={(event) => setPostContent(event.target.value)}
          multiline
          rows={3}
          maxRows={6}
          variant="filled"
        />

        <Autocomplete
          multiple
          id="mentions"
          options={drugboardUsers}
          onChange={handleMentionUsers}
          getOptionLabel={(user) => user?.name}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label="User Mentions"
              color="secondary"
              placeholder="You can mention multiple Users..."
            />
          )}
        />

        <Autocomplete
          multiple
          id="tags"
          options={drugboardTags}
          onChange={handleSelectTags}
          getOptionLabel={(tag) => (
            <h1 className="font-semibold" key={tag?.$id}># {tag?.tagName}</h1>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label="Tags"
              color="secondary"
              placeholder="Tag this post into correct category."
            />
          )}
        />

        <Box>
          <h2 className="my-2 font-semibold">
            Upload Files (Only pdf files are accepted*)
          </h2>
          {files.map((file, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex my-1">
                <TextField
                  label="File Name"
                  variant="filled"
                  color="secondary"
                  value={file.name}
                  onChange={(event) => handleFileNameChange(index, event)}
                  sx={{ flex: 1 }}
                />
                <Button variant="contained" color="secondary" component="label">
                  {file.file ? `Change File` : `Upload File`}
                  <input
                    type="file"
                    accept="application/pdf"
                    required
                    hidden
                    onChange={(event) => handleFileChange(index, event)}
                  />
                </Button>
                {!file.file && (
                  <div className="flex items-center justify-center">
                    <IconButton
                      color="error"
                      onClick={() => removeFileField(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                )}
              </div>

              {file.file && (
                <div className="flex items-center rounded-md border my-2">
                  <p className="font-semibold p-3 flex-1">{file.file.name}</p>
                  <IconButton
                    color="error"
                    onClick={() => removeFileField(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              )}
            </div>
          ))}
          <Button
            variant="outlined"
            onClick={addFileField}
            sx={{ mt: 1, mb: 2 }}
          >
            Add File
          </Button>

          <h2 className="my-2 font-semibold">Add Links</h2>
          {links.map((link, index) => (
            <div className="flex items-center my-2 gap-2" key={index}>
              <TextField
                label="Link Name"
                variant="filled"
                color="secondary"
                value={link.name}
                onChange={(event) => handleLinkNameChange(index, event)}
              />
              <TextField
                label="Link URL"
                variant="filled"
                color="secondary"
                value={link.link}
                onChange={(event) => handleLinkChange(index, event)}
              />
              <IconButton color="error" onClick={() => removeLinkField(index)}>
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          <Button
            variant="outlined"
            onClick={addLinkField}
            sx={{ mt: 1, mb: 2 }}
          >
            Add Link
          </Button>
        </Box>
      </div>
      <div className="flex justify-end gap-4 items-center p-4 pt-3">
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
