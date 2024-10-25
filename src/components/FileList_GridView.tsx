// FileList.tsx
import React from "react";
import { useFolderStore } from "../store/FileIndexStore";
import FileComponent from "./FileComponent_GridView";

const files = [
  [
    { id: 1, name: "과학-1" },
    { id: 2, name: "과학-2" },
    { id: 3, name: "과학-3" },
    { id: 1, name: "과학-1" },
    { id: 2, name: "과학-2" },
    { id: 3, name: "과학-3" },
    { id: 1, name: "과학-1" },
    { id: 2, name: "과학-2" },
    { id: 3, name: "과학-3" },
    { id: 1, name: "과학-1" },
    { id: 2, name: "과학-2" },
    { id: 3, name: "과학-3" },
  ],
  [
    { id: 1, name: "공학-1" },
    { id: 2, name: "공학-2" },
    { id: 3, name: "공학-3" },
  ],
  [
    { id: 1, name: "엔터테인먼트-1" },
    { id: 2, name: "엔터테인먼트-2" },
    { id: 3, name: "엔터테인먼트-3" },
    { id: 1, name: "엔터테인먼트-1" },
    { id: 2, name: "엔터테인먼트-2" },
    { id: 3, name: "엔터테인먼트-3" },
    { id: 1, name: "엔터테인먼트-1" },
    { id: 2, name: "엔터테인먼트-2" },
    { id: 3, name: "엔터테인먼트-3" },
    { id: 1, name: "엔터테인먼트-1" },
    { id: 2, name: "엔터테인먼트-2" },
    { id: 3, name: "엔터테인먼트-3" },
  ],
  [
    { id: 1, name: "생활-1" },
    { id: 2, name: "생활-2" },
    { id: 3, name: "생활-3" },
  ],
  [
    { id: 1, name: "정치 / 사회-1" },
    { id: 2, name: "정치 / 사회-2" },
    { id: 3, name: "정치 / 사회-3" },
  ],
  [
    { id: 1, name: "경제-1" },
    { id: 2, name: "경제-2" },
    { id: 3, name: "경제-3" },
  ],
  [
    { id: 1, name: "쇼핑-1" },
    { id: 2, name: "쇼핑-2" },
    { id: 3, name: "쇼핑-3" },
  ],
  [
    { id: 1, name: "건강-1" },
    { id: 2, name: "건강-2" },
    { id: 3, name: "건강-3" },
  ],
  [
    { id: 1, name: "취업-1" },
    { id: 2, name: "취업-2" },
    { id: 3, name: "취업-3" },
  ],
];

const FileList: React.FC = () => {
  const selectedFolderIndex = useFolderStore(
    (state) => state.selectedFolderIndex
  );
  console.log(selectedFolderIndex);
  const selectedFiles =
    selectedFolderIndex !== null ? files[selectedFolderIndex] : [];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-9 xl:grid-cols-10 gap-6 justify-center overflow-hidden">
      {selectedFiles.map((file) => (
        <FileComponent key={file.id} name={file.name} />
      ))}
    </div>
  );
};

export default FileList;
