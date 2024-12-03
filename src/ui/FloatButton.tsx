import React from "react";

interface FloatButtonProps {
  onClick?: () => void; // 클릭 이벤트 핸들러
}

const FloatButton: React.FC<FloatButtonProps> = ({ onClick }) => {
  return (
    <div
      className={`fixed bottom-8 right-12 w-[70px] h-[70px] bg-[#c69172] rounded-full shadow-lg flex items-center justify-center cursor-pointer`}
      onClick={onClick}
    >
      <span className="text-white text-[32px] font-semibold">+</span>
    </div>
  );
};

export default FloatButton;
