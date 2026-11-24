import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import LoginPage from '../pages/Login/LoginPage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import InboxPage from '../pages/Inbox/InboxPage';
import OutboxPage from '../pages/Outbox/OutboxPage';
import ComposePage from '../pages/Compose/ComposePage';
import ChatPage from '../pages/Chat/ChatPage';
import AttachmentPage from '../pages/Attachment/AttachmentPage';
import OrganizationPage from '../pages/Organization/OrganizationPage';
import ArchivePage from '../pages/Archive/ArchivePage';
import ProtectedRoute from './ProtectedRoute';
import { ROUTES } from './paths';

const Placeholder = ({ title }) => (
  <div style={{ padding: '40px', textAlign: 'center' }}>
    <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>{title}</h2>
    <p style={{ color: '#64748b' }}>Bu sahifa tez orada tayyor bo'ladi</p>
  </div>
);

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
            <Route path={ROUTES.CHAT} element={<ChatPage />} />
            <Route path={ROUTES.ATTACHMENT} element={<AttachmentPage />} />
            <Route path={ROUTES.ORGANIZATION} element={<OrganizationPage />} />
            <Route path={ROUTES.ARCHIVE} element={<ArchivePage />} />
            <Route path={ROUTES.REPORT} element={<Placeholder title="Hisobot" />} />
            <Route path={ROUTES.SETTINGS} element={<Placeholder title="Sozlamalar" />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
      </Routes>
    </BrowserRouter>
  );
}