const QuizResultsPanel = ({ quizResults }) => (
  <aside className="p-6 rounded-2xl bg-gradient-to-br from-blue-100/30 to-pink-100/30 shadow-lg">
    <h4 className="text-xl font-semibold text-sky-700 mb-4">Quiz Results</h4>
    <ul className="space-y-3">
      {Object.entries(quizResults).map(([topic, score]) => (
        <li
          key={topic}
          className="flex justify-between bg-white rounded-md px-4 py-3 shadow-md"
        >
          <span className="text-gray-800">{topic}</span>
          <span className="font-semibold text-sky-600">{score}%</span>
        </li>
      ))}
    </ul>
  </aside>
);

export default QuizResultsPanel;
