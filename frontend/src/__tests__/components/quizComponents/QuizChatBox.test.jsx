import React from 'react';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuizChatBox from '../../../components/quizComponents/QuizChatBox';

jest.mock('axios')
jest.mock('../../../env', () => ({  API_BASE: 'https://mocked-api.com'}))

import axios from 'axios';

// Mock react-router navigation
const mockNavigate = jest.fn();
jest.mock('react-router', () => {
  const actual = jest.requireActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('QuizChatBox', () => {
  afterEach(cleanup);

  const mockTopics = [
    {
      topicID: 'emotional_intelligence',
      personMessage: 'Great work!',
      questions: [
        {
          questionID: 1,
          question: 'Test question?',
          options: [
            { text: 'Correct Answer', is_correct: true },
            { text: 'Wrong Answer', is_correct: false },
            { text: 'Wrong Answer 2', is_correct: false },
            { text: 'Wrong Answer 3', is_correct: false }
          ]
        }
      ]
    }
  ];

  it('should render manager message', () => {
    render(
      <QuizChatBox topics={[]} completedMap={{}} allCompleted={false} topicAnswers={{}} />
    );

    expect(screen.getByText(/Are you ready to join our team/i)).toBeInTheDocument();
  });

  it('should show completion message for answered topics', () => {
    const completedMap = { emotional_intelligence: 'answered' };

    render(
      <QuizChatBox topics={mockTopics} completedMap={completedMap} allCompleted={false} topicAnswers={{}} />
    );

    expect(screen.getByText(/Great work!/i)).toBeInTheDocument();
  });

  it('should show done button only when all topics completed', () => {
    const completedMap = { emotional_intelligence: 'answered' };

    const { rerender } = render(
      <QuizChatBox topics={mockTopics} completedMap={completedMap} allCompleted={false} topicAnswers={{}} />
    );

  expect(screen.queryByTestId('send-results-btn')).not.toBeInTheDocument();

    rerender(
      <QuizChatBox topics={mockTopics} completedMap={completedMap} allCompleted={true} topicAnswers={{}} />
    );

  const btn = screen.getByTestId('send-results-btn');
  expect(btn).toBeInTheDocument();
  expect(btn).toHaveAttribute('aria-label', 'send-results');
  });

  it('navigates to feedback with results and posts session data when done clicked', async () => {
    const completedMap = { emotional_intelligence: 'answered' };
    const topicAnswers = { emotional_intelligence: { 1: [0] } };
    axios.post.mockResolvedValueOnce({ status: 200 });

    render(
      <QuizChatBox topics={mockTopics} completedMap={completedMap} allCompleted={true} topicAnswers={topicAnswers} startTime="2025-10-25 17:00:00"/>
    );

  fireEvent.click(screen.getByTestId('send-results-btn'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
    });

    const callArgs = axios.post.mock.calls[0]
    expect(callArgs[0]).toEqual('https://mocked-api.com/api/quiz');
    expect(callArgs[1]).toEqual(
      expect.objectContaining({
        start_time: '2025-10-25 17:00:00',
        end_time: expect.any(String),
        result: expect.any(Array),
      })
    );

    // Check navigation to feedback with result state
    expect(mockNavigate).toHaveBeenCalledWith('/quiz/feedback', {
      state: expect.objectContaining({
        totalQuestions: 1,
        correctCount: 1,
        results: expect.any(Array),
      }),
    });
  });
});
