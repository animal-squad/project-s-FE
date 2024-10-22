import * as React from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useTabStore } from "../../store/headerStore"; // Zustand 스토어 불러오기

interface StyledTabsProps {
  children?: React.ReactNode;
  href?: string;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

function samePageLinkNavigation(
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
) {
  if (
    event.defaultPrevented ||
    event.button !== 0 || // ignore everything but left-click
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false;
  }
  return true;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    role="navigation"
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "#2196f3",
  },
});

interface StyledTabProps {
  label: string;
  href: string;
  selected?: boolean;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab
    disableRipple
    {...props}
    onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      if (samePageLinkNavigation(event)) {
        event.preventDefault(); // 기본 동작을 막아서 페이지 이동을 방지
      }
    }}
  />
))(({ theme }) => ({
  textTransform: "none",
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: "20px",
  color: "#212121",
  opacity: "0.5",
  height: "60px",
  marginLeft: "20px",
  "&.Mui-selected": {
    color: "#212121",
    opacity: "1.0",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "rgba(100, 95, 228, 0.32)",
  },
}));

export default function Header() {
  const selectedTab = useTabStore((state) => state.selectedHeaderTab); // Zustand에서 상태 불러오기
  const setSelectedTab = useTabStore((state) => state.setSelectedHeaderTab);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue); // Zustand에 상태 업데이트
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ bgcolor: "transparent" }}>
        <StyledTabs
          value={selectedTab}
          onChange={handleChange}
          aria-label="styled tabs example"
        >
          <StyledTab label="Storage" href="/main/storage/storage" />

        </StyledTabs>
        <Box sx={{ p: 3 }} />
      </Box>
    </Box>
  );
}
