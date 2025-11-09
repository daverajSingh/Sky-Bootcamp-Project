import React from "react";

export default function Button({ onClick, buttonText, children }) {
  return (
    <button
      className="px-4 py-2 bg-indigo-500 text-white rounded shadow-md hover:bg-indigo-600 active:scale-95 transition-transform duration-150 flex items-center gap-2"
      onClick={onClick}
    >
      {children}
      {buttonText}
    </button>
  );
}
