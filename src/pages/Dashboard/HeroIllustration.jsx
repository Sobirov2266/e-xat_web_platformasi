import { ShieldCheckIcon } from '../../components/icons';

export default function HeroIllustration() {
  return (
    <div className="hero-art" aria-hidden="true">
      <div className="hero-art__stage">
        <span className="hero-art__ring hero-art__ring--outer" />
        <span className="hero-art__ring hero-art__ring--middle" />
        <span className="hero-art__ring hero-art__ring--inner" />

        <svg className="hero-art__shield" viewBox="0 0 130 158">
          <defs>
            <linearGradient id="hero-shield-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#3cc3fb" />
              <stop offset="1" stopColor="#1273e6" />
            </linearGradient>
          </defs>
          <path
            d="M65 0C48 11 24 17 0 19v58c0 40 27 68 65 81 38-13 65-41 65-81V19C106 17 82 11 65 0z"
            fill="url(#hero-shield-gradient)"
          />
          <polyline
            points="35,76 55,98 97,54"
            fill="none"
            stroke="#fff"
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span className="hero-art__dot hero-art__dot--a" />
        <span className="hero-art__dot hero-art__dot--b" />
        <span className="hero-art__dot hero-art__dot--c" />
      </div>

      <div className="hero-art__badge">
        <span className="hero-art__badge-icon">
          <ShieldCheckIcon size={22} />
        </span>
        Xavfsiz yozishmalar
      </div>
    </div>
  );
}