// ListViewApp.tsx
import React from "react";
import { Table, Tag } from "antd";
import { useFolderStore } from "../store/FileIndexStore"; // Zustand store import
import { useNavigate } from "react-router-dom";

interface Folder {
  bucketId: string;
  title: string;
  linkCount: number;
  createdAt: Date;
  isShared: boolean;
}

interface FolderComponentProps {
  folders: Folder[];
  onFolderClick: (bucketId: string) => void;
}

const FolderComponent: React.FC<FolderComponentProps> = ({
  folders,
  onFolderClick,
}) => {

  const navigate = useNavigate();

  const { meta, setPage } = useFolderStore();
  const fetchFolders = useFolderStore((state) => state.fetchFolders);
  const columns = [
    {
      title: "바구니",
      dataIndex: "title",
      key: "title",
      width: "55%",
      render: (text: string, record: Folder) => (
        <a onClick={() => onFolderClick(record.bucketId)}>{text}</a>
      ),
    },
    {
      title: "링크 수",
      dataIndex: "linkCount",
      key: "linkCount",
      width: "15%",
    },
    {
      title: "생성 일자",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "15%",
      render: (date: Date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "공유 여부",
      dataIndex: "isShared",
      key: "isShared",
      width: "15%",
      render: (isShared: boolean) => (
        <Tag color={isShared ? "green" : "red"}>{isShared ? "Yes" : "No"}</Tag>
      ),
    },
  ];

  const handlePageChange = (newPage: number) => {
    setPage(newPage); // 현재 페이지를 상태로 업데이트
    fetchFolders(newPage, navigate); // 새로운 페이지 데이터를 가져오기 위해 fetchFolders 호출
  };

  return (
    <div>
      <div className="relative flex items-center my-8">
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold text-primary_text">
          바구니 목록
        </h1>
      </div>
      <Table<Folder>
        columns={columns}
        dataSource={folders}
        tableLayout="fixed"
        pagination={{
          pageSize: 10,
          position: ["bottomCenter"],
          current: meta?.page,
          total: meta?.totalBuckets,
          onChange: handlePageChange,
        }}
      />
    </div>
  );
};

export default FolderComponent;
