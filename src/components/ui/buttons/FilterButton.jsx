"use client"
const FilterButton = ({ children, starticon, endicon }) => {
  return (
    <button className=" text-[#0F172A] px-[8px] py-[4px] border-2 border-[#0F172A] flex gap-[8px] items-center rounded-[8px]">
      {starticon}
      <p className="text-[14px] font-semibold ">{children}</p>
      {endicon}
    </button>
  );
};

export default FilterButton;
