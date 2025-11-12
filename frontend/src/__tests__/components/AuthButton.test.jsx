import React from "react";
import { render, screen } from "@testing-library/react";
import AuthButton from "../../components/AuthButton";
import { useAuth } from "../../components/AuthContext";
import DropDownLogin from "../../components/DropDownLogin";
import LogoutButton from "../../components/LogoutButton";

jest.mock("../../components/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("../../components/DropDownLogin", () =>
  jest.fn(() => <div>DropDownLogin</div>)
);
jest.mock("../../components/LogoutButton", () =>
  jest.fn(() => <div>LogoutButton</div>)
);

describe("AuthButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders DropDownLogin when user is not authenticated", () => {
    useAuth.mockReturnValue({ isAuthenticated: false });

    render(<AuthButton />);

    expect(screen.getByText("DropDownLogin")).toBeInTheDocument();
    expect(DropDownLogin).toHaveBeenCalledTimes(1);
    expect(LogoutButton).not.toHaveBeenCalled();
  });

  it("renders LogoutButton when user is authenticated", () => {
    useAuth.mockReturnValue({ isAuthenticated: true });

    render(<AuthButton />);

    expect(screen.getByText("LogoutButton")).toBeInTheDocument();
    expect(LogoutButton).toHaveBeenCalledTimes(1);
    expect(DropDownLogin).not.toHaveBeenCalled();
  });
});
