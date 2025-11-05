import React from "react";

export default function Button({ onClick, buttonText, children }) {
  return (
    <button
      className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition duration-300 flex items-center gap-2 cursor-pointer"
      onClick={onClick}
    >
      {children}
      {buttonText}
    </button>
  );
}
