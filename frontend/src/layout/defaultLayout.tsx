import React, { useContext, type ReactNode } from 'react';
import { AuthContext } from '../contexts/authContext';
import { Button } from '../components/button';

interface LayoutProps {
  children: ReactNode;
}

export const DefaultLayout: React.FC<LayoutProps> = ({ children }) => {
  const { logout } = useContext(AuthContext);
  return (
    <div className="layout-wrapper">
      <header className="main-header">
        <h1>Área de Tarefas</h1>
        <Button variant="danger" onClick={logout}>Desconectar</Button>
      </header>
      <main className="layout-content">{children}</main>
    </div>
  );
};
