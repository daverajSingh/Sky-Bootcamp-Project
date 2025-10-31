import React, { useEffect, useState } from "react";
import quizService from "./quizService";
import {
  QuizTopicCard,
  QuizChatBox,
  QuizQuestionsPanel,
  Button,
} from "../index";

const QuizTopicSelector = () => {
  const [topics, setTopics] = useState([]);
  const [completedMap, setCompletedMap] = useState({});
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [error, setError] = useState(null);
  
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  useEffect(() => {
    let mounted = true;
    const loadQuizData = async () => {
      try {
        const data = await quizService.fetchQuiz();
        if (!mounted) return;
        setTopics(data);
        const map = {};
        data.forEach((t) => (map[t.topicID] = "todo"));
        setCompletedMap(map);
        setError(null);
      } catch (err) {
        if (mounted) {
          setError("Failed to load quiz data. Please try again later.");
        }
      }
    };
    loadQuizData();
    setSessionStartTime(today.toUTCString());
    return () => (mounted = false);
  }, []);

  function handleTopicChange(topicID, status, personMessage) {
    setCompletedMap((prev) => ({ ...prev, [topicID]: status }));
    // store person messages to be shown in chatbox
    setTopics((prev) =>
      prev.map((t) => (t.topicID === topicID ? { ...t, personMessage } : t))
    );
  }

  const [selectedTopicID, setSelectedTopicID] = useState(null);
  const [topicAnswers, setTopicAnswers] = useState({});

  function handleSelect(topicID) {
    setSelectedTopicID((prev) => (prev === topicID ? null : topicID));
  }

  function incrementTopicSelected() {
    const allTopics = Object.keys(completedMap);
    const currentIndex = selectedTopicID
      ? allTopics.indexOf(selectedTopicID)
      : -1;
    let nextTopic =
      allTopics
        .slice(currentIndex + 1)
        .find((key) => completedMap[key] === "todo") || null;

    setSelectedTopicID(nextTopic);
  }

  // Called when a question in the selected topic is answered/unanswered
  function handleTopicAnswer(topicID, questionID, selectedIndicesArray) {
    setTopicAnswers((prev) => {
      const topicMap = { ...(prev[topicID] || {}) };
      topicMap[questionID] = Array.isArray(selectedIndicesArray)
        ? selectedIndicesArray
        : selectedIndicesArray
        ? [selectedIndicesArray]
        : [];

      const next = { ...prev, [topicID]: topicMap };

      // compute status: count a question as answered if its array has length > 0
      const topic = topics.find((t) => t.topicID === topicID);
      const total = topic?.questions?.length || 0;
      const answered = Object.values(topicMap).filter((v) =>
        Array.isArray(v) ? v.length > 0 : v !== null && v !== undefined
      ).length;
      const newStatus =
        answered === 0 ? "todo" : answered === total ? "answered" : "partially";
      handleTopicChange(topicID, newStatus, topic?.person || null);

      return next;
    });
  }

  // Only count topics as completed when they are fully answered
  const completedCount = Object.values(completedMap).filter(
    (s) => s === "answered"
  ).length;

  return (
    <>
      <div className="flex flex-row justify-center mb-3">
        <h2 className="p-2">Quiz topics</h2>
        <Button
          buttonText="Next Topic"
          onClick={() => incrementTopicSelected()}
        />
      </div>

      {/* Row containing topic ca rds and chatbox/transcript */}
      <div style={{ display: "flex", gap: 12, alignItems: "stretch" }}>
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "stretch",
            flex: "1 1 0%",
          }}
        >
          {topics.slice(0, 5).map((topic) => (
            <QuizTopicCard
              key={topic.topicID}
              topic={topic}
              status={completedMap[topic.topicID]}
              onSelect={handleSelect}
              selected={selectedTopicID === topic.topicID}
            />
          ))}
        </div>

        <div style={{ flex: "0 0 360px" }}>
          <QuizChatBox
            topics={topics.slice(0, 5)}
            completedMap={completedMap}
            // consider allCompleted true only when all visible topics are fully answered
            allCompleted={
              topics.length > 0 &&
              topics
                .slice(0, 5)
                .every((t) => completedMap[t.topicID] === "answered")
            }
            topicAnswers={topicAnswers}
            startTime={sessionStartTime}
          />
        </div>
      </div>

      {/* Questions panel: shows the questions for the single selected topic */}
      <QuizQuestionsPanel
        topic={topics.find((t) => t.topicID === selectedTopicID)}
        savedAnswers={topicAnswers[selectedTopicID] || {}}
        onAnswer={(questionID, selectedIndex) =>
          handleTopicAnswer(selectedTopicID, questionID, selectedIndex)
        }
      />

      <div className="mt-2">
        <p>
          Completed: {completedCount} / {Math.min(5, topics.length)}
        </p>
      </div>
    </>
  );
};

export default QuizTopicSelector;
