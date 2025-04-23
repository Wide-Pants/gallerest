import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import PopularBoard from "./PopularBoard";
import PopularScroll from "./PopularScroll";
import { useMode } from "../../pages/MainPage";

const PopularScrollBoard = () => {
  const [keyword, setKeyword] = useState<string | null>(null);
  const indexRef = useRef<number>(-1);
  const intervalStateRef = useRef(true);
  const timeoutRef = useRef<any>(null);
  const { mode } = useMode();
  const populars = useMemo(
    () => ["지우 우승", "롯데 월드 피카츄", "파치리스", "찌리리공"],
    []
  );

  const changeKeyword = useCallback(
    (typedKeyword: string | null) => {
      setKeyword(typedKeyword);
      intervalStateRef.current = false;
      if(!typedKeyword){
        timeoutRef.current = setTimeout(() => {
          intervalStateRef.current = true;
        }, 5000);
      }else{
        if(timeoutRef.current){
          clearTimeout(timeoutRef.current);
        }
      }
    },
    [keyword, populars]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if(intervalStateRef.current){
      const nextIndex = indexRef.current + 1;
      if (nextIndex >= populars.length) {
        indexRef.current = -1;
        setKeyword(null);
      } else {
        indexRef.current = nextIndex;
        setKeyword(populars[nextIndex]);
      }
    }}, 6000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (mode === "idle") {
      setKeyword(null);
      indexRef.current = -1;
      intervalStateRef.current = true;
    }else{
      intervalStateRef.current = false;
    }
  }, [mode]);

  return (
    <>
      <PopularBoard keyword={keyword} />
      <PopularScroll
        keyword={keyword}
        populars={populars}
        setKeyword={changeKeyword}
      />
    </>
  );
};

export default PopularScrollBoard;
