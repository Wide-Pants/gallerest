import React from "react";
import "./SearchBar.css";
import { useSearchBar } from "../../hooks/useSearchBar";

const SearchBar: React.FC = () => {
  const {
    searching,
    searchTerm,
    setSearchTerm,
    searchBarRef,
    searchInputRef,
    searchIconRef,
    searchListRef,
    backgroundRef,
    handleSearchBarClick,
    handleBackgroundClick,
    handleSearch,
    handleKeywordClick,
    KEYWORDS
  } = useSearchBar();

  return (
    <>
      <div
        ref={backgroundRef}
        onClick={handleBackgroundClick}
        id="search_bar_background"
        data-state={searching}
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
