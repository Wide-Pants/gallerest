import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFoundPage.css";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div id="not_found_page">
      <h1>404 Not Found</h1>
      <p>찾을 수 없는 페이지입니다.</p>
      <button onClick={() => navigate("/")}>메인 페이지로 돌아가기</button>
    </div>
  );
};

export default NotFoundPage;

