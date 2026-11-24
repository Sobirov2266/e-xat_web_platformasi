import { Link } from 'react-router-dom';
import { InboxIcon, SendIcon } from '../../components/icons';
import { MOCK_STATS } from '../../data/mockStats';
import { ROUTES } from '../../routes/paths';
import HeroIllustration from './HeroIllustration';

export default function HeroBanner() {
  return (
    <section className="hero-banner">
      <div className="hero-banner__content">
        <span className="hero-banner__badge">
          <span className="hero-banner__dot" />
          E-XAT
        </span>

        <h2 className="hero-banner__title">Himoyalangan elektron pochta tizimi</h2>

        <p className="hero-banner__text">
          Tashkilotlar o‘rtasida rasmiy hujjatlar va xizmat yozishmalarini xavfsiz va qulay almashish
          imkonini beradi.
        </p>

        <div className="hero-banner__actions">
          <Link to={ROUTES.COMPOSE} className="hero-banner__btn hero-banner__btn--primary">
            <SendIcon size={20} />
            Yangi xat yozish
          </Link>

          <Link to={ROUTES.INBOX} className="hero-banner__btn hero-banner__btn--ghost">
            <InboxIcon size={20} />
            Kiruvchi xatlar
            {MOCK_STATS.unread > 0 && <span className="hero-banner__count">{MOCK_STATS.unread}</span>}
          </Link>
        </div>
      </div>

      <HeroIllustration />
    </section>
  );
}