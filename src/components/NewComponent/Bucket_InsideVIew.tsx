import React, { useState, useEffect } from "react";
import { ConfigProvider, Pagination, Dropdown, Menu } from "antd";
import { FaLink, FaEllipsisH } from "react-icons/fa";
import NewHeader from "../../Layout/NewHeader";
import FloatButton from "../../ui/FloatButton";
import TagSelect from "../../ui/TagSelect";
import { useLinkStore } from "../../store/linkStore";
import { useParams } from "react-router-dom";

const Bucket_Gridview: React.FC = () => {
  const { links, title, linkCount, isMine, fetchLinks } = useLinkStore();
  const { bucketId } = useParams<{ bucketId: string }>(); // URL에서 bucketId 추출

  // 각 항목의 체크 상태를 관리하는 배열
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(links.length).fill(false)
  );

  // 상단 네비게이션 바 표시 상태
  const [showNavBar, setShowNavBar] = useState(false);

  // 체크된 항목 수 계산
  const checkedCount = checkedItems.filter((item) => item).length;

  // 체크박스 상태 변화 감지
  useEffect(() => {
    setShowNavBar(checkedItems.some((item) => item));
  }, [checkedItems]);

  // 전체 선택 체크박스의 상태
  const isAllSelected = checkedItems.every((item) => item);

  // 전체 선택/해제 핸들러
  const handleSelectAll = () => {
    const newCheckedItems = new Array(links.length).fill(!isAllSelected);
    setCheckedItems(newCheckedItems);
  };

  // 개별 체크박스 선택/해제 핸들러
  const handleItemCheck = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  // 태그 선택 관리 배열
  const [selectedTags, setSelectedTags] = useState<Record<string, string[]>>(
    {}
  );

  // 태그 변경 로직 추가
  const handleTagChange = (linkId: string, tags: string[]) => {
    setSelectedTags((prev) => {
      let updatedTags = [...tags];

      // 조건 1: tags가 비어 있으면 '기타' 추가
      if (updatedTags.length === 0) {
        updatedTags = ["기타"];
      }
      // 조건 2: tags가 '기타'를 포함하면서 2개 이상의 요소가 있으면 '기타' 제거
      else if (updatedTags.includes("기타") && updatedTags.length > 1) {
        updatedTags = updatedTags.filter((tag) => tag !== "기타");
      }

      const newTagsState = { ...prev, [linkId]: updatedTags };

      console.log(
        `Updated tags for row with linkId ${linkId}:`,
        newTagsState[linkId]
      );

      return newTagsState;
    });
  };

  // URL에서 origin 추출
  const getOriginFromUrl = (url: string): string => {
    try {
      return new URL(url).origin;
    } catch {
      return "Invalid URL";
    }
  };

  useEffect(() => {
    if (bucketId) {
      fetchLinks(bucketId, (path) => {
        window.location.href = path; // 리디렉션 처리
      });
    }
  }, [bucketId, fetchLinks]);

  const bucketmenu = (
    <Menu
      items={[
        {
          key: "1",
          label: "제목 수정",
        },
        {
          key: "2",
          label: "삭제",
        },
        {
          key: "3",
          label: "공유",
          disabled: isMine? true: false,
        },
        {
          key: "4",
          label: "복사",
          disabled: isMine? false: true,
        },
      ]}
    />
  );

  // 드롭다운 메뉴
  const linkmenu = (
    <Menu
      items={[
        {
          key: "1",
          label: "제목 수정",
        },
        {
          key: "2",
          label: "삭제",
        },
      ]}
    />
  );

  return (
    <div className="absolute top-0 left-0 w-full bg-[#fcefef] z-0 h-[2139px]">
      {/* Border */}
      <div
        className={`fixed bottom-0 left-0 w-full bg-[#c69172] shadow-md transition-transform duration-300 z-50 ${
          showNavBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <span className="text-lg text-white font-semibold">
            {checkedCount}개 선택됨
          </span>
          <button
            onClick={() => {
              setCheckedItems(new Array(links.length).fill(false));
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            삭제
          </button>
        </div>
      </div>
      <div
        className="h-[2059px] absolute bg-[#fff6f1] rounded-[19px] mt-10 drop-shadow-2xl"
        style={{
          width: "90%",
          left: "5%",
        }}
      />
      {/* NewHeader */}
      <NewHeader />
      {/* Bucket Title */}
      <div className="relative w-full text-center py-4 top-[254px]">
        <h1 className="text-[40px] font-bold text-primary_text">{title}</h1>
        {/* 제목 옆 드롭다운 메뉴 */}
        <div
          className="absolute flex justify-end items-center pr-4"
          style={{
            width: "80%",
            left: "10%",
            top: 4, // 제목 상단 정렬
            height: "100%", // 제목 영역 내 중앙 정렬 유지
          }}
        >
          <Dropdown overlay={bucketmenu} trigger={["click"]}>
            <FaEllipsisH className="text-xl cursor-pointer text-[#959595]" />
          </Dropdown>
        </div>
      </div>
      {/* 전체 선택 체크박스 */}
      <div
        className="absolute flex items-center top-[373px] ml-4"
        style={{
          width: "80%",
          left: "10%",
        }}
      >
        <input
          type="checkbox"
          id="selectAll"
          className="peer hidden"
          checked={isAllSelected}
          onChange={handleSelectAll}
        />
        <label
          htmlFor="selectAll"
          className="w-8 h-8 border-2 border-[#b4b4b4] rounded-sm flex items-center justify-center cursor-pointer peer-checked:bg-[#c69172] peer-checked:border-[#c69172] ml-6"
        >
          {isAllSelected && (
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          )}
        </label>
        <label
          className="ml-8 text-black text-[20px] font-semibold"
          htmlFor="selectAll"
        >
          전체 선택
        </label>
      </div>
      {links.map((link, index) => (
        <div
          key={index}
          className="absolute bg-white rounded-[14px] border border-[#b4b4b4]"
          style={{
            top: `${446 + index * 157}px`, // 각 컨텐츠 간의 간격 157px
            width: "80%",
            left: "10%",
            height: "142px",
          }}
        >
          {/* 내부 구조 */}
          <div className="flex items-center h-full px-4">
            {/* 체크박스 */}
            <input
              type="checkbox"
              id={`bucket-${index}`}
              className="peer hidden"
              checked={checkedItems[index]}
              onChange={() => handleItemCheck(index)}
            />
            <label
              htmlFor={`bucket-${index}`}
              className="w-8 h-8 border-2 border-[#b4b4b4] rounded-sm flex items-center justify-center cursor-pointer peer-checked:bg-[#c69172] peer-checked:border-[#c69172] ml-6"
            >
              {checkedItems[index] && (
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              )}
            </label>
            {/* FaLink 아이콘 */}
            <div className="w-[113px] h-[106px] flex items-center justify-center rounded-3xl">
              <FaLink className="text-[#959595] text-4xl" />
            </div>
            {/* 텍스트 정보 */}
            <div className="flex-1 min-w-0">
              <div className="text-black text-2xl overflow-hidden whitespace-nowrap text-ellipsis max-w-full">
                {link.title || "Untitled"}
              </div>
              <div className="flex items-center text-[#959595] text-m font-semibold mt-2">
                <span>{getOriginFromUrl(link.URL)}</span>
                <div className="w-[1px] h-[20px] mx-4 bg-[#959595]" />
                <span>{new Date(link.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            {/* 드롭다운 메뉴 */}
            <div className="absolute right-4 top-4">
              <Dropdown overlay={linkmenu} trigger={["click"]}>
                <FaEllipsisH className="text-xl cursor-pointer text-[#959595]" />
              </Dropdown>
            </div>
            {/* Tags */}
            <div className="flex-1">
              <TagSelect
                value={selectedTags[link.linkId] || link.tags}
                onChange={(tags) => handleTagChange(link.linkId, tags)}
                linkId={link.linkId}
              />
            </div>
          </div>
        </div>
      ))}
      <div className="absolute top-[2032px] w-full flex justify-center">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#ffffff",
            },
            components: {
              Pagination: {
                itemActiveBg: "#c69172",
                itemBg: "transparent",
                itemLinkBg: "transparent",
              },
            },
          }}
        >
          <Pagination defaultCurrent={1} total={linkCount || 1} />
        </ConfigProvider>
      </div>
      {/* FloatButton */}
      <FloatButton onClick={() => console.log("FloatButton clicked!")} />
    </div>
  );
};

export default Bucket_Gridview;