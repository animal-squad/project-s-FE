import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { IconType } from "react-icons";
import { FiChevronsRight } from "react-icons/fi";
import { IoMdLink, IoIosLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { motion } from "framer-motion";
import Divider from "@mui/material/Divider";
import { useSidebarStore } from "../store/sidebarStore";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTabStore } from "../store/headerStore";
import { ReactComponent as Bucket_Icon_Bold } from "../../public/assets/icons/Bucket_Icon_Bold.svg";
import { userStore } from "../store/userStore";
import { useFolderStore } from "../store/FileIndexStore";

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
  const navigate = useNavigate();

  const { name, photo, clearUser, userFetch } = userStore();
  const selected = useSidebarStore((state) => state.selectedSidebarItem);
  const setSelected = useSidebarStore((state) => state.setSelectedSidebarItem);

  const setSelectedTab = useTabStore((state) => state.setSelectedHeaderTab);
  const location = useLocation();

  const { meta } = useFolderStore();

  useEffect(() => {
    userFetch();

    setSelectedTab(0);

    // URL과 일치하는 상태로 setSelected 호출
    if (location.pathname.startsWith("/main/bucket")) {
      setSelected("Bucket");
    } else if (location.pathname === "/main/link") {
      setSelected("Link");
    } else if (location.pathname === "/main/texts") {
      setSelected("Texts");
    } else {
      setSelected(""); // 기본적으로 선택된 것이 없도록 처리
    }
  }, [location, setSelectedTab, setSelected, userFetch]);

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      clearUser();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-light_primary_color p-2 shadow-2xl"
      style={{
        width: open ? "225px" : "fit-content", // 열렸을 때 : 225px, 닫혀있을 때 : fit
      }}
    >
      <TitleSection open={open} name={name} photo={photo} />

      <div className="space-y-1">
        <Option
          Icon={Bucket_Icon_Bold}
          IconColor="#2196f3"
          title="Bucket"
          selected={selected}
          setSelected={setSelected}
          open={open}
          isCustomIcon
          notifs={meta?.totalBuckets}
        />
        <Option
          Icon={IoMdLink}
          IconColor="#2196f3"
          title="Link"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Divider className="pt-5" />
        <Option
          Icon={IoIosLogOut}
          IconColor="#2196f3"
          title="Log Out"
          selected={selected}
          setSelected={setSelected}
          open={open}
          handleLogout={handleLogout} // 로그아웃 함수 전달
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
  handleLogout,
  isCustomIcon,
}: {
  Icon: IconType | React.ElementType;
  IconColor: string;
  title: string;
  selected: string;
  setSelected: (item: string) => void;
  open: boolean;
  notifs?: number;
  handleLogout?: () => void; // handleLogout을 함수로 수정
  isCustomIcon?: boolean;
}) => {
  const getLinkPath = () => {
    switch (title) {
      case "Bucket":
        return "/main/bucket";
      case "Link":
        return "/main/link";
      case "Texts":
        return "/main/texts";
      default:
        return "#";
    }
  };

  const handleClick = () => {
    if (handleLogout) {
      handleLogout(); // 로그아웃 함수 호출
    } else {
      setSelected(title);
    }
  };

  return (
    <Link to={handleLogout ? "#" : getLinkPath()} onClick={handleClick}>
      <motion.button
        layout
        className={`relative flex h-15 w-full items-center rounded-md transition-colors bg-transparent text-primary_text ${
          selected === title
            ? "border-primary_color text-primary_text shadow-lg"
            : "text-secondary_text"
        }`}
      >
        <motion.div
          layout
          className="grid h-full w-10 place-content-center text-lg"
        >
          {isCustomIcon ? (
            <Icon width="25" height="25" />
          ) : (
            <Icon color={IconColor} size="25" />
          )}
        </motion.div>
        {open && (
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
        {notifs && open && (
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
    </Link>
  );
};

const TitleSection = ({
  open,
  name,
  photo,
}: {
  open: boolean;
  name: string;
  photo: string;
}) => {
  return (
    <div className="mb-3 pb-3 ">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100">
        <div className="flex items-center gap-2">
          {photo ? (
            <img
              src={photo}
              alt="User profile"
              className="w-10 h-10 rounded-full ml-10"
            />
          ) : (
            <Logo />
          )}
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-sm font-semibold text-primary_text ml-7">
                Hi, {name}!
              </span>
            </motion.div>
          )}
        </div>
      </div>
      <Divider className="pt-3" />
    </div>
  );
};

const Logo = () => {
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
