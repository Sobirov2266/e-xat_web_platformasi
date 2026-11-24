import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_KEYS } from '../../data/mockKeys';
import { login } from '../../services/auth';
import { ROUTES } from '../../routes/paths';
import HeroSection from './HeroSection';
import LoginPanel from './LoginPanel';
import KeySelectModal from './KeySelectModal';
import './LoginPage.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const handleSubmit = (selectedKey) => {
    login(selectedKey);
    navigate(ROUTES.DASHBOARD, { replace: true });
  };

  return (
    <main className="login">
      <HeroSection />
      <LoginPanel onKeyLogin={() => setIsModalOpen(true)} />

      {isModalOpen && (
        <KeySelectModal keys={MOCK_KEYS} onClose={closeModal} onSubmit={handleSubmit} />
      )}
    </main>
  );
}