import React from 'react';

const QuestionTitle = ({ human, questionText }) => {
  return (
    <div>
      <div style={{ fontWeight: '600' }}>{human}</div>
      <div>{questionText}</div>
    </div>
  );
};

export default QuestionTitle;
