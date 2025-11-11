import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import SimulationSummary from "../../../components/admin/SimulationSummary.jsx";

const mockSimulationQuestions = [
  { topic_id: 1, topic_name: "Agile", questions_asked_count: 10 },
  { topic_id: 2, topic_name: "Values", questions_asked_count: 8 },
  { topic_id: 3, topic_name: "Git", questions_asked_count: 7 },
  { topic_id: 4, topic_name: "Ethics", questions_asked_count: 5 },
  { topic_id: 5, topic_name: "EQ", questions_asked_count: 6 },
];

describe("SimulationSummary Component", () => {
  it("renders simulation question stats correctly", async () => {
    await act(async () => {
      render(
        <SimulationSummary simulationQuestions={mockSimulationQuestions} />
      );
    });

    // Wait until title appears
    await waitFor(() =>
      expect(
        screen.getByText(/Simulation Questions Asked/i)
      ).toBeInTheDocument()
    );

    // Check topics render
    expect(screen.getByText(/Agile/i)).toBeInTheDocument();
    expect(screen.getByText(/Values/i)).toBeInTheDocument();
  });
});
