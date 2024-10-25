// FolderComponent.tsx
import React from "react";
import { FaFolder } from "react-icons/fa";

interface FolderComponentProps {
  name: string;
  link?: string;
  onClick: () => void;
}

const FolderComponent: React.FC<FolderComponentProps> = ({ name, onClick }) => {
  return (
    <div
      className="flex flex-col items-center p-2 bg-transparent hover:bg-gray-100 min-w-28"
      onClick={onClick} // 클릭 이벤트 처리
    >
      <div className="w-16 h-12 bg-yellow-300 rounded-md mb-2"></div>
      <FaFolder color="ebc351" size="30" />
      <span className="text-sm text-center text-primary_text">{name}</span>
    </div>
  );
};

export default FolderComponent;
