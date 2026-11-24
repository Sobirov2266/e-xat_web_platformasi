import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';
import { ROUTES } from './paths';

export default function ProtectedRoute() {
  return isAuthenticated() ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />;
}