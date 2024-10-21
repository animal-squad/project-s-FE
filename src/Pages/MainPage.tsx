import React from "react";
import { Example } from "../Layout/Sidebar";
import BasicTabs from "../Layout/Header";
import { useTabStore } from "../store/headerStore"; // Zustand 스토어 불러오기

const StoragePage = () => (
  <label className="block text-primary_text text-xl font-bold mb-2 flex justify-center">
    Storage
  </label>
);
const LinkPage = () => (
  <label className="block text-primary_text text-xl font-bold mb-2 flex justify-center">
    Links
  </label>
);
const TextPage = () => (
  <label className="block text-primary_text text-xl font-bold mb-2 flex justify-center">
    Texts
  </label>
);
// 임시 화면들. 추후 Pages 내에 만들고 적용 예정

const MainPage = () => {
  const selectedTab = useTabStore((state) => state.selectedHeaderTab); // Zustand에서 상태 불러오기

  // 선택된 탭에 따라 다른 컴포넌트 렌더링
  const renderContent = () => {
    switch (selectedTab) {
      case 0:
        return <StoragePage />;
      case 1:
        return <LinkPage />;
      case 2:
        return <TextPage />;
      default:
        return <StoragePage />;
    }
  };

  return (
    <div>
      <div className="flex h-screen">
        <Example />
        <div className="relative">
          <BasicTabs />
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
