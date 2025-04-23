import React from "react";
import "./PopularScroll.css";
import { usePopularScroll } from "../../hooks/usePopularScroll";

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
  const { scrollRef, onClickPopular } = usePopularScroll({ keyword, setKeyword });

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
