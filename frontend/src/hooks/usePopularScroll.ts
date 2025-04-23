import { useEffect, useRef } from "react";
import { useMode } from "../pages/MainPage/MainPage";

interface UsePopularScrollProps {
  keyword: string | null;
  setKeyword: (keyword: string | null) => void;
}

export const usePopularScroll = ({ keyword, setKeyword }: UsePopularScrollProps) => {
  const { mode } = useMode();
  const scrollRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      if (mode !== "idle") {
        scrollRef.current.classList.remove("initial");
        scrollRef.current.classList.add("hide");
      } else {
        scrollRef.current.classList.remove("hide");
      }
    }
  }, [mode]);

  const onClickPopular = (targetKeyword: string) => {
    if (keyword === targetKeyword) {
      setKeyword(null);
    } else {
      setKeyword(targetKeyword);
    }
  };

  return {
    scrollRef,
    onClickPopular
  };
}; 