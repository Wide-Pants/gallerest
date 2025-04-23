import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import PopularBoard from "./PopularBoard";
import PopularScroll from "./PopularScroll";
import { useMode } from "../../pages/MainPage";

type Image = {
  title: string;
  link: string;
  sizewidth: number;
  sizeheight: number;
  thumbnail: string;
};

const PopularScrollBoard = () => {
  const [keyword, setKeyword] = useState<string | null>(null);
  const [images, setImages] = useState<Record<string | "null", Image[]>>({});
  const indexRef = useRef<number>(-1);
  const intervalStateRef = useRef(true);
  const timeoutRef = useRef<any>(null);
  const { mode } = useMode();
  const populars = useMemo(
    () => ["루기아", "롯데 피카츄", "파치리스", "따라큐"],
    []
  );

  const isImageLoadable = useCallback((url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true); // 이미지 정상 로드됨
      img.onerror = () => resolve(false); // 이미지 로드 실패
      img.src = url;
    });
  }, []);

  const fetchImages = useCallback(async (keyword: string): Promise<Image[]> => {
    const maxAttempts = 3;
    const validResults: Image[] = [];
    let attempt = 0;
  
    while (attempt < maxAttempts) {
      try {
        const response = await fetch(
          `http://localhost:3000/getImages/${encodeURIComponent(keyword ?? "피카츄")}/0`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = (await response.json()) as {
          [key: string]: any;
          items: Image[];
        };
  
        const urls = data.items.map((item: Image) => item.thumbnail);
  
        const results = await Promise.all(
          data.items.map(async (item) => {
            if (
              typeof item.thumbnail === "string" &&
              item.thumbnail.trim() !== "" &&
              /\.(jpg|jpeg|png|webp|gif)$/i.test(item.thumbnail)
            ) {
              const isValid = await isImageLoadable(item.thumbnail);
              return isValid ? item : null;
            }
            return null;
          })
        );
  
        const newValidUrls = results.filter(
          (url): url is Image => url !== null && !validResults.includes(url)
        );
  
        validResults.push(...newValidUrls);
  
        if (validResults.length >= 6) {
          break; // 5개 이상이면 바로 반환
        }
  
      } catch (error) {
        console.error(`Error fetching images on attempt ${attempt + 1}:`, error);
      }
  
      attempt++;
    }
  
    return validResults.slice(0, 6);
  }, []);
  

  useEffect(() => {
    populars.map(async (keyword) => {
      const images = await fetchImages(keyword);
      setImages((prevImages) => ({
        ...prevImages,
        [keyword]: images,
      }));
    });
    const loadedPopular = async () => {
      const images = await fetchImages("피카츄");
      setImages((prevImages) => ({
        ...prevImages,
        null: images,
      }));
    };
    loadedPopular();
  }, []);

  const changeKeyword = useCallback(
    (typedKeyword: string | null) => {
      setKeyword(typedKeyword);
      intervalStateRef.current = false;
      if (!typedKeyword) {
        timeoutRef.current = setTimeout(() => {
          intervalStateRef.current = true;
        }, 5000);
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      }
    },
    [keyword, populars]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (intervalStateRef.current) {
        const nextIndex = indexRef.current + 1;
        if (nextIndex >= populars.length) {
          indexRef.current = -1;
          setKeyword(null);
        } else {
          indexRef.current = nextIndex;
          setKeyword(populars[nextIndex]);
        }
      }
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (mode === "idle") {
      setKeyword(null);
      indexRef.current = -1;
      intervalStateRef.current = true;
    } else {
      intervalStateRef.current = false;
    }
  }, [mode]);

  return (
    <>
      <PopularBoard keyword={keyword} images={images} />
      <PopularScroll
        keyword={keyword}
        populars={populars}
        setKeyword={changeKeyword}
      />
    </>
  );
};

export default PopularScrollBoard;
