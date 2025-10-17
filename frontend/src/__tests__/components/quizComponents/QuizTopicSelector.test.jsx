import React from 'react';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuizTopicSelector from '../../../components/quizComponents/QuizTopicSelector';
import quizService from '../../../components/quizComponents/quizService';

jest.mock('../../../components/quizComponents/quizService');

describe('QuizTopicSelector', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  const mockDataTwoTopics = [
    {
      topicID: 'emotional_intelligence',
      questions: [{
        questionID: 1, question: 'Test question 1?',
        options: [
          { text: 'Option A', is_correct: true }, { text: 'Option B', is_correct: false },
          { text: 'Option C', is_correct: false }, { text: 'Option D', is_correct: false }
        ]
      }]
    },
    {
      topicID: 'agile',
      questions: [{
        questionID: 2, question: 'Test question 2?',
        options: [
          { text: 'Option A', is_correct: false }, { text: 'Option B', is_correct: true },
          { text: 'Option C', is_correct: false }, { text: 'Option D', is_correct: false }
        ]
      }]
    }
  ];

  it('should display correct number of topic cards', async () => {
    quizService.fetchQuiz.mockResolvedValue(mockDataTwoTopics);
    render(<QuizTopicSelector />);
    await waitFor(() => {
      expect(screen.getByTestId('topic-card-emotional_intelligence')).toBeInTheDocument();
      expect(screen.getByTestId('topic-card-agile')).toBeInTheDocument();
    });
  });

  it('should show completion counter', async () => {
    quizService.fetchQuiz.mockResolvedValue(mockDataTwoTopics);
    render(<QuizTopicSelector />);
    await waitFor(() => expect(screen.getByText('Completed: 0 / 2')).toBeInTheDocument());
  });

  it('should display questions when card clicked', async () => {
    quizService.fetchQuiz.mockResolvedValue(mockDataTwoTopics);
    render(<QuizTopicSelector />);
    await waitFor(() => expect(screen.getByTestId('topic-card-emotional_intelligence')).toBeInTheDocument());
    fireEvent.click(screen.getByTestId('topic-card-emotional_intelligence'));
    await waitFor(() => expect(screen.getByText('Test question 1?')).toBeInTheDocument());
  });

  it('should persist answers when toggling cards', async () => {
    quizService.fetchQuiz.mockResolvedValue(mockDataTwoTopics);
    render(<QuizTopicSelector />);
    await waitFor(() => expect(screen.getByTestId('topic-card-emotional_intelligence')).toBeInTheDocument());
    const topicCard = screen.getByTestId('topic-card-emotional_intelligence');
    fireEvent.click(topicCard);
    await waitFor(() => expect(screen.getByTestId('answer-card-0')).toBeInTheDocument());
    fireEvent.click(screen.getByTestId('answer-card-0'));
    fireEvent.click(topicCard);
    fireEvent.click(topicCard);
    await waitFor(() => {
      expect(screen.getByTestId('answer-card-0')).toHaveAttribute('aria-pressed', 'true');
    });
  });

  it('should show done button when all completed', async () => {
    quizService.fetchQuiz.mockResolvedValue(mockDataTwoTopics);
    render(<QuizTopicSelector />);
    await waitFor(() => expect(screen.getByTestId('topic-card-emotional_intelligence')).toBeInTheDocument());
    fireEvent.click(screen.getByTestId('topic-card-emotional_intelligence'));
    await waitFor(() => expect(screen.getByTestId('answer-card-0')).toBeInTheDocument());
    fireEvent.click(screen.getByTestId('answer-card-0'));
    await waitFor(() => expect(screen.getByText('Completed: 1 / 2')).toBeInTheDocument());
    fireEvent.click(screen.getByTestId('topic-card-emotional_intelligence'));
    fireEvent.click(screen.getByTestId('topic-card-agile'));
    await waitFor(() => expect(screen.getByTestId('answer-card-1')).toBeInTheDocument());
    fireEvent.click(screen.getByTestId('answer-card-1'));
    await waitFor(() => expect(screen.getByText("I'm good to go")).toBeInTheDocument());
  });
});
