import React, { useState, useEffect } from "react";
import adminData from "../data/adminData.json";
import questionsData from "../data/questionsData.json";
import Header from "../components/Header.jsx";
import StatsOverview from "../components/admin/StatsOverview.jsx";
import QuizResultsPanel from "../components/admin/QuizResultsPanel.jsx";
import QuestionManager from "../components/admin/QuestionManager.jsx";
import SimulationSummary from "../components/admin/SimulationSummary.jsx";

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState("Agile");
  const [allQuestions, setAllQuestions] = useState([...questionsData]);
  const [selectedQuestions, setSelectedQuestions] = useState({});
  const [newQuestion, setNewQuestion] = useState("");
  const topics = ["Agile", "Values", "Git", "Ethics", "EQ"];

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
  const selectedCountForTopic = selectedQuestions[selectedTopic]?.length || 0;

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
      <StatsOverview data={data} />

      {/* Main Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 w-11/12 mx-auto pb-12">
        {/* LEFT PANEL */}
        <QuizResultsPanel quizResults={data.quizResults} />

        {/* CENTER PANEL */}
        <QuestionManager
          topics={topics}
          selectedTopic={selectedTopic}
          onSelectTopic={setSelectedTopic}
          filteredQuestions={filteredQuestions}
          selectedQuestions={selectedQuestions}
          onToggleQuestion={handleSelect}
          newQuestion={newQuestion}
          onNewQuestionChange={setNewQuestion}
          onAddQuestion={handleAddQuestion}
          selectedCountForTopic={selectedCountForTopic}
          totalSelected={totalSelected}
        />

        {/* RIGHT PANEL */}
        <SimulationSummary simulationQuestions={data.simulationQuestions} />
      </section>
    </div>
  );
};

export default AdminDashboard;