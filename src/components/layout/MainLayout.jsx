import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/paths';
import { getCurrentUser, logout } from '../../services/auth';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';
import './MainLayout.css';

const DESKTOP_MIN_WIDTH = 1025;
const isDesktop = () => window.innerWidth >= DESKTOP_MIN_WIDTH;

export default function MainLayout() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(isDesktop);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  const handleNavigate = () => {
    if (!isDesktop()) setIsSidebarOpen(false);
  };

  return (
    <div className={`app-layout ${isSidebarOpen ? '' : 'app-layout--collapsed'}`}>
      <Sidebar onLogout={handleLogout} onNavigate={handleNavigate} />
      <div className="app-layout__backdrop" onClick={() => setIsSidebarOpen(false)} />

      <div className="app-layout__main">
        <Header user={user} onMenuClick={() => setIsSidebarOpen((prev) => !prev)} />
        <main className="app-layout__content">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}