import React from "react";
import "../assets/enhanced-components.css";

const Loader = ({ size = "md", fullScreen = false }) => {
  const sizeClass = `loader-${size}`;
  const containerClass = fullScreen ? "loader-fullscreen" : "";

  return (
    <div className={`loader-container ${containerClass}`}>
      <div className={`loader ${sizeClass}`}></div>
    </div>
  );
};

export default Loader;
