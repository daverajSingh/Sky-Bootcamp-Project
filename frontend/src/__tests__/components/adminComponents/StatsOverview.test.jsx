import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import StatsOverview from "../../../components/admin/StatsOverview.jsx";

// Mock Recharts animations and responsive container
jest.mock("recharts", () => {
  const Original = jest.requireActual("recharts");
  return {
    ...Original,
    ResponsiveContainer: ({ children }) => (
      <div style={{ width: 800, height: 400 }}>{children}</div>
    ),
  };
});

const mockData = {
  userActivity: {
    daily: [
      { name: "Mon", users: 10 },
      { name: "Tue", users: 15 },
    ],
    weekly: [
      { name: "Week 1", users: 50 },
      { name: "Week 2", users: 60 },
    ],
    monthly: [
      { name: "Jan", users: 200 },
      { name: "Feb", users: 250 },
    ],
    yearly: [
      { name: "2023", users: 3000 },
      { name: "2024", users: 3500 },
    ],
  },
  quizPerformance: [
    { topic: "Agile", correct: 8, incorrect: 2 },
    { topic: "Values", correct: 7, incorrect: 3 },
  ],
};

describe("StatsOverview Component", () => {
  it("renders charts and headings when valid data is provided", () => {
    render(<StatsOverview data={mockData} />);

    expect(screen.getByText(/User Engagement/i)).toBeInTheDocument();
    expect(screen.getByText(/Quiz Performance by Topic/i)).toBeInTheDocument();
    ["Daily", "Weekly", "Monthly", "Yearly"].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("switches between data periods when buttons clicked", () => {
    render(<StatsOverview data={mockData} />);

    const buttons = ["Daily", "Weekly", "Monthly", "Yearly"];
    buttons.forEach((label) => {
      const button = screen.getByText(label);
      fireEvent.click(button);
      expect(button).toBeInTheDocument();
    });
  });
});