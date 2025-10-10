import React from 'react';
import QuestionTitle from './QuestionTitle';
import AnswerCard from './AnswerCard';


const QuizQuestion = ({ question, onAnswer, selectedIndex = [] }) => {
  // selectedIndex is now an array of selected indices for multi-select
  function handleToggle(index) {
    const prev = Array.isArray(selectedIndex) ? selectedIndex : [];
    const exists = prev.includes(index);
    const next = exists ? prev.filter((i) => i !== index) : [...prev, index];
    if (onAnswer) onAnswer(question.questionID, next);
  }

  return (
    <div style={{ marginBottom: 12 }}>
      <QuestionTitle human={question.human || 'Agile human'} questionText={question.question} />
      <div style={{ display: 'flex', gap: 12, marginTop: 8, flexWrap: 'nowrap' }}>
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
