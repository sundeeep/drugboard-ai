"use client";
const SecondaryButton = ({ children, icon, size, onClick, type }) => {
        return (
          <>
            {size == "small" ? (
              <button
                type={type ? type : "button"}
                onClick={onClick}
                className="bg-gradient-to-r from-[#A855F7] to-[#D946EF] text-[#334155] px-[8px] py-[4px] flex items-center gap-[4px] rounded-full"
              >
                <span className="w-full bg-white text-[14px] font-semibold p-1 flex items-center justify-center rounded-full">
                  {icon}
                  {children}
                </span>
              </button>
            ) : (
              <button
                type={type ? type : "button"}
                onClick={onClick}
                className="bg-gradient-to-r from-[#A855F7] to-[#D946EF] text-[#334155] p-1 flex items-center justify-center rounded-full"
              >
                <span className="w-full bg-white text-[14px] font-semibold px-[16px] py-[6px] flex items-center gap-[8px] rounded-full">
                  {icon}
                  {children}
                </span>
              </button>
            )}
          </>
        );
};

export default SecondaryButton;
