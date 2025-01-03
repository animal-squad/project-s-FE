// FolderComponent.tsx
import React, { useState } from "react";
import { Table, Tag, Modal, Input, message } from "antd";
import { useBucketStore } from "../store/BucketStore"; // Zustand store import
import { useNavigate } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import axios from "axios";

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

  const { meta, setPage } = useBucketStore();
  const fetchFolders = useBucketStore((state) => state.fetchFolders);

  const [isTitleModalOpen, setIsTitleModalOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState<Folder | null>(null);
  const [newTitle, setNewTitle] = useState("");

  // 바구니 제목 수정 모달 열기
  const openEditModal = (row: Folder) => {
    setCurrentRow(row);
    setNewTitle(row.title); // Set the initial title to the current row title
    setIsTitleModalOpen(true);
  };

  // 바구니 제목 수정 모달 닫기
  const handleTitleCancel = () => {
    setIsTitleModalOpen(false);
    setCurrentRow(null);
    setNewTitle("");
  };

  // 제목 변경 로직
  const handleTitleChange = async () => {
    if (currentRow && newTitle && newTitle !== currentRow.title) {
      // API call to update the title
      await axios
        .put(
          `${import.meta.env.VITE_BACKEND_DOMAIN}/api/bucket/${
            currentRow.bucketId
          }`,
          { title: newTitle },
          { withCredentials: true }
        )
        .catch((error) => {
          if (error.response?.status === 401) {
            navigate("/unauthorized"); // 401 에러 발생 시 /unauthorized로 리디렉션
          } else {
            console.error("Failed to update title:", error);
          }
        });
      message.success("바구니 제목이 성공적으로 변경되었습니다!");
      setIsTitleModalOpen(false);
      fetchFolders(meta?.page || 1, navigate); // Refresh folder data
    } else {
      message.info("변경 사항이 없습니다.");
    }
  };
  const columns = [
    {
      title: "바구니",
      dataIndex: "title",
      key: "title",
      width: "52%",
      render: (text: string, record: Folder) => (
        <a onClick={() => onFolderClick(record.bucketId)}>{text}</a>
      ),
    },
    {
      title: "",
      dataIndex: "edit",
      key: "edit",
      width: "3%",
      render: (text: string, record: Folder) => (
        <FaPen
          style={{ cursor: "pointer" }}
          onClick={() => openEditModal(record)}
        />
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
      <Modal
        title="바구니 제목 수정"
        open={isTitleModalOpen}
        onOk={handleTitleChange}
        onCancel={handleTitleCancel}
      >
        <Input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="새로운 제목을 입력하세요"
        />
      </Modal>
    </div>
  );
};

export default FolderComponent;
