// StoragePage.tsx
import React from 'react';
import FolderList from '../components/FolderList';

const StoragePage: React.FC = () => {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col w-full p-10 px-32">
        <main className="flex-grow p-4 px-12 pt-0 mb-28 bg-transparent overflow-auto"> {/* 하단 여백 추가 */}
          <div className="container mx-auto">
            <FolderList />
          </div>
        </main>
      </div>
    </div>
  );
};

export default StoragePage;