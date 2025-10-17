import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DropDownLogin from '../../components/DropDownLogin';
import { useAuth } from '../../components/AuthContext';
import { useNavigate } from 'react-router';

jest.mock('../../components/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('react-router', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (element) => element,
}));

describe('DropDownLogin', () => {
  const mockLogin = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useAuth.mockReturnValue({ login: mockLogin });
    useNavigate.mockReturnValue(mockNavigate);
  });

  it('renders login button by default', () => {
    render(<DropDownLogin />);
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('opens dropdown when login button is clicked', () => {
    render(<DropDownLogin />);
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument();
  });

  it('shows error if fields are empty on submit', async () => {
    render(<DropDownLogin />);
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(/please enter both email and password/i)).toBeInTheDocument();
    });
  });

  it('calls login and navigates on successful login', async () => {
    render(<DropDownLogin />);
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: 'mockToken' }),
      })
    );

    fireEvent.change(screen.getByPlaceholderText(/john\.doe@sky\.com/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/••••••••/), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('mockToken');
      expect(mockNavigate).toHaveBeenCalledWith('/admin');
    });
  });

  it('shows error message on failed login', async () => {
    render(<DropDownLogin />);
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'Invalid credentials' }),
      })
    );

    fireEvent.change(screen.getByPlaceholderText(/john\.doe@sky\.com/i), {
      target: { value: 'bad@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/••••••••/), {
      target: { value: 'wrongpass' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });

  it('shows network error on fetch failure', async () => {
    render(<DropDownLogin />);
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    global.fetch = jest.fn(() => Promise.reject(new Error('Network down')));

    fireEvent.change(screen.getByPlaceholderText(/john\.doe@sky\.com/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/••••••••/), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(/network error/i)).toBeInTheDocument();
    });
  });
});
