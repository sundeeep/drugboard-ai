"use client"
const ProfileCard = ({ currentUserData }) => {
  return (
    <article className="cursor-pointer border-2 rounded-lg flex gap-1 hover:bg-[#D1FAE5] hover:animate-pulse ease-in-out transition-all items-center">
      {currentUserData && currentUserData?.prefs?.profileImageURL ? (
        <img
          src={currentUserData?.prefs?.profileImageURL}
          alt="person"
          className="w-[40px] h-[50px] object-cover rounded-md"
        />
      ) : (
        <img
          src="/anonymous-user.png"
          alt="person"
          className="w-[40px] h-[50px] object-cover rounded-md"
        />
      )}

      <div className="flex flex-col p-2">
        <p className="text-[14px] text-[#0F172A] font-semibold">
          {currentUserData
            ? currentUserData?.prefs?.displayName
              ? currentUserData?.prefs?.displayName
              : currentUserData?.name
            : `Loading...`}
        </p>
        <p className="text-[12px] text-[#0F172A]/60 font-medium">
          {currentUserData
            ? currentUserData?.prefs?.resignation &&
              currentUserData?.prefs?.resignation
            : `Loading...`}
        </p>
      </div>
    </article>
  );
};

export default ProfileCard;
