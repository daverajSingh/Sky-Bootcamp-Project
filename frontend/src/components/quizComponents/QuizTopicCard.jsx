import React from 'react';

// A simple presentational card. Selection/opening is managed by the parent.
const QuizTopicCard = ({ topic, status = 'todo', onSelect, selected }) => {
  return (
    <div
      onClick={() => onSelect && onSelect(topic.topicID)}
      style={{
        border: selected ? '2px solid #2563eb' : '1px solid #ddd',
        padding: 8,
        width: 200,
        cursor: 'pointer',
        background: selected ? '#f0f8ff' : 'white',
      }}
    >
      <div>
        <strong>{topic.topicID.replace(/_/g, ' ').toUpperCase()}</strong>
        <div>{status || 'todo'}</div>
      </div>
    </div>
  );
};

export default QuizTopicCard;
