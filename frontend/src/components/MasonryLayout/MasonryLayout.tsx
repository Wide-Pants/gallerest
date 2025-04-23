import React, { useEffect, useMemo, useRef, useState } from "react";
import "./MasomryLayout.css";

type MasonryLayoutProps<T extends object> = {
  items: T[];
  columnWidth: number;
  gap: number;
  isLoading: boolean;
  renderItem: (item: T) => React.ReactNode;
  onLoadMore?: () => void;
};

const MasonryLayout = <T extends { [key: string]: any }>({
  items,
  columnWidth,
  gap,
  isLoading,
  renderItem,
  onLoadMore,
}: MasonryLayoutProps<T>) => {
  const [containerWidth, setContainerWidth] = useState<number>(
    window.innerWidth - 96
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const [shortestColumnIndex, setShortestColumnIndex] = useState<number>(-1);

  const columnCount = useMemo(() => {
    const count = Math.max(1, Math.floor(containerWidth / (columnWidth + gap)));
    return count > 2 ? count : 2;
  }, [items, containerWidth, columnWidth, gap]);

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
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth - 96);
      } else {
        setContainerWidth(window.innerWidth - 96);
      }
    };

    handleResize(); // 초기 실행
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      id="masonry-column-container"
      style={{
        "--gap": `${gap}px`,
      } as React.CSSProperties}
    >
      {columns.map((col, colIdx) => {
        const isShortestColumn = colIdx === shortestColumnIndex;
        return (
          <div
            key={"col-" + colIdx}
            className="masonry-column"
            style={{
              "--gap": `${gap}px`,
              "--columns": columnCount,
            } as React.CSSProperties}
          >
            {col.map((item, idx) => (
              <div
                key={"col-" + colIdx + "-item-" + idx}
                style={{
                  width: "100%",
                }}
              >
                {renderItem(item)}
              </div>
            ))}
            {isLoading && (
              <>
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div
                    key={"skeleton-" + colIdx + "-" + idx}
                    className="masonry-skeleton"
                    style={{
                      width: columnWidth,
                      height: columnWidth,
                      backgroundColor: "#f0f0f0",
                      borderRadius: "8px",
                      animation: "pulse 1.5s ease-in-out infinite",
                    }}
                  />
                ))}
              </>
            )}
            {isShortestColumn && (
              <div
                ref={loaderRef}
                style={{
                  width: "100%",
                  height: `${gap}px`,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MasonryLayout;
