const Tags = ({ children }) => {
  return (
    <button className=" bg-gradient-to-r from-[#FAF5FF] to-[#FDF4FF] rounded-full px-[16px] py-[4px]">
      <p className="text-[10px] font-[600] text-[#000]/60">{children}</p>
    </button>
  );
};

export default Tags;
