"use client"
const PrimaryButton = ({ children, icon, size, onClick, type }) => {
    return (
      <>
        {size == "small" ? (
          <button
            type={type ? type : "button"}
            onClick={onClick}
            className="bg-gradient-to-r from-[#A855F7] to-[#D946EF] text-[#fff] p-1 flex items-center justify-center rounded-full"
          >
            <span className="w-full text-[14px] font-semibold p-1 flex items-center justify-center rounded-full">
              {icon}
              {children}
            </span>
          </button>
        ) : (
          <button
            type={type ? type : "button"}
            onClick={onClick}
            className="bg-gradient-to-r from-[#A855F7] to-[#D946EF] text-[#fff] p-1 flex items-center justify-center rounded-full"
          >
            <span className="w-full text-[14px] font-semibold px-[16px] py-[6px] flex items-center gap-[8px] rounded-full">
              {icon}
              {children}
            </span>
          </button>
        )}
      </>
    );
};

export default PrimaryButton;
