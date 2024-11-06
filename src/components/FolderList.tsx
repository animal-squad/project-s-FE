// FolderList.tsx
import React from "react";
import FolderComponent from "./FolderComponent";
import { useNavigate } from "react-router-dom";
import { useFolderStore } from "../store/FileIndexStore";

const folders = [
  { id: 1, name: "과학" },
  { id: 2, name: "공학" },
  { id: 3, name: "엔터테인먼트" },
  { id: 4, name: "생활" },
  { id: 5, name: "정치 / 사회" },
  { id: 6, name: "경제" },
  { id: 7, name: "쇼핑" },
  { id: 8, name: "건강" },
  { id: 9, name: "취업" },
  // 필요에 따라 동적으로 추가 가능
];

const FolderList: React.FC = () => {
  const navigate = useNavigate();
  const setSelectedFolderIndex = useFolderStore((state) => state.setSelectedFolderIndex);

  const handleFolderClick = (id: number) => {
    setSelectedFolderIndex(id - 1); // Zustand 상태 업데이트, 배열 인덱스는 0부터 시작하므로 조정
    navigate(`/main/bucket/${id}`);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-9 xl:grid-cols-10 gap-6 justify-center overflow-hidden">
      {folders.map(folder => (
        <FolderComponent 
          key={folder.id} 
          name={folder.name} 
          onClick={() => handleFolderClick(folder.id)} // 클릭 이벤트 핸들러에서 ID를 사용
        />
      ))}
    </div>
  );
};

export default FolderList;