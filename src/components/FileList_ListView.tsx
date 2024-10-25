import React from "react";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";

const enum ColorNums {
  magenta,
  red,
  volcano,
  orange,
  gold,
  lime,
  green,
  cyan,
  blue,
  geekblue,
  purple,
  colorNums_end,
}

const colorMapping = (num: ColorNums): string => {
  const colorIndex = num % ColorNums.colorNums_end;

  switch (colorIndex) {
    case ColorNums.magenta:
      return "magenta";
    case ColorNums.red:
      return "red";
    case ColorNums.volcano:
      return "volcano";
    case ColorNums.orange:
      return "orange";
    case ColorNums.gold:
      return "gold";
    case ColorNums.lime:
      return "lime";
    case ColorNums.green:
      return "green";
    case ColorNums.cyan:
      return "cyan";
    case ColorNums.blue:
      return "blue";
    case ColorNums.geekblue:
      return "geekblue";
    case ColorNums.purple:
      return "purple";
    default:
      return "magenta"; // 기본 색상
  }
};

interface DataType {
  key: string;
  name: string;
  tags: string[];
  type: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "File Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = colorMapping(tag.length);
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    type: "text",
    name: "과학-1",
    tags: ["화학", "물리1", "SF22"],
  },
  {
    key: "2",
    type: "text",
    name: "과학-2",
    tags: ["화학333", "물리4444", "SF55555"],
  },
  {
    key: "3",
    type: "text",
    name: "과학-3",
    tags: ["화학666666", "물리7777777", "SF88888888"],
  },
];

const App: React.FC = () => (
  <Table<DataType> columns={columns} dataSource={data} />
);

export default App;
