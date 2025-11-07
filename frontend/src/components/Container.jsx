import React from "react";

/* Reusable pastel gradient container component */

const Container = ({ children, className = "" }) => {
  return (
    <div className={`pastel-gradient rounded-2xl shadow-lg ${className}`}>
      {children}
    </div>
  );
};

export default Container;
