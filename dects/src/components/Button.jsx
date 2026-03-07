import React from "react";
import PropTypes from "prop-types";
import "../assets/enhanced-components.css";

/**
 * Reusable Button Component
 * @component
 * @example
 * // Primary button
 * <Button variant="primary">Click me</Button>
 * 
 * // Loading button
 * <Button loading>Processing...</Button>
 * 
 * // Full width button
 * <Button fullWidth>Submit</Button>
 */
const Button = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  className = "",
  type = "button",
  fullWidth = false,
  loading = false,
  ariaLabel = null,
  title = null,
  ...props
}) => {
  const buttonClass = [
    "btn",
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth ? "w-full" : "",
    loading ? "loading-btn" : "",
    disabled ? "btn-disabled" : "",
    className
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={buttonClass}
      disabled={disabled || loading}
      onClick={onClick}
      aria-label={ariaLabel}
      title={title}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <>
          <span className="loading-spinner"></span>
          <span className="loading-text">{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

/**
 * PropTypes validation for Button component
 */
Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "secondary", "success", "danger", "warning", "outline"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  fullWidth: PropTypes.bool,
  loading: PropTypes.bool,
  ariaLabel: PropTypes.string,
  title: PropTypes.string,
};

export default Button;
