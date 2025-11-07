import React from "react";
import { useNavigate } from "react-router";
import quizService from './quizService';
// keep this file self-contained; we'll use a small icon button for send

const QuizChatBox = ({
  topics = [],
  completedMap = {},
  allCompleted,
  topicAnswers = {},
  startTime,
  completedCount = 0,
  totalTopics = 0,
}) => {
  const navigate = useNavigate();
  // collect messages from topics that are completed
  // Only show a topic message when it is fully answered.
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  const messages = topics
    .filter((t) => completedMap[t.topicID] === "answered")
    .map((t) => ({
      topicID: t.topicID,
      title: t.title || t.topicID.replace(/_/g, " "),
      text: t.personMessage || `${t.topicID} completed`,
    }));

  // Let the chat stretch with the two-row grid using flexbox stretch; fallback min height if needed
  const minBoxHeight = 480;

  function computeResults() {
    // topics is an array of topic objects; topicAnswers is { topicID: { questionID: [selectedIndices] } }
    const results = [];
    let totalQuestions = 0;
    let correctCount = 0;

    topics.forEach((topic) => {
      const answersForTopic = topicAnswers[topic.topicID] || {};
      (topic.questions || []).forEach((q) => {
        totalQuestions += 1;
        const selected = answersForTopic[q.questionID] || [];
        // build list of correct indices
        const correctIndices = (q.options || [])
          .map((o, idx) => (o.is_correct ? idx : -1))
          .filter((i) => i !== -1);
        // for now consider a correct answer when the set of selected indices equals the set of correct indices
        const selectedSet = new Set(
          Array.isArray(selected) ? selected : selected ? [selected] : []
        );
        const correctSet = new Set(correctIndices);
        const isCorrect =
          selectedSet.size === correctSet.size &&
          [...selectedSet].every((i) => correctSet.has(i));
        if (isCorrect) correctCount += 1;

        results.push({
          topicID: topic.topicID,
          questionID: q.questionID,
          questionText: q.question,
          isCorrect,
          selectedIndices: Array.isArray(selected)
            ? selected
            : selected
              ? [selected]
              : [],
          correctIndices,
          options: q.options || [],
        });
      });
    });

    return { totalQuestions, correctCount, results };
  }

  function onDoneClick() {

    const { totalQuestions, correctCount, results } = computeResults();

    const sendQuizSessionData = async () => {
      try {
        await quizService.postQuizResults({
          "start_time": startTime,
          "end_time": today.toUTCString(),
          "result": results
        });
      } catch (err) {
        console.error('Failed to send quiz session data. Please try again later.', err);
      }
    };

    sendQuizSessionData();

    // Navigate to the feedback page with results in state
    navigate("/quiz/feedback", {
      state: { totalQuestions, correctCount, results },
    });
  }

  return (
    <div className="border border-gray-100 p-4 box-border flex flex-col justify-between h-full min-h-[480px] flex-none w-[360px] bg-white rounded-xl shadow-lg">
      <div>
        <h3 className="mt-0">Completed: {completedCount} / {totalTopics}</h3>
      </div>

      <div className="flex-1 overflow-y-auto pr-1.5">
        <div>
          <strong>Manager:</strong> Are you ready to join our team? Answer the
          questions to gain more insight!
        </div>
        {messages.map((m) => (
          <div key={m.topicID} className="mt-2">
            <strong>{m.title}:</strong> {m.text}
          </div>
        ))}
      </div>

      {allCompleted && (
        <div className="mt-3 border-t border-gray-200 pt-2 flex justify-between items-center gap-2 w-full">
          <span className="text-gray-900 font-semibold">I'm good to go</span>
          <button
            aria-label="send-results"
            onClick={onDoneClick}
            className="bg-indigo-600 text-white border-0 p-3 rounded-full w-11 h-11 inline-flex items-center justify-center shadow-md hover:shadow-lg transition-transform duration-120 active:scale-95"
            data-testid="send-results-btn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizChatBox;
