import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import SimulationSummary from "../../../components/admin/SimulationSummary.jsx";

const mockSimulationQuestions = {
  Agile: 10,
  Values: 8,
  Git: 7,
  Ethics: 5,
  EQ: 6,
};

describe("SimulationSummary Component", () => {
  it("renders simulation question stats correctly", async () => {
    await act(async () => {
      render(<SimulationSummary simulationQuestions={mockSimulationQuestions} />);
    });

    // Wait until title appears
    await waitFor(() =>
      expect(screen.getByText(/Simulation Questions Asked/i)).toBeInTheDocument()
    );

    // Check topics render
    expect(screen.getByText(/Agile/i)).toBeInTheDocument();
    expect(screen.getByText(/Values/i)).toBeInTheDocument();
  });
});