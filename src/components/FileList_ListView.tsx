import React, { useEffect, useState } from "react";
import { Table, Tag, Button, Modal, Switch } from "antd";
import type { TableProps } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Link {
  linkId: string;
  userId: number;
  URL: string;
  createdAt: Date;
  openedAt: Date;
  views: number;
  tags: string[];
  title: string | null;
}

interface FileListResponse {
  userId: number;
  title: string;
  linkCount: number;
  createdAt: Date;
  isShared: boolean;
  isMine: boolean;
  links: Link[];
}

const enum ColorNums {
  magenta,
  red,
  volcano,
  orange,
  gold,
  lime,
  green,
  cyan,
  blue,
  geekblue,
  purple,
  colorNums_end,
}

const colorMapping = (num: ColorNums): string => {
  const colorIndex = num % ColorNums.colorNums_end;

  switch (colorIndex) {
    case ColorNums.magenta:
      return "magenta";
    case ColorNums.red:
      return "red";
    case ColorNums.volcano:
      return "volcano";
    case ColorNums.orange:
      return "orange";
    case ColorNums.gold:
      return "gold";
    case ColorNums.lime:
      return "lime";
    case ColorNums.green:
      return "green";
    case ColorNums.cyan:
      return "cyan";
    case ColorNums.blue:
      return "blue";
    case ColorNums.geekblue:
      return "geekblue";
    case ColorNums.purple:
      return "purple";
    default:
      return "magenta"; // 기본 색상
  }
};

interface DataType {
  title: string | URL;
  tags: string[];
  URL: string;
  linkId: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "URL",
    dataIndex: "title",
    key: "title",
    width: "50%",
    render: (text, record) => (
      <a
        onClick={() => {
          // PUT 요청으로 조회수 증가
          axios
            .put(
              `${import.meta.env.VITE_BACKEND_DOMAIN}/api/link/${
                record.linkId
              }/view`,
              { withCredentians: true }
            )
            .then(() => {
              console.log("View count updated for link:", record.linkId);
            })
            .catch((error) => {
              console.error("Failed to update view count:", error);
            });
          window.open(record.URL); // URL 열기
        }}
      >
        {text}
      </a>
    ),
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    width: "50%",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = colorMapping(tag.length);
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
];

const data: DataType[] = [];

const FileList_ListView: React.FC = () => {
  const { bucketId } = useParams<{ bucketId: string }>(); // URL에서 bucketId 추출
  const [fileData, setFileData] = useState<FileListResponse | null>(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPublic, setIsPublic] = useState(false); // Switch 상태
  const [url, setUrl] = useState("");
  const [initialPublicState, setInitialPublicState] = useState(false); // 모달 초기 상태 저장용

  const showModal = () => {
    setInitialPublicState(isPublic);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (fileData?.isMine) {
      axios
        .put(
          `${import.meta.env.VITE_BACKEND_DOMAIN}/api/bucket/${bucketId}/share`,
          {
            permission: isPublic,
          },
          { withCredentials: true }
        )
        .then((response) => {
          console.log("Permission updated:", response.data);
        })
        .catch((error) => {
          console.error("Failed to update permission:", error);
        });
    } else {
      axios
        .post(
          `${import.meta.env.VITE_BACKEND_DOMAIN}/api/bucket/${bucketId}/paste`,
          {
            bucket: fileData,
          },
          { withCredentials: true }
        )
        .then((response) => {
          console.log("Bucket copied:", response.data);
          const newBucketId = response.data.bucketId; // 응답에서 새로운 bucketId 추출
          if (newBucketId) {
            // 새 창에서 /main/bucket/:newBucketId 열기
            window.open(`/main/bucket/${newBucketId}`, "_blank");
          }
        })
        .catch((error) => {
          console.error("Failed to copy bucket:", error);
        });
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    if (fileData?.isMine) {
      setIsPublic(initialPublicState);
      setUrl(initialPublicState ? window.location.href : "");
    }
    setIsModalOpen(false);
  };

  const handleSwitchChange = (checked: boolean) => {
    setIsPublic(checked);
    setUrl(checked ? window.location.href : "");
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        console.log("URL copied to clipboard:", url);
      })
      .catch((err) => {
        console.error("Failed to copy URL:", err);
      });
  };

  useEffect(() => {
    if (bucketId) {
      axios
        .get<FileListResponse>(
          `${import.meta.env.VITE_BACKEND_DOMAIN}/api/bucket/${bucketId}`,
          { withCredentials: true }
        ) // bucketId를 URL에 포함
        .then((response) => {
          setFileData(response.data);
          setIsPublic(response.data.isShared); // isShared 값을 초기값으로 설정
          setUrl(response.data.isShared ? window.location.href : ""); // 초기 URL 상태 설정
        })
        .catch((error) => {
          if (error.response?.status === 401) {
            navigate("/unshared"); // 401 에러 발생 시 /unshared로 리디렉션
          } else {
            console.error("Failed to fetch file data:", error);
          }
        });
    }
  }, [bucketId, navigate]);

  const tableData = fileData
    ? fileData.links.map((link) => ({
        title: link.title || "Untitled",
        tags: link.tags,
        URL: link.URL,
        linkId: link.linkId,
      }))
    : data;

  return (
    <div>
      <div className="relative flex items-center my-4">
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold text-primary_text">
          {fileData?.title || "Title"}
        </h1>
        <Button type="primary" className="ml-auto" onClick={showModal}>
          {fileData?.isMine ? "공유" : "복사"}
        </Button>
        <Modal
          title={fileData?.isMine ? "바구니 공유" : "바구니 복사"}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {fileData?.isMine ? (
            <div className="flex flex-col items-center mt-4 gap-4">
              <div className="flex justify-center items-center gap-2">
                <span>Private</span>
                <Switch
                  size="small"
                  onChange={handleSwitchChange}
                  checked={isPublic}
                />
                <span>Public</span>
              </div>
              {isPublic && (
                <div className="flex items-center gap-2 border p-2 rounded-md">
                  <span>{url}</span>
                  <Button size="small" onClick={handleCopy}>
                    복사
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center mt-4 gap-4">
              <p>바구니를 복사하시겠습니까?</p>
            </div>
          )}
        </Modal>
      </div>
      <Table<DataType>
        columns={columns}
        dataSource={tableData}
        tableLayout="fixed"
        pagination={{
          pageSize: 10,
          position: ["bottomCenter"],
          total: fileData?.linkCount,
        }}
      />
    </div>
  );
};

export default FileList_ListView;
