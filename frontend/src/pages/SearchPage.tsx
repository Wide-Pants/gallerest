import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import MasonryLayout from "../components/MasonryLayout/MasonryLayout";
import SearchHeader from "../components/SearchHeader/SearchHeader";
import SearchThumnail from "../components/SearchThumnail/SearchThumnail";
import { debounce } from "lodash";
import "../styles/SearchPage.css";
import { AnimatePresence, motion } from "framer-motion";

type Image = {
  title: string;
  link: string;
  sizewidth: number;
  sizeheight: number;
  thumbnail: string;
};

function SearchPage() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [isLast, setIsLast] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const navigate = useNavigate();

  const fetchImages = useCallback(async () => {
    try {
      setLoading(true);
      if (isLast) return;
      const response = await fetch(
        `http://localhost:3000/getImages/${encodeURIComponent(
          keyword
        )}/${page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      if (data.total <= page * 16) {
        setIsLast(true);
      }
      setImages((prevImages) => [...prevImages, ...data.items]);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  }, [keyword, page, isLast]);

  useEffect(() => {
    if (keyword) {
      console.log("on changed");
      setImages([]); // 새로운 검색어가 들어올 때 이미지 리스트 초기화
      setPage(0);
      fetchImages();
      setIsLast(false);
      setSelectedImage(null);
    }
  }, [keyword]);

  useEffect(() => {
    if (page > 0) {
      fetchImages();
    }
  }, [page]);

  const handleLoadMore = debounce(() => {
    if (isLast) return;
    setPage(page + 1);
  }, 100);
  const [searchTerm, setSearchTerm] = useState("");

  const onClickIcon = () => {
    navigate("/");
  };

  const handleHistorySearch = (item: string) => {
    setSearchTerm(item);
    navigate(`/search?keyword=${encodeURIComponent(item)}`);
    const history = localStorage.getItem("history");
    if (history) {
      const parsedHistory = JSON.parse(history) as string[];
      parsedHistory.splice(parsedHistory.indexOf(searchTerm), 1);
      parsedHistory.push(searchTerm);
      localStorage.setItem("history", JSON.stringify(parsedHistory));
    }
  };
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(searchTerm)}`);
      const history = localStorage.getItem("history");
      if (history) {
        const parsedHistory = JSON.parse(history) as string[];
        if (parsedHistory.includes(searchTerm)) {
          parsedHistory.splice(parsedHistory.indexOf(searchTerm), 1);
          parsedHistory.push(searchTerm);
          localStorage.setItem("history", JSON.stringify(parsedHistory));
        } else {
          parsedHistory.push(searchTerm);
          localStorage.setItem("history", JSON.stringify(parsedHistory));
        }
      } else {
        localStorage.setItem("history", JSON.stringify([searchTerm]));
      }
    }
  };

  return (
    <div id="search-page">
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
                  onClick={(item) => setSelectedImage(item)}
                  style={selectedImage && selectedImage === item ? {
                    border: "2px solid #0b57d0",
                    backgroundColor: "#e8f0fe"
                  } : {
                    border: "2px solid white"
                  }}
                />
              );
            }}
          />
        )}
        {selectedImage && <div id="overlay" />}
        {selectedImage && (
          <section id="detail_section">
            <div id="detail_section_container">
              <div id="detail_section_header">
                <div
                  id="detail_section_header_close"
                  onClick={() => setSelectedImage(null)}
                >
                  X
                </div>
              </div>
              <div id="detail_section_container_image">
                <img src={selectedImage.thumbnail} alt={selectedImage.title} />
              </div>
              <a href={selectedImage.link}>
                <p id="detail_section_title">{selectedImage.title}</p>
              </a>
            </div>
          </section>
        )}
      </section>
    </div>
  );
}

export default SearchPage;
