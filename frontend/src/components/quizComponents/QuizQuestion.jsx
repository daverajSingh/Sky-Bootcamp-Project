import React from 'react';
import QuestionTitle from './QuestionTitle';
import AnswerCard from './AnswerCard';


const QuizQuestion = ({ question, onAnswer, selectedIndex = null }) => {
  function handleSelect(index) {
    if (onAnswer) onAnswer(question.questionID, index);
  }

  return (
    <div style={{ marginBottom: 12 }}>
      <QuestionTitle human={question.human || 'Agile human'} questionText={question.question} />
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        {question.options.map((opt, idx) => (
          <AnswerCard
            key={idx}
            index={idx}
            text={opt.text}
            onSelect={() => handleSelect(idx)}
            isSelected={selectedIndex === idx}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
