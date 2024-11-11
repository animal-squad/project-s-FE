import React from "react";
import { ReactComponent as Bucket_Icon } from "../../public/assets/icons/Bucket_Icon.svg";

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
      <Bucket_Icon width="60" height="60" />
      <span className="text-sm text-center text-primary_text">{name}</span>
    </div>
  );
};

export default FolderComponent;
