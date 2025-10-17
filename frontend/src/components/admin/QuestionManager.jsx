const QuestionManager = ({
  topics,
  selectedTopic,
  onSelectTopic,
  filteredQuestions,
  selectedQuestions,
  onToggleQuestion,
  newQuestion,
  onNewQuestionChange,
  onAddQuestion,
  selectedCountForTopic,
  totalSelected,
}) => (
  <div className="bg-white/80 backdrop-blur-lg border border-sky-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition flex flex-col">
    <div className="flex flex-wrap justify-center mb-5 gap-3">
      {topics.map((topic) => (
        <button
          key={topic}
          className={`px-5 py-2 rounded-full text-sm font-medium shadow-sm transition ${
            selectedTopic === topic
              ? "bg-gradient-to-r from-sky-600 to-indigo-500 text-white"
              : "bg-sky-100 text-sky-800 hover:bg-sky-200"
          }`}
          onClick={() => onSelectTopic(topic)}
        >
          {topic}
        </button>
      ))}
    </div>

    <h4 className="text-lg font-semibold text-gray-800 text-center mb-2">
      Select any number of {selectedTopic} questions
    </h4>

    <div className="overflow-y-auto max-h-60 border border-sky-100 rounded-xl p-3 bg-gradient-to-b from-white to-sky-50">
      {filteredQuestions.map((q) => (
        <label
          key={q.id}
          className="flex items-start space-x-3 mb-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition p-3"
        >
          <input
            type="checkbox"
            checked={selectedQuestions[selectedTopic]?.includes(q.id) || false}
            onChange={() => onToggleQuestion(q.id)}
            className="mt-1 h-4 w-4 text-sky-600 border-gray-300 rounded"
          />
          <p className="text-gray-700 text-sm">{q.question}</p>
        </label>
      ))}
    </div>

    <div className="mt-5">
      <h4 className="text-md font-semibold text-gray-700 mb-2 text-center">
        Add New {selectedTopic} Question
      </h4>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => onNewQuestionChange(e.target.value)}
          placeholder="Type your question..."
          className="flex-grow border border-gray-300 rounded-md p-2 text-sm focus:outline-sky-600 focus:ring-2 focus:ring-sky-300"
        />
        <button
          onClick={onAddQuestion}
          className="px-4 py-2 bg-gradient-to-r from-sky-600 to-indigo-500 text-white text-sm rounded-md hover:opacity-90 transition"
        >
          Add
        </button>
      </div>
    </div>

    <div className="mt-4 text-sm text-gray-700 text-center">
      Total selected: <strong>{selectedCountForTopic}</strong> for {selectedTopic},{" "}
      <strong>{totalSelected}</strong> overall.
    </div>
  </div>
);

export default QuestionManager;
