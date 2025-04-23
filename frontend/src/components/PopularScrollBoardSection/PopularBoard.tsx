import React from 'react';
import { usePopularBoard } from '../../hooks/usePopularBoard';
import { motion, AnimatePresence } from "framer-motion";
import "./PopularBoard.css";

const ANIMATION_DURATION = 800; // ms
const INITIAL_OFFSET = 1024; // px
const BASE_IMAGE_WIDTH = 360; // px

interface Image {
  link: string;
  title: string;
  thumbnail: string;
  sizewidth: number;
  sizeheight: number;
}

interface PopularBoardProps {
  keyword: string | null;
  images: Record<string | "null", Image[]>;
}

const PopularBoard = ({ keyword, images }: PopularBoardProps) => {
  const {
    isInitial,
    windowWidth,
    windowHeight,
    containerRef,
    positions,
    handleAnimationComplete
  } = usePopularBoard({ keyword, images });

  return (
    <div
      ref={containerRef}
      className="popular-board-container"
      style={{
        width: windowWidth,
        height: windowHeight,
      }}
    >
      <AnimatePresence mode="wait">
        {images[keyword ?? "null"]?.map((image, index) => {
          const position = positions[index];
          if (!position) return null;

          const imageWidth = BASE_IMAGE_WIDTH * position.scale;

          return (
            <motion.div
              key={`${keyword}-${index}`}
              className="popular-board-item"
              style={{
                position: "absolute",
                left: position.x,
                width: imageWidth,
                height: (image.sizeheight / image.sizewidth) * imageWidth,
              }}
              initial={{
                top: isInitial ? position.y : position.y - INITIAL_OFFSET,
                scale: position.scale,
                opacity: 0,
              }}
              animate={{
                top: position.y,
                scale: position.scale,
                opacity: 1,
              }}
              exit={{
                top: position.y - INITIAL_OFFSET,
                scale: position.scale,
                opacity: 0,
              }}
              transition={{
                duration: ANIMATION_DURATION / 1000,
                ease: "easeInOut",
              }}
              onAnimationComplete={handleAnimationComplete}
            >
              <img
                src={image.thumbnail}
                alt={image.title}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}; 

export default PopularBoard;
