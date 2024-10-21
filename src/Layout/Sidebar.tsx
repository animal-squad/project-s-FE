import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { IconType } from "react-icons";
import { FiChevronsRight } from "react-icons/fi";
import { FaFolder } from "react-icons/fa";
import { IoMdLink, IoIosLogOut } from "react-icons/io";
import { FiFileText } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { motion } from "framer-motion";
import Divider from "@mui/material/Divider";
import { useSidebarStore } from "../store/sidebarStore";
import { useNavigate } from "react-router-dom";
import { useTabStore } from "../store/headerStore";

export const Example = () => {
  return (
    <div className="flex bg-indigo-50">
      <Sidebar />
      <ExampleContent />
    </div>
  );
};

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const selected = useSidebarStore((state) => state.selectedSidebarItem);
  const setSelected = useSidebarStore((state) => state.setSelectedSidebarItem);
  const navigate = useNavigate(); // useNavigate 훅 사용

  const setSelectedTab = useTabStore((state) => state.setSelectedHeaderTab);

  useEffect(() => {
    switch (selected) {
      case "Storage":
        navigate("/main/storage");
        setSelectedTab(0);
        break;
      case "Link":
        navigate("/main/link");
        setSelectedTab(0);
        break;
      case "Texts":
        navigate("/main/texts");
        setSelectedTab(0);
        break;
      case "Log Out":
        navigate("/logout");
        break;
      default:
        break;
    }
  }, [selected, navigate]); // selected가 변경될 때마다 실행

  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-light_primary_color p-2"
      style={{
        width: open ? "225px" : "fit-content", // 열렸을 때 : 225px, 닫혀있을 때 : fit
      }}
    >
      <TitleSection open={open} />

      <div className="space-y-1">
        <Option
          Icon={FaFolder}
          IconColor="#2196f3"
          title="Storage"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={IoMdLink}
          IconColor="#2196f3"
          title="Link"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={FiFileText}
          IconColor="#2196f3"
          title="Texts"
          selected={selected}
          setSelected={setSelected}
          open={open}
          //notifs={3} : 목록 옆에 숫자 띄울수 있음.
        />
        <Divider className="pt-8" />
        <Option
          Icon={IoIosLogOut}
          IconColor="#2196f3"
          title="Log Out"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

const Option = ({
  Icon,
  IconColor,
  title,
  selected,
  setSelected,
  open,
  notifs,
}: {
  Icon: IconType;
  IconColor: string;
  title: string;
  selected: string;
  setSelected: (item: string) => void;
  open: boolean;
  notifs?: number;
}) => {
  return (
    <motion.button
      layout
      onClick={() => setSelected(title)}
      className={`relative flex h-15 w-full items-center rounded-md transition-colors bg-transparent text-primary_text ${
        selected === title
          ? "border-primary_color text-primary_text shadow-lg"
          : "text-secondary_text"
        // 버튼 눌렸을때 / 안눌렸을때 디자인
      }`}
    >
      <motion.div
        layout
        className="grid h-full w-10 place-content-center text-lg"
      >
        <Icon color={IconColor} size="25" />
      </motion.div>
      {open && ( // 글씨 애니메이션
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="text-sm font-medium"
        >
          {title}
        </motion.span>
      )}

      {notifs &&
        open && ( // 알림 숫자 애니메이션
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            style={{ y: "-50%" }}
            transition={{ delay: 0.5 }}
            className="absolute right-2 top-1/2 size-4 rounded bg-indigo-500 text-xs text-primary_text"
          >
            {notifs}
          </motion.span>
        )}
    </motion.button>
  );
};

const TitleSection = ({ open }: { open: boolean }) => {
  // Title (프로필)
  return (
    <div className="mb-3 pb-3 ">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100">
        <div className="flex items-center gap-2">
          <Logo />
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-sm font-semibold text-primary_text ml-7">
                Hi, UserName!
              </span>
            </motion.div>
          )}
        </div>
      </div>
      <Divider className="pt-3" />
    </div>
  );
};

// {open && <FiChevronDown color='212121' className="mr-2" />} under first </div>

const Logo = () => {
  // 로고 디자인
  return (
    <motion.div
      layout
      className="grid size-10 shrink-0 place-content-center rounded-md bg-indigo-600"
    >
      <CgProfile size="40" color="#212121" className="ml-10" />
    </motion.div>
  );
};

const ToggleClose = ({
  // 열릴때 / 닫힐때 애니메이션
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors bg-transparent text-primary_text hover:bg-slate-100"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <FiChevronsRight
            className={`transition-transform ${open && "rotate-180"}`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-sm font-medium"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};

const ExampleContent = () => <div className="h-auto w-full"></div>;
