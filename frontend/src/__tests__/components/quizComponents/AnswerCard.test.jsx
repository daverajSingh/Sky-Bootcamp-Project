import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import AnswerCard from '../../../components/quizComponents/AnswerCard';

describe('AnswerCard', () => {
  afterEach(cleanup);
  const mockOnSelect = jest.fn();
  beforeEach(() => jest.clearAllMocks());

  it('should render answer text', () => {
    render(<AnswerCard index={0} text="Test Answer" onSelect={mockOnSelect} isSelected={false} />);
    expect(screen.getByText('Test Answer')).toBeInTheDocument();
  });

  it('should have button role and aria-pressed attribute', () => {
    render(<AnswerCard index={0} text="Test Answer" onSelect={mockOnSelect} isSelected={false} />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });

  it('should indicate selected state via aria-pressed', () => {
    render(<AnswerCard index={0} text="Test Answer" onSelect={mockOnSelect} isSelected={true} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('should call onSelect with correct index when clicked', () => {
    render(<AnswerCard index={2} text="Test Answer" onSelect={mockOnSelect} isSelected={false} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockOnSelect).toHaveBeenCalledWith(2);
  });

  it('should respond to Enter key', () => {
    render(<AnswerCard index={0} text="Test Answer" onSelect={mockOnSelect} isSelected={false} />);
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
  });

  it('should respond to Space key', () => {
    render(<AnswerCard index={0} text="Test Answer" onSelect={mockOnSelect} isSelected={false} />);
    fireEvent.keyDown(screen.getByRole('button'), { key: ' ' });
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
  });

  it('should be keyboard accessible with tabIndex', () => {
    render(<AnswerCard index={0} text="Test Answer" onSelect={mockOnSelect} isSelected={false} />);
    expect(screen.getByRole('button')).toHaveAttribute('tabIndex', '0');
  });

  it('should use testid for specific targeting', () => {
    render(<AnswerCard index={1} text="Test Answer" onSelect={mockOnSelect} isSelected={false} />);
    expect(screen.getByTestId('answer-card-1')).toBeInTheDocument();
  });

  it('should handle multiple cards independently', () => {
    render(
      <>
        <AnswerCard index={0} text="Answer 1" onSelect={mockOnSelect} isSelected={false} />
        <AnswerCard index={1} text="Answer 2" onSelect={mockOnSelect} isSelected={true} />
      </>
    );
    expect(screen.getByTestId('answer-card-1')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('answer-card-0')).toHaveAttribute('aria-pressed', 'false');
  });
});
