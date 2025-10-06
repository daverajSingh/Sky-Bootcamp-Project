import React, { useState } from 'react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const safeQuestion = question ? question : 'Question not available';
  const safeAnswer = answer ? answer : 'Answer not available';

  return (
    <div className="faq-item" style={{ borderBottom: '1px solid #ccc', padding: '1em 0' }}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
      >
        <h3 style={{ margin: 0 }}>{safeQuestion}</h3>
        <span>{isOpen ? '-' : '+'}</span>
      </div>
      {isOpen && <p style={{ marginTop: '0.5em' }}>{safeAnswer}</p>}
    </div>
  );
};

export default FAQItem;
