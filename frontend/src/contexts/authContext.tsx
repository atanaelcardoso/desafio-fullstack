import React, { createContext, useState, type ReactNode } from 'react';
import { api } from '../infra/api';

interface AuthContextType {
  signed: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [signed, setSigned] = useState(() => !!localStorage.getItem('@TaskManager:token'));

  const login = async (email: string, password: string) => {
    const response = await api.post<{ token: string }>('/login', { email, password });
    localStorage.setItem('@TaskManager:token', response.data.token);
    setSigned(true);
  };

  const register = async (email: string, password: string) => {
    await api.post('/register', { email, password });
  };

  const logout = () => {
    localStorage.removeItem('@TaskManager:token');
    setSigned(false);
  };

  return (
    <AuthContext.Provider value={{ signed, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
