import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";
import { useMode } from "../../pages/MainPage";

// 애니메이션 상수
const ANIMATION = {
  OPEN: {
    MOVE_TIME: 1000,
    SIZE_UP_TIME: 1000,
  },
  CLOSE: {
    MOVE_TIME: 700,
    SIZE_DOWN_TIME: 700,
  },
  EASING: "cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

// 검색 상태 타입
type SearchState = "donot" | "do" | "initial";

// 검색 키워드 목록
const KEYWORDS = [
  "피카츄",
  "라이츄",
  "파이리",
  "꼬부기",
  "버터풀",
  "야도란",
  "피죤투",
  "또가스",
  "산에서",
  "길에서",
];

const SearchBar: React.FC = () => {
  const [searching, setSearching] = useState<SearchState>("initial");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { setMode } = useMode();
  // Refs
  const searchBarRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchIconRef = useRef<HTMLDivElement>(null);
  const searchListRef = useRef<HTMLUListElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  // 애니메이션 함수들
  const animateBackground = (opacity: number, duration: number) => {
    backgroundRef.current?.animate([{ opacity: opacity }], {
      duration,
      fill: "forwards",
      easing: ANIMATION.EASING,
    });
  };

  // 검색 바 열기 애니메이션
  const searchBarOpenAnime = () => {
    if (!searchBarRef.current) return;

    setSearching("do");
    animateBackground(1, ANIMATION.OPEN.MOVE_TIME);
  };

  // 검색 입력창 열기 애니메이션
  const searchInIconOpenAnime = () => {
    if (!searchInputRef.current || !searchIconRef.current) return;

    setTimeout(() => {
      searchInputRef.current?.focus();
      searchInputRef.current!.placeholder = "추천 검색어";
    }, ANIMATION.OPEN.SIZE_UP_TIME);
  };

  // 검색 바 닫기 애니메이션
  const searchBarCloseAnime = () => {
    if (!searchBarRef.current) return;

    setSearching("donot");
    animateBackground(0, ANIMATION.CLOSE.MOVE_TIME);
  };

  // 검색 입력창 닫기 애니메이션
  const searchInIconCloseAnime = () => {
    if (!searchInputRef.current || !searchIconRef.current) return;

    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.placeholder = searchInputRef.current.value
          ? searchInputRef.current.value
          : "찾고 있는 고화질 이미지를 검색하세요.";
        searchInputRef.current.value = "";
      }
    }, ANIMATION.CLOSE.MOVE_TIME + ANIMATION.CLOSE.SIZE_DOWN_TIME);
  };

  // 이벤트 핸들러
  const handleSearchBarClick = (e: React.MouseEvent) => {
    if (
      (searching === "initial" || searching === "donot") &&
      e.target !== searchIconRef.current
    ) {
      setMode("search");
      setSearching("do");
      if (searchInputRef.current) {
        searchInputRef.current.placeholder = "";
      }
      searchBarOpenAnime();
      searchInIconOpenAnime();
    }
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (searching !== "donot" && e.target === backgroundRef.current) {
      setSearching("donot");
      setMode("idle");
      searchBarCloseAnime();
      searchInIconCloseAnime();
    }
  };

  const handleSearch = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (searchTerm === "") {
      navigate(`/search?keyword=${encodeURIComponent("추천 검색어")}`);
    } else if (searchTerm.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleKeywordClick = (keyword: string) => {
    setSearchTerm(keyword);
    navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
  };

  return (
    <>
      <div
        ref={backgroundRef}
        onClick={handleBackgroundClick}
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
          display: searching === "do" ? "block" : "none",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        }}
      />
      <div
        id="main_search_bar"
        data-state={searching}
        ref={searchBarRef}
        onClick={handleSearchBarClick}
      >
        <div>
          <div id="search_input_container">
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="찾고 있는 고화질 이미지를 검색하세요."
              autoComplete="off"
            />
            <div id="search_icon" ref={searchIconRef} onClick={handleSearch} />
          </div>
          {searching === "do" && (
            <ul id="search_li" ref={searchListRef}>
              {KEYWORDS.map((keyword, index) => (
                <li
                  key={index}
                  id={`keyword${index + 1}`}
                  onClick={() => handleKeywordClick(keyword)}
                >
                  <div className="keytext">{keyword}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchBar;
