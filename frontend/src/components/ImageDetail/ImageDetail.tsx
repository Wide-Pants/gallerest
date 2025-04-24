import React from "react";
import { motion } from "framer-motion";
import "./ImageDetail.css";
import { useImageDetail } from "../../hooks/useImageDetail";

interface ImageDetailProps {
  selectedImage: Image | null;
  onClose: () => void;
}

const ImageDetail = ({ selectedImage, onClose }: ImageDetailProps) => {
  if (!selectedImage) return null;
  
  const { source, isLoading, controls, handleDragEnd } = useImageDetail({
    selectedImage,
    onClose
  });

  return (
    <>
      <div id="overlay" onClick={onClose} />
      <motion.section
        id="detail_section"
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.4}
        onDragEnd={handleDragEnd}
        animate={controls}
        initial={{ y: 0 }}
        style={{
          width: "100vw",
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 300,
        }}
      >
        <div id="detail_section_container">
          <div id="detail_section_header">
            <div 
              id="detail_section_header_close" 
              onClick={onClose}
              role="button"
              aria-label="닫기"
            >
              <img src={'/CloseBtn.png'} alt="닫기" />
            </div>
          </div>
          <motion.div 
            id="detail_section_container_image"
            style={{ touchAction: "none" }}
          >
            {isLoading && (
              <div id="detail_section_container_image_loading">
                <div className="loading-highlight" />
              </div>
            )}
            <img src={source} alt={selectedImage.title} />
          </motion.div>
          <div id="detail_section_title">
            <a
              href={selectedImage.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <p style={{ padding: 0, margin: 0, color: "#333" }}>
                {selectedImage.title}
              </p>
            </a>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default ImageDetail;
