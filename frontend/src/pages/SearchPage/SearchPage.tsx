import React from "react";
import MasonryLayout from "../../components/MasonryLayout/MasonryLayout";
import SearchHeader from "../../components/SearchHeader/SearchHeader";
import SearchThumnail from "../../components/SearchThumnail/SearchThumnail";
import ImageDetail from "../../components/ImageDetail/ImageDetail";
import { useSearchPage } from "./useSearchPage";
import "./SearchPage.css";

function SearchPage() {
  const {
    keyword,
    images,
    loading,
    isLast,
    selectedImage,
    searchTerm,
    setSearchTerm,
    itemRef,
    layoutRef,
    handleLoadMore,
    onClickIcon,
    handleHistorySearch,
    handleSearch,
    setSelectedImage,
    originScrollRef
  } = useSearchPage();

  return (
    <div id="search-page" style={{ width: "100%"}} ref={layoutRef}>
      <SearchHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        onClickLogo={onClickIcon}
        handleHistorySearch={handleHistorySearch}
      />

      <div id="search_thing">
        <span id="search_keyword">"{keyword}"</span>의 검색 결과입니다.
      </div>

      <section id="search_result_section">
        {images.length === 0 && isLast ? (
          <div
            id="no_result"
            style={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              color: "#333",
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            검색 결과가 없습니다.
          </div>
        ) : (
          <MasonryLayout
            isLoading={loading}
            items={images}
            columnWidth={240}
            onLoadMore={handleLoadMore}
            gap={24}
            renderItem={(item) => {
              return (
                <SearchThumnail
                  key={item.title}
                  item={item}
                  innerRef={
                    selectedImage && selectedImage === item
                      ? (itemRef as React.RefObject<HTMLDivElement>)
                      : undefined
                  }
                  onClick={(item) => {
                    setSelectedImage(item);
                    if (layoutRef.current !== null) {
                      if (originScrollRef.current === undefined) {
                        originScrollRef.current =
                          layoutRef.current?.scrollTop ?? 0;
                      }
                    }
                  }}
                  style={
                    selectedImage && selectedImage === item
                      ? {
                          border: "2px solid #0b57d0",
                          backgroundColor: "#e8f0fe",
                        }
                      : {
                          border: "2px solid white",
                        }
                  }
                />
              );
            }}
          />
        )}
        <ImageDetail
          selectedImage={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      </section>
    </div>
  );
}

export default SearchPage;
