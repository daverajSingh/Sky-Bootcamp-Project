import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import QuestionManager from "../../../components/admin/QuestionManager.jsx";

const mockProps = {
  topics: ["Agile", "Values"],
  selectedTopic: "Agile",
  onSelectTopic: jest.fn(),
  filteredQuestions: [
    { id: 1, category: "Agile", question: "Agile question 1" },
    { id: 2, category: "Agile", question: "Agile question 2" },
  ],
  selectedQuestions: { Agile: [1] },
  onToggleQuestion: jest.fn(),
  newQuestion: "",
  onNewQuestionChange: jest.fn(),
  onAddQuestion: jest.fn(),
  selectedCountForTopic: 1,
  totalSelected: 1,
};

describe("QuestionManager Component", () => {
  it("renders topic buttons and questions", () => {
    render(<QuestionManager {...mockProps} />);
    expect(screen.getByText("Agile")).toBeInTheDocument();
    expect(screen.getByText("Agile question 1")).toBeInTheDocument();
  });

  it("calls onSelectTopic when topic button clicked", () => {
    render(<QuestionManager {...mockProps} />);
    fireEvent.click(screen.getByText("Values"));
    expect(mockProps.onSelectTopic).toHaveBeenCalledWith("Values");
  });

  it("calls onToggleQuestion when checkbox clicked", () => {
    render(<QuestionManager {...mockProps} />);
    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]);
    expect(mockProps.onToggleQuestion).toHaveBeenCalled();
  });

  it("handles adding a new question", () => {
    render(<QuestionManager {...mockProps} />);
    const input = screen.getByPlaceholderText(/Type your question/i);
    const addBtn = screen.getByText("Add");
    fireEvent.change(input, { target: { value: "New question" } });
    fireEvent.click(addBtn);
    expect(mockProps.onAddQuestion).toHaveBeenCalled();
  });
});