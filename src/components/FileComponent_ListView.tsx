// FileComponent.tsx
import React from "react";

interface FileComponentProps {
  name: string;
  link?: string;
  type?: string;
  tags?: string[];
}

const FileComponent: React.FC<FileComponentProps> = ({ name }) => {
  return (
    <div className="flex flex-col items-center p-2 bg-transparent hover:bg-gray-100 min-w-28">
      <div className="w-16 h-12 bg-yellow-300 rounded-md mb-2"></div>
      <span className="text-sm text-center text-primary_text">{name}</span>
    </div>
  );
};

export default FileComponent;
