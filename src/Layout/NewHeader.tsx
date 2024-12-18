import React, { useState, useRef, useEffect } from "react";
import { userStore } from "../store/userStore";
import { useNavigate } from "react-router-dom";

const NewHeader = () => {
  const { name, photo, clearUser } = userStore();

  const [menuVisible, setMenuVisible] = useState(false); // 메뉴 상태 관리
  const menuRef = useRef<HTMLDivElement>(null); // 메뉴 참조

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      window.location.href = `${
        import.meta.env.VITE_BACKEND_DOMAIN
      }/api/auth/logout`;
      clearUser();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // 메뉴 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          Linket
        </div>
        {/* 프로필 */}
        <div className="relative" ref={menuRef}>
          <img
            className="w-[114px] h-[114px] rounded-full cursor-pointer"
            src={photo ? photo : "https://via.placeholder.com/114x114"}
            alt="Profile"
            onClick={() => setMenuVisible(!menuVisible)}
          />
          {/* 커스텀 드롭다운 메뉴 */}
          {menuVisible && (
            <div className="absolute right-0 mt-2 w-[200px] bg-white rounded-lg shadow-lg z-50">
              <div className="p-4 text-center text-gray-500 border-b font-semibold">
                {name}님
                <div className="p-2 text-center text-gray-500">안녕하세요!</div>
              </div>
              <div
                onClick={handleLogout}
                className="p-2 text-center text-red-500 cursor-pointer hover:bg-red-100 rounded-b-lg"
              >
                로그아웃
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewHeader;
