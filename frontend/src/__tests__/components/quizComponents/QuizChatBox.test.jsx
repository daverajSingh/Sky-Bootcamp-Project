import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuizChatBox from '../../../components/quizComponents/QuizChatBox';

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

    expect(screen.queryByText("I'm good to go")).not.toBeInTheDocument();

    rerender(
      <QuizChatBox topics={mockTopics} completedMap={completedMap} allCompleted={true} topicAnswers={{}} />
    );

    expect(screen.getByText("I'm good to go")).toBeInTheDocument();
  });

  it('should show results with score when done button clicked', () => {
    const completedMap = { emotional_intelligence: 'answered' };
    const topicAnswers = { emotional_intelligence: { 1: [0] } };
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(
      <QuizChatBox topics={mockTopics} completedMap={completedMap} allCompleted={true} topicAnswers={topicAnswers} />
    );

    fireEvent.click(screen.getByText("I'm good to go"));

    expect(alertMock).toHaveBeenCalled();
    expect(alertMock.mock.calls[0][0]).toContain('You scored 1 / 1');

    alertMock.mockRestore();
  });
});
