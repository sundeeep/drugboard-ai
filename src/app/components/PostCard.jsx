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

const PostCard = ({ post }) => {
    const [postData, setPostData] = useState(post);
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
        postData &&
        <article>
                <h1>{postData?.postTitle}</h1>
        </article>
    );
};

export default PostCard;