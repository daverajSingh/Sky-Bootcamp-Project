import React, { useEffect, useState } from "react";
import quizService from "./quizService";
import {
  QuizTopicCard,
  QuizChatBox,
  QuizQuestionsPanel,
  Button,
  Container,
} from "../index";

const QuizTopicSelector = ({ navigate }) => {
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
      {/* Left: grid of topic cards resembling a call; Right: chatbox/transcript */}
      <Container className="p-2 md:p-4 flex flex-col lg:flex-row gap-3 items-stretch">
        <div className="flex-1 bg-white/90 p-2.5 rounded-lg shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 items-stretch">
            {(() => {
              const visible = topics.slice(0, 5);
              const mock = { topicID: "you", person: "You", description: "", isMock: true };
              const display = [...visible, mock];
              return display.map((topic) => (
                <QuizTopicCard
                  key={topic.topicID}
                  topic={topic}
                  isMock={topic.isMock}
                  status={completedMap[topic.topicID]}
                  onSelect={handleSelect}
                  selected={selectedTopicID === topic.topicID}
                />
              ));
            })()}
          </div>
        </div>

  <div className="flex-none w-full lg:w-[360px] flex items-stretch">
          <QuizChatBox
            topics={topics.slice(0, 5)}
            completedMap={completedMap}
            completedCount={completedCount}
            totalTopics={Math.min(5, topics.length)}
            // consider allCompleted true only when all visible topics are fully answered
            allCompleted={
              topics.length > 0 &&
              topics.slice(0, 5).every((t) => completedMap[t.topicID] === "answered")
            }
            topicAnswers={topicAnswers}
            startTime={sessionStartTime}
          />
        </div>
      </Container>

      {/* Questions panel: shows the questions for the single selected topic */}
      <QuizQuestionsPanel
        topic={topics.find((t) => t.topicID === selectedTopicID)}
        savedAnswers={topicAnswers[selectedTopicID] || {}}
        onAnswer={(questionID, selectedIndex) =>
          handleTopicAnswer(selectedTopicID, questionID, selectedIndex)
        }
      />

      <div className="mt-2 flex gap-2">
        <Button
          buttonText="Next Topic"
          onClick={() => incrementTopicSelected()}
        />
        <Button
          buttonText="Go To Home"
          onClick={() => navigate("/")}
        />
      </div>
    </>
  );
};

export default QuizTopicSelector;
