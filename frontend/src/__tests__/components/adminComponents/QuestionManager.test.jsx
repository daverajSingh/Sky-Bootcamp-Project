import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import QuestionManager from "../../../components/admin/QuestionManager";

describe("QuestionManager", () => {
  const quizQuestions = [
    {
      question: "What is Agile?",
      topic: "Agile",
      options: ["A", "B", "C", "D"],
      correctAnswerIndex: 1,
    },
    {
      question: "What is Git?",
      topic: "Git",
      options: ["E", "F", "G", "H"],
      correctAnswerIndex: 0,
    },
  ];
  test("renders quizQuestions list by default and shows total", () => {
    render(<QuestionManager adminData={{ quizQuestions }} />);
    expect(screen.getByText(/2 total/)).toBeInTheDocument();
    expect(screen.getAllByText(/Topic:/).length).toBe(2);
    expect(screen.getByText("What is Agile?")).toBeInTheDocument();
    expect(screen.getByText("What is Git?")).toBeInTheDocument();
  });

  test("shows empty state when no questions available", () => {
    render(<QuestionManager adminData={{}} />);
    expect(screen.getByText(/0 total/)).toBeInTheDocument();
    expect(screen.getByText(/No questions available./)).toBeInTheDocument();
  });

  test("can toggle to add form and submit new question payload then reset", async () => {
    const user = userEvent.setup();
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    render(<QuestionManager adminData={{ quizQuestions }} />);

    await user.click(screen.getByRole("button", { name: /Add New/i }));
    expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
    const questionArea = screen.getByPlaceholderText(/Enter the question/i);
    expect(questionArea).toBeInTheDocument();

    await user.type(questionArea, "New question text");
    await user.selectOptions(screen.getByRole("combobox"), "Git");

    const optionInputs = [
      ...screen.getAllByPlaceholderText(/Answer choice \d/),
    ];
    expect(optionInputs).toHaveLength(4);

    for (let i = 0; i < optionInputs.length; i++) {
      await user.type(optionInputs[i], `Option ${i + 1}`);
    }

    const correctCheckboxes = screen.getAllByRole("checkbox", {
      name: /Mark option \d+ as correct/,
    });
    expect(correctCheckboxes).toHaveLength(4);
    expect(correctCheckboxes[0]).toBeChecked();
    await user.click(correctCheckboxes[2]);
    expect(correctCheckboxes[2]).toBeChecked();
    expect(correctCheckboxes[0]).not.toBeChecked();

    await user.click(screen.getByRole("button", { name: /Submit/i }));
    expect(logSpy).toHaveBeenCalledTimes(1);
    const payloadArg = logSpy.mock.calls[0][1];
    expect(payloadArg).toEqual({
      question: "New question text",
      topic: "Git",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswerIndex: 2,
    });

    expect(questionArea).toHaveValue("");
    expect(screen.getByRole("combobox")).toHaveValue("");
    optionInputs.forEach((input) => expect(input).toHaveValue(""));
    expect(correctCheckboxes[0]).toBeChecked();
    expect(correctCheckboxes[2]).not.toBeChecked();

    logSpy.mockRestore();
  });

  test("selecting different correct option unchecks previous one", async () => {
    const user = userEvent.setup();
    render(<QuestionManager adminData={{ quizQuestions }} />);
    await user.click(screen.getByRole("button", { name: /Add New/i }));
    const checkboxes = screen.getAllByRole("checkbox", {
      name: /Mark option \d+ as correct/,
    });
    expect(checkboxes[0]).toBeChecked();
    await user.click(checkboxes[1]);
    expect(checkboxes[1]).toBeChecked();
    expect(checkboxes[0]).not.toBeChecked();
    await user.click(checkboxes[3]);
    expect(checkboxes[3]).toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();
  });

  test("Submit button only visible in add tab", async () => {
    const user = userEvent.setup();
    render(<QuestionManager adminData={{ quizQuestions }} />);
    expect(
      screen.queryByRole("button", { name: /Submit/i })
    ).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Add New/i }));
    expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /All Questions/i }));
    expect(
      screen.queryByRole("button", { name: /Submit/i })
    ).not.toBeInTheDocument();
  });
});
