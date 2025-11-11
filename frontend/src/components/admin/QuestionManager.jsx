import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { API_BASE } from "../../env.js";
import { FiChevronDown, FiTrash2 } from "react-icons/fi";

const topics = [
  { id: 1, name: "EQ" },
  { id: 2, name: "Agile" },
  { id: 3, name: "Compliance" },
  { id: 4, name: "Communication" },
  { id: 5, name: "Sky Products" },
];
const topicNameMap = Object.fromEntries(topics.map((t) => [t.id, t.name]));

export default function QuestionManager() {
  const [activeTab, setActiveTab] = useState("list");
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [topicId, setTopicId] = useState("");
  const [options, setOptions] = useState(Array(4).fill(""));
  const [correctIndex, setCorrectIndex] = useState(-1);
  const [deletingId, setDeletingId] = useState(null);
  const [topicFilter, setTopicFilter] = useState(1);

  const fetchQuestions = async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/questions`);
      setQuestions(Array.isArray(data) ? data : []);
    } catch {}
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const topicIdsInData = useMemo(
    () =>
      Array.from(
        new Set(
          questions
            .map((q) => Number(q.topic_id))
            .filter((id) => topicNameMap[id])
        )
      ),
    [questions]
  );

  useEffect(() => {
    if (!topicIdsInData.includes(topicFilter) && topicIdsInData.length)
      setTopicFilter(topicIdsInData[0]);
  }, [topicIdsInData, topicFilter]);

  const filteredQuestions = useMemo(
    () => questions.filter((q) => q.topic_id === topicFilter),
    [questions, topicFilter]
  );

  const updateOption = (i, v) =>
    setOptions((o) => o.map((x, idx) => (idx === i ? v : x)));

  const resetForm = () => {
    setQuestionText("");
    setTopicId("");
    setOptions(Array(4).fill(""));
    setCorrectIndex(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/api/admin/add_new_question`, {
        question: questionText,
        question_topic: Number(topicId),
        options,
        correct_id: correctIndex,
      });
      await fetchQuestions();
      resetForm();
      setActiveTab("list");
    } catch {}
  };

  const handleDelete = async (q) => {
    const id = q.id || q.question_id;
    if (!id) return;
    setDeletingId(id);
    try {
      const res = await fetch(`${API_BASE}/question/${id}`, {
        method: "DELETE",
      });
      if (res.ok)
        setQuestions((prev) =>
          prev.filter((x) => (x.id || x.question_id) !== id)
        );
    } catch {
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="bg-white border border-slate-200 rounded-lg p-4 md:col-span-2 w-full h-full flex flex-col">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-semibold">Quiz Questions</h2>
        {activeTab === "list" && (
          <div className="ml-auto w-full sm:w-56 relative">
            <select
              id="topicFilter"
              value={topicFilter}
              onChange={(e) => setTopicFilter(Number(e.target.value))}
              className="w-full appearance-none rounded-md border border-slate-300 bg-white py-2 pl-3 pr-9 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {topicIdsInData.map((id) => (
                <option key={id} value={id}>
                  {topicNameMap[id]}
                </option>
              ))}
            </select>
            <FiChevronDown
              size={16}
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
          </div>
        )}
        <div className="flex flex-wrap items-center gap-2">
          {activeTab === "add" && (
            <button
              type="submit"
              form="addQuestionForm"
              disabled={correctIndex < 0}
              className={`bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                correctIndex < 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-700"
              }`}
            >
              Submit
            </button>
          )}
          <nav className="inline-flex rounded-md overflow-hidden border border-slate-300">
            {["list", "add"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 text-sm font-medium transition ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-white text-slate-700 hover:bg-slate-50"
                } ${tab === "add" ? "border-l border-slate-300" : ""}`}
              >
                {tab === "list" ? "All" : "New"}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {activeTab === "list" ? (
        <div className="mt-3 flex-1">
          <p className="text-sm text-slate-600 mb-2">
            {filteredQuestions.length} total
          </p>
          {filteredQuestions.length ? (
            <ul className="divide-y divide-slate-200">
              {filteredQuestions.map((q) => {
                const id = q.id || q.question_id;
                return (
                  <li
                    key={id}
                    className="py-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between"
                  >
                    <div className="space-y-1">
                      <p className="font-medium text-slate-900 m-0">
                        {q.question_text || q.question || "Untitled question"}
                      </p>
                      <p className="text-xs text-slate-600 m-0">
                        <span className="text-slate-500">Topic:</span>{" "}
                        <span className="font-medium">
                          {topicNameMap[q.topic_id] || "—"}
                        </span>
                      </p>
                    </div>
                    {filteredQuestions.length > 2 && (
                      <button
                        type="button"
                        disabled={deletingId === id}
                        onClick={() => handleDelete(q)}
                        className={`text-xs inline-flex items-center gap-1 px-2 py-1 rounded-md border self-start ${
                          deletingId === id
                            ? "bg-red-100 border-red-300 text-red-400 cursor-not-allowed"
                            : "bg-white border-slate-300 text-slate-600 hover:bg-red-50 hover:border-red-400 hover:text-red-600"
                        }`}
                      >
                        <span className="inline-flex items-center gap-1">
                          <FiTrash2 size={14} />
                          {deletingId === id ? "Deleting..." : ""}
                        </span>
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-sm text-slate-600">No questions available.</p>
          )}
        </div>
      ) : (
        <form
          id="addQuestionForm"
          onSubmit={handleSubmit}
          className="mt-3 flex flex-col gap-4 text-sm flex-1"
        >
          <label className="flex flex-col gap-1">
            <span className="font-semibold text-slate-700">Question</span>
            <textarea
              required
              rows={3}
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className="rounded-md border border-slate-300 px-2 py-1.5 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the question..."
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-semibold text-slate-700">Topic</span>
            <select
              required
              value={topicId}
              onChange={(e) => setTopicId(e.target.value)}
              className="rounded-md border border-slate-300 px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select topic
              </option>
              {topics.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </label>
          <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {options.map((opt, i) => (
              <label key={i} className="flex flex-col gap-1">
                <span className="flex items-center justify-between font-semibold text-slate-700">
                  Option {i + 1}
                  <span className="inline-flex items-center gap-1 text-xs">
                    <input
                      type="radio"
                      name="correctOption"
                      required={i === 0}
                      checked={correctIndex === i + 1}
                      onChange={() => setCorrectIndex(i + 1)}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      aria-label={`Mark option ${i + 1} as correct`}
                    />
                    Correct
                  </span>
                </span>
                <input
                  required
                  value={opt}
                  onChange={(e) => updateOption(i, e.target.value)}
                  className="rounded-md border border-slate-300 px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Answer choice ${i + 1}`}
                />
              </label>
            ))}
          </fieldset>
        </form>
      )}
    </section>
  );
}
