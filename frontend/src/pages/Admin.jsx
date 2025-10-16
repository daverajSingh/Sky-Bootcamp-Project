import React, { useState, useEffect } from "react";
import adminData from "../data/adminData.json";
import questionsData from "../data/questionsData.json";
import Header from "../components/Header.jsx";

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState("Agile");
  const [allQuestions, setAllQuestions] = useState([...questionsData]);
  const [selectedQuestions, setSelectedQuestions] = useState({});
  const [warning, setWarning] = useState("");
  const [newQuestion, setNewQuestion] = useState("");

  useEffect(() => {
    setTimeout(() => setData(adminData), 300);
  }, []);

  const handleSelect = (id) => {
    const topic = allQuestions.find((q) => q.id === id).category;
    const topicSelected = selectedQuestions[topic] || [];

    if (topicSelected.includes(id)) {
      const updated = topicSelected.filter((q) => q !== id);
      setSelectedQuestions({ ...selectedQuestions, [topic]: updated });
    } else {
      if (topicSelected.length >= 4) {
        setWarning(`You can only select 4 questions for ${topic}.`);
        setTimeout(() => setWarning(""), 2000);
        return;
      }
      const updated = [...topicSelected, id];
      setSelectedQuestions({ ...selectedQuestions, [topic]: updated });
    }
  };

  const filteredQuestions = allQuestions.filter(
    (q) => q.category === selectedTopic
  );

  const totalSelected = Object.values(selectedQuestions).reduce(
    (acc, arr) => acc + arr.length,
    0
  );

  const handleAddQuestion = () => {
    const trimmed = newQuestion.trim();
    if (!trimmed) return;

    const newId = allQuestions.length
      ? Math.max(...allQuestions.map((q) => q.id)) + 1
      : 1;

    const newEntry = {
      id: newId,
      category: selectedTopic,
      question: trimmed,
    };

    setAllQuestions([...allQuestions, newEntry]);
    setNewQuestion("");
  };

  if (!data)
    return <p className="text-center text-gray-600 mt-20">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-100 font-sans">
      {/* Header */}
      <Header />

      {/* Welcome banner */}
      <section className="mx-auto mt-8 mb-10 w-11/12 bg-gradient-to-r from-sky-600 to-indigo-500 text-white text-center rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-lg text-sky-100">
          Monitor usage, customise quizzes, and manage questions
        </p>
      </section>

      {/* Statistics Section */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-11/12 mx-auto">
        <StatCard title="Daily Users" value={data.dailyUsers} />
        <StatCard title="Average Time Per Use" value={data.avgTimePerUse} />
        <StatCard
          title="Average Questions Correct"
          value={data.avgQuestionsCorrect}
        />
      </section>

      {/* Main Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 w-11/12 mx-auto pb-12">
        {/* LEFT PANEL */}
        <aside className="bg-white/80 backdrop-blur-lg border border-sky-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition">
          <h4 className="text-xl font-semibold text-sky-700 mb-4">
            Quiz Results
          </h4>
          <ul className="space-y-3 text-gray-700">
            {Object.entries(data.quizResults).map(([topic, score]) => (
              <li
                key={topic}
                className="flex justify-between bg-gradient-to-r from-sky-50 to-indigo-50 rounded-md px-3 py-2"
              >
                <span>{topic}</span>
                <span className="font-semibold text-sky-600">{score}%</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* CENTER PANEL */}
        <div className="bg-white/80 backdrop-blur-lg border border-sky-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition flex flex-col">
          {/* Topic Buttons */}
          <div className="flex flex-wrap justify-center mb-5 gap-3">
            {["Agile", "Values", "Git", "Ethics", "EQ"].map((topic) => (
              <button
                key={topic}
                className={`px-5 py-2 rounded-full text-sm font-medium shadow-sm transition ${
                  selectedTopic === topic
                    ? "bg-gradient-to-r from-sky-600 to-indigo-500 text-white"
                    : "bg-sky-100 text-sky-800 hover:bg-sky-200"
                }`}
                onClick={() => setSelectedTopic(topic)}
              >
                {topic}
              </button>
            ))}
          </div>

          <h4 className="text-lg font-semibold text-gray-800 text-center mb-2">
            Select up to 4 {selectedTopic} questions
          </h4>
          {warning && (
            <p className="text-red-500 text-sm text-center mb-3">{warning}</p>
          )}

          {/* Question List */}
          <div className="overflow-y-auto max-h-60 border border-sky-100 rounded-xl p-3 bg-gradient-to-b from-white to-sky-50">
            {filteredQuestions.map((q) => (
              <label
                key={q.id}
                className="flex items-start space-x-3 mb-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition p-3"
              >
                <input
                  type="checkbox"
                  checked={
                    selectedQuestions[selectedTopic]?.includes(q.id) || false
                  }
                  onChange={() => handleSelect(q.id)}
                  className="mt-1 h-4 w-4 text-sky-600 border-gray-300 rounded"
                />
                <p className="text-gray-700 text-sm">{q.question}</p>
              </label>
            ))}
          </div>

          {/* Add Question */}
          <div className="mt-5">
            <h4 className="text-md font-semibold text-gray-700 mb-2 text-center">
              Add New {selectedTopic} Question
            </h4>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Type your question..."
                className="flex-grow border border-gray-300 rounded-md p-2 text-sm focus:outline-sky-600 focus:ring-2 focus:ring-sky-300"
              />
              <button
                onClick={handleAddQuestion}
                className="px-4 py-2 bg-gradient-to-r from-sky-600 to-indigo-500 text-white text-sm rounded-md hover:opacity-90 transition"
              >
                Add
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-4 text-sm text-gray-700 text-center">
            Total selected:{" "}
            <strong>{selectedQuestions[selectedTopic]?.length || 0}</strong>/4
            for {selectedTopic},{" "}
            <strong>
              {Object.values(selectedQuestions).reduce(
                (acc, arr) => acc + arr.length,
                0
              )}
            </strong>{" "}
            overall.
          </div>
        </div>

        {/* RIGHT PANEL */}
        <aside className="bg-white/80 backdrop-blur-lg border border-sky-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition">
          <h4 className="text-xl font-semibold text-sky-700 mb-4">
            Simulation Questions Asked
          </h4>
          <ul className="space-y-3 text-gray-700">
            {Object.entries(data.simulationQuestions).map(([topic, count]) => (
              <li
                key={topic}
                className="flex justify-between bg-gradient-to-r from-sky-50 to-indigo-50 rounded-md px-3 py-2"
              >
                <span>{topic}</span>
                <span className="font-semibold text-sky-600">
                  {count} questions
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </div>
  );
};

// Card for statistics
const StatCard = ({ title, value }) => (
  <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-sky-100 shadow-md hover:shadow-lg transition p-6 text-center">
    <h3 className="text-gray-500 text-sm">{title}</h3>
    <p className="text-2xl font-bold text-sky-700 mt-1">{value}</p>
  </div>
);

export default AdminDashboard;