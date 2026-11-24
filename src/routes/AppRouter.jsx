import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ChatIcon } from '../components/icons';
import MainLayout from '../components/layout/MainLayout';
import LoginPage from '../pages/Login/LoginPage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import InboxPage from '../pages/Inbox/InboxPage';
import OutboxPage from '../pages/Outbox/OutboxPage';
import ComposePage from '../pages/Compose/ComposePage';
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
            <Route path={ROUTES.COMPOSE} element={<ComposePage />} />
            <Route path={ROUTES.INBOX} element={<InboxPage />} />
            <Route path={ROUTES.OUTBOX} element={<OutboxPage />} />
            <Route path={ROUTES.CHAT} element={<PlaceholderPage title="Muloqot" Icon={ChatIcon} />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
      </Routes>
    </BrowserRouter>
  );
}