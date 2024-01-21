"use client"
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import CancelIcon from "@mui/icons-material/Cancel";
import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";
import BookmarkAddRoundedIcon from "@mui/icons-material/BookmarkAddRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";

const PostCard = ({ post }) => {
    const date = new Date(post.$updatedAt);
    return (
        <article className="bg-white/70 border rounded-lg shadow-sm">
            <div className="flex">
                {/* Left Image */}
                <div className="w-1/2 h-auto rounded-tl-[16px] rounded-bl-[16px]">
                    <img
                        src={
                        "https://images.pexels.com/photos/3825573/pexels-photo-3825573.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        }
                        alt="postimage"
                        className="w-full h-full object-cover rounded-tl-lg rounded-bl-lg"
                    />
                </div>
                {/* Right Text */}
                <div className="w-1/2 flex flex-col justify-between">
                    <div className="flex w-full flex-col px-[16px]">
                        <div className="flex w-full items-start gap-2 pt-2">
                            <img
                                src="https://res.cloudinary.com/da2lno6lq/image/upload/v1691166188/Prasad_Mavayya_j0bplh.jpg"
                                className="w-[50px] h-[70px] object-cover rounded-[4px] mt-1"
                            />
                            <p className="text-[18px] w-[80%] break-words font-bold text-[#0F172A]/90">
                                {post?.postTitle}
                            </p>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2 text-[#0F172A]/60">
                                <p className="text-sm font-medium">Dr. Prasad, PhD</p>
                                <p className="text-sm font-medium">-</p>
                                <p className="text-sm font-medium">{date.toLocaleString()}</p>
                            </div>
                            <div className="flex items-center gap-2 cursor-pointer text-[#0F172A]/60">
                                <MoreHorizRoundedIcon className="text-[16px]" />
                                <CancelIcon className="text-[16px]" />
                            </div>
                        </div>
                        {/* Text Content */}
                        <pre className="text-sm font-medium h-[190px] text-[#334155] overflow-y-auto w-full break-words whitespace-pre-wrap">
                        {post?.postContent}
                        </pre>
                    </div>
                    <div>
                        {/* Tags */}
                        <div className="flex gap-[8px] px-[16px] py-[8px] items-center">
                        {/* {post.tags.map((tag, index) => (
                            <Tags key={index}>{tag}</Tags>
                        ))} */}
                        <button className="rounded-full bg-gradient-to-r from-[#FAF5FF] to-[#FDF4FF] w-[22px] h-[22px] flex items-center justify-center">
                            <MoreVertRoundedIcon className="text-[16px] font-[600] text-[#0F172A]/60" />
                        </button>
                        </div>
                        {/* Likes, Comments, Reposts, Bookmark */}
                        <div className="flex justify-between items-center bg-gradient-to-r from-[#FAF5FF] to-[#FDF4FF] px-[16px] py-[12px] rounded-lg">
                        <button className="flex items-center gap-2 border border-[#7E22CE]/80 py-[3px] px-[12px] rounded-full">
                            <ThumbUpAltRoundedIcon className="text-[#7E22CE]" />
                            <p className="text-[12px] font-[600] text-[#7E22CE]">
                            {post?.likes}
                            </p>
                        </button>
                        <button className="flex items-center gap-2 border border-[#1E293B] py-[3px] px-[12px] rounded-full">
                            <CommentRoundedIcon className="text-[#1E293B]" />
                            <p className="text-[12px] font-[600] text-[#1E293B]">6k</p>
                        </button>
                        <button className="flex items-center gap-2 border border-[#1E293B] py-[3px] px-[12px] rounded-full">
                            <RepeatRoundedIcon className="text-[#1E293B]" />
                            <p className="text-[12px] font-[600] text-[#1E293B]">10k</p>
                        </button>
                        <button className="flex items-center gap-2 border border-[#7E22CE]/80 py-[3px] px-[12px] rounded-full">
                            <BookmarkAddRoundedIcon className="text-[#7E22CE]" />
                            <p className="text-[12px] font-[600] text-[#7E22CE]">
                            Bookmarked
                            </p>
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default PostCard;
