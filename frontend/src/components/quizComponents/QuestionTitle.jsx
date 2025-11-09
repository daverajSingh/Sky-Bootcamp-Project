import React from "react";

const QuestionTitle = ({ human, questionText }) => {
  return (
    <div>
  {human && <div className="font-bold">{human}</div>}
      <div>{questionText}</div>
    </div>
  );
};

export default QuestionTitle;
