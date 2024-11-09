import React from "react";
import { LuLogIn } from "react-icons/lu";
import { ReactComponent as Bucket_Icon_Black } from "../../public/assets/icons/Bucket_Icon_Black.svg";
import { useNavigate } from "react-router-dom";

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center v-screen w-full">
      <div className="flex justify-center w-screen">
        <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="block text-primary_text text-m font-bold mb-2 flex justify-center">
            <Bucket_Icon_Black></Bucket_Icon_Black>
          </div>
          <br></br>
          <label className="block text-primary_text text-xl font-bold mb-2 flex justify-center">
            서비스를 이용하시려면 로그인을 해 주세요
          </label>
          <br></br>
          <label className="block text-primary_text text-m font-bold mb-2 flex justify-center">
            로그인 페이지로 이동
          </label>
          <div className="flex items-center justify-center mt-5">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="p-0 m-0 border-none bg-transparent"
            >
              <LuLogIn color="000000" size="30" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
