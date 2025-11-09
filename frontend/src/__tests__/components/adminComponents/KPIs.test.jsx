import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { KPIs } from "../../../components/admin/KPIs";

describe("KPIs component", () => {
  test("renders KPI labels", () => {
    render(<KPIs />);

    expect(
      screen.getByRole("heading", { name: /Total Users/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Simulator Sessions/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Quizzes Answered/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Average Quiz Score/i })
    ).toBeInTheDocument();
  });

  test("renders placeholders when data is missing", () => {
    render(<KPIs />);

    const placeholders = screen.getAllByText("—");
    expect(placeholders).toHaveLength(4);
  });

  test("renders values when data is provided", () => {
    const data = {
      totalUsers: 123,
      simulatorSessions: 45,
      quizzesAnswered: 67,
      averageQuizScore: 89,
    };

    render(<KPIs data={data} />);

    expect(screen.getByText("123")).toBeInTheDocument();
    expect(screen.getByText("45")).toBeInTheDocument();
    expect(screen.getByText("67")).toBeInTheDocument();
    expect(screen.getByText("89")).toBeInTheDocument();
  });

  test("renders 0 when values are zero", () => {
    const data = {
      totalUsers: 0,
      simulatorSessions: 0,
      quizzesAnswered: 0,
      averageQuizScore: 0,
    };

    render(<KPIs data={data} />);

    const zeros = screen.getAllByText("0");
    expect(zeros).toHaveLength(4);
  });
});
