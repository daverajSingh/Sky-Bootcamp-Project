import React, { useState } from "react";

export default function QuestionManager({ adminData }) {
  const [questionText, setQuestionText] = useState("");
  const [topic, setTopic] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("list"); // 'list' or 'add'

  const handleOptionChange = (i, val) => {
    setOptions((prev) => {
      const next = [...prev];
      next[i] = val;
      return next;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuestion = {
      question: questionText,
      topic,
      options,
      correctAnswerIndex: correctIndex,
    };
    console.log("Submitted question payload:", newQuestion);
    setQuestionText("");
    setTopic("");
    setOptions(["", "", "", ""]);
    setCorrectIndex(0);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 md:col-span-2 w-full h-full flex flex-col">
      <div className="flex items-center justify-between gap-3">
        <h2 className="mt-0 text-base font-semibold">Quiz Questions</h2>
        <div className="flex items-center gap-2">
          {activeTab === "add" && (
            <button
              type="submit"
              form="addQuestionForm"
              className="bg-blue-600 text-white border-0 px-4 py-2 rounded-md font-semibold cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          )}
          {/* Toggle */}
          <div className="inline-flex rounded-md overflow-hidden border border-slate-300">
            <button
              type="button"
              onClick={() => setActiveTab("list")}
              aria-pressed={activeTab === "list"}
              className={`px-3 py-1.5 text-sm font-medium transition ${
                activeTab === "list"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              All Questions
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("add")}
              aria-pressed={activeTab === "add"}
              className={`px-3 py-1.5 text-sm font-medium transition border-l border-slate-300 ${
                activeTab === "add"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              Add New
            </button>
          </div>
        </div>
      </div>

      {activeTab === "list" ? (
        <div className="mt-3 flex-1">
          <p className="text-sm text-slate-600 mb-2">
            {
              (adminData?.quizQuestions || adminData?.simulationQuestions || [])
                .length
            }{" "}
            total
          </p>

          {(adminData?.quizQuestions || adminData?.simulationQuestions || [])
            .length > 0 ? (
            <ul className="divide-y divide-slate-200">
              {(
                adminData?.quizQuestions ||
                adminData?.simulationQuestions ||
                []
              ).map((q, idx) => (
                <li key={idx} className="py-3">
                  <p className="m-0 font-medium text-slate-900">
                    {q.question || "Untitled question"}
                  </p>
                  <div className="mt-1 text-xs text-slate-600 flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-1">
                      <span className="text-slate-500">Topic:</span>
                      <span className="font-medium">{q.topic || "—"}</span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span className="text-slate-500">Options:</span>
                      <span className="font-medium">
                        {q.options?.length ?? 0}
                      </span>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-sm text-slate-600">
              No questions available.
            </div>
          )}
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          id="addQuestionForm"
          className="mt-3 flex flex-col gap-2 text-sm flex-1"
        >
          <label className="flex flex-col gap-1">
            <span className="font-semibold text-slate-700">Question</span>
            <textarea
              required
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              rows={3}
              className="w-full rounded-md border border-slate-300 px-2 py-1.5 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter the question..."
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="font-semibold text-slate-700">Topic</span>
            <select
              required
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>
                Select topic
              </option>
              <option value="Agile">Agile</option>
              <option value="Values">Values</option>
              <option value="Git">Git</option>
              <option value="Ethics">Ethics</option>
              <option value="EQ">EQ</option>
            </select>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {options.map((opt, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700">
                    Option {i + 1}
                  </span>
                  <label className="inline-flex items-center gap-1 text-xs text-slate-700">
                    <input
                      type="checkbox"
                      checked={correctIndex === i}
                      onChange={() => setCorrectIndex(i)}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      aria-label={`Mark option ${i + 1} as correct`}
                    />
                    Correct
                  </label>
                </div>
                <input
                  required
                  value={opt}
                  onChange={(e) => handleOptionChange(i, e.target.value)}
                  className="w-full rounded-md border border-slate-300 px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={`Answer choice ${i + 1}`}
                />
              </div>
            ))}
          </div>
        </form>
      )}
    </div>
  );
}
