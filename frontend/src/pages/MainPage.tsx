import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import SearchBar from "../components/SearchBar";
import PopularScrollBoard from "../components/PopularScroll";
import AssembleGallery from "../components/AssembleGallery/AssembleGallery";
import "../styles/MainPage.css";
type MainPageModes = "search" | "assemble" | "idle";

const ModeContext = createContext<
  | {
      mode: MainPageModes;
      setMode: (mode: MainPageModes) => void;
    }
  | undefined
>(undefined);

function MainPage() {
  const [mode, setMode] = useState<MainPageModes>("idle");
  const sectionRef = useRef<HTMLDivElement>(null);
  const sloganRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (sectionRef.current) {
      if (mode === "assemble") {
        sectionRef.current.animate([{ opacity: 0 }], {
          duration: 1000,
          easing: "ease-in-out",
          fill: "forwards",
        });
      } else {
        sectionRef.current.animate({ opacity: 1 }, {
          duration: 1000,
          easing: "ease-in-out",
          fill: "forwards",
        });
      }
    }
    if (sloganRef.current) {
      if (mode === "idle") {
        sloganRef.current.animate([ { opacity: 1 }], {
          duration: 2500,
          easing: "ease-in-out",
          fill: "forwards",
        });
      } else {
        sloganRef.current.animate([{ opacity: 0 }], {
          duration: 1000,
          easing: "ease-in-out",
          fill: "forwards",
        });
      }
    }
  }, [mode]);

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      <div id="main-page">
        <div id="main_logo">
          <img src={'/icons.png'} alt="logo" />
        </div>
        <div id="blur-board" />
        <PopularScrollBoard />
        <section id="main_center_section" ref={sectionRef}>
          <div id="main_slogan_container" ref={sloganRef}>
            <h1 className="main_slogan">빠르게 찾는 이미지</h1>
            <p className="sub_slogan">찾고 있는 이미지를 제공해드립니다.</p>
          </div>
          <br />
          <SearchBar />
        </section>
      </div>
    </ModeContext.Provider>
  );
}

export const useMode = () => {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error("useMode must be used within a ModeProvider");
  }
  return context;
};

export default MainPage;
