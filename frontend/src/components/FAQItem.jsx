import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const safeQuestion = question || "Question not available";
  const safeAnswer = answer || "Answer not available";

  return (
    <div className="border border-gray-200 hover:border-blue-500 transition-colors duration-300 rounded-md p-4 mb-2" data-testid="faqItem">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center cursor-pointer transition-transform duration-150 hover:-translate-y-1 hover:shadow-md"
      >
        <h3 className="text-left font-semibold">{safeQuestion}</h3>
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
