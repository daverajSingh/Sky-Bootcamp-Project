const QuizResultsPanel = ({ quizResults }) => (
  <aside className="bg-white/80 backdrop-blur-lg border border-sky-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition">
    <h4 className="text-xl font-semibold text-sky-700 mb-4">Quiz Results</h4>
    <ul className="space-y-3 text-gray-700">
      {Object.entries(quizResults).map(([topic, score]) => (
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
);

export default QuizResultsPanel;
