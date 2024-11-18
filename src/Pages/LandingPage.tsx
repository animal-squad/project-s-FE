"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "../ui/images-slider.tsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function ImagesSliderDemo() {
  const navigate = useNavigate();

  axios
    .get(`${import.meta.env.VITE_BACKEND_DOMAIN}/api/user/check`, {
      withCredentials: true,
    })
    .then((response) => {
      if (response.status === 200) navigate("/main/bucket");
    });

  const images = [
    "/assets/images/Capture_1.png",
    "/assets/images/Capture_2.png",
    "/assets/images/Capture_3.png",
  ];
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
          onClick={() => navigate("/login")}
          className="px-4 py-2 backdrop-blur-sm border bg-primary_text border-emerald-500/20 text-white text-center rounded-full"
        >
          <span>로그인</span>
          <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </button>
      </div>

      <ImagesSlider className="h-[40rem]" images={images}>
        <motion.div
          initial={{
            opacity: 0,
            y: -80,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="z-50 flex flex-col justify-center items-center"
        >
          <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-primary_text bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
            Link Bucket <br /> 링킷
          </motion.p>
        </motion.div>
      </ImagesSlider>
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
