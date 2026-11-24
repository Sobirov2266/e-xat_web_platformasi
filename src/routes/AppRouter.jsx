import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ChatIcon, SendIcon } from '../components/icons';
import MainLayout from '../components/layout/MainLayout';
import LoginPage from '../pages/Login/LoginPage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import InboxPage from '../pages/Inbox/InboxPage';
import PlaceholderPage from '../pages/Placeholder/PlaceholderPage';
import ProtectedRoute from './ProtectedRoute';
import { ROUTES } from './paths';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />

        {/* Tizimga kirgandan keyingi hamma sahifalar MainLayout ichida */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
            <Route path={ROUTES.COMPOSE} element={<PlaceholderPage title="Yangi xat yozish" Icon={SendIcon} />} />
            <Route path={ROUTES.INBOX} element={<InboxPage />} />
            <Route path={ROUTES.OUTBOX} element={<PlaceholderPage title="Chiquvchi xatlar" Icon={SendIcon} />} />
            <Route path={ROUTES.CHAT} element={<PlaceholderPage title="Muloqot" Icon={ChatIcon} />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
      </Routes>
    </BrowserRouter>
  );
}