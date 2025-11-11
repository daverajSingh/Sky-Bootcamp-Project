import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { KPIs } from "../../../components/admin/KPIs";

describe("KPIs component", () => {
  test("renders KPI labels", () => {
    render(<KPIs />);

    expect(
      screen.getByRole("heading", { name: /Total Time Spent/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Simulator Questions Asked/i })
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
      timeSpent: 60,
      totalSimulatorQuestions: 45,
      totalSessions: 67,
      averageScore: 89,
    };

    render(<KPIs data={data} />);

    expect(screen.getByText("1m")).toBeInTheDocument();
    expect(screen.getByText("45")).toBeInTheDocument();
    expect(screen.getByText("67")).toBeInTheDocument();
    expect(screen.getByText("89%")).toBeInTheDocument();
  });

  test("renders 0 when values are zero", () => {
    const data = {
      timeSpent: 0,
      totalSimulatorQuestions: 0,
      totalSessions: 0,
      averageScore: 0,
    };

    render(<KPIs data={data} />);

    const zeros = screen.getAllByText("0");
    expect(zeros).toHaveLength(2);
    expect(screen.getByText("0m")).toBeInTheDocument();
    expect(screen.getByText("0%")).toBeInTheDocument();
  });
});
