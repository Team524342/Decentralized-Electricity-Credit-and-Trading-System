import React from "react";

const Container = ({
  children,
  size = "md",
  className = "",
}) => {
  const containerClass = [
    "container",
    size === "sm" ? "container-sm" : "",
    size === "lg" ? "container-lg" : "",
    className
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={containerClass}>{children}</div>;
};

export default Container;
