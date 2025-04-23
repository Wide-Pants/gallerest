import React from "react";
import PopularBoard from "./PopularBoard";
import PopularScroll from "./PopularScroll";
import { usePopularScrollBoardSection } from "../../hooks/usePopularScrollBoardSection";

const PopularScrollBoard = () => {
  const { keyword, images, populars, changeKeyword } = usePopularScrollBoardSection();

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
