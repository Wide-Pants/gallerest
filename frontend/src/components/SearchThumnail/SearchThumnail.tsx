import React from "react";
import "./SearchThumnail.css";
import { useSearchThumnail } from "../../hooks/useSearchThumnail";

const SearchThumnail = ({
  item,
  onClick,
  style,
  innerRef,
}: {
  item: Image;
  onClick: (item: Image) => void;
  style?: React.CSSProperties;
  innerRef?: React.RefObject<HTMLDivElement> | undefined;
}) => {
  const { source, isError, itemRef, handleImageError } = useSearchThumnail({
    item,
  });

  if (isError) {
    return null;
  }

  return (
    <div
      className="search_thumbnail"
      style={style}
      ref={innerRef ?? itemRef}
      onClick={() => onClick(item)}
    >
      <img id={item.title} src={source} alt="" onError={handleImageError} />
      <a href={item.link} target="_blank" rel="noopener noreferrer">
        <p id="search_thumbnail_title">{item.title}</p>
      </a>
    </div>
  );
};

export default SearchThumnail;
