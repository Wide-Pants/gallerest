import { useState, useEffect, useRef } from "react";
import "./AssembleGallery.css";
import { useMode } from "../../pages/MainPage";

const image_array = [
  'url("https://www.gannett-cdn.com/presto/2019/12/13/PREN/056dc099-5c18-47af-a416-435f29175b70-Switch_PokemonSwordPokemonShield_artwork_01_png_jpgcopy.jpg?width=1320&height=850&fit=crop&format=pjpg&auto=webp")',
  'url("https://sportshub.cbsistatic.com/i/2022/09/07/9ccb5a62-149c-4727-9fca-114923aa0094/pokemonsv-featureart2-c-rgb.jpg")',
  'url("https://sm.ign.com/ign_ap/gallery/a/all-terast/all-terastallized-pokemon_v3tp.jpg")',
  'url("https://a-static.besthdwallpaper.com/pokemon-party-wallpaper-3000x2000-17797_42.jpg")',
  'url("https://media2.fdncms.com/rochester/imager/video-game-review-pokemon-xy/u/original/2295145/yveltal_official_illustration_300dpi.jpg")',
];

const a_pic_X = [
  [-672, 0, 265, 165, 150],
  [-812, -780, 890, 495, 510],
  [-702, -1200, 1470, 1390, 1140],
  [-362, 0, 205, 785, 400],
  [68, 1600, 695, 960, 1050],
  [68, 1190, 1475, 1592, 1480],
  [-57, 1270, 695, 960, 1050],
  [463, 0, 1475, 1592, 1480],
];

const a_pic_Y = [
  [-440, -700, 55, 385, 100],
  [-160, 0, 275, 50, 260],
  [120, 0, 55, 120, 40],
  [-440, -900, 570, 720, 680],
  [-440, 0, 695, 960, 1050],
  [-150, 0, 655, 530, 550],
  [120, 0, 590, 700, 435],
  [-150, 1200, 1475, 1592, 1480],
];

const a_pic_W = [300, 440, 635, 420, 500, 385, 510, 350];
const a_pic_H = [270, 270, 320, 550, 280, 260, 320, 540];

const AssembleGallery = () => {
  const [stateIn, setStateIn] = useState(false);
  const [current, setCurrent] = useState(0);
  const galleryRefs = useRef([]);
  const buttonRef = useRef(null);
  const { setMode } = useMode();

  useEffect(() => {
    // 초기 위치 설정
    galleryRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.style.width = `${a_pic_W[index]}px`;
        ref.style.height = `${a_pic_H[index]}px`;
        ref.style.left = "50%";
        ref.style.top = "50%";
        ref.style.transform = `translate(${
          a_pic_X[index][0] + a_pic_X[index][1]
        }px,${a_pic_Y[index][0] + a_pic_Y[index][1]}px)`;
        ref.style.backgroundImage = image_array[current];
        ref.style.opacity = "0";
      }
    });
    const [first, second] = buttonRef.current.children;
    first.style.transform = "rotate(90deg)";
    first.style.margin = "8px 0px";
    second.style.transform = "rotate(0deg)";
  }, [current]);

  const handleAssembleClick = () => {
    setMode("assemble");
    if (!stateIn) {
      // 갤러리 확장 애니메이션
      galleryRefs.current.forEach((ref, index) => {
        if (ref) {
          ref.animate(
            [
              {
                left: "50%",
                top: "50%",
                transform: `translate(${a_pic_X[index][0]}px,${a_pic_Y[index][0]}px)`,
                opacity: "1",
              },
            ],
            {
              duration: 1000,
              fill: "forwards",
              easing: "ease-out",
            }
          );
        }
      });

      // 버튼 애니메이션
      if (buttonRef.current) {
        const [first, second] = buttonRef.current.children;
        first.animate([{ transform: "rotate(135deg)", margin: "-3px 0px" }], {
          duration: 500,
          fill: "forwards",
        });
        second.animate([{ transform: "rotate(45deg)", margin: "0px 0px" }], {
          duration: 500,
          fill: "forwards",
        });
      }
    } else {
      // 갤러리 축소 애니메이션
      setMode("idle");
      galleryRefs.current.forEach((ref, index) => {
        if (ref) {
          ref.animate(
            [
              {
                left: "50%",
                top: "50%",
                transform: `translate(${
                  a_pic_X[index][0] + a_pic_X[index][1]
                }px,${a_pic_Y[index][0] + a_pic_Y[index][1]}px)`,
                opacity: "0",
              },
            ],
            {
              duration: 1000,
              fill: "forwards",
              easing: "ease-in",
            }
          );
        }
      });

      // 버튼 애니메이션
      if (buttonRef.current) {
        const [first, second] = buttonRef.current.children;
        first.animate([{ transform: "rotate(90deg)", margin: "6px 0px" }], {
          duration: 500,
          fill: "forwards",
        });
        second.animate([{ transform: "rotate(0deg)" }], {
          duration: 500,
          fill: "forwards",
        });
      }
    }
    setStateIn(!stateIn);
  };

  return (
    <>
      <div className="gallery-container">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            ref={(el) => (galleryRefs.current[index] = el)}
            className="gallery-item"
          />
        ))}
      </div>
      <div
        ref={buttonRef}
        id="assemble_button"
        className="assemble-button"
        onClick={handleAssembleClick}
      >
        <div className="button-line"></div>
        <div className="button-line"></div>
      </div>
    </>
  );
};

export default AssembleGallery;
