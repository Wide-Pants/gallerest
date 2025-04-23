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

interface PopularBoardProps {
  keyword: string | null;
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
const PopularBoard: React.FC<PopularBoardProps> = ({ keyword }) => {
  const [initialFlage, setInitialFlage] = useState(true);
  const [imageSizes, setImageSizes] = useState<{
    [key: string]: { width: number; height: number };
  }>({});
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
  const images = [
    "https://www.gannett-cdn.com/presto/2019/12/13/PREN/056dc099-5c18-47af-a416-435f29175b70-Switch_PokemonSwordPokemonShield_artwork_01_png_jpgcopy.jpg?width=1320&height=850&fit=crop&format=pjpg&auto=webp",
    "https://sportshub.cbsistatic.com/i/2022/09/07/9ccb5a62-149c-4727-9fca-114923aa0094/pokemonsv-featureart2-c-rgb.jpg",
    "https://sm.ign.com/ign_ap/gallery/a/all-terast/all-terastallized-pokemon_v3tp.jpg",
    "https://a-static.besthdwallpaper.com/pokemon-party-wallpaper-3000x2000-17797_42.jpg",
    "https://media2.fdncms.com/rochester/imager/video-game-review-pokemon-xy/u/original/2295145/yveltal_official_illustration_300dpi.jpg",
  ];

  const handleImageLoad = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>, index: number) => {
      const img = event.target as HTMLImageElement;
      const { naturalWidth, naturalHeight } = img;
      const ratio = Math.min(300 / naturalWidth, 300 / naturalHeight);
      setImageSizes((prev) => ({
        ...prev,
        [index]: {
          width: naturalWidth * ratio,
          height: naturalHeight * ratio,
        },
      }));
    },
    []
  );

  const positions = useMemo(() => {
    return images.map((_, index) => ({
      x: imgXPosition[2][index],
      y: imgYPosition[2][index],
    }));
  }, [images, keyword]);

  return (
    <AnimatePresence >
      {images.map((imageUrl, index) => (
        <motion.div
          key={`${keyword}-${index}`}
          className="popular-board-item"
          style={{
            position: "absolute",
            left: positions[index].x,
            width: imageSizes[index]?.width || "auto",
            height: imageSizes[index]?.height || "auto",
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
          <img
            src={imageUrl}
            alt={`Popular image ${index + 1}`}
            onLoad={(e) => handleImageLoad(e, index)}
          />
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

export default PopularBoard;
