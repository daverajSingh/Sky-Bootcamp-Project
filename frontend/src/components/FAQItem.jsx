import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const safeQuestion = question || "Question not available";
  const safeAnswer = answer || "Answer not available";

  return (
    <div className="border-b border-gray-200 py-4" data-testid="faqItem">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full justify-between items-center cursor-pointer"
      >
        <h3 className="text-left">{safeQuestion}</h3>
        <span className="shrink-0 ml-1">
          {isOpen ? (
            <FiMinus data-testid="faqCollapse" size={18} />
          ) : (
            <FiPlus data-testid="faqExpand" size={18} />
          )}
        </span>
      </button>
      {isOpen && <p className="mt-2">{safeAnswer}</p>}
    </div>
  );
};

export default FAQItem;
