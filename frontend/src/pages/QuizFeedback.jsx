import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router";
import { Button } from "../components/index.jsx";
import { API_BASE } from "../env.js";


const QuizFeedback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hasState = !!(location.state && Array.isArray(location.state.results));
  const [aiFeedback, setAiFeedback] = useState("");
  const [loadingFeedback, setLoadingFeedback] = useState(true);
  const hasFetchedRef = useRef(false);

  // If user lands here without valid results state (e.g., refresh), guide them back
  if (!hasState) {
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

  const { totalQuestions = 0, correctCount = 0, results = [] } = location.state || {};

  // Fetch AI-powered feedback when component mounts (only once)
  useEffect(() => {
    if (hasState && results.length > 0 && !hasFetchedRef.current) {
      hasFetchedRef.current = true;
      fetchAIFeedback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAIFeedback = async () => {
    setLoadingFeedback(true);
    try {
      const response = await fetch(`${API_BASE}/api/quiz/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ results }),
      });

      if (response.ok) {
        const data = await response.json();
        setAiFeedback(data.feedback || "");
      } else {
        console.error('Failed to fetch AI feedback. Status:', response.status);
        setAiFeedback("");
      }
    } catch (error) {
      console.error('Error fetching AI feedback:', error);
      setAiFeedback("");
    } finally {
      setLoadingFeedback(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">Quiz Results</h1>
        <Button
          onClick={() => navigate("/")}
        >
          Return Home
        </Button>
      </div>

      {/* Gradient wrapper for the results area */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-100/30 to-pink-100/30 shadow-lg mb-6">
        <div className="rounded p-4 mb-6 bg-white shadow-md">
          <p className="text-lg" data-testid="quiz-score">
            You scored <span className="font-bold">{correctCount}</span> / {totalQuestions}
          </p>
        </div>

        {/* AI-Powered Smart Suggestion */}
        <div className="rounded p-4 mb-6 bg-white shadow-md">
          <h3 className="text-base font-semibold text-sky-700 mb-2">Smart Suggestion</h3>
          {loadingFeedback ? (
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-sm">Generating personalized feedback...</span>
            </div>
          ) : aiFeedback ? (
            <p className="text-gray-800 leading-relaxed">{aiFeedback}</p>
          ) : (
            <p className="text-gray-500 italic text-sm">Feedback unavailable at this time.</p>
          )}
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
            <div key={`${r.topicID}-${r.questionID}-${idx}`} className="rounded p-4 bg-white shadow-md">
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
    </div>
  );
};

export default QuizFeedback;
