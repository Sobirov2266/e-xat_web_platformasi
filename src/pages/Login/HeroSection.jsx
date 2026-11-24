import uniconLogo from '../../assets/images/unicon-logo.png';
import exatIcon from '../../assets/images/exat-icon.png';
import { DocumentIcon, ShieldCheckIcon, UsersIcon } from '../../components/icons';
import { UNICON_URL } from '../../constants/links';

const FEATURES = [
  { id: 'secure', label: 'Xavfsiz yozishmalar', Icon: ShieldCheckIcon },
  { id: 'documents', label: 'Rasmiy hujjat almashinuvi', Icon: DocumentIcon },
  { id: 'collaboration', label: 'Tashkilotlararo hamkorlik', Icon: UsersIcon },
];

export default function HeroSection() {
  return (
    <section className="hero">
      <img className="hero__logo" src={uniconLogo} alt="UNICON.UZ" />

      <div className="hero__content">
        <span className="hero__badge">
          <img src={exatIcon} alt="" />
          E-XAT
        </span>

        <h1 className="hero__title">
          Himoyalangan <span className="hero__title-accent">elektron pochta</span> tizimi
        </h1>

        <p className="hero__description">
          Tashkilotlar o‘rtasida rasmiy hujjat va xizmat yozishmalarini xavfsiz, tezkor va qulay
          almashish uchun.
        </p>

        <ul className="hero__features">
          {FEATURES.map(({ id, label, Icon }) => (
            <li key={id} className="hero__feature">
              <Icon size={24} />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>

      <aside className="developer">
        <div className="developer__brand">
          <span className="developer__label">Ishlab chiquvchi</span>
          <img className="developer__logo" src={uniconLogo} alt="UNICON.UZ" />
        </div>

        <p className="developer__text">
          E-XAT tizimi UNICON.UZ tomonidan davlat va ta’lim tashkilotlari uchun ishlab chiqilgan.
        </p>

        <a className="developer__link" href={UNICON_URL} target="_blank" rel="noopener noreferrer">
          unicon.uz saytiga o‘tish <span aria-hidden="true">↗</span>
        </a>
      </aside>
    </section>
  );
}