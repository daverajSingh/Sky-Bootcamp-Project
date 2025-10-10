import React from 'react';

const QuizChatBox = ({ topics = [], completedMap = {}, allCompleted }) => {
  // collect messages from topics that are completed
  const messages = topics
    .filter((t) => completedMap[t.topicID] === 'answered' || completedMap[t.topicID] === 'partially')
    .map((t) => ({ topicID: t.topicID, text: t.personMessage || `${t.topicID} completed` }));

  return (
    <div style={{ border: '1px solid #ccc', padding: 12, width: 260 }}>
      <h3>QuizChatBox</h3>
      <div style={{ minHeight: 120 }}>
        <div><strong>Manager:</strong> Are you ready to join our team? Answer the questions to gain more insight!</div>
        {messages.map((m) => (
          <div key={m.topicID} style={{ marginTop: 8 }}>
            <strong>{m.topicID.replace(/_/g, ' ')}:</strong> {m.text}
          </div>
        ))}
      </div>

      {allCompleted && (
        <div style={{ marginTop: 12 }}>
          <button onClick={() => alert('Done!')}>
            I'm good to go
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizChatBox;
