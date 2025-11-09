import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const safeQuestion = question || "Question not available";
  const safeAnswer = answer || "Answer not available";

  return (
    <div 
      className="bg-white rounded-md shadow-md p-4 transition-all duration-200 hover:shadow-lg" 
      data-testid="faqItem"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left transition-all duration-150 active:scale-95"
      >
        <h3 className="font-semibold text-gray-800">{safeQuestion}</h3>
        <span className="shrink-0 ml-2 text-sky-600">
          {isOpen ? (
            <FiMinus data-testid="faqCollapse" size={20} />
          ) : (
            <FiPlus data-testid="faqExpand" size={20} />
          )}
        </span>
      </button>
      {isOpen && (
        <p className="mt-3 text-gray-700 leading-relaxed border-t border-gray-200 pt-3">
          {safeAnswer}
        </p>
      )}
    </div>
  );
};

export default FAQItem;
