import React from "react";
import { Table, Tag, Button } from "antd";
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
  title: string | URL;
  tags: string[];
  URL: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "URL",
    dataIndex: "title",
    key: "title",
    width: "50%",
    render: (text, record) => (
      <a onClick={() => window.open(record.URL)}>{text}</a>
    ),
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    width: "50%",
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
];

const data: DataType[] = [
  {
    title: "과학-1",
    tags: ["화학", "물리1", "SF22"],
    URL: "https://www.naver.com/",
  },
  {
    title: "과학-2",
    tags: ["화학333", "물리4444", "SF55555"],
    URL: "https://www.erdcloud.com/",
  },
  {
    title: "과학-3",
    tags: ["화학666666", "물리7777777", "SF88888888"],
    URL: "https://youtube.com",
  },
];

const App: React.FC = () => (
  <div>
    <div className="relative flex items-center my-4">
      <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold text-primary_text">
        Title
      </h1>
      <Button type="primary" className="ml-auto">
        공유
      </Button>
    </div>
    <Table<DataType>
      columns={columns}
      dataSource={data}
      tableLayout="fixed"
      pagination={{ pageSize: 10, position: ["bottomCenter"] }}
    />
  </div>
);

export default App;
