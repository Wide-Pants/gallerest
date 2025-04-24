import { useMemo, useState, useCallback, useRef, useEffect } from "react";

interface UsePopularBoardProps {
  keyword: string | null;
  images: Record<string | "null", Image[]>;
}

// 기준 화면 너비(1920px)에서의 이미지 위치 (백분율)
const imgXPosition = [
  [20, 15, 12, 8, 10],    // 왼쪽 정렬
  [65, 8, 45, 25, 28],    // 중앙 왼쪽
  [5, 30, 75, 70, 60],    // 중앙
  [38, 65, 10, 40, 22],   // 중앙 오른쪽
  [50, 66, 35, 48, 55],   // 오른쪽 정렬
  [85, 72, 76, 82, 78],   // 맨 오른쪽
] as const;

const imgYPosition = [
  [5, 0, 5, 35, 10],      // 상단
  [15, 45, 25, 5, 24],    // 중간 상단
  [35, 28, 5, 12, 4],     // 중간
  [70, 7, 52, 65, 62],    // 중간 하단
  [52, 65, 60, 48, 50],   // 하단
  [70, 44, 54, 64, 40],   // 맨 하단
] as const;

// 이미지 크기 스케일 (1이 기본 크기)
const imgScale = [
  [1.2, 0.8, 1.0, 0.9, 1.1],
  [1.0, 1.1, 0.9, 1.2, 0.8],
  [0.9, 1.2, 1.1, 0.8, 1.0],
  [1.1, 0.9, 1.0, 1.2, 0.8],
  [0.8, 1.1, 0.9, 1.0, 1.2],
  [1.0, 0.8, 1.2, 0.9, 1.1],
] as const;

export const usePopularBoard = ({ keyword, images }: UsePopularBoardProps) => {
  const [isInitial, setIsInitial] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const positions = useMemo(() => {
    if (!images[keyword ?? "null"]) return [];

    const currentImages = images[keyword ?? "null"];
    const keywordIndex = keyword ? Object.keys(images).indexOf(keyword) : 0;

    return currentImages.map((_, index) => ({
      x: (imgXPosition[index][keywordIndex] * windowWidth) / 100,
      y: (imgYPosition[index][keywordIndex] * windowHeight) / 100,
      scale: imgScale[index][keywordIndex]
    }));
  }, [images, keyword, windowWidth, windowHeight]);

  const handleAnimationComplete = useCallback(() => {
    setIsInitial(false);
  }, []);

  return {
    isInitial,
    windowWidth,
    windowHeight,
    containerRef,
    positions,
    handleAnimationComplete
  };
}; 