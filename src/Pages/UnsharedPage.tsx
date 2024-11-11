import React from "react";
import { RiChatPrivateFill } from "react-icons/ri";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center v-screen w-full">
      <div className="flex justify-center w-screen">
        <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="block text-primary_text text-m font-bold mb-2 flex justify-center">
            <RiChatPrivateFill color="000000" size="100" />
          </div>
          <br></br>
          <label className="block text-primary_text text-xl font-bold mb-2 flex justify-center">
            사용자가 공유하지 않은 바구니입니다
          </label>
          <br></br>
          <label className="block text-primary_text text-m font-bold mb-2 flex justify-center">
            이전 페이지로 돌아가기
          </label>
          <div className="flex items-center justify-center mt-5">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="p-0 m-0 border-none bg-transparent"
            >
              <IoArrowBack color="000000" size="50" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
