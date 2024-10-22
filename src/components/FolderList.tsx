// FolderList.tsx
import React from 'react';
import FolderComponent from './FolderComponent';


const folders = [
    { id: 1, name: '과학' },
    { id: 2, name: '공학' },
    { id: 3, name: '엔터테인먼트' },
    { id: 4, name: '생활' },
    { id: 5, name: '정치 / 사회' },
    { id: 6, name: '경제' },
    { id: 7, name: '쇼핑' },
    { id: 8, name: '건강' },
    { id: 9, name: '취업' },
    
    // 필요에 따라 동적으로 추가 가능
];

const FolderList: React.FC = () => {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10 gap-4 justify-center"> {/* 중앙 정렬을 위한 클래스 추가 */}
        {folders.map(folder => (
          <FolderComponent key={folder.id} name={folder.name} />
        ))}
      </div>
    );
  };

export default FolderList;
