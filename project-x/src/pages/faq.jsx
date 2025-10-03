import React, { useState } from 'react';
import faqData from '../data/faq.json'

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item" style={{ borderBottom: '1px solid #ccc', padding: '1em 0' }}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
      >
        <h3 style={{ margin: 0 }}>{question}</h3>
        <span>{isOpen ? '-' : '+'}</span>
      </div>
      {isOpen && <p style={{ marginTop: '0.5em' }}>{answer}</p>}
    </div>
  );
};

const FAQPage = () => {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2em' }}>
      <h2>Frequently Asked Questions</h2>
      {faqData.map((item, index) => (
        <FAQItem key={index} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
};

export default FAQPage;

