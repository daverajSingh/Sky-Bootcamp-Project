import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuizQuestion from '../../../../components/quizComponents/QuizQuestion';

describe('QuizQuestion', () => {
  afterEach(cleanup);
  const mockOnAnswer = jest.fn();
  const mockQuestion = {
    questionID: 1,
    question: 'What is the correct answer?',
    human: 'Test Manager',
    options: [
      { text: 'Option A', is_correct: true },
      { text: 'Option B', is_correct: false },
      { text: 'Option C', is_correct: false },
      { text: 'Option D', is_correct: false }
    ]
  };

  beforeEach(() => jest.clearAllMocks());

  it('should render question text', () => {
    render(<QuizQuestion question={mockQuestion} onAnswer={mockOnAnswer} selectedIndex={[]} />);
    expect(screen.getByText('What is the correct answer?')).toBeInTheDocument();
  });

  it('should render all options', () => {
    render(<QuizQuestion question={mockQuestion} onAnswer={mockOnAnswer} selectedIndex={[]} />);
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByText('Option B')).toBeInTheDocument();
    expect(screen.getByText('Option C')).toBeInTheDocument();
    expect(screen.getByText('Option D')).toBeInTheDocument();
  });

  it('should render human label when provided', () => {
    render(<QuizQuestion question={mockQuestion} onAnswer={mockOnAnswer} selectedIndex={[]} />);
    expect(screen.getByText('Test Manager')).toBeInTheDocument();
  });

  it('should call onAnswer with questionID and selected indices', () => {
    render(<QuizQuestion question={mockQuestion} onAnswer={mockOnAnswer} selectedIndex={[]} />);
    fireEvent.click(screen.getByTestId('answer-card-0'));
    expect(mockOnAnswer).toHaveBeenCalledWith(1, [0]);
  });

  it('should show selected state via aria-pressed', () => {
    render(<QuizQuestion question={mockQuestion} onAnswer={mockOnAnswer} selectedIndex={[0, 2]} />);
    expect(screen.getByTestId('answer-card-0')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('answer-card-2')).toHaveAttribute('aria-pressed', 'true');
  });

  it('should support multi-select by toggling', () => {
    render(<QuizQuestion question={mockQuestion} onAnswer={mockOnAnswer} selectedIndex={[0]} />);
    fireEvent.click(screen.getByTestId('answer-card-1'));
    expect(mockOnAnswer).toHaveBeenCalledWith(1, [0, 1]);
  });

  it('should use testid for question container', () => {
    render(<QuizQuestion question={mockQuestion} onAnswer={mockOnAnswer} selectedIndex={[]} />);
    expect(screen.getByTestId('question-1')).toBeInTheDocument();
  });
});
