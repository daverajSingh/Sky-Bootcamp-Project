import FAQItem from "./FAQItem";
import Container from "./Container";
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
    <Container className="p-6 mx-6 mb-6">
      <h2 className="text-2xl md:text-3xl text-gray-800 text-center font-bold mb-4">
        Frequently Asked Questions
      </h2>
      <div className="space-y-3">{content}</div>
    </Container>
  );
};

export default FAQ;
