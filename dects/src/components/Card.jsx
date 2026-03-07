import React from "react";
import "../assets/enhanced-components.css";

const Card = ({ 
  children, 
  className = "", 
  variant = "light", 
  shadow = true,
  hover = true 
}) => {
  const cardClass = [
    "card",
    variant === "dark" ? "card-dark" : "",
    shadow ? "" : "",
    hover ? "" : "",
    className
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={cardClass}>{children}</div>;
};

export default Card;
