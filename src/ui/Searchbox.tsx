import React from "react";
import { IoSearch } from "react-icons/io5";

const Searchbox = () => {
  return (
    <div
      className="absolute flex items-center justify-between top-[234px]"
      style={{
        width: "80%", // border의 90% 너비
        left: "10%", // 중앙 정렬
      }}
    >
      {/* 검색 창 */}
      <div className="relative w-[90%] h-[86px]">
        <input
          type="text"
          placeholder="링크 검색"
          className="w-full h-full bg-white rounded-[57px] border border-[#b4b4b4] px-8 text-[20px] text-[#121212] font-['Inter']"
        />
        {/* IoSearch 아이콘 */}
        <IoSearch className="absolute right-6 top-1/2 transform -translate-y-1/2 text-[#b4b4b4] text-[24px]" />
      </div>
      {/* 태그 검색 버튼 */}
      <div className="w-[86px] h-[86px] bg-white rounded-full border border-[#b4b4b4] flex items-center justify-center">
        <span className="text-[32px] text-[#b4b4b4]">#</span>
      </div>
    </div>
  );
};

export default Searchbox;
