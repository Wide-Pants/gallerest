import React, {
  useMemo,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./PopularBoard.css";
import { useMode } from "../../pages/MainPage";

type Image = {
  title: string;
  link: string;
  sizewidth: number;
  sizeheight: number;
  thumbnail: string;
};

interface PopularBoardProps {
  keyword: string | null;
  images: Record<string | "null", Image[]>;
}

const imgXPosition = [
  [455, 255, 265, 165, 150],
  [1285, 115, 890, 495, 510],
  [100, 590, 1470, 1390, 1140],
  [730, 1265, 205, 785, 400],
  [985, 1270, 695, 960, 1050],
  [1635, 1390, 1475, 1592, 1480],
];

const imgYPosition = [
  [50, -18, 55, 385, 100],
  [145, 500, 275, 50, 260],
  [385, 300, 55, 120, 40],
  [765, 70, 570, 720, 680],
  [560, 715, 655, 530, 550],
  [760, 485, 590, 700, 435],
];

const PopularBoard = ({ keyword, images }: PopularBoardProps) => {
  const [initialFlage, setInitialFlage] = useState(true);
  const boardRef = useRef<HTMLDivElement>(null);

  const { mode } = useMode();

  useEffect(() => {
    if (boardRef.current) {
      if (mode === "assemble") {
        boardRef.current.animate([{ opacity: 0 }], {
          duration: 1000,
          easing: "ease-in-out",
          fill: "forwards",
        });
      } else {
        boardRef.current.animate([{ opacity: 1 }], {
          duration: 1000,
          easing: "ease-in-out",
          fill: "forwards",
        });
      }
    }
  }, []);

  const positions = useMemo(() => {
    if (images[keyword!] === undefined) return [];

    if (keyword === null) {
      return images["null"].map((_, index) => ({
        x: imgXPosition[index][0],
        y: imgYPosition[index][0],
      }));
    }

    const keywordIndex = Object.keys(images).indexOf(keyword);
    return images[keyword]?.map((_, index) => ({
      x: imgXPosition[index][keywordIndex],
      y: imgYPosition[index][keywordIndex],
    }));
  }, [images, keyword]);

  return (
    <AnimatePresence>
      {images[keyword ?? "null"]?.map((imageData, index) => (
        <motion.div
          key={`${keyword}-${index}`}
          className="popular-board-item"
          style={{
            position: "absolute",
            left: positions[index].x,
            width: 360,
            height: imageData.sizeheight / imageData.sizewidth * 360,
          }}
          initial={{
            top: initialFlage ? positions[index].y : positions[index].y - 1024,
          }}
          animate={{
            opacity: 1,
            top: positions[index].y,
          }}
          exit={{
            opacity: 0,
            top: positions[index].y - 1024,
          }}
          transition={{
            duration: 1.25,
            ease: "easeInOut",
          }}
          onAnimationComplete={() => setInitialFlage(false)}
        >
          (
          <img
            src={imageData.thumbnail}
            alt={`Popular image ${index + 1}`}
          />
          )
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

export default PopularBoard;
