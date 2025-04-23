import { useEffect, useRef, useState } from "react";

type Image = {
  title: string;
  link: string;
  sizewidth: number;
  sizeheight: number;
  thumbnail: string;
};

interface UseSearchThumnailProps {
  item: Image;
}

export const useSearchThumnail = ({ item }: UseSearchThumnailProps) => {
  const [source, setSource] = useState(item.thumbnail);
  const [isError, setIsError] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const img = new Image();
    img.src = item.link;
    img.onload = () => {
      setIsError(false);
      setSource(item.link);
    };
    img.onerror = () => {
      console.warn(`이미지 로드 실패: ${item.link}`);
      setSource(item.thumbnail);
    };
  }, [item]);

  const handleImageError = () => {
    setIsError(true);
  };

  return {
    source,
    isError,
    itemRef,
    handleImageError
  };
}; 