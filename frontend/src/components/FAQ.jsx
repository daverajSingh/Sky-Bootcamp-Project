import FAQItem from "./FAQItem";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE } from "../env.js";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/faq`);
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
    <div className="w-full p-6 ">
      <h2 className="text-xl md:text-3xl pb-2 text-white text-center gradient-background rounded-sm font-semibold">Frequently Asked Questions</h2>
      <div className="p-4">{content}</div>
    </div>
  );
};

export default FAQ;
