import { useEffect, useState } from "react";
import { motion, PanInfo, useAnimation } from "framer-motion";

type Image = {
  title: string;
  link: string;
  sizewidth: number;
  sizeheight: number;
  thumbnail: string;
};

interface UseImageDetailProps {
  selectedImage: Image | null;
  onClose: () => void;
}

const DRAG_THRESHOLD = 150; // 닫히는 기준이 되는 드래그 거리 (픽셀)

export const useImageDetail = ({ selectedImage, onClose }: UseImageDetailProps) => {
  const [source, setSource] = useState(selectedImage?.thumbnail ?? "");
  const [isLoading, setIsLoading] = useState(true);
  const controls = useAnimation();

  useEffect(() => {
    if (!selectedImage) return;
    
    setIsLoading(true);
    const img = new Image();
    img.src = selectedImage.link;
    img.onload = () => {
      setIsLoading(false);
      setSource(selectedImage.link);
    };
    img.onerror = () => {
      setIsLoading(false);
      console.warn(`이미지 로드 실패: ${selectedImage.link}`);
      setSource(selectedImage.thumbnail);
    };
  }, [selectedImage]);

  const handleDragEnd = async (event: any, info: PanInfo) => {
    const yOffset = info.offset.y;
    const yVelocity = info.velocity.y;

    // 아래로 드래그하고 임계값을 넘었거나, 빠른 속도로 스와이프한 경우
    if (yOffset > DRAG_THRESHOLD || yVelocity > 500) {
      await controls.start({ y: window.innerHeight });
      onClose();
    } else {
      // 원위치로 돌아가기
      controls.start({ y: 0 });
    }
  };

  return {
    source,
    isLoading,
    controls,
    handleDragEnd
  };
}; 