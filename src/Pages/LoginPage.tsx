import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate(); // Use the useNavigate hook

  // Handler for navigating to the main page
  const handleNavigateToMain = () => {
    navigate("/main"); // Programmatically navigate to /main
  };

  return (
    <div className="relative flex items-center justify-center v-screen w-full">
      <DotLottieReact
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
            <button
              type="button"
              className="p-0 m-0 border-none bg-transparent"
              onClick={handleNavigateToMain}
            >
              <img
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
