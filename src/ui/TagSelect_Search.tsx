import React from "react";
import { Select, Tag } from "antd";
import type { SelectProps } from "antd";

interface TagSelectProps {
  value: string[];
  onChange: (values: string[]) => void;
  linkId: string;
}

const TagSelect: React.FC<TagSelectProps> = ({
  value = [], // 기본값 빈 배열
  onChange,
}) => {
  const colorMapping = (num: number): string => {
    const colors = [
      "magenta",
      "red",
      "volcano",
      "orange",
      "gold",
      "lime",
      "green",
      "cyan",
      "blue",
      "geekblue",
      "purple",
    ];
    return colors[num % colors.length] || "magenta";
  };

  const tagRender: SelectProps["tagRender"] = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };

    const color =
      value === "기타" ? "default" : colorMapping((value || "").length);

    return (
      <Tag
        color={color}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginInlineEnd: 4 }}
      >
        {label}
      </Tag>
    );
  };

  return (
    <Select
      mode="multiple"
      tagRender={tagRender}
      variant="outlined"
      value={value} // 빈 배열 기본값 적용
      suffixIcon={<span>{value.length}</span>}
      onChange={(values) => onChange(values)}
      style={{ width: "100%" }}
      options={[
        { value: "웹 개발", label: "웹 개발" },
        { value: "모바일 개발", label: "모바일 개발" },
        { value: "AI/머신러닝", label: "AI/머신러닝" },
        { value: "데이터 엔지니어링", label: "데이터 엔지니어링" },
        { value: "클라우드 및 인프라", label: "클라우드 및 인프라" },
        { value: "보안 및 개인정보 보호", label: "보안 및 개인정보 보호" },
        { value: "컴퓨터 공학 기초", label: "컴퓨터 공학 기초" },
        { value: "임베디드 및 IoT", label: "임베디드 및 IoT" },
        {
          value: "IT 산업 동향 및 기술 트렌드",
          label: "IT 산업 동향 및 기술 트렌드",
        },
        {
          value: "프로젝트 관리 및 협업 도구",
          label: "프로젝트 관리 및 협업 도구",
        },
        {
          value: "기타",
          label: "기타",
        },
      ]}
    />
  );
};

export default TagSelect;
