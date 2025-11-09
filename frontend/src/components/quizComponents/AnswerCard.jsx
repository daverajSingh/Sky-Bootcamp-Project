import React from "react";

// Controlled answer card: selection is driven by parent via `isSelected`.
const AnswerCard = ({ text, onSelect, index, isSelected }) => {
  function handleClick() {
    if (onSelect) onSelect(index);
  }

  return (
    <div
      role="button"
      tabIndex={0}
      data-testid={`answer-card-${index}`}
      aria-label={`Answer option: ${text}`}
      aria-pressed={isSelected}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " " ? handleClick() : null)}
      onClick={handleClick}
      className={
        `px-4 py-3 min-w-0 w-full box-border whitespace-normal break-words rounded-md cursor-pointer transition transform duration-150 ease-in-out ` +
        (isSelected
          ? "border-2 border-gray-800 bg-gray-50 shadow-md"
          : "border border-gray-300 bg-white shadow-sm hover:-translate-y-1 hover:shadow-lg")
      }
    >
      {text}
    </div>
  );
};

export default AnswerCard;
