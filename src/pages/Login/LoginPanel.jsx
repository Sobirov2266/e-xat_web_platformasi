import exatLogo from '../../assets/images/exat-logo.png';
import { KeyIcon } from '../../components/icons';
import { CALL_CENTER_PHONE, TECH_SUPPORT_URL } from '../../constants/links';
import LanguageSelect from './LanguageSelect';

export default function LoginPanel({ onKeyLogin }) {
  return (
    <section className="panel">
      <div className="panel__top">
        <LanguageSelect />
      </div>

      <div className="panel__center">
        <div className="login-card">
          <img
            className="login-card__logo"
            src={exatLogo}
            alt="E-XAT — Himoyalangan elektron pochta tizimi"
          />

          <div className="login-card__key" aria-hidden="true">
            <KeyIcon />
          </div>

          <h2 className="login-card__title">Tizimga kirish</h2>
          <p className="login-card__subtitle">Davom etish uchun kalitingizni ko‘rsating.</p>

          <button type="button" className="btn-login" onClick={onKeyLogin}>
            <span aria-hidden="true">🔑</span>
            Kalit bilan kirish
          </button>

          <p className="login-card__help">
            Kalit bilan muammo bormi?{' '}
            <a href={TECH_SUPPORT_URL} target="_blank" rel="noopener noreferrer">
              Texnik yordam →
            </a>
          </p>
        </div>
      </div>

      <footer className="panel__footer">
        <span className="panel__copyright">
          © 2026 &nbsp;<strong>UNICON.UZ</strong>
        </span>
        <span>
          <span aria-hidden="true">📞</span> Yagona koll-markaz:{' '}
          <a href={`tel:${CALL_CENTER_PHONE.replace(/\s/g, '')}`}>
            <strong>{CALL_CENTER_PHONE}</strong>
          </a>
        </span>
      </footer>
    </section>
  );
}