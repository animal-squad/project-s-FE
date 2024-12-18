import React from "react";
// import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  // const navigate = useNavigate(); // useNavigate 훅 사용

  // 메인 페이지로 보내는 핸들러
  // const handleNavigateToMain = () => {
  //   navigate("/bucket");
  // };
  function getSessionIdFromCookies() {
    const cookies = document.cookie.split('; ');
    const sessionCookie = cookies.find(cookie => cookie.startsWith('sessionId='));
    if (sessionCookie) {
      const sessionId = sessionCookie.split('=')[1];
      console.log('Session ID:', sessionId);
    } else {
      console.log('Session ID 쿠키가 존재하지 않습니다.');
    }
  }
  
  getSessionIdFromCookies();

  const handleLogin = async () => {
    try {
      window.location.href = `${
        import.meta.env.VITE_BACKEND_DOMAIN
      }/api/auth/google`;
      // 로그인 성공 시 메인 페이지로 이동
    } catch (error) {
      console.error("Login failed:", error);
      // 로그인 실패 시 필요한 처리
    }
  };

  const googleLoginButton = import.meta.env.VITE_GOOGLE_BUTTON;

  return (
    <div className="relative flex items-center justify-center v-screen w-full">
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
                src={googleLoginButton}
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
