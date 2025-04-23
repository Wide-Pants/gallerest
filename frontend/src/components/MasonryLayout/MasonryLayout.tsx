import React from "react";
import "./MasomryLayout.css";
import { useMasonryLayout } from "../../hooks/useMasonryLayout";

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
  const { columnCount, containerRef, shortestColumnIndex, columns, loaderRef } =
    useMasonryLayout({
      items,
      columnWidth,
      gap,
      onLoadMore,
    });

  return (
    <div
      ref={containerRef}
      id="masonry-column-container"
      style={
        {
          width: "100%",
          "--columns": columnCount,
          "--gap": `${gap}px`,
        } as React.CSSProperties
      }
    >
      {columns.map((col, colIdx) => {
        const isShortestColumn = colIdx === shortestColumnIndex;
        return (
          <div
            key={"col-" + colIdx}
            className="masonry-column"
            style={
              {
                "--gap": `${gap}px`,
                "--columns": columnCount,
              } as React.CSSProperties
            }
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
                      width: "100%",
                      height: columnWidth,
                      backgroundColor: "#f0f0f0",
                      borderRadius: "8px",
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
