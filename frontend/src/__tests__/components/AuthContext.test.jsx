import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../components/AuthContext';

function TestComponent() {
  const { token, user, isAuthenticated, isLoading, login, logout } = useAuth();
  return (
    <div>
      <div data-testid="token">{token}</div>
      <div data-testid="user">{user ? user.name : ''}</div>
      <div data-testid="isAuthenticated">{isAuthenticated ? 'true' : 'false'}</div>
      <div data-testid="isLoading">{isLoading ? 'true' : 'false'}</div>
      <button onClick={() => login('fake.jwt.token')}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

beforeEach(() => {
  Storage.prototype.getItem = jest.fn(() => null);
  Storage.prototype.setItem = jest.fn();
  Storage.prototype.removeItem = jest.fn();
});

describe('AuthProvider', () => {
  it('renders without crashing and initializes', async () => {
    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });

    expect(screen.getByTestId('isLoading').textContent).toBe('false');
    expect(screen.getByTestId('isAuthenticated').textContent).toBe('false');
  });

  it('throws an error when useAuth is used outside AuthProvider', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<TestComponent />)).toThrow('useAuth must be used within AuthProvider');
    consoleError.mockRestore();
  });

  it('calls login and updates token/sessionStorage', async () => {
    const fakeToken = 'fake.jwt.token';
    const payload = { exp: Math.floor(Date.now() / 1000) + 60, admin_name: 'Admin' };
    const encodedPayload = btoa(JSON.stringify(payload));
    const fullToken = `header.${encodedPayload}.sig`;

    jest.spyOn(global, 'atob').mockReturnValueOnce(JSON.stringify(payload));

    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });

    const loginButton = screen.getByText('Login');
    await act(async () => {
      loginButton.click();
    });

    expect(sessionStorage.setItem).toHaveBeenCalledWith('authToken', 'fake.jwt.token');
  });

  it('calls logout and clears sessionStorage', async () => {
    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });

    const logoutButton = screen.getByText('Logout');
    await act(async () => {
      logoutButton.click();
    });

    expect(sessionStorage.removeItem).toHaveBeenCalledWith('authToken');
    expect(screen.getByTestId('isAuthenticated').textContent).toBe('false');
  });

  it('logs out automatically when token is expired', async () => {
    const expiredPayload = { exp: Math.floor(Date.now() / 1000) - 1, admin_name: 'OldUser' };
    const encodedPayload = btoa(JSON.stringify(expiredPayload));
    const expiredToken = `header.${encodedPayload}.sig`;

    Storage.prototype.getItem = jest.fn(() => expiredToken);
    jest.spyOn(global, 'atob').mockReturnValueOnce(JSON.stringify(expiredPayload));

    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });

    expect(sessionStorage.removeItem).toHaveBeenCalledWith('authToken');
  });
});
