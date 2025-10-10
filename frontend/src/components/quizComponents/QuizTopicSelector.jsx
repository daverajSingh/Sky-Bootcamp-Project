import React, { useEffect, useState } from 'react';
import QuizTopicCard from './QuizTopicCard';
import QuizChatBox from './QuizChatBox';
import quizService from './quizService';

const QuizTopicSelector = () => {
  const [topics, setTopics] = useState([]);
  const [completedMap, setCompletedMap] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const loadQuizData = async () => {
      try {
        const data = await quizService.fetchQuiz();
        if (!mounted) return;
        setTopics(data);
        const map = {};
        data.forEach((t) => (map[t.topicID] = 'todo'));
        setCompletedMap(map);
        setError(null);
      } catch (err) {
        if (mounted) {
          setError('Failed to load quiz data. Please try again later.');
        }
      }
    };
    loadQuizData();
    return () => (mounted = false);
  }, []);

  function handleTopicChange(topicID, status, personMessage) {
    setCompletedMap((prev) => ({ ...prev, [topicID]: status }));
    // store person messages to be shown in chatbox
    setTopics((prev) =>
      prev.map((t) => (t.topicID === topicID ? { ...t, personMessage } : t))
    );
  }

  const completedCount = Object.values(completedMap).filter(
    (s) => s === 'answered' || s === 'partially'
  ).length;

  return (
    <div>
      <h2>Quiz topics</h2>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        {topics.slice(0, 5).map((topic) => (
          <QuizTopicCard
            key={topic.topicID}
            topic={topic}
            status={completedMap[topic.topicID]}
            onStatusChange={handleTopicChange}
          />
        ))}

        <QuizChatBox
          topics={topics.slice(0, 5)}
          completedMap={completedMap}
          allCompleted={
            topics.length > 0 &&
            Object.values(completedMap).slice(0,5).length === 5 &&
            Object.values(completedMap).slice(0,5).every((s) => s && s !== 'todo')
          }
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <p>Completed: {completedCount} / {Math.min(5, topics.length)}</p>
      </div>
    </div>
  );
};

export default QuizTopicSelector;
