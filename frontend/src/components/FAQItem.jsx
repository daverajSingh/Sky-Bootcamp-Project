import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const safeQuestion = question || "Question not available";
  const safeAnswer = answer || "Answer not available";

  return (
    <div className="border-b border-gray-200 py-4" data-testid="faqItem">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center cursor-pointer transition-transform duration-150 hover:-translate-y-1 hover:shadow-md"
      >
        <h3>{safeQuestion}</h3>
        <span>
          {isOpen ? (
            <FiMinus data-testid="faqCollapse" size={18} />
          ) : (
            <FiPlus data-testid="faqExpand" size={18} />
          )}
        </span>
      </div>
      {isOpen && <p className="mt-2">{safeAnswer}</p>}
    </div>
  );
};

export default FAQItem;
