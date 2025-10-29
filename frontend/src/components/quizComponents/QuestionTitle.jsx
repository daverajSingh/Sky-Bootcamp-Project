import React from "react";

const QuestionTitle = ({ human, questionText }) => {
  return (
    <div>
      {human && <div style={{ fontWeight: "700" }}>{human}</div>}
      <div>{questionText}</div>
    </div>
  );
};

export default QuestionTitle;
