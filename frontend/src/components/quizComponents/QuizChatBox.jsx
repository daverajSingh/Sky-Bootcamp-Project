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
    <div
      style={{
        border: "1px solid #ccc",
        padding: 14,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        minHeight: minBoxHeight,
        alignSelf: "stretch",
        flex: "0 0 360px",
      }}
    >
      <div>
        <h3 style={{ marginTop: 0 }}>Completed: {completedCount} / {totalTopics}</h3>
      </div>

      <div style={{ flex: 1, overflowY: "auto", paddingRight: 6 }}>
        <div>
          <strong>Manager:</strong> Are you ready to join our team? Answer the
          questions to gain more insight!
        </div>
        {messages.map((m) => (
          <div key={m.topicID} style={{ marginTop: 8 }}>
            <strong>{m.topicID.replace(/_/g, " ")}:</strong> {m.text}
          </div>
        ))}
      </div>

      {allCompleted && (
        <div
          style={{
            marginTop: 12,
            borderTop: '1px solid #e5e7eb',
            paddingTop: 10,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 10,
            width: '100%'
          }}
        >
          <span style={{ color: '#111', fontWeight: 600 }}>I'm good to go</span>
          <button
            aria-label="send-results"
            onClick={onDoneClick}
            style={{
              background: '#4f46e5',
              color: 'white',
              border: 'none',
              padding: 12,
              borderRadius: 9999,
              width: 44,
              height: 44,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
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
