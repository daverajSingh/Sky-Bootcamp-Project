import React from "react";
import { render, screen } from "@testing-library/react";
import QuizResultsPanel from "../../../components/admin/QuizResultsPanel.jsx";

const mockResults = {
  Agile: 80,
  Values: 70,
  Git: 90,
  Ethics: 75,
  EQ: 85,
};

describe("QuizResultsPanel Component", () => {
  it("renders correctly with quiz results", () => {
    render(<QuizResultsPanel quizResults={mockResults} />);

    // Header
    expect(screen.getByText("Quiz Results")).toBeInTheDocument();

    // Each topic name and percentage
    Object.keys(mockResults).forEach((topic) => {
      expect(screen.getByText(topic)).toBeInTheDocument();

      // Flexible text matcher for numbers (handles split DOM nodes like "80" + "%")
      expect(
        screen.getByText((content) =>
          content.includes(`${mockResults[topic]}`)
        )
      ).toBeInTheDocument();
    });
  });
});
