import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
  act,
} from "@testing-library/react";
import AdminDashboard from "../../../pages/admin.jsx";
import adminData from "../../../data/adminData.json";
import questionsData from "../../../data/questionsData.json";

jest.mock("../../../data/adminData.json", () => ({
  dailyUsers: 10,
  avgTimePerUse: "45 mins",
  avgQuestionsCorrect: "6/10",
  quizResults: { Agile: 80, Values: 70, Git: 90, Ethics: 75, EQ: 85 },
  simulationQuestions: { Agile: 10, Values: 8, Git: 7, Ethics: 5, EQ: 6 },
}));

jest.mock("../../../data/questionsData.json", () => [
  { id: 1, category: "Agile", question: "Agile question 1" },
  { id: 2, category: "Agile", question: "Agile question 2" },
  { id: 3, category: "Values", question: "Values question 1" },
  { id: 4, category: "Git", question: "Git question 1" },
  { id: 5, category: "Ethics", question: "Ethics question 1" },
  { id: 6, category: "EQ", question: "EQ question 1" },
]);

beforeEach(() => {
  jest.useFakeTimers();
  jest.spyOn(global.console, "error").mockImplementation(() => {}); // suppress act() noise
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  cleanup();
  console.error.mockRestore();
});

describe("AdminDashboard", () => {
  it("renders header and stats correctly", async () => {
    render(<AdminDashboard />);
    await act(async () => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(screen.getByText("Sky")).toBeInTheDocument();
      expect(screen.getByText(/Sky Immersion/i)).toBeVisible();
    });

    expect(screen.getByText("Admin Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Daily Users")).toBeInTheDocument();
    expect(screen.getByText(adminData.dailyUsers.toString())).toBeInTheDocument();
  });

  it("displays topic buttons and default Agile questions", async () => {
    render(<AdminDashboard />);
    await act(async () => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      const agileButtons = screen.getAllByRole("button", { name: /Agile/i });
      expect(agileButtons.length).toBeGreaterThan(0);
    });

    expect(screen.getByText(/Agile question 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Agile question 2/i)).toBeInTheDocument();
  });

  it("changes questions when topic button is clicked", async () => {
    render(<AdminDashboard />);
    await act(async () => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      const valuesButtons = screen.getAllByRole("button", { name: /Values/i });
      fireEvent.click(valuesButtons[0]);
    });

    expect(screen.getByText(/Values question 1/i)).toBeInTheDocument();
  });

  it("allows selecting multiple questions per topic without restriction", async () => {
    render(<AdminDashboard />);
    await act(async () => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      const checkboxes = screen.getAllByRole("checkbox");
      expect(checkboxes.length).toBeGreaterThan(1);

      // select all available Agile questions
      checkboxes.forEach((box) => fireEvent.click(box));

      checkboxes.forEach((box) => {
        expect(box).toBeChecked();
      });
    });
  });

  it("adds a new question to the selected topic", async () => {
    render(<AdminDashboard />);
    await act(async () => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      const input = screen.getByPlaceholderText("Type your question...");
      fireEvent.change(input, { target: { value: "New Agile question" } });
      fireEvent.click(screen.getByText("Add"));
    });

    expect(screen.getByText("New Agile question")).toBeInTheDocument();
  });

  it("renders quiz results and simulation questions correctly", async () => {
    render(<AdminDashboard />);
    await act(async () => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(screen.getByText(/Quiz Results/i)).toBeInTheDocument();
      expect(screen.getByText(/Simulation Questions Asked/i)).toBeInTheDocument();
    });
  });
});