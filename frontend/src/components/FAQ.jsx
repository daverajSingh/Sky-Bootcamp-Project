import FAQItem from "./FAQItem";
import React, { useState, useEffect } from "react";
import axios from "axios";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/faq");
        setFaqs(response.data);
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      }
    };
    fetchData();
  }, []);

  let content = <p>Sorry, FAQ data could not be loaded.</p>;
  try {
    if (!Array.isArray(faqs)) throw new Error("FAQ data is not an array");
    content = faqs.map((item, idx) => (
      <FAQItem key={idx} question={item.question} answer={item.answer} />
    ));
  } catch (e) {
    console.error("Error displaying FAQ data:", e);
  }
  return (
    <div className="w-full px-4 py-8 lg:px-16 lg:py-12 lg:max-w-full md:max-w-2xl md:mx-auto">
      <h2 className="text-3xl pb-2">Frequently Asked Questions</h2>
      {content}
    </div>
  );
};

export default FAQ;
