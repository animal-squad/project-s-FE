import React from "react";
import { Example } from "../Layout/Sidebar";

const MainPage = () => {
  return (
    <div className="flex h-screen">
      <Example />
      <div className="flex flex-grow items-center justify-center">
        <div className="flex justify-center w-full">
          <label className="block text-primary_text text-xl font-bold mb-2">
            Main Page
          </label>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
