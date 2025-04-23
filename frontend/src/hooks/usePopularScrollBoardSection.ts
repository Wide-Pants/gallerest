import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useMode } from "../pages/MainPage/MainPage";

type Image = {
  title: string;
  link: string;
  sizewidth: number;
  sizeheight: number;
  thumbnail: string;
};

export const usePopularScrollBoardSection = () => {
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
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
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
          `/api/getImages?keyword=${keyword ?? "피카츄"}&page=${attempt}`,
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
  
        const results = await Promise.all(
          data.items.map(async (item) => {
            if (
              typeof item.link === "string" &&
              item.link.trim() !== "" &&
              /\.(jpg|jpeg|png|webp|gif)$/i.test(item.link)
            ) {
              const isValid = await isImageLoadable(item.link);
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
          break;
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

  return {
    keyword,
    images,
    populars,
    changeKeyword
  };
}; 