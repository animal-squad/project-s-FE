import React, { useState } from "react";
import { Modal, Button } from "antd";
import { IoSearch } from "react-icons/io5";
import { useSearchLinkStore } from "../store/TagSearchStore";
import { useLinkSearchStore } from "../store/LinkSearchStore";
import { useNavigate } from "react-router-dom";
import TagSelect from "../ui/TagSelect_Search";

const Searchbox = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState(""); // 검색창 입력 상태 관리

  const { setQuery, setPage } = useLinkSearchStore();
  const { fetchSearchTags, setTagPage } = useSearchLinkStore();
  const navigate = useNavigate();

  // 모달 열기
  const showModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // 태그 확인 버튼 클릭 시 로직
  const handleConfirm = () => {
    fetchSearchTags(selectedTags); // 전역 상태 업데이트
    setIsModalOpen(false); // 모달 닫기
    setTagPage(1);
    navigate("/links"); // '/links' 페이지로 이동
  };

  // 검색어 입력 후 엔터 키 감지
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchInput.trim().length > 0) {
      const encodedSearchQuery = btoa(searchInput.trim()); // Base64 인코딩
      navigate(`/search?query=${encodedSearchQuery}`); // 이동만 처리, 요청은 Link_Search에서
    }
  };

  return (
    <div
      className="absolute flex items-center justify-between top-[234px]"
      style={{
        width: "80%", // border의 90% 너비
        left: "10%", // 중앙 정렬
      }}
    >
      {/* 검색 창 */}
      <div className="relative w-[90%] h-[86px]">
        <input
          type="text"
          placeholder="링크 검색"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown} // 엔터 입력 감지
          className="w-full h-full bg-white rounded-[57px] border border-[#b4b4b4] px-8 text-[20px] text-[#121212] font-['Inter']"
        />
        {/* IoSearch 아이콘 */}
        <IoSearch className="absolute right-6 top-1/2 transform -translate-y-1/2 text-[#b4b4b4] text-[24px]" />
      </div>
      {/* 태그 검색 버튼 */}
      <div
        className="w-[86px] h-[86px] bg-white rounded-full border border-[#b4b4b4] flex items-center justify-center cursor-pointer"
        onClick={showModal}
      >
        <span className="text-[32px] text-[#b4b4b4]">#</span>
      </div>
      {/* 태그 검색 모달 */}
      <Modal
        title="태그 검색"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            취소
          </Button>,
          <Button
            key="confirm"
            type="primary"
            style={{ backgroundColor: "#c69172", borderColor: "#c69172" }}
            onClick={handleConfirm}
          >
            확인
          </Button>,
        ]}
      >
        {/* TagSelect_Search 컴포넌트 */}
        <TagSelect value={selectedTags} onChange={setSelectedTags} linkId="" />
      </Modal>
    </div>
  );
};

export default Searchbox;
