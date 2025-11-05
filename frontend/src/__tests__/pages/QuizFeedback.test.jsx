import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from 'react-router';
import QuizFeedback from '../../pages/QuizFeedback';

jest.mock('../../env', () => ({ API_BASE: 'http://localhost' }));

// Mock react-router navigate to assert button behavior
const mockNavigate = jest.fn();
jest.mock('react-router', () => {
  const actual = jest.requireActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('QuizFeedback page', () => {
  afterEach(() => {
    cleanup();
    mockNavigate.mockReset();
  });

  it('shows guidance when no results state is provided', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/quiz/feedback' }]}>
        <Routes>
          <Route path="/quiz/feedback" element={<QuizFeedback />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Quiz Results')).toBeInTheDocument();
    expect(
      screen.getByText(/we couldn't find your quiz results/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /go to quiz/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /return home/i })).toBeInTheDocument();
  });

  it('renders score and per-question feedback; shows "Your answer" always and "Correct answer" only when incorrect', () => {
    const results = [
      {
        topicID: 't1',
        questionID: 1,
        questionText: 'Question one?',
        isCorrect: true,
        selectedIndices: [0],
        correctIndices: [0],
        options: [
          { text: 'A', is_correct: true },
          { text: 'B', is_correct: false },
        ],
      },
      {
        topicID: 't1',
        questionID: 2,
        questionText: 'Question two?',
        isCorrect: false,
        selectedIndices: [1],
        correctIndices: [0],
        options: [
          { text: 'A', is_correct: true },
          { text: 'B', is_correct: false },
        ],
      },
    ];

    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: '/quiz/feedback',
            state: { totalQuestions: 2, correctCount: 1, results },
          },
        ]}
      >
        <Routes>
          <Route path="/quiz/feedback" element={<QuizFeedback />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Quiz Results')).toBeInTheDocument();
    // Assert score via test id to avoid ambiguity due to nested spans
    expect(screen.getByTestId('quiz-score').textContent).toBe('You scored 1 / 2');

    // Your answer should appear for both questions
    const yourAnswerLines = screen.getAllByText(/Your answer:/i);
    expect(yourAnswerLines.length).toBe(2);

    // Correct answer label should appear only once (for the incorrect question)
    const correctAnswerLines = screen.getAllByText(/Correct answer:/i);
    expect(correctAnswerLines.length).toBe(1);
  });

  it('Return Home button navigates to /', () => {
    const results = [];
    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: '/quiz/feedback',
            state: { totalQuestions: 0, correctCount: 0, results },
          },
        ]}
      >
        <Routes>
          <Route path="/quiz/feedback" element={<QuizFeedback />} />
        </Routes>
      </MemoryRouter>
    );

    const btn = screen.getByRole('button', { name: /return home/i });
    fireEvent.click(btn);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
