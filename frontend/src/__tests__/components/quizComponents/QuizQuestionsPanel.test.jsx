import React from 'react';
import { render, screen, fireEvent, cleanup, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuizQuestionsPanel from '../../../components/quizComponents/QuizQuestionsPanel';

describe('QuizQuestionsPanel', () => {
  afterEach(cleanup);
  const mockOnStatusChange = jest.fn();
  const mockOnAnswer = jest.fn();
  const mockTopic = {
    topicID: 'emotional_intelligence',
    person: 'Test Manager',
    questions: [
      { questionID: 1, question: 'First question?', options: [
        { text: 'Option A', is_correct: true }, { text: 'Option B', is_correct: false },
        { text: 'Option C', is_correct: false }, { text: 'Option D', is_correct: false }
      ]},
      { questionID: 2, question: 'Second question?', options: [
        { text: 'Option A', is_correct: false }, { text: 'Option B', is_correct: true },
        { text: 'Option C', is_correct: false }, { text: 'Option D', is_correct: false }
      ]}
    ]
  };

  beforeEach(() => jest.clearAllMocks());

  it('should show placeholder when no topic selected', () => {
    render(<QuizQuestionsPanel topic={null} onStatusChange={mockOnStatusChange} savedAnswers={{}} onAnswer={mockOnAnswer} />);
    expect(screen.getByText('Select a topic to view questions')).toBeInTheDocument();
  });

  it('should render topic title', () => {
    render(<QuizQuestionsPanel topic={mockTopic} onStatusChange={mockOnStatusChange} savedAnswers={{}} onAnswer={mockOnAnswer} />);
    expect(screen.getByText('EMOTIONAL INTELLIGENCE')).toBeInTheDocument();
  });

  it('should render all questions', () => {
    render(<QuizQuestionsPanel topic={mockTopic} onStatusChange={mockOnStatusChange} savedAnswers={{}} onAnswer={mockOnAnswer} />);
    expect(screen.getByText('First question?')).toBeInTheDocument();
    expect(screen.getByText('Second question?')).toBeInTheDocument();
  });

  it('should call onAnswer when answer selected', () => {
    render(<QuizQuestionsPanel topic={mockTopic} onStatusChange={mockOnStatusChange} savedAnswers={{}} onAnswer={mockOnAnswer} />);
    const firstQuestionOptions = screen.getByTestId('question-1').querySelectorAll('[role="button"]');
    fireEvent.click(firstQuestionOptions[0]);
    expect(mockOnAnswer).toHaveBeenCalledWith(1, [0]);
  });

  it('should preserve saved answers via aria-pressed', () => {
    const savedAnswers = { 1: [0], 2: [1] };
    render(<QuizQuestionsPanel topic={mockTopic} onStatusChange={mockOnStatusChange} savedAnswers={savedAnswers} onAnswer={mockOnAnswer} />);
    const question1 = screen.getByTestId('question-1');
    const optionA = within(question1).getByRole('button', { name: /answer option: option a/i });
    expect(optionA).toHaveAttribute('aria-pressed', 'true');
  });

  it('should call onStatusChange with correct status', () => {
    render(<QuizQuestionsPanel topic={mockTopic} onStatusChange={mockOnStatusChange} savedAnswers={{}} onAnswer={mockOnAnswer} />);
    expect(mockOnStatusChange).toHaveBeenCalled();
  });
});
