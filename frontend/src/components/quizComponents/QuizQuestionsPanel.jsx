import React, { useEffect } from 'react';
import QuizQuestion from './QuizQuestion';

const QuizQuestionsPanel = ({ topic, onStatusChange, savedAnswers = {}, onAnswer }) => {
  // savedAnswers is an object mapping questionID -> selectedIndex|null

  useEffect(() => {
    // inform parent about status for newly selected topic if needed
    if (topic && onStatusChange) {
      const total = topic.questions.length;
      const answered = Object.values(savedAnswers).filter((v) => v !== null && v !== undefined).length;
      const newStatus = answered === 0 ? 'todo' : answered === total ? 'answered' : 'partially';
      onStatusChange(topic.topicID, newStatus, topic.person || null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic?.topicID]);

  function handleAnswer(questionID, selectedIndex) {
    if (onAnswer) onAnswer(questionID, selectedIndex);
    if (onStatusChange && topic) {
      const merged = { ...savedAnswers, [questionID]: savedAnswers[questionID] === selectedIndex ? null : selectedIndex };
      const total = topic.questions.length;
      const answered = Object.values(merged).filter((v) => v !== null && v !== undefined).length;
      const newStatus = answered === 0 ? 'todo' : answered === total ? 'answered' : 'partially';
      onStatusChange(topic.topicID, newStatus, topic.person || null);
    }
  }

  if (!topic) {
    return (
      <div style={{ marginTop: 20 }}>
        <em>Select a topic to view questions</em>
      </div>
    );
  }

  return (
    <div style={{ marginTop: 20, borderTop: '1px solid #eee', paddingTop: 12 }}>
      <h3>{topic.topicID.replace(/_/g, ' ').toUpperCase()}</h3>
      <div>
        {topic.questions.map((q) => (
          <QuizQuestion
            key={q.questionID}
            question={q}
            onAnswer={(questionID, selectedIndex) => handleAnswer(questionID, selectedIndex)}
            selectedIndex={savedAnswers[q.questionID]}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizQuestionsPanel;



// import React, { useState, useEffect } from 'react';
// import QuizQuestion from './QuizQuestion';

// const QuizQuestionsPanel = ({ topic, onStatusChange }) => {
//   const [answers, setAnswers] = useState({});

//   useEffect(() => {
//     // reset answers when topic changes
//     setAnswers({});
//   }, [topic?.topicID]);

//   function handleAnswer(questionID, selectedIndex) {
//     setAnswers((prev) => {
//       const next = { ...prev, [questionID]: selectedIndex };
//       const total = topic?.questions?.length || 0;
//       const answered = Object.keys(next).length;
//       const newStatus = answered === 0 ? 'todo' : answered === total ? 'answered' : 'partially';
//       if (onStatusChange) onStatusChange(topic.topicID, newStatus, topic.person || null);
//       return next;
//     });
//   }

//   if (!topic) {
//     return (
//       <div style={{ marginTop: 20 }}>
//         <em>Select a topic to view questions</em>
//       </div>
//     );
//   }

//   return (
//     <div style={{ marginTop: 20, borderTop: '1px solid #eee', paddingTop: 12 }}>
//       <h3>{topic.topicID.replace(/_/g, ' ').toUpperCase()}</h3>
//       <div>
//         {topic.questions.map((q) => (
//           <QuizQuestion key={q.questionID} question={q} onAnswer={handleAnswer} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default QuizQuestionsPanel;
