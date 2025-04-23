import React, { useRef, useState } from "react";
import "./SearchThumnail.css";

type Image = {
  title: string;
  link: string;
  sizewidth: number;
  sizeheight: number;
  thumbnail: string;
};

const SearchThumnail = ({
  item,
  onClick,
  style
}: {
  item: Image;
  onClick: (item: Image) => void;
  style?: React.CSSProperties;
}) => {
  const [source, setSource] = useState(item.thumbnail);
  const [isError, setIsError] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  const handleImageError = () => {
    if (!isError && source === item.thumbnail) {
      setIsError(true);
    } else {
      setSource(item.link);
    }
  };

  if (isError) {
    return null;
  }
  return (
    <div
      className="search_thumbnail"
      style={style}
      onClick={() => {
        onClick(item);
      }}
      ref={itemRef}
    >
      <img id={item.title} src={source} alt="" onError={handleImageError} />
      <a href={item.link} target="_blank" rel="noopener noreferrer">
        <p id="search_thumbnail_title">{item.title}</p>
      </a>
    </div>
  );
};

export default SearchThumnail;
