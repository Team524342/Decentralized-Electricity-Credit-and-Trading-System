import React from "react";
import { AlertCircle, CheckCircle, AlertTriangle, X, Info } from "lucide-react";
import "../assets/enhanced-components.css";

const Alert = ({ type = "info", title, message, onClose }) => {
  const icons = {
    success: <CheckCircle size={20} />,
    error: <AlertCircle size={20} />,
    warning: <AlertTriangle size={20} />,
    info: <Info size={20} />,
  };

  return (
    <div className={`alert alert-${type}`}>
      <div className="alert-content">
        <div className="alert-icon">{icons[type]}</div>
        <div className="alert-body">
          {title && <div className="alert-title">{title}</div>}
          <div className="alert-message">{message}</div>
        </div>
      </div>
      {onClose && (
        <button className="alert-close" onClick={onClose}>
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default Alert;
