import { useCallback, useEffect, useRef, useState } from "react";

export const useSearchHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const page = document.getElementById("search-page");
    const isMobile = window.innerWidth <= 480;
    if (isMobile && page) {
      if (isOpen) {
        page.style.overflow = "hidden";
      } else {
        page.style.overflow = "auto";
      }
    }
    if(!isMobile && page){
      page.style.overflow = "auto";
    }
  }, [isOpen]);

  useEffect(() => {
    const handleBlur = (e:MouseEvent) => {
      if(!isOpen) return;

      const path = e.composedPath();
      const insideBox = boxRef.current && path.includes(boxRef.current);
      const insideHeader = headerRef.current && path.includes(headerRef.current);

      if (!insideBox && !insideHeader) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleBlur);
    
    return () => {
      document.removeEventListener("click", handleBlur);
    };
  }, [isOpen]);

  const loadHistory = useCallback(() => {
    const pervHistory = localStorage.getItem("history");
    if (pervHistory) {
      setHistory(JSON.parse(pervHistory));
    }
  }, []);

  const deleteHistory = useCallback((item: string) => {
    const pervHistory = localStorage.getItem("history");
    if (pervHistory) {
      const parsedHistory = JSON.parse(pervHistory) as string[];
      parsedHistory.splice(parsedHistory.indexOf(item), 1);
      localStorage.setItem("history", JSON.stringify(parsedHistory));
      setHistory(parsedHistory);
    }
  }, [history,setHistory]);

  useEffect(() => {
    loadHistory();
  }, [isOpen]);

  return {
    isOpen,
    setIsOpen,
    history,
    boxRef,
    inputRef,
    headerRef,
    loadHistory,
    deleteHistory
  };
}; 