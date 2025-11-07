import React, { useEffect } from "react";
import QuizQuestion from "./QuizQuestion";

const QuizQuestionsPanel = ({
  topic,
  onStatusChange,
  savedAnswers = {},
  onAnswer,
}) => {
  // savedAnswers is an object mapping questionID -> arrayOfSelectedIndices (for multi-select)

  useEffect(() => {
    // inform parent about status for newly selected topic if needed
    if (topic && onStatusChange) {
      const total = topic.questions.length;
      const answered = Object.values(savedAnswers).filter((v) =>
        Array.isArray(v) ? v.length > 0 : v !== null && v !== undefined
      ).length;
      const newStatus =
        answered === 0 ? "todo" : answered === total ? "answered" : "partially";
      onStatusChange(topic.topicID, newStatus, topic.person || null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic?.topicID]);

  function handleAnswer(questionID, selectedIndicesArray) {
    // selectedIndicesArray is an array of selected option indices for the given question
    if (onAnswer) onAnswer(questionID, selectedIndicesArray);
    if (onStatusChange && topic) {
      const merged = {
        ...savedAnswers,
        [questionID]: Array.isArray(selectedIndicesArray)
          ? selectedIndicesArray
          : selectedIndicesArray
          ? [selectedIndicesArray]
          : [],
      };
      const total = topic.questions.length;
      const answered = Object.values(merged).filter((v) =>
        Array.isArray(v) ? v.length > 0 : v !== null && v !== undefined
      ).length;
      const newStatus =
        answered === 0 ? "todo" : answered === total ? "answered" : "partially";
      onStatusChange(topic.topicID, newStatus, topic.person || null);
    }
  }

  if (!topic) {
    return (
      <div className="mt-5">
        <em>Select a topic to view questions</em>
      </div>
    );
  }

  return (
    <>
      <div className="mt-5 border-t border-gray-200 pt-3" />
      {/* White outer wrapper; inner card uses the pastel gradient so all white areas become pastel except the answer cards */}
        {/* Inner white card contains the title and questions; answer cards remain white inside QuizQuestion/AnswerCard */}
  <div className="p-4 rounded-lg bg-gradient-to-br from-blue-100/30 to-pink-100/30 shadow-md mb-6"> 
          <h3 className="font-bold">
            {topic.topicID.replace(/_/g, " ").toUpperCase()}
          </h3>
          <div>
            {topic.questions.map((q) => (
              <QuizQuestion
                key={q.questionID}
                question={q}
                onAnswer={(questionID, selectedIndices) =>
                  handleAnswer(questionID, selectedIndices)
                }
                selectedIndex={savedAnswers[q.questionID] || []}
              />
            ))}
          </div>
        </div>
    </>
  );
};

export default QuizQuestionsPanel;
