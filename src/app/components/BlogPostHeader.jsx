"use client"
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import KeyboardDoubleArrowDownRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowDownRounded";
import { useState } from "react";
import CentralModal from "@/components/ui/modals/CentralModal";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import FilterButton from "@/components/ui/buttons/FilterButton";
import PostEditor from "./PostEditor";

const BlogPostHeader = ({ posts, setPosts }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const createPost = () => {
        if (!isModalOpen) setIsModalOpen(true);
        return;
    };

    const closeModal = () => {
        if (isModalOpen) setIsModalOpen(false);
        return;
    };

    return (
        <section className="bg-[#F1F5F9] rounded-t-lg px-[16px] py-[8px] shadow-md sticky top-0 z-10 border-b">
        <div className="flex items-center justify-between">
            <FilterButton
            starticon={<FilterAltRoundedIcon className="text-[14px]" />}
            endicon={
                <KeyboardDoubleArrowDownRoundedIcon className="text-[14px]" />
            }
            >
            Posts
            </FilterButton>
            <PrimaryButton
            onClick={createPost}
            icon={<AddCircleRoundedIcon className="text-[16px]" />}
            >
            Create Post
            </PrimaryButton>
        </div>

        <CentralModal
            modalTitle={"Create A New Post"}
            isModalOpen={isModalOpen}
            CloseModal={closeModal}
        >
            <PostEditor CloseModal={closeModal} posts={posts} setPosts={setPosts} />
        </CentralModal>
        </section>
    );
};

export default BlogPostHeader;