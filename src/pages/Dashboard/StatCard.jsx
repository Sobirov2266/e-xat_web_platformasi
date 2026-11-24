import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '../../components/icons';

export default function StatCard({ label, value, Icon, color, to, state }) {
  return (
    <Link to={to} state={state} className={`stat-card stat-card--${color}`}>
      <span className="stat-card__icon">
        <Icon size={30} />
      </span>

      <span className="stat-card__info">
        <span className="stat-card__label">{label}</span>
        <span className="stat-card__value">{value}</span>
      </span>

      <span className="stat-card__arrow">
        <ChevronRightIcon />
      </span>
    </Link>
  );
}