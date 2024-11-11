// FolderList.tsx
import React, { useEffect } from "react";
import FolderComponent from "./FolderComponent";
import { useNavigate } from "react-router-dom";
import { useFolderStore } from "../store/FileIndexStore";

const FolderList: React.FC = () => {
  const navigate = useNavigate();
  const { folders, setSelectedFolderIndex, fetchFolders } = useFolderStore();

  useEffect(() => {
    if (folders.length === 0) {
      fetchFolders(); // folders가 비어 있는 경우에만 데이터 가져오기
    }
  }, [fetchFolders, folders]);

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
