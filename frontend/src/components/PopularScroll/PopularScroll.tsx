import React, { useEffect, useRef, useState } from "react";
import "./PopularScroll.css";
import { useMode } from "../../pages/MainPage";

interface PopularScrollProps {
  keyword: string | null;
  populars: string[];
  setKeyword: (keyword: string | null) => void;
}

const PopularScroll: React.FC<PopularScrollProps> = ({
  keyword,
  populars,
  setKeyword,
}) => {
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
  return (
    <ul id="popular_scroll" className="initial" ref={scrollRef}>
      {populars.map((popular, index) => (
        <li
          onClick={() => onClickPopular(popular)}
          data-active={keyword === popular}
        >
          {popular}
        </li>
      ))}
    </ul>
  );
};

export default PopularScroll;
