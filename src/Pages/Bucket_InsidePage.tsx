import React, { useState, useEffect, useCallback } from "react";
import {
  ConfigProvider,
  Pagination,
  Dropdown,
  Menu,
  Modal,
  message,
  Input,
  Switch,
  Button,
} from "antd";
import { FaLink, FaEllipsisH } from "react-icons/fa";
import NewHeader from "../Layout/NewHeader";
import FloatButton from "../ui/FloatButton";
import TagSelect from "../ui/TagSelect";
import { useLinkStore } from "../store/linkStore";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";

const Bucket_Gridview: React.FC = () => {
  const { links, title, linkCount, isMine, isShared, fetchLinks } =
    useLinkStore();
  const { bucketId } = useParams<{ bucketId: string }>(); // URL에서 bucketId 추출

  const fullBucketData = { ...useLinkStore.getState() };

  const navigate = useNavigate();

  // 렌더링 시 fetch
  useEffect(() => {
    if (bucketId) {
      fetchLinks(bucketId, (path) => {
        window.location.href = path; // 리디렉션 처리
      });
    }
  }, [bucketId, fetchLinks]); // 의존성 배열에 bucketId와 fetchLinks 추가

  // <체크박스 및 네비게이션 바>
  // 각 항목의 체크 상태를 관리하는 배열
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(links.length).fill(false)
  );

  // 하단 네비게이션 바 표시 상태
  const [showNavBar, setShowNavBar] = useState(false);

  // 체크된 항목 수 계산
  const checkedCount = checkedItems.filter((item) => item).length;

  // 체크박스 상태 변화 감지
  useEffect(() => {
    setShowNavBar(checkedItems.some((item) => item));
  }, [checkedItems]);

  // 전체 선택 체크박스의 상태
  const isAllSelected = checkedItems.every((item) => item);

  // 전체 선택/해제 핸들러
  const handleSelectAll = () => {
    const newCheckedItems = new Array(links.length).fill(!isAllSelected);
    setCheckedItems(newCheckedItems);
  };

  // 개별 체크박스 선택/해제 핸들러
  const handleItemCheck = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  // <제목 수정 모달>
  // 제목 수정 모달 열렸는지 여부
  const [isTitleModalOpen, setIsTitleModalOpen] = useState(false);

  // 새로운 제목 (기존 제목과 비교하기 위해서)
  const [newTitle, setNewTitle] = useState("");

  // 바구니 제목 수정 모달 열기
  const openTitleModal = () => {
    setNewTitle(title || ""); // 기본값으로 현재 제목 설정
    setIsTitleModalOpen(true);
  };

  // 바구니 제목 수정 모달 닫기
  const handleTitleCancel = () => {
    setIsTitleModalOpen(false);
    setNewTitle("");
  };

  // Enter 키 입력 핸들러
  const handleBucketTitleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      handleTitleChange(); // Enter 입력 시 링크 추가 실행
    }
  };

  // 제목 변경 로직
  const handleTitleChange = async () => {
    if (newTitle && newTitle !== title) {
      try {
        await axios.put(
          `${import.meta.env.VITE_BACKEND_DOMAIN}/api/bucket/${bucketId}`,
          { title: newTitle },
          { withCredentials: true }
        );
        message.success("바구니 제목이 성공적으로 변경되었습니다!");
        setIsTitleModalOpen(false);
        if (bucketId) {
          fetchLinks(bucketId, (path) => {
            window.location.href = path; // 데이터 다시 로드
          })
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            navigate("/unauthorized");
          } else {
            console.error("Failed to update title:", error);
          }
        }
      }
    } else {
      message.info("변경 사항이 없습니다.");
    }
  };

  // <바구니 삭제 모달>
  // 바구니 삭제 모달 열렸는지 여부
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 바구니 삭제 모달 열기
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  // 바구니 삭제 모달 닫기
  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  // 바구니 삭제 로직
  const handleDelete = () => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_DOMAIN}/api/bucket/${bucketId}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Bucket deleted:", response.data);
        message.success("바구니가 성공적으로 삭제되었습니다.");
        navigate("/bucket"); // 삭제 후 메인 페이지로 이동
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          navigate("/unauthorized"); // 401 에러 발생 시 /unauthorized로 리디렉션
        } else {
          console.error("Failed to delete bucket:", error);
        }
      })
      .finally(() => {
        setIsDeleteModalOpen(false);
      });
  };

  // <바구니 공유 모달>
  // 바구니 공유 모달 열렸는지 여부
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // URL 상태관리
  const [url, setUrl] = useState("");

  // 모달 초기 상태 저장용 (공유 여부 초기화용)
  const [initialPublicState, setInitialPublicState] = useState(false);

  // 바구니 공유 모달 열기
  const openShareModal = () => {
    setIsShareModalOpen(true);
  };

  // 바구니 공유 모달 닫기
  const handleShareCancel = () => {
    setIsPublic(initialPublicState);
    setUrl(initialPublicState ? window.location.href : "");
    setIsShareModalOpen(false);
  };

  // Switch 상태
  const [isPublic, setIsPublic] = useState(false);

  // 스위치 변경
  const handleSwitchChange = (checked: boolean) => {
    setIsPublic(checked);
    setUrl(checked ? window.location.href : "");
    debouncedShare(checked);
  };

  // URL 주소 복사 로직
  const handleURLCopy = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        console.log("URL copied to clipboard:", url);
        message.success("공유 URL이 복사되었습니다.");
      })
      .catch((err) => {
        console.error("Failed to copy URL:", err);
      });
  };

  // 바구니 공유 로직
  const handleShare = (checked: boolean) => {
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/api/bucket/${bucketId}/share`,
        {
          permission: checked,
        },
        { withCredentials: true }
      )
      .then((response) => {
        message.success(
          checked
            ? "바구니가 공개 상태로 전환되었습니다."
            : "바구니가 비공개 상태로 전환되었습니다."
        );
        console.log("Permission updated:", response.data);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          navigate("/unauthorized"); // 401 에러 발생 시 /unauthorized로 리디렉션
        } else {
          console.error("Failed to update permission:", error);
        }
      });
  };

  // 바구니 debounce 함수
  const debouncedShare = useCallback(
    debounce((checked: boolean) => {
      handleShare(checked);
      setInitialPublicState(checked);
    }, 500),
    []
  );

  // <바구니 복사 모달>
  // 바구니 복사 모달 열렸는지 여부
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);

  // 바구니 복사 모달 열기
  const openCopyModal = () => {
    setIsCopyModalOpen(true);
  };

  // 바구니 복사 모달 닫기
  const handleCopyCancel = () => {
    setIsCopyModalOpen(false);
  };

  // 바구니 복사 로직
  const handleCopy = () => {
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/api/bucket/${bucketId}/paste`,
        {
          bucket: fullBucketData,
        },
        { withCredentials: true }
      )
      .then((response) => {
        message.success("바구니가 복사되었습니다.");
        console.log("Bucket copied:", response.data);
        const newBucketId = response.data.bucketId; // 응답에서 새로운 bucketId 추출
        if (newBucketId) {
          // 새 창에서 /bucket/:newBucketId 열기
          window.open(`/bucket/${newBucketId}`, "_blank");
        }
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          navigate("/unauthorized"); // 401 에러 발생 시 /unauthorized로 리디렉션
        } else {
          console.error("Failed to copy bucket:", error);
        }
      });
  };

  // <바구니 기능 모음>
  // 제목 수정
  const handleEditTitle = () => {
    openTitleModal();
  };

  // 삭제
  const handleDeleteBucket = () => {
    openDeleteModal();
  };

  // 공유
  const handleShareBucket = () => {
    setInitialPublicState(isShared);
    openShareModal();
    // 공유 로직 추가
  };

  // 복사
  const handleCopyBucket = () => {
    openCopyModal();
    // 복사 로직 추가
  };

  // <링크 제목 수정 모달>
  // 링크 제목 수정 모달 열렸는지 여부
  const [isLinkTitleModalOpen, setIsLinkTitleModalOpen] = useState(false);

  // 링크 ID 상태관리
  const [currentLinkId, setCurrentLinkId] = useState<string | null>(null);

  // 수정된 제목 상태관리
  const [editedLinkTitle, setEditedLinkTitle] = useState<string>("");

  // 링크 제목 수정 모달 열기
  const openLinkTitleModal = (linkId: string, currentTitle: string) => {
    setCurrentLinkId(linkId);
    setEditedLinkTitle(currentTitle);
    setIsLinkTitleModalOpen(true);
  };

  // 링크 제목 수정 모달 닫기
  const closeLinkTitleModal = () => {
    setIsLinkTitleModalOpen(false);
    setCurrentLinkId(null);
    setEditedLinkTitle("");
  };

  // Enter 키 입력 핸들러
  const handleLinkTitleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      handleLinkTitleSave(); // Enter 입력 시 링크 추가 실행
    }
  };

  // 링크 제목 저장 요청
  const handleLinkTitleSave = async () => {
    if (!currentLinkId || !editedLinkTitle) return;

    try {
      await axios
        .put(
          `${
            import.meta.env.VITE_BACKEND_DOMAIN
          }/api/link/${currentLinkId}/title`,
          { title: editedLinkTitle },
          { withCredentials: true }
        )
        .then(() => {
          message.success("링크 제목이 성공적으로 수정되었습니다.");
          setIsLinkTitleModalOpen(false);
          if (bucketId) {
            fetchLinks(bucketId, (path) => {
              window.location.href = path; // 리디렉션 처리
            });
          } // 링크 목록 다시 불러오기
        })
        .catch((error) => {
          if (error.response?.status === 401) {
            navigate("/unauthorized"); // 401 에러 발생 시 리디렉션
          } else {
            console.error("Failed to update link title:", error);
          }
        });
    } catch (error) {
      console.error("Failed to update link title:", error);
    }
  };

  // <태그>
  // 태그 선택 관리 배열
  const [selectedTags, setSelectedTags] = useState<Record<string, string[]>>(
    {}
  );

  // 태그 변경 로직 추가
  const handleTagChange = (linkId: string, tags: string[]) => {
    setSelectedTags((prev) => {
      let updatedTags = [...tags];

      // 조건 1: tags가 비어 있으면 '기타' 추가
      if (updatedTags.length === 0) {
        updatedTags = ["기타"];
      }
      // 조건 2: tags가 '기타'를 포함하면서 2개 이상의 요소가 있으면 '기타' 제거
      else if (updatedTags.includes("기타") && updatedTags.length > 1) {
        updatedTags = updatedTags.filter((tag) => tag !== "기타");
      }

      const newTagsState = { ...prev, [linkId]: updatedTags };

      console.log(
        `Updated tags for row with linkId ${linkId}:`,
        newTagsState[linkId]
      );

      // debouncedUpdateTags 호출
      debouncedUpdateTags(linkId, newTagsState[linkId]);

      return newTagsState;
    });
  };

  // 태그 업데이트 통신
  const updateTags = async (linkId: string, tags: string[]) => {
    try {
      console.log(`Sending API request for linkId ${linkId}:`, tags);
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/api/link/${linkId}/tag`,
        { tags: tags },
        { withCredentials: true }
      );
      console.log(`API response for linkId ${linkId}:`, response.data);
    } catch (error) {
      console.error(`Failed to update tags for linkId ${linkId}:`, error);
    }
  };

  // 디바운스된 함수 (지연시간 700ms)
  const debouncedUpdateTags = useCallback(
    debounce((linkId: string, tags: string[]) => {
      updateTags(linkId, tags);
    }, 700),
    []
  );

  // URL에서 origin 추출
  const getOriginFromUrl = (url: string): string => {
    try {
      return new URL(url).origin;
    } catch {
      return "Invalid URL";
    }
  };

  useEffect(() => {
    if (bucketId) {
      fetchLinks(bucketId, (path) => {
        window.location.href = path; // 리디렉션 처리
      });
    }
  }, [bucketId, fetchLinks]);

  const bucketmenu = (
    <Menu
      items={[
        {
          key: "1",
          label: "제목 수정",
          onClick: () => handleEditTitle(),
        },
        {
          key: "2",
          label: "삭제",
          onClick: () => handleDeleteBucket(),
        },
        {
          key: "3",
          label: "공유",
          onClick: () => handleShareBucket(),
          disabled: isMine ? false : true,
        },
        {
          key: "4",
          label: "복사",
          onClick: () => handleCopyBucket(),
          disabled: isMine ? true : false,
        },
      ]}
    />
  );

  // 링크 삭제 확인 모달 상태
  const [isDeleteLinksModalVisible, setIsDeleteLinksModalVisible] =
    useState(false);

  // 링크 삭제 모달 열기
  const openLinkDeleteModal = () => {
    if (checkedCount > 0) {
      setIsDeleteLinksModalVisible(true);
    } else {
      message.warning("삭제할 링크를 선택하세요.");
    }
  };

  // 링크 삭제 모달 닫기
  const closeLinksDeleteModal = () => {
    setIsDeleteLinksModalVisible(false);
  };

  // 링크 삭제 로직
  const handleDeleteLinks = async () => {
    const selectedLinkIds = links
      .filter((_, index) => checkedItems[index])
      .map((link) => link.linkId); // 선택된 링크들의 linkId 추출

    if (selectedLinkIds.length === 0) {
      message.warning("삭제할 링크를 선택하세요.");
      return;
    }

    try {
      await axios
        .post(`${import.meta.env.VITE_BACKEND_DOMAIN}/api/link/delete`, {
          data: { linkId: selectedLinkIds },
          withCredentials: true,
        })
        .then(() => {
          message.success("선택한 링크가 성공적으로 삭제되었습니다.");
          setCheckedItems(new Array(links.length).fill(false)); // 체크박스 초기화
          if (bucketId) {
            fetchLinks(bucketId, (path) => {
              window.location.href = path; // 최신 데이터 로드
            });
          }
        })
        .catch((error) => {
          if (error.response?.status === 401) {
            navigate("/unauthorized"); // 401 에러 처리
          } else {
            console.error("Failed to delete links:", error);
            message.error("링크 삭제에 실패했습니다.");
          }
        });
    } catch (error) {
      console.error("Failed to delete links:", error);
    }
  };

  // 링크 단일 삭제 확인 모달 상태
  const [isDeleteOneLinkModalVisible, setIsDeleteOneLinkModalVisible] =
    useState(false);

  // 삭제할 링크 ID 상태 관리
  const [deleteLinkId, setDeleteLinkId] = useState<string | null>(null);

  // 링크 단일 삭제 모달 열기
  const openOneLinkDeleteModal = (linkId: string) => {
    setDeleteLinkId(linkId); // 삭제할 링크 ID 설정
    setIsDeleteOneLinkModalVisible(true);
  };

  // 링크 단일 삭제 모달 닫기
  const closeOneLinkDeleteModal = () => {
    setIsDeleteOneLinkModalVisible(false);
  };

  // 링크 단일 삭제 로직
  const handleDeleteOneLink = async (linkId: string) => {
    try {
      await axios
        .post(`${import.meta.env.VITE_BACKEND_DOMAIN}/api/link/delete`, {
          data: { linkId: [linkId] }, // 단일 링크의 ID를 배열에 넣어서 전송
          withCredentials: true,
        })
        .then(() => {
          message.success("선택한 링크가 성공적으로 삭제되었습니다.");
          if (bucketId) {
            fetchLinks(bucketId, (path) => {
              window.location.href = path; // 최신 데이터 로드
            });
          }
          closeOneLinkDeleteModal(); // 모달 닫기
        })
        .catch((error) => {
          if (error.response?.status === 401) {
            navigate("/unauthorized"); // 401 에러 처리
          } else {
            console.error("Failed to delete link:", error);
            message.error("링크 삭제에 실패했습니다.");
          }
        });
    } catch (error) {
      console.error("Failed to delete link:", error);
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full bg-[#fcefef] z-0 h-[2139px]">
      {/* Border */}
      <div
        className={`fixed bottom-0 left-0 w-full bg-[#c69172] shadow-md transition-transform duration-300 z-50 ${
          showNavBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          {checkedCount > 0 ? (
            <span className="text-lg text-white font-semibold">
              {checkedCount}개 선택됨
            </span>
          ) : (
            <span className="text-lg text-white font-semibold" />
          )}
          <button
            onClick={openLinkDeleteModal}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            삭제
          </button>
        </div>
      </div>
      <div
        className="h-[2059px] absolute bg-[#fff6f1] rounded-[19px] mt-10 drop-shadow-2xl"
        style={{
          width: "90%",
          left: "5%",
        }}
      />
      {/* NewHeader */}
      <NewHeader />
      {/* Bucket Title */}
      <div className="relative w-full text-center py-4 top-[254px]">
        <h1 className="text-[40px] font-bold text-primary_text">{title}</h1>
        {/* 제목 옆 드롭다운 메뉴 */}
        <div
          className="absolute flex justify-end items-center pr-4"
          style={{
            width: "80%",
            left: "10%",
            top: 4, // 제목 상단 정렬
            height: "100%", // 제목 영역 내 중앙 정렬 유지
          }}
        >
          <Dropdown overlay={bucketmenu} trigger={["click"]}>
            <FaEllipsisH className="text-xl cursor-pointer text-[#959595]" />
          </Dropdown>
        </div>
      </div>
      {/* 전체 선택 체크박스 */}
      <div
        className="absolute flex items-center top-[373px] justify-end"
        style={{
          width: "80%",
          right: "10%", // 오른쪽 여백 설정
        }}
      >
        <input
          type="checkbox"
          id="selectAll"
          className="peer hidden"
          checked={isAllSelected}
          onChange={handleSelectAll}
        />
        <label
          htmlFor="selectAll"
          className="w-8 h-8 border-2 border-[#b4b4b4] rounded-sm flex items-center justify-center cursor-pointer peer-checked:bg-[#c69172] peer-checked:border-[#c69172] mr-6"
        >
          {isAllSelected && (
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          )}
        </label>
        <label
          className="mr-4 text-black text-[20px] font-semibold"
          htmlFor="selectAll"
        >
          전체 선택
        </label>
      </div>
      {links.map((link, index) => (
        <div
          key={index}
          className="absolute bg-white rounded-[14px] border border-[#b4b4b4]"
          style={{
            top: `${446 + index * 157}px`, // 각 컨텐츠 간의 간격 157px
            width: "80%",
            left: "10%",
            height: "142px",
            zIndex: 0,
          }}
        >
          {/* 내부 구조 */}
          <div className="flex items-center h-full px-4">
            {/* 체크박스 */}
            <input
              type="checkbox"
              id={`bucket-${index}`}
              className="peer hidden"
              checked={checkedItems[index]}
              onChange={() => handleItemCheck(index)}
            />
            <label
              htmlFor={`bucket-${index}`}
              className="w-8 h-8 border-2 border-[#b4b4b4] rounded-sm flex items-center justify-center cursor-pointer peer-checked:bg-[#c69172] peer-checked:border-[#c69172] ml-6"
            >
              {checkedItems[index] && (
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              )}
            </label>
            {/* FaLink 아이콘 */}
            <div className="w-[113px] h-[106px] flex items-center justify-center rounded-3xl">
              <FaLink
                className="text-[#959595] text-4xl cursor-pointer"
                onClick={(e) => {
                  window.open(link.URL, "_blank"); // 새 창에서 링크 열기
                  e.stopPropagation(); // 클릭 이벤트 중첩 방지
                  axios
                    .put(
                      `${import.meta.env.VITE_BACKEND_DOMAIN}/api/link/${
                        link.linkId
                      }/view`,
                      {}, // 빈 body
                      { withCredentials: true } // 쿠키 전송
                    )
                    .then(() => {
                      console.log("View count updated successfully.");
                    })
                    .catch((error) => {
                      console.error("Failed to update view count:", error);
                    });
                }}
              />
            </div>
            {/* 텍스트 정보 */}
            <div className="flex-1 min-w-0">
              <div className="text-black text-2xl overflow-hidden whitespace-nowrap text-ellipsis max-w-full">
                {link.title || "Untitled"}
              </div>
              <div className="flex items-center text-[#959595] text-m font-semibold mt-2">
                <span>{getOriginFromUrl(link.URL)}</span>
                <div className="w-[1px] h-[20px] mx-4 bg-[#959595]" />
                <span>{new Date(link.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            {/* 드롭다운 메뉴 */}
            <div className="absolute right-4 top-4">
              <Dropdown
                overlay={
                  <Menu
                    items={[
                      {
                        key: "1",
                        label: "제목 수정",
                        onClick: () =>
                          openLinkTitleModal(link.linkId, link.title || ""),
                      },
                      {
                        key: "2",
                        label: "삭제",
                        onClick: () => {
                          openOneLinkDeleteModal(link.linkId);
                        },
                      },
                    ]}
                  />
                }
                trigger={["click"]}
              >
                <FaEllipsisH className="text-xl cursor-pointer text-[#959595]" />
              </Dropdown>
            </div>
            {/* Tags */}
            <div className="flex-1">
              <TagSelect
                value={selectedTags[link.linkId] || link.tags}
                onChange={(tags) => handleTagChange(link.linkId, tags)}
                linkId={link.linkId}
              />
            </div>
          </div>
        </div>
      ))}
      <div className="absolute top-[2032px] w-full flex justify-center">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#ffffff",
            },
            components: {
              Pagination: {
                itemActiveBg: "#c69172",
                itemBg: "transparent",
                itemLinkBg: "transparent",
              },
            },
          }}
        >
          <Pagination defaultCurrent={1} total={linkCount || 1} />
        </ConfigProvider>
      </div>
      {/* FloatButton */}
      <FloatButton onClick={() => console.log("FloatButton clicked!")} />
      {/* 바구니 제목 모달 */}
      <Modal
        title="바구니 제목 수정"
        open={isTitleModalOpen}
        onOk={handleTitleChange}
        onCancel={handleTitleCancel}
        okButtonProps={{
          style: {
            backgroundColor: "#c69172",
            borderColor: "#c69172",
            color: "white",
          },
        }}
        cancelButtonProps={{
          style: {
            backgroundColor: "#ef4444",
            borderColor: "#ef4444",
            color: "white",
          }, // 취소 버튼 스타일도 조정
        }}
        okText="변경"
        cancelText="취소"
      >
        <Input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="새로운 제목을 입력하세요"
          onKeyDown={handleBucketTitleKeyPress}
        />
      </Modal>
      {/* 바구니 공유 모달 */}
      <Modal
        title="바구니 공유"
        open={isShareModalOpen}
        footer={null}
        onCancel={handleShareCancel}
      >
        <div className="flex flex-col items-center mt-4 gap-4">
          <div className="flex justify-center items-center gap-2">
            <span>Private</span>
            <Switch
              size="small"
              onChange={handleSwitchChange}
              checked={isPublic}
            />
            <span>Public</span>
          </div>
          {isPublic && (
            <div className="flex items-center gap-2 border p-2 rounded-md">
              <span>{url}</span>
              <Button size="small" onClick={handleURLCopy}>
                복사
              </Button>
            </div>
          )}
        </div>
      </Modal>
      {/* 바구니 삭제 모달 */}
      <Modal
        title="바구니 삭제"
        open={isDeleteModalOpen}
        onOk={handleDelete}
        onCancel={handleDeleteCancel}
        okText="삭제"
        cancelText="취소"
        okButtonProps={{ danger: true }}
      >
        <div className="flex flex-col items-center mt-4 gap-4">
          <p>바구니를 삭제하시겠습니까?</p>
        </div>
      </Modal>
      {/* 바구니 복사 모달 */}
      <Modal
        title="바구니 복사"
        open={isCopyModalOpen}
        onOk={handleCopy}
        onCancel={handleCopyCancel}
        okButtonProps={{
          style: {
            backgroundColor: "#c69172",
            borderColor: "#c69172",
            color: "white",
          },
        }}
        cancelButtonProps={{
          style: {
            backgroundColor: "#ef4444",
            borderColor: "#ef4444",
            color: "white",
          }, // 취소 버튼 스타일도 조정
        }}
        okText="복사"
        cancelText="취소"
      >
        <div className="flex flex-col items-center mt-4 gap-4">
          <p>바구니를 복사하시겠습니까?</p>
        </div>
      </Modal>
      {/* 링크 제목 수정 모달 */}
      <Modal
        title="링크 제목 수정"
        open={isLinkTitleModalOpen}
        onOk={handleLinkTitleSave}
        onCancel={closeLinkTitleModal}
        okButtonProps={{
          style: {
            backgroundColor: "#c69172",
            borderColor: "#c69172",
            color: "white",
          },
        }}
        cancelButtonProps={{
          style: {
            backgroundColor: "#ef4444",
            borderColor: "#ef4444",
            color: "white",
          },
        }}
        okText="저장"
        cancelText="취소"
      >
        <Input
          value={editedLinkTitle}
          onChange={(e) => setEditedLinkTitle(e.target.value)}
          placeholder="새로운 제목을 입력하세요"
          onKeyDown={handleLinkTitleKeyPress}
        />
      </Modal>
      {/* 링크 다중 삭제 확인 모달 */}
      <Modal
        title="링크 삭제 확인"
        open={isDeleteLinksModalVisible}
        onOk={handleDeleteLinks} // 확인 버튼에 삭제 요청 연결
        onCancel={closeLinksDeleteModal} // 취소 버튼에 모달 닫기 연결
        okText="삭제"
        cancelText="취소"
        okButtonProps={{ danger: true }}
      >
        <p className="text-lg">{checkedCount}개 링크를 삭제하시겠습니까?</p>
      </Modal>
      {/* 링크 단일 삭제 확인 모달 */}
      <Modal
        title="링크 삭제 확인"
        open={isDeleteOneLinkModalVisible}
        onOk={() => {
          if (deleteLinkId) handleDeleteOneLink(deleteLinkId);
        }}
        onCancel={closeOneLinkDeleteModal} // 취소 버튼에 모달 닫기 연결
        okText="삭제"
        cancelText="취소"
        okButtonProps={{ danger: true }}
      >
        <p className="text-lg">해당 링크를 삭제하시겠습니까?</p>
      </Modal>
    </div>
  );
};

export default Bucket_Gridview;
