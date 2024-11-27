import React from "react";
import { IoSearch } from "react-icons/io5";
import { ConfigProvider, Pagination } from "antd";

const Bucket_Gridview = () => {
  const bucketData = Array(10).fill({
    dateCreated: "2024. 11. 13. 오전 2:57:55",
    date: "2024-11-13",
    status: "공유중",
    count: 5,
    imageUrl: "https://via.placeholder.com/113x106",
  });

  return (
    <div className="w-screen h-screen relative bg-[#fcefef] overflow-auto">
      {/*배경 고정*/}
      <div className="absolute h-[2149px] top-0 left-0 w-full h-full bg-[#fcefef] z-0">
        {/*border*/}
        <div
          className="h-[2059px] absolute bg-[#fff6f1] rounded-[19px] mt-10 drop-shadow-2xl"
          style={{
            width: "90%",
            left: "5%",
          }}
        />
        {/*border(상단)*/}
        <div
          className="h-[140px] absolute bg-[#c69172] top-[40px] rounded-t-[19px]"
          style={{
            width: "90%",
            left: "5%",
          }}
        >
          {/* 텍스트 + 프로필 */}
          <div className="absolute inset-0 flex items-center justify-between px-8">
            {/* 링킷 */}
            <div className="text-white text-[80px] font-normal font-['Bagel Fat One']">
              링킷
            </div>
            {/* 프로필 */}
            <img
              className="w-[114px] h-[114px] rounded-full"
              src="https://via.placeholder.com/114x114"
              alt="Profile"
            />
          </div>
        </div>
        {/* 검색 창 + 태그 검색 버튼 */}
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
              className="w-full h-full bg-white rounded-[57px] border border-[#b4b4b4] px-8 text-[20px] text-[#121212] font-['Inter']"
            />
            {/* IoSearch 아이콘 */}
            <IoSearch className="absolute right-6 top-1/2 transform -translate-y-1/2 text-[#b4b4b4] text-[24px]" />
          </div>
          {/* 태그 검색 버튼 */}
          <div className="w-[86px] h-[86px] bg-white rounded-full border border-[#b4b4b4] flex items-center justify-center">
            <span className="text-[32px] text-[#b4b4b4]">#</span>
          </div>
        </div>
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
        <div className="fixed bottom-8 right-12 w-[70px] h-[70px] bg-[#c69172] rounded-full shadow-lg flex items-center justify-center">
          <span className="text-white text-[32px] font-semibold">+</span>
        </div>
      </div>
    </div>
  );
};

export default Bucket_Gridview;
