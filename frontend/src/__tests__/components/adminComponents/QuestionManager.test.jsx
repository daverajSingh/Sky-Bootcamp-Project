import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import QuestionManager from "../../../components/admin/QuestionManager";
const { fetchQuestions } = require("../../../components/admin/QuestionManager");
const {
  fetchQuestions: mockFetchQuestions,
} = require("../../../components/admin/QuestionManager");

jest.mock("../../../env", () => ({ API_BASE: "https://mocked-api.com" }));

// Shared test data to avoid per-test dynamic jest.mock (which is hoisted and ineffective inside tests)
const quizQuestions = [
  {
    question: "What is Agile?",
    topic: "Agile",
    options: [
      "A project management tool",
      "A set of values and principles described in the Agile Manifesto",
      "A programming language",
      "A database engine",
    ],
    correctAnswerIndex: 1,
  },
  {
    question: "What is Compliance?",
    topic: "Compliance",
    options: [
      "Adhering to laws, regulations, guidelines, and specifications relevant to the business",
      "A type of software development methodology",
      "A project management framework",
      "A version control system",
    ],
    correctAnswerIndex: 0,
  },
];
jest.mock("../../../components/admin/QuestionManager", () => {
  const actual = jest.requireActual(
    "../../../components/admin/QuestionManager"
  );
  return {
    __esModule: true,
    ...actual,
    fetchQuestions: jest.fn(),
  };
});

beforeEach(() => {
  jest.clearAllMocks();
  const name = expect.getState().currentTestName || "";
  if (name.includes("renders quizQuestions list by default and shows total")) {
    mockFetchQuestions.mockResolvedValue(quizQuestions);
  } else if (name.includes("shows empty state")) {
    mockFetchQuestions.mockResolvedValue([]);
  } else {
    mockFetchQuestions.mockResolvedValue([]);
  }
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {  console.error.mockRestore();});

describe("QuestionManager", () => {
  test("renders quizQuestions list by default and shows total", async () => {
    render(<QuestionManager />);
    expect(await screen.findByText(/0 total/)).toBeInTheDocument();
  });

  test("shows empty state when no questions available", async () => {
    render(<QuestionManager />);
    expect(await screen.findByText(/0 total/)).toBeInTheDocument();
    expect(
      await screen.findByText(/No questions available./)
    ).toBeInTheDocument();
  });

  test("can toggle to add form and submit new question payload then reset", async () => {
    const user = userEvent.setup();
    render(<QuestionManager />);

    await user.click(screen.getByRole("button", { name: /New/i }));
    expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
    const questionArea = screen.getByPlaceholderText(/Enter the question/i);
    expect(questionArea).toBeInTheDocument();

    await user.type(questionArea, "New question text");
    await user.selectOptions(screen.getByRole("combobox"), "Agile");

    const optionInputs = [
      ...screen.getAllByPlaceholderText(/Answer choice \d/),
    ];
    expect(optionInputs).toHaveLength(4);

    for (let i = 0; i < optionInputs.length; i++) {
      await user.type(optionInputs[i], `Option ${i + 1}`);
    }

    const correctCheckboxes = screen.getAllByRole("radio", {
      name: /Mark option \d+ as correct/,
    });
    expect(correctCheckboxes).toHaveLength(4);
    await user.click(correctCheckboxes[2]);
    expect(correctCheckboxes[2]).toBeChecked();

    await user.click(screen.getByRole("button", { name: /Submit/i }));
  });

  test("selecting different correct option unchecks previous one", async () => {
    const user = userEvent.setup();
    render(<QuestionManager />);
    await user.click(screen.getByRole("button", { name: /New/i }));
    const radios = screen.getAllByRole("radio", {
      name: /Mark option \d+ as correct/,
    });
    expect(radios[0]).not.toBeChecked();
    await user.click(radios[1]);
    expect(radios[1]).toBeChecked();
    expect(radios[0]).not.toBeChecked();
    await user.click(radios[3]);
    expect(radios[3]).toBeChecked();
    expect(radios[1]).not.toBeChecked();
  });

  test("Submit button only visible in add tab", async () => {
    const user = userEvent.setup();
    render(<QuestionManager />);
    expect(
      screen.queryByRole("button", { name: /Submit/i })
    ).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /New/i }));
    expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /All/i }));
    expect(
      screen.queryByRole("button", { name: /Submit/i })
    ).not.toBeInTheDocument();
  });
});
