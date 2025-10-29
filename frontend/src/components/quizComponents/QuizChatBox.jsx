import React from "react";
import quizService from './quizService';

const QuizChatBox = ({
  topics = [],
  completedMap = {},
  allCompleted,
  topicAnswers = {}, startTime,
}) => {
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

  // match the visual height of topic cards (cards use minHeight: 200)
  const minBoxHeight = 320;

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

    // build a simple text summary for now
    let message = `You scored ${correctCount} / ${totalQuestions}\n\n`;
    results.forEach((r, idx) => {
      message += `${idx + 1}. ${r.questionText}\n`;
      message += `   ${r.isCorrect ? "Correct" : "Incorrect"}\n`;
      if (!r.isCorrect) {
        const correctOptions = r.correctIndices
          .map((i) => r.options[i] && r.options[i].text)
          .filter(Boolean);
        message += `   Correct answer: ${correctOptions.join(" ; ")}\n`;
      }
      message += "\n";
    });

    // use alert for now (popup)
    alert(message);
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
        minHeight: minBoxHeight,
        flex: "0 0 360px",
      }}
    >
      <div>
        <h3 style={{ marginTop: 0 }}>QuizChatBox</h3>
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
        <div style={{ marginTop: 12 }}>
          <button onClick={onDoneClick}>I'm good to go</button>
        </div>
      )}
    </div>
  );
};

export default QuizChatBox;
