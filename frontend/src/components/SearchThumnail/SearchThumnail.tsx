import React, { useState } from "react";
import "./SearchThumnail.css";

type Image = {
  title: string;
  link: string;
  sizewidth: number;
  sizeheight: number;
  thumbnail: string;
};
const SearchThumnail = ({ item }: { item: Image }) => {
  const [source, setSource] = useState(item.thumbnail);
  const [isError, setIsError] = useState(false);

  const handleImageError = () => {
    if (!isError && source === item.thumbnail) {
      setIsError(true);
    } else {
      setSource(item.link);
    }
  };

  if (isError) {
    return (
      <div
        className="search_thumbnail_skeleton"
      />
    );
  }
  return (
    <div className="search_thumbnail">
      <img
        id={item.title}
        src={source}
        alt=""
        onError={handleImageError}
      />
    </div>
  );
};

export default SearchThumnail;
