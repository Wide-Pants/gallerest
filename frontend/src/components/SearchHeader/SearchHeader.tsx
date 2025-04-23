import React, { useCallback, useEffect, useRef, useState } from "react";
import "./SearchHeader.css";

interface SearchHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  handleHistorySearch: (item: string) => void;
  onClickLogo: () => void;
}

const SearchHeader = ({
  searchTerm,
  setSearchTerm,
  handleSearch,
  handleHistorySearch,
  onClickLogo,
}: SearchHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  const [history, setHistory] = useState<string[]>([]);

  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const page = document.getElementById("search-page");
    if (isMobile && page) {
      if (isOpen) {
        page.style.overflow = "hidden";
      } else {
        page.style.overflow = "auto";
      }
    }
    if(!isMobile && page){
      page.style.overflow = "auto";
    }
  }, [isMobile, isOpen]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    const handleBlur = (e:MouseEvent) => {
      if(!isOpen) return;

      const path = e.composedPath();
      const insideBox = boxRef.current && path.includes(boxRef.current);
      const insideHeader = headerRef.current && path.includes(headerRef.current);

      if (!insideBox && !insideHeader) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleBlur);
    
    window.addEventListener("resize", handleResize);
    document.addEventListener("resize", handleResize);
    return () => {
      document.removeEventListener("click", handleBlur);

      window.removeEventListener("resize", handleResize);
      document.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  const loadHistory = useCallback(() => {
    const pervHistory = localStorage.getItem("history");
    if (pervHistory) {
      setHistory(JSON.parse(pervHistory));
    }
  }, [history,setHistory]);

  const deleteHistory = useCallback((item: string) => {
    const pervHistory = localStorage.getItem("history");
    if (pervHistory) {
      const parsedHistory = JSON.parse(pervHistory) as string[];
      parsedHistory.splice(parsedHistory.indexOf(item), 1);
      localStorage.setItem("history", JSON.stringify(parsedHistory));
      setHistory(parsedHistory);
    }
  }, [history,setHistory]);

  useEffect(() => {
    loadHistory();
  }, [searchTerm]);

  return (
    <>
      <header ref={headerRef}>
        <div id="search_header_container">
          <div id="logo" data-open={isOpen} onClick={onClickLogo}></div>
          <form
            id="search_input_container"
            onSubmit={(e) => {
              handleSearch(e);
              loadHistory();
              setIsOpen(false);
            }}
            data-open={isOpen}
          >
            {isOpen && (
              <div id="search_box_close" onClick={() => setIsOpen(false)}>
                {"<"}
              </div>
            )}
            <input
              ref={inputRef}
              placeholder="찾고 있는 이미지를 검색하세요."
              value={searchTerm}
              onFocus={() => setIsOpen(true)}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button
              type="submit"
              id="search_icon"
            />
          </form>
          <div id="search_icon_container" data-open={isOpen}>
            <div
              id="search_icon"
              onClick={() => {
                setIsOpen(true);
              }}
            ></div>
          </div>
        </div>
      </header>
      {isOpen && (
        <div id="search_box_overlay">
          <div id="search_box" ref={boxRef}>
            <h4 id="search_box_title">검색 히스토리</h4>
            <div id="search_box_history">
              {history.map((item, index) => (
                <div key={index} className="search_box_history_item" onClick={() => {handleHistorySearch(item); setIsOpen(false);}}>
                  <span>{item}</span>
                  <div className="search_box_history_item_close" onClick={(e) => {
                    e.stopPropagation();
                    deleteHistory(item);
                  }}>
                    {"X"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchHeader;
