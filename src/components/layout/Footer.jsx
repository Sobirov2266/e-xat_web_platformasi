import uniconLogo from '../../assets/images/unicon-logo.png';
import { CALL_CENTER_PHONE } from '../../constants/links';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__left">
        <span>© 2026</span>
        <span className="footer__divider" />
        <img className="footer__logo" src={uniconLogo} alt="UNICON.UZ" />
        <span className="footer__divider" />
        <span>E-XAT Himoyalangan elektron pochta tizimi</span>
      </div>

      <span>
        Yagona koll-markaz: <strong>{CALL_CENTER_PHONE}</strong>
      </span>
    </footer>
  );
}