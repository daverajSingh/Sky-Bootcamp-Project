import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LogoutButton from '../../components/LogoutButton';
import { useAuth } from '../../components/AuthContext';
import { useNavigate } from 'react-router';

jest.mock('../../components/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('react-router', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('react-icons/fi', () => ({
  FiLogOut: () => <svg data-testid="logout-icon" />,
}));

describe('LogoutButton', () => {
  const mockLogout = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
  });

  it('renders logout button and icon', () => {
    useAuth.mockReturnValue({ user: null, logout: mockLogout });

    render(<LogoutButton />);

    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
    expect(screen.getByTestId('logout-icon')).toBeInTheDocument();
  });

  it('renders user name when available', () => {
    useAuth.mockReturnValue({ user: { name: 'Alice' }, logout: mockLogout });

    render(<LogoutButton />);

    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('does not render user name if not available', () => {
    useAuth.mockReturnValue({ user: null, logout: mockLogout });

    render(<LogoutButton />);

    expect(screen.queryByText('Alice')).not.toBeInTheDocument();
  });

  it('calls logout and navigates home when clicked', () => {
    useAuth.mockReturnValue({ user: { name: 'Alice' }, logout: mockLogout });

    render(<LogoutButton />);

    const button = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(button);

    expect(mockLogout).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
