import faqData from '../data/faq.json';
import FAQItem from './faq-item';
import React from 'react';

const FAQ = () => {
  let content;
  try {
    if (!Array.isArray(faqData)) throw new Error('FAQ data is not an array');
    content = faqData.map((item, idx) => (
      <FAQItem key={idx} question={item.question} answer={item.answer} />
    ));
  } catch (e) {
    content = <p>Sorry, FAQ data could not be loaded.</p>;
  }
  return (
    <div className="w-full px-4 py-8 lg:px-16 lg:py-12 lg:max-w-full md:max-w-2xl md:mx-auto">
      <h2 className="text-3xl pb-2">Frequently Asked Questions</h2>
      {content}
    </div>
  );
};

export default FAQ;