"use client"
const ProfileCard = ({ currentUserData }) => {
  return (
    <article className="rounded-lg flex gap-[14px] items-center">
      <img
        src="https://res.cloudinary.com/da2lno6lq/image/upload/v1691166188/Prasad_Mavayya_j0bplh.jpg"
        alt="person"
        className="w-[40px] h-[50px] object-cover rounded-md"
      />
      <div className="flex flex-col ">
        <p className="text-[14px] text-[#0F172A] font-semibold">
          {currentUserData ? currentUserData?.name: `Loading` }
        </p>
        <p className="text-[12px] text-[#0F172A]/60 font-medium">
          Med-Chem Scientist
        </p>
      </div>
    </article>
  );
};

export default ProfileCard;
