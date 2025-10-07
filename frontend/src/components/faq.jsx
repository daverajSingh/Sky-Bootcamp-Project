import faqData from '../data/faq.json';
import FAQItem from './faq-item';

const FAQPage = () => {
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
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2em' }}>
      <h2>Frequently Asked Questions</h2>
      {content}
    </div>
  );
};

export default FAQPage;