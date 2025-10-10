import React from 'react';

const QuizChatBox = ({ topics = [], completedMap = {}, allCompleted }) => {
  // collect messages from topics that are completed
  const messages = topics
    .filter((t) => completedMap[t.topicID] === 'answered' || completedMap[t.topicID] === 'partially')
    .map((t) => ({ topicID: t.topicID, text: t.personMessage || `${t.topicID} completed` }));

  // match the visual height of topic cards (cards use minHeight: 200)
  const minBoxHeight = 320;

  return (
    <div style={{ border: '1px solid #ccc', padding: 14, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: minBoxHeight, flex: '0 0 360px' }}>
      <div>
        <h3 style={{ marginTop: 0 }}>QuizChatBox</h3>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingRight: 6 }}>
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
