// StoragePage.tsx
import React from "react";
import { useLocation } from "react-router-dom";
import FolderList from "../components/FolderList";
import FileList from "../components/FileList";

const StoragePage: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen">
      <div className="flex-col flex-1 w-500">
        <div className="flex-auto overflow-auto flex justify-center items-center ml-5">
          {location.pathname === "/main/storage" ? <FolderList /> : <FileList />}
        </div>
      </div>
    </div>
  );
};

export default StoragePage;
