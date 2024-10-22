import React from "react";
import { Example } from "../Layout/Sidebar";
import { useTabStore } from "../store/headerStore"; // Zustand 스토어 불러오기
import LinkHeader from "../Layout/Header/LinkHeader";
import StorageHeader from "../Layout/Header/StorageHeader";
import TextsHeader from "../Layout/Header/TextsHeader";
import StoragePage from "./StoragePage";
import TextsPage from "./TextsPage";
import MyBookmarksPage from "./MyBookmarksPage";
import BookmarksInFilesPage from "./BookmarksInFilesPage";

const MainPage = () => {
  const selectedTab = useTabStore((state) => state.selectedHeaderTab); // Zustand에서 상태 불러오기

  const renderHeader = () => {
    if (location.pathname === "/main/storage") {
      return <StorageHeader />;
    } else if (location.pathname === "/main/link") {
      return <LinkHeader />;
    } else if (location.pathname === "/main/texts") {
      return <TextsHeader />;
    } else {
      return <h1>Default Header</h1>;
    }
  };

  // 선택된 탭에 따라 다른 컴포넌트 렌더링
  const renderContent = () => {
    if (location.pathname === "/main/storage") {
      return <StoragePage />;
    } else if (location.pathname === "/main/texts") {
      return <TextsPage />;
    } else if (location.pathname === "/main/link") {
      switch (selectedTab) {
        case 0:
          return <MyBookmarksPage />;
        case 1:
          return <BookmarksInFilesPage />;
        default:
          return <MyBookmarksPage />;
      }
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="z-10">
        <Example />
      </div>
      {/* Main Content Area */}
      <div
        className="fixed ml-28 flex-col flex-1 w-500
"
      >
        {/* Header */}
        <div className="flex w-full h-16">
          {" "}
          {/* flex 추가 */}
          <div className="flex-1">
            {/* 사이드바를 제외한 영역 차지 */}
            {renderHeader()}
          </div>
        </div>
        {/* Page Content */}
        <div className="flex-auto overflow-auto flex justify-center items-center">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
