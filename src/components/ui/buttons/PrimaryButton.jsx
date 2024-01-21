"use client"
const PrimaryButton = ({ children, icon, size, onClick, type }) => {
    return (
        <>
        {size == "small" ? (
            <button
            type={type ? type : "button"}
            onClick={onClick}
            className="bg-gradient-to-r from-[#A855F7] to-[#D946EF] text-[#fff] px-[8px] py-[4px] flex items-center gap-[4px] rounded-full"
            >
            {icon}
            <p className="text-[12px] font-semibold">{children}</p>
            </button>
        ) : (
            <button
            type={type ? type : "button"}
            onClick={onClick}
            className="bg-gradient-to-r from-[#A855F7] to-[#D946EF] text-[#fff] px-[16px] py-[6px] flex items-center gap-[8px] rounded-full"
            >
            {icon}
            <p className="text-[14px] font-semibold">{children}</p>
            </button>
        )}
        </>
    );
};

export default PrimaryButton;
