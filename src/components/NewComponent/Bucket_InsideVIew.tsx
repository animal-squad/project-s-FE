import React, { useState } from "react";
import { ConfigProvider, Pagination } from "antd";
import { FaLink } from "react-icons/fa";
import NewHeader from "../../Layout/NewHeader";
import Searchbox from "../../ui/Searchbox";
import FloatButton from "../../ui/FloatButton";

const Bucket_Gridview = () => {
  const bucketData = Array(10).fill({
    title: "실리카겔 (Silica Gel) - NO PAIN [MV]",
    origin: "https://youtube.com",
    dateCreated: "2024.11.26",
    count: 5,
    imageUrl: "https://via.placeholder.com/113x106",
  });

  // 각 항목의 체크 상태를 관리하는 배열
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(bucketData.length).fill(false)
  );

  // 전체 선택 체크박스의 상태
  const isAllSelected = checkedItems.every((item) => item);

  // 전체 선택/해제 핸들러
  const handleSelectAll = () => {
    const newCheckedItems = new Array(bucketData.length).fill(!isAllSelected);
    setCheckedItems(newCheckedItems);
  };

  // 개별 체크박스 선택/해제 핸들러
  const handleItemCheck = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  return (
    <div className="absolute h-[2149px] top-0 left-0 w-full h-full bg-[#fcefef] z-0">
      {/* Border */}
      <div
        className="h-[2059px] absolute bg-[#fff6f1] rounded-[19px] mt-10 drop-shadow-2xl"
        style={{
          width: "90%",
          left: "5%",
        }}
      />
      {/* NewHeader */}
      <NewHeader />
      {/* Searchbox */}
      <Searchbox />
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
      {bucketData.map((bucket, index) => (
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
              <FaLink className="text-[#959595] text-4xl ml-2" />
            </div>
            {/* 텍스트 정보 */}
            <div className="ml-4 flex-1 min-w-0">
              <div className="text-black text-2xl overflow-hidden whitespace-nowrap text-ellipsis max-w-full">
                {bucket.title}
              </div>
              <div className="flex items-center text-[#959595] text-xl font-semibold mt-2">
                <span>{bucket.origin}</span>
                <div className="w-[1px] h-[20px] mx-4 bg-[#959595]" />
                <span>{bucket.dateCreated}</span>
              </div>
            </div>
            {/* 카운트 */}
            <div className="flex items-center justify-center w-[78px] h-[78px] bg-[#c69172] rounded-full">
              <span className="text-white text-2xl font-semibold">
                {bucket.count}
              </span>
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
          <Pagination defaultCurrent={1} total={50} />
        </ConfigProvider>
      </div>
      {/* FloatButton */}
      <FloatButton onClick={() => console.log("FloatButton clicked!")} />
    </div>
  );
};

export default Bucket_Gridview;
