import React from "react";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import FAQ from "../../components/FAQ";
import axios from "axios";

jest.mock("axios");

describe("FAQ", () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it("renders FAQ questions and answers from mock data", async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        { question: "What is X?", answer: "X is ..." },
        { question: "How does Y work?", answer: "Y works by ..." },
      ],
    });

    render(<FAQ />);

    expect(screen.getByText("Frequently Asked Questions")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("What is X?")).toBeInTheDocument();
      expect(screen.getByText("How does Y work?")).toBeInTheDocument();
    });
  });

  it("shows error message if faqData is not an array", async () => {
    axios.get.mockResolvedValueOnce({
      data: { question: "Wrong shape" }, // Not an array
    });

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

    render(<FAQ />)

    await waitFor(() => {
      expect(
        screen.getByText(/Sorry, FAQ data could not be loaded/i)
      ).toBeInTheDocument();
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Error displaying FAQ data'),
      expect.any(Error)
    );

    consoleErrorSpy.mockRestore();
  });

  it("renders nothing but heading if faqData is empty array", async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    render(<FAQ />)

    expect(screen.getByText("Frequently Asked Questions")).toBeInTheDocument();

    await waitFor(() => {
      const faqItems = screen.queryByRole("listitem");
      expect(faqItems).not.toBeInTheDocument();
    });
  });
});
