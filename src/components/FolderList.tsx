// FolderList.tsx
import React, { useEffect } from "react";
import FolderComponent from "./FolderComponent";
import { useNavigate } from "react-router-dom";
import { useFolderStore } from "../store/FileIndexStore";

const FolderList: React.FC = () => {
  const navigate = useNavigate();
  const { folders, page, setSelectedFolderIndex, fetchFolders } =
    useFolderStore();

  useEffect(() => {
    fetchFolders(page, navigate); // 컴포넌트 로드 시 항상 데이터 가져오기
  }, [fetchFolders, navigate, page]);

  const handleFolderClick = (bucketId: string) => {
    const index = folders.findIndex((folder) => folder.bucketId === bucketId);
    setSelectedFolderIndex(index); // Zustand 상태 업데이트
    navigate(`/main/bucket/${bucketId}`);
  };

  return (
    <div>
      <FolderComponent folders={folders} onFolderClick={handleFolderClick} />
    </div>
  );
};

export default FolderList;
