import React from "react";
import QuestionTitle from "./QuestionTitle";
import AnswerCard from "./AnswerCard";

const QuizQuestion = ({ question, onAnswer, selectedIndex = [] }) => {
  // selectedIndex is now an array of selected indices for multi-select
  function handleToggle(index) {
    // Single-select with toggle: select the clicked index, or clear if already selected
    const prev = Array.isArray(selectedIndex) ? selectedIndex : [];
    const exists = prev.includes(index);
    const next = exists ? [] : [index];
    if (onAnswer) onAnswer(question.questionID, next);
  }

  return (
    <div className="mb-3" data-testid={`question-${question.questionID}`}>
      <QuestionTitle human={question.human} questionText={question.question} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-2 p-3 rounded-lg bg-transparent">
        {question.options.map((opt, idx) => (
          <AnswerCard
            key={idx}
            index={idx}
            text={opt.text}
            onSelect={() => handleToggle(idx)}
            isSelected={Array.isArray(selectedIndex) && selectedIndex.includes(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
