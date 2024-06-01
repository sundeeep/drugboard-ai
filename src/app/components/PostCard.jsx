"use client"
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import CancelIcon from "@mui/icons-material/Cancel";
import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";
import BookmarkAddRoundedIcon from "@mui/icons-material/BookmarkAddRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { useEffect, useState } from "react";
import { appwriteClient } from "@/appwrite";
import Tags from "@/components/ui/buttons/Tags";
import moment from "moment";
import AppWriteAuth from "@/appwrite/auth.service";

const PostCard = ({ post }) => {
  const [postData, setPostData] = useState(post);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      const auth = new AppWriteAuth();
      const user = await auth.getUser();
      user && setUserData(user);
    }
    fetchUserData();
  }, [])
  
  //Realtime Connection for an Individual Post.
    useEffect(() => {
        const unsubscribe = appwriteClient.subscribe(
            `databases.drugboard-beta.collections.posts.documents.${post.$id}`,
            (response) => {
                // Callback will be executed on changes for all files.
                if (response?.events?.includes(`databases.*.collections.*.documents.${postData?.$id}.update`)) {
                    setPostData(response?.payload)
                }
            }
        ); 
        
        return () => {
            unsubscribe();
        }
    }, [])
    
    let date = new Date(post.$updatedAt);
    date = moment(date).format("Do MMM, YYYY - h:mm:ss a");
    const postDate = date.toLocaleString();

    return (
      postData && (
        <article className="w-full h-[800px] border rounded-md flex gap-0 items-stretch">
          <div className="  h-full border w-[40%] aspect-[4/5] flex items-center justify-center">
            <p className="font-bold text-xl">Image Here</p>
          </div>

          <div className="flex flex-col gap-3 w-[60%] p-3">
            {userData && (
              <div>
                <h1>{userData.prefs.userName}</h1>
                <img
                  src={userData.prefs.profileImageURL}
                  alt="person"
                  className="w-[40px] h-[50px] object-cover rounded-md"
                />
              </div>
            )}
            <h1 className="">{post?.postTitle}</h1>
            <h1 className="">{post?.postContent}</h1>
            {postDate && <p>{postDate}</p>}
            <div className="flex items-center gap-3">
              {post?.tags?.length > 0 &&
                post?.tags?.map((tag) => (
                  <p
                    className="p-3 cursor-pointer rounded-full border-2 border-red-400"
                    key={tag}
                  >
                    {tag?.tagName}
                  </p>
                ))}
            </div>
          </div>
        </article>
      )
    );
};

export default PostCard;