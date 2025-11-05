import React from "react";
import { useLocation, useNavigate, Link } from "react-router";

const QuizFeedback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};

  const { totalQuestions = 0, correctCount = 0, results = [] } = state;

  // If user lands here without state (e.g., refresh), guide them back
  if (!state || typeof totalQuestions !== "number") {
    return (
      <div className="w-full max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-4">Quiz Results</h1>
        <p className="mb-6">We couldn't find your quiz results. Please take the quiz again.</p>
        <div className="flex gap-3">
          <Link
            to="/quiz"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go to Quiz
          </Link>
          <Link
            to="/"
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">Quiz Results</h1>
        <button
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          onClick={() => navigate("/")}
        >
          Return Home
        </button>
      </div>

      <div className="rounded border p-4 mb-6 bg-white">
        <p className="text-lg">
          You scored <span className="font-bold">{correctCount}</span> / {totalQuestions}
        </p>
      </div>

      <div className="space-y-4">
        {results.map((r, idx) => {
          const correctOptions = (r.correctIndices || [])
            .map((i) => r.options?.[i]?.text)
            .filter(Boolean);
          const selectedOptions = (Array.isArray(r.selectedIndices) ? r.selectedIndices : [])
            .map((i) => r.options?.[i]?.text)
            .filter(Boolean);

          return (
            <div key={`${r.topicID}-${r.questionID}-${idx}`} className="border rounded p-4 bg-white">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-medium">
                  {idx + 1}. {r.questionText}
                </h2>
                <span
                  className={
                    "ml-4 shrink-0 inline-flex items-center px-2 py-1 rounded text-sm " +
                    (r.isCorrect
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700")
                  }
                >
                  {r.isCorrect ? "Correct" : "Incorrect"}
                </span>
              </div>

              <div className="mt-3 text-sm text-gray-800">
                {selectedOptions.length > 0 && (
                  <div className="mb-1">
                    <span className="font-semibold">Your answer:</span> {selectedOptions.join(" ; ")}
                  </div>
                )}
                {!r.isCorrect && (
                  <div>
                    <span className="font-semibold">Correct answer:</span> {correctOptions.join(" ; ")}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizFeedback;
