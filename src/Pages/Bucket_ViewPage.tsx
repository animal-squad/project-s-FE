import React, { useEffect } from "react";
import { ConfigProvider, Pagination } from "antd";
import NewHeader from "../Layout/NewHeader";
import Searchbox from "../ui/Searchbox";
import FloatButton from "../ui/FloatButton";
import { useBucketStore } from "../store/BucketStore";
import { useSearchLinkStore } from "../store/TagSearchStore";
import { useNavigate } from "react-router-dom";

const Bucket_Gridview = () => {
  const { folders, fetchFolders, page, setPage, meta } = useBucketStore();
  const { fetchSearchTags } = useSearchLinkStore();

  const navigate = useNavigate();

  useEffect(() => {
    fetchFolders(page); // 페이지에 따라 데이터 불러오기
  }, [page, fetchFolders]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    fetchFolders(newPage);
  };

  return (
    <div className="absolute h-[2149px] top-0 left-0 w-full h-[2139px] bg-[#fcefef] z-0">
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
        className="absolute flex items-center top-[373px] ml-4 z-10"
        style={{
          width: "80%",
          left: "10%",
        }}
      >
        {/* 내 바구니 */}
        <div
          className="text-black text-[32px] font-semibold font-['Inter']"
          onClick={() => navigate("/bucket")}
        >
          내 바구니
        </div>
        {/* Divider */}
        <div className="h-[2px] w-[40px] mx-4 bg-[#b4b4b4] rotate-90"></div>
        {/* 링크 */}
        <div
          className="text-[#bebebe] text-[32px] font-semibold font-['Inter']"
          onClick={() => {
            fetchSearchTags([]);
            navigate("/links");
          }}
        >
          링크
        </div>
      </div>

      {/* folders 데이터 렌더링 */}
      {folders.map((bucket, index) => (
        <div
          key={bucket.bucketId}
          className="absolute bg-white rounded-[14px] border border-[#b4b4b4] cursor-pointer"
          onClick={() => navigate(`/bucket/${bucket.bucketId}`)}
          style={{
            top: `${446 + index * 157}px`,
            width: "80%",
            left: "10%",
            height: "142px",
          }}
        >
          {/* 내부 구조 */}
          <div className="flex items-center h-full px-4">
            {/* 이미지 */}
            <div className="w-[113px] h-[106px] bg-gray-200 rounded-3xl flex items-center justify-center">
              <span className="text-gray-500 text-xl">이미지</span>
            </div>
            {/* 텍스트 정보 */}
            <div className="ml-4 flex-1 min-w-0">
              <div className="text-black text-2xl overflow-hidden whitespace-nowrap text-ellipsis max-w-full">
                {bucket.title}
              </div>
              <div className="flex items-center text-[#959595] text-xl font-semibold mt-2">
                <span>{new Date(bucket.createdAt).toLocaleDateString()}</span>
                <div className="w-[1px] h-[20px] mx-4 bg-[#959595]" />
                <span>{bucket.isShared ? "공유중" : "비공유"}</span>
              </div>
            </div>
            {/* 링크 카운트 */}
            <div className="flex items-center justify-center w-[78px] h-[78px] bg-[#c69172] rounded-full">
              <span className="text-white text-2xl font-semibold">
                {bucket.linkCount}
              </span>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
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
          <Pagination
            current={meta?.page || 1}
            total={meta?.totalBuckets || 0}
            pageSize={meta?.take || 10}
            onChange={handlePageChange}
          />
        </ConfigProvider>
      </div>

      {/* FloatButton */}
      <FloatButton onClick={() => console.log("FloatButton clicked!")} />
    </div>
  );
};

export default Bucket_Gridview;
