import { createContext, useContext, useState, useEffect, useMemo } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      checkTokenValidity(storedToken);
    }
    setIsLoading(false);
  }, []);

  const checkTokenValidity = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000; 
      if (Date.now() >= exp) {
        logout();
      } else {
        setUser({ name: payload.admin_name });
        const timeUntilExpiry = exp - Date.now();
        setTimeout(() => {
          logout();
          alert('Session expired. Please login again.');
        }, timeUntilExpiry);
      }
    } catch (error) {
      console.error('Invalid token:', error);
      logout();
    }
  };

  const login = (newToken) => {
    setToken(newToken);
    sessionStorage.setItem('authToken', newToken);
    checkTokenValidity(newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    sessionStorage.removeItem('authToken');
  };

  const value = useMemo(() => ({
    token,
    user,
    isAuthenticated: !!token,
    isLoading,
    login,
    logout,
  }), [token, user, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

