import React from "react";
import { userStore } from "../store/userStore";

const NewHeader = () => {
  const { photo } = userStore();

  return (
    <div
      className="h-[140px] absolute bg-[#c69172] top-[40px] rounded-t-[19px]"
      style={{
        width: "90%",
        left: "5%",
      }}
    >
      {/* 텍스트 + 프로필 */}
      <div className="absolute inset-0 flex items-center justify-between px-8">
        {/* 링킷 */}
        <div className="text-white text-[80px] font-normal font-['Bagel Fat One']">
          링킷
        </div>
        {/* 프로필 */}
        <img
          className="w-[114px] h-[114px] rounded-full"
          src={photo ? photo : "https://via.placeholder.com/114x114"}
          alt="Profile"
        />
      </div>
    </div>
  );
};

export default NewHeader;
