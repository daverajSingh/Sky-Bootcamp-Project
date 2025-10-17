import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuizTopicCard from '../../../../components/quizComponents/QuizTopicCard';

describe('QuizTopicCard', () => {
  afterEach(cleanup);
  const mockOnSelect = jest.fn();
  const mockTopic = {
    topicID: 'emotional_intelligence',
    questions: [{ questionID: 1, question: 'Test?', options: [] }]
  };

  beforeEach(() => jest.clearAllMocks());

  it('should render topic title', () => {
    render(<QuizTopicCard topic={mockTopic} status="todo" onSelect={mockOnSelect} selected={false} />);
    expect(screen.getByText('EMOTIONAL INTELLIGENCE')).toBeInTheDocument();
  });

  it('should render with todo status', () => {
    render(<QuizTopicCard topic={mockTopic} status="todo" onSelect={mockOnSelect} selected={false} />);
    expect(screen.getByText('todo')).toBeInTheDocument();
  });

  it('should render partially completed status', () => {
    render(<QuizTopicCard topic={mockTopic} status="partially" onSelect={mockOnSelect} selected={false} />);
    expect(screen.getByText('partially completed')).toBeInTheDocument();
  });

  it('should render answered status', () => {
    render(<QuizTopicCard topic={mockTopic} status="answered" onSelect={mockOnSelect} selected={false} />);
    expect(screen.getByText('answered')).toBeInTheDocument();
  });

  it('should call onSelect with topicID when clicked', () => {
    render(<QuizTopicCard topic={mockTopic} status="todo" onSelect={mockOnSelect} selected={false} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockOnSelect).toHaveBeenCalledWith(mockTopic.topicID);
  });

  it('should have aria-pressed attribute for selection state', () => {
    render(<QuizTopicCard topic={mockTopic} status="todo" onSelect={mockOnSelect} selected={true} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('should respond to keyboard navigation', () => {
    render(<QuizTopicCard topic={mockTopic} status="todo" onSelect={mockOnSelect} selected={false} />);
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });
    expect(mockOnSelect).toHaveBeenCalledWith(mockTopic.topicID);
  });

  it('should use testid for specific targeting', () => {
    render(<QuizTopicCard topic={mockTopic} status="todo" onSelect={mockOnSelect} selected={false} />);
    expect(screen.getByTestId('topic-card-emotional_intelligence')).toBeInTheDocument();
  });
});
