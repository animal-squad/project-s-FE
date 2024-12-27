import React, { useState } from "react";
import { Modal, Input, Button, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface FloatButtonProps {
  onClick?: () => void; // 클릭 이벤트 핸들러
}

const FloatButton: React.FC<FloatButtonProps> = ({ onClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState(""); // 입력된 URL 상태
  const navigate = useNavigate();

  // 모달 열기
  const showModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const handleCancel = () => {
    setIsModalOpen(false);
    setLinkUrl(""); // 입력값 초기화
  };

  function isValidURL(url: string) {
    const urlRegex = /^(https?|ftp):\/\/(-\.)?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?$/i;
    return urlRegex.test(url);
  }

  // 링크 추가 요청
  const handleAddLink = async () => {
    if (!linkUrl.trim()) {
      message.error("링크를 입력해주세요.");
      return;
    }

    if (isValidURL(linkUrl)) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_DOMAIN}/api/link/`,
          { URL: linkUrl },
          { withCredentials: true }
        );

        if (response.status === 201) {
          message.success("링크가 성공적으로 추가되었습니다.");
          setIsModalOpen(false);
          setLinkUrl(""); // 입력값 초기화
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          navigate("/unauthorized"); // 401 리디렉션
        } else {
          message.error("링크 추가에 실패했습니다.");
          console.error("Error adding link:", error);
        }
      }
    } else {
      message.error("올바르지 않은 링크입니다.");
    }
  };

  // Enter 키 입력 핸들러
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddLink(); // Enter 입력 시 링크 추가 실행
      setIsModalOpen(false);
    }
  };

  return (
    <>
      {/* FloatButton */}
      <div
        className={`fixed bottom-8 right-12 w-[70px] h-[70px] bg-[#c69172] rounded-full shadow-lg flex items-center justify-center cursor-pointer`}
        onClick={showModal} // 클릭 시 모달 열기
      >
        <span className="text-white text-[32px] font-semibold">+</span>
      </div>
      {/* 링크 추가 모달 */}
      <Modal
        title="링크 추가"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            취소
          </Button>,
          <Button
            key="submit"
            type="primary"
            style={{ backgroundColor: "#c69172", borderColor: "#c69172" }}
            onClick={handleAddLink}
            disabled={!isValidURL(linkUrl)} // URL 유효성에 따라 버튼 활성화
          >
            추가
          </Button>,
        ]}
      >
        <Input
          placeholder="링크 입력..."
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)} // URL 입력 업데이트
          onKeyDown={handleKeyPress}
        />
        {!isValidURL(linkUrl) &&
          linkUrl.length > 0 && ( // 유효하지 않을 때 경고 메시지 표시
            <p style={{ color: "red", marginTop: "8px", fontSize: "12px" }}>
              링크는 반드시 "http://" 또는 "https://"로 시작해야 합니다.
            </p>
          )}
      </Modal>
    </>
  );
};

export default FloatButton;
