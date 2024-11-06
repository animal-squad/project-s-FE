// BucketPage.tsx
import React from "react";
import { useLocation } from "react-router-dom";
import FolderList from "../components/FolderList";
import FileList from "../components/FileList_ListView";

const BucketPage: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen">
      <div className="flex-col flex-1 w-500">
        <div className="flex-auto overflow-auto flex justify-center items-center ml-5 pr-16">
          {location.pathname === "/main/bucket" ? <FolderList /> : <FileList />}
        </div>
      </div>
    </div>
  );
};

export default BucketPage;
