import React, { useState } from 'react';
import QuizQuestion from './QuizQuestion';

const QuizTopicCard = ({ topic, status = 'todo', onStatusChange }) => {
  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState({});

  function handleAnswer(questionID, selectedIndex) {
    setAnswers((prev) => {
      const next = { ...prev, [questionID]: selectedIndex };
      // determine status
      const total = topic.questions.length;
      const answered = Object.keys(next).length;
      const newStatus = answered === 0 ? 'todo' : answered === total ? 'answered' : 'partially';
      if (onStatusChange) onStatusChange(topic.topicID, newStatus, topic.person || null);
      return next;
    });
  }

  return (
    <div style={{ border: '1px solid #ddd', padding: 8, width: 200 }}>
      <div onClick={() => setOpen((s) => !s)} style={{ cursor: 'pointer' }}>
        <strong>{topic.topicID.replace(/_/g, ' ').toUpperCase()}</strong>
        <div>{status || 'todo'}</div>
      </div>

      {open && (
        <div style={{ marginTop: 8 }}>
          {topic.questions.map((q) => (
            <QuizQuestion key={q.questionID} question={q} onAnswer={handleAnswer} />
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizTopicCard;
