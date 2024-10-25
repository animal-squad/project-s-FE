import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  // const navigate = useNavigate(); // useNavigate 훅 사용

  // 메인 페이지로 보내는 핸들러
  // const handleNavigateToMain = () => {
  //   navigate("/main/storage");
  // };

  const handleLogin = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_DOMAIN}/auth/google`);
      console.log("Login successful:", response.data);
      // 로그인 성공 시 메인 페이지로 이동
    } catch (error) {
      console.error("Login failed:", error);
      // 로그인 실패 시 필요한 처리
    }
  };

  return (
    <div className="relative flex items-center justify-center v-screen w-full">
      <DotLottieReact // Lottie 애니메이션
        src="src/assets/animations/fileAnimation.lottie"
        loop
        autoplay
        className="absolute z-0 items-center"
      /> 
      <div className="relative z-10 flex justify-center w-screen">
        <form className="rounded px-8 pt-6 pb-8 mb-4 bg-white bg-opacity-20 backdrop-blur-md shadow-lg">
          <div className="mb-4">
            <label className="block text-primary_text text-xl font-bold mb-2 flex justify-center ">
              로그인
            </label>
          </div>
          <div className="flex items-center justify-center">
            <button // Continue with Google 버튼
              type="button"
              className="p-0 m-0 border-none bg-transparent"
              onClick={handleLogin} // 메인으로 이동, 추후에 여기에 로그인 기능 추가 예정
            >
              <img // Continue with Google 이미지
                src="src/assets/images/web_neutral_rd_ctn.svg"
                alt="Continue with Google"
                className="w-auto h-auto"
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
