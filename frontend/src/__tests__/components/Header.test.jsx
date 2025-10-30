import Header from "../../components/Header.jsx";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";

jest.mock("../../components/AuthContext", () => ({
  useAuth: jest.fn(() => ({
    isAuthenticated: true,
  })),
}));

jest.mock("../../components/AuthButton", () =>
  jest.fn(() => <button>Login</button>)
);

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useLocation: jest.fn(() => ({
    pathname: "/",
    search: "",
    hash: "",
    state: null,
  })),
  useNavigate: jest.fn(),
}));

jest.mock("../../components/TourContext", () => ({
  __esModule: true,
  default: {
    drive: jest.fn(),
  },
}));

const { useLocation } = require("react-router");
const { useAuth } = require("../../components/AuthContext");

describe("Header", () => {
  afterEach(cleanup);
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Clicking the SkyImmersion text should load the skyImmersion home page", () => {
    render(<Header />);

    expect(screen.getByText("Immersion")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Immersion"));

    expect(screen.getByRole("link", { name: "Immersion" })).toHaveAttribute(
      "href",
      "/"
    );
  });

  it("Check if the login button is visible", () => {
    render(<Header />);
    useAuth.mockReturnValueOnce({
      isAuthenticated: false,
    });

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeVisible();
  });

  it("checks if the Sky logo image is visible", () => {
    render(<Header />);

    const logo = screen.getByAltText(/Sky Logo/i);
    expect(logo).toBeInTheDocument();
    expect(logo).toBeVisible();
  });

  test("shows tutorial button on home page", () => {
    useLocation.mockReturnValue({
      pathname: "/",
      search: "",
      hash: "",
      state: null,
    });

    useAuth.mockReturnValueOnce({
      isAuthenticated: false,
    });

    render(<Header />);

    expect(screen.getByText("Tutorial")).toBeInTheDocument();
  });

  test("hides tutorial button on other pages", () => {
    useLocation.mockReturnValueOnce({
      pathname: "/about",
      search: "",
      hash: "",
      state: null,
    });

    useAuth.mockReturnValueOnce({
      isAuthenticated: false,
    });

    render(<Header />);

    expect(screen.queryByText("Tutorial")).not.toBeInTheDocument();
  });

  test("hides tutorial button if logged in ", () => {
    useLocation.mockReturnValueOnce({
      pathname: "/",
      search: "",
      hash: "",
      state: null,
    });

    render(<Header />);

    expect(screen.queryByText("Tutorial")).not.toBeInTheDocument();
  });
});
