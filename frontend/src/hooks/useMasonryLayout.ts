import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type MasonryLayoutProps<T extends object> = {
  items: T[];
  columnWidth: number;
  gap: number;
  onLoadMore?: () => void;
};

export const useMasonryLayout = <T extends { [key: string]: any }>({
  items,
  columnWidth,
  gap,
  onLoadMore,
}: MasonryLayoutProps<T>) => {
  const [columnCount, setColumnCount] = useState<number>(4);
  const containerRef = useRef<HTMLDivElement>(null);
  const [shortestColumnIndex, setShortestColumnIndex] = useState<number>(-1);

  const calculateColumnCount = useCallback(
    (sectionWidth: number) => {
      if (sectionWidth === null) return;
      const count = Math.max(
        1,
        Math.floor(sectionWidth / (columnWidth + 8 + gap))
      );
      return count > 2 ? count : 2;
    },
    [columnWidth, gap]
  );

  const columns = useMemo(() => {
    const cols: T[][] = Array.from({ length: columnCount }, () => []);
    const heights: number[] = Array(columnCount).fill(0);
    items.forEach((item) => {
      const shortestIndex = heights.indexOf(Math.min(...heights));
      if (shortestIndex !== -1) {
        cols[shortestIndex].push(item);
        heights[shortestIndex] +=
          Math.floor((item.sizeheight / item.sizewidth) * columnWidth) +
          Number(gap);
      }
    });

    setShortestColumnIndex(heights.indexOf(Math.min(...heights)));
    return cols;
  }, [items, columnCount, gap]);

  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loaderRef.current || !onLoadMore) return;
    const observer = new IntersectionObserver(
      ([entries]) => {
        if (entries.isIntersecting) {
          onLoadMore();
        }
      },
      {
        rootMargin: "0px 0px 800px 0px", // 200px 전에 트리거
      }
    );
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [onLoadMore, shortestColumnIndex]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newColumnCount = calculateColumnCount(entry.contentRect.width);
        setColumnCount(newColumnCount ?? 2);
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  return {
    columnCount,
    containerRef,
    shortestColumnIndex,
    columns,
    loaderRef
  };
}; 