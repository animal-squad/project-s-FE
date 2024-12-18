"use client";
import React, { useState } from "react";
import { StickyScroll } from "../ui/sticky-scroll-reveal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { Image } from "antd";

const content = [
  {
    title: "링킷(Link Bucket)",
    description:
      "링킷(Link Bucket)은 더 편리한 브라우저 사용 경험을 제공하기 위한 AI 탭 정리 어시스턴트입니다.",
    content: (
      <div className="h-full w-full bg-[url('/assets/icons/Bucket_Icon_Sticker.png')] bg-center bg-no-repeat bg-contain flex items-center justify-center"></div>
    ),
  },
  {
    title: "열린 탭 저장하기",
    description:
      "탭을 너무 많이 열어두어 관리가 힘드셨나요? 링킷 크롬 확장 프로그램으로 지금 열려 있는 탭을 한 번에 저장해 보세요!",
    content: (
      <div className="h-full w-full bg-[url('/assets/images/Extension_Image.png')] bg-center bg-no-repeat bg-contain flex items-center justify-center">
        {/* <Image
          src="/linear.webp"
          width={600}
          height={600}
          className="h-full w-full object-cover"
          alt="linear board demo"
        /> */}
      </div>
    ),
  },
  {
    title: "AI 정리 기능",
    description:
      "링킷 AI는 링크에 자동으로 제목과 주제별 카테고리를 달아줍니다. 나중에 보고 싶은 링크를 보다 편리하고 관리, 검색해 보세요.",
    content: (
      <div className="h-full w-full bg-[url('/assets/images/Tag_Image.png')] bg-center bg-no-repeat bg-contain flex items-center justify-center"></div>
    ),
  },
  {
    title: "공유하기",
    description:
      "가지고 있는 링크 바구니를 친구에게 공유해보세요! 친구의 링크 바구니를 복사해 내 계정으로 가져올 수도 있습니다.",
    content: (
      <div className="h-full w-full bg-[url('/assets/images/Copy_Image.png')] bg-center bg-no-repeat bg-contain flex items-center justify-center"></div>
    ),
  },
  {
    title: "피드백",
    description:
      "서비스에 대한 의견이 있거나 버그를 찾으셨다면 구글 폼을 작성해 주세요. 여러분의 소중한 의견 하나하나가 서비스를 개선하는 데 큰 도움이 됩니다.",
  },
  {
    title: (
      <div className="h-full w-full bg-[linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))] flex items-center justify-center text-white">
        <button
          onClick={() => {
            window.open("https://forms.gle/WqHidqwTs1AsFpfK6");
          }}
          className="px-4 py-2 backdrop-blur-sm border bg-primary_text border-emerald-50/20 text-white text-center rounded-full"
        >
          <span>의견 제출하기</span>
          <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-50 to-transparent" />
        </button>
      </div>
    ),
    description: "",
  },
];

export function ImagesSliderDemo() {
  const navigate = useNavigate();
  const [buttonText, setButtonText] = useState("로그인");

  axios
    .get(`${import.meta.env.VITE_BACKEND_DOMAIN}/api/user/check`, {
      withCredentials: true,
    })
    .then((response) => {
      if (response.status === 200) setButtonText("바구니 페이지로");
    })
    .catch((error) => {
      if (error.response?.status === 401) setButtonText("로그인");
    });

  return (
    <div className="relative flex items-center justify-center w-screen h-screen bg-[#000000]">
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img
            src="/assets/icons/Bucket_Icon_White.svg"
            alt="링킷 로고"
            className="h-8 w-8"
          />
          <span className="text-white text-xl font-bold">링킷</span>
        </div>
        <button
          onClick={() => {
            axios
              .get(`${import.meta.env.VITE_BACKEND_DOMAIN}/api/user/check`, {
                withCredentials: true,
              })
              .then((response) => {
                if (response.status === 200) navigate("/bucket");
              })
              .catch((error) => {
                if (error.response?.status === 401) {
                  window.location.href = `${
                    import.meta.env.VITE_BACKEND_DOMAIN
                  }/api/auth/google`;
                }
              });
          }}
          className={`flex items-center justify-center ${
            buttonText === "로그인"
              ? "p-0 bg-primary_text"
              : "px-4 py-2 bg-primary_text"
          } m-0 border backdrop-blur-sm border-blue-300/20 text-white text-center rounded-full`}
        >
          {buttonText === "로그인" ? (
            <img
              src="/assets/images/web_neutral_rd_ctn.svg"
              alt="Continue with Google"
              className="w-52 h-auto"
            />
          ) : (
            <span>{buttonText}</span>
          )}
          <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-blue-300 to-transparent" />
        </button>
      </div>
      <div className="w-full h-full flex flex-col justify-center overflow-auto">
        <StickyScroll content={content} />
      </div>
      <footer className="absolute bottom-4 text-center w-full">
        <span
          onClick={() => navigate("/privacypolicy")}
          className="text-gray-400 cursor-pointer hover:underline"
        >
          개인정보처리방침
        </span>
      </footer>
    </div>
  );
}
