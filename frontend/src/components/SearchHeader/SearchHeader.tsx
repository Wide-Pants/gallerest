import React from "react";
import "./SearchHeader.css";
import { useSearchHeader } from "../../hooks/useSearchHeader";

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
  const {
    isOpen,
    setIsOpen,
    history,
    boxRef,
    inputRef,
    headerRef,
    loadHistory,
    deleteHistory,
  } = useSearchHeader();

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

            <button type="submit" id="search_icon" />
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
                <div
                  key={index}
                  className="search_box_history_item"
                  onClick={() => {
                    handleHistorySearch(item);
                    setIsOpen(false);
                  }}
                >
                  <span style={{ flexGrow: 1 }}>{item}</span>
                  <div
                    className="search_box_history_item_close"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteHistory(item);
                    }}
                  >
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
