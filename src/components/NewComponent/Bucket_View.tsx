import React from "react";
import { ConfigProvider, Pagination } from "antd";
import NewHeader from "../../Layout/NewHeader";
import Searchbox from "../../ui/Searchbox";
import FloatButton from "../../ui/FloatButton";

const Bucket_Gridview = () => {
  const bucketData = Array(10).fill({
    dateCreated: "2024. 11. 13. 오전 2:57:55",
    date: "2024-11-13",
    status: "공유중",
    count: 5,
    imageUrl: "https://via.placeholder.com/113x106",
  });

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
      {/* 내 바구니 / 링크 선택 칸 */}
      <div
        className="absolute flex items-center top-[373px]"
        style={{
          width: "80%", // 전체 너비 80%
          left: "10%", // 전체 너비의 10%로 여백 설정
        }}
      >
        {/* 내 바구니 */}
        <div className="text-black text-[32px] font-semibold font-['Inter']">
          내 바구니
        </div>
        {/* Divider */}
        <div className="h-[2px] w-[40px] mx-4 bg-[#b4b4b4] rotate-90"></div>
        {/* 링크 */}
        <div className="text-[#bebebe] text-[32px] font-semibold font-['Inter']">
          링크
        </div>
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
            {/* 이미지 */}
            <img
              className="w-[113px] h-[106px] rounded-3xl"
              src={bucket.imageUrl}
              alt={`Bucket ${index + 1}`}
            />
            {/* 텍스트 정보 */}
            <div className="ml-4 flex-1 min-w-0">
              <div className="text-black text-2xl overflow-hidden whitespace-nowrap text-ellipsis max-w-full">
                {bucket.dateCreated}에 생성된 Bucket
              </div>
              <div className="flex items-center text-[#959595] text-xl font-semibold mt-2">
                <span>{bucket.date}</span>
                <div className="w-[1px] h-[20px] mx-4 bg-[#959595]" />
                <span>{bucket.status}</span>
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
