import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { debounce } from "lodash";

type Image = {
  title: string;
  link: string;
  sizewidth: number;
  sizeheight: number;
  thumbnail: string;
};

export const useSearchPage = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [isLast, setIsLast] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [searchTerm, setSearchTerm] = useState(keyword);
  const navigate = useNavigate();
  const itemRef = useRef<HTMLDivElement>(null);
  const layoutRef = useRef<HTMLDivElement>(null);
  const originScrollRef = useRef<number | undefined>(undefined);

  const fetchImages = useCallback(async () => {
    try {
      setLoading(true);
      if (isLast) return;
      const response = await fetch(
        `/api/getImages?keyword=${keyword ?? "피카츄"}&page=${page}`,
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
    if (keyword.trim().length > 0) {
      console.log("on changed");
      fetchImages();
      setSearchTerm(keyword);
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

  const onClickIcon = () => {
    navigate("/");
  };

  const handleHistorySearch = (item: string) => {
    navigate(`/search?keyword=${encodeURIComponent(item)}`);
    const history = JSON.parse(
      localStorage.getItem("history") ?? "[]"
    ) as string[];

    const index = history.indexOf(item);
    console.log(history, index);
    if (index !== -1) {
      history.splice(index, 1); // 중복 제거
    }
    history.push(item); // 뒤로 추가 (최근 검색어)
    if (history.length > 10) {
      history.shift(); // 오래된 항목 제거
    }

    setImages([]); // 새로운 검색어가 들어올 때 이미지 리스트 초기화
    setPage(0);
    setIsLast(false);
    setSelectedImage(null);

    localStorage.setItem("history", JSON.stringify(history));
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const term = searchTerm.trim();
    if (!term) return;

    navigate(`/search?keyword=${encodeURIComponent(term)}`);

    const history = JSON.parse(
      localStorage.getItem("history") ?? "[]"
    ) as string[];

    const index = history.indexOf(term);
    console.log(history, index);
    if (index !== -1) {
      history.splice(index, 1); // 중복 제거
    }
    history.push(term); // 뒤로 추가 (최근 검색어)
    if (history.length > 10) {
      history.shift(); // 오래된 항목 제거
    }

    setImages([]); // 새로운 검색어가 들어올 때 이미지 리스트 초기화
    setPage(0);
    setIsLast(false);
    setSelectedImage(null);

    localStorage.setItem("history", JSON.stringify(history));
  };

  useEffect(() => {
    if (selectedImage) {
      setTimeout(() => {
        itemRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 0);
    } else {
      if (window.innerWidth > 768) {
        if (layoutRef.current !== null) {
          layoutRef.current?.scrollTo({
            top: originScrollRef.current,
            behavior: "instant",
          });
          originScrollRef.current = undefined;
        }
      }
    }
  }, [selectedImage]);

  return {
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
    originScrollRef,
  };
};
