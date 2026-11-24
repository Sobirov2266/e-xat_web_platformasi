import { MOCK_STATS } from '../../data/mockStats';
import { getUserDisplay } from '../../utils/user';
import { BellIcon, ChevronDownIcon, MenuIcon } from '../icons';
import './Header.css';

export default function Header({ user, onMenuClick }) {
  const { shortName, initials, department } = getUserDisplay(user);
  const notifications = MOCK_STATS.notifications;

  return (
    <header className="header">
      <button type="button" className="header__menu" aria-label="Menyuni ochish yoki yopish" onClick={onMenuClick}>
        <MenuIcon size={18} />
      </button>

      <div className="header__actions">
        <button type="button" className="header__bell" aria-label="Bildirishnomalar">
          <BellIcon size={20} />
          {notifications > 0 && <span className="header__bell-badge">{notifications}</span>}
        </button>

        <button type="button" className="header__user">
          <span className="header__avatar">{initials}</span>
          <span className="header__user-info">
            <strong>{shortName}</strong>
            <small>{department}</small>
          </span>
          <ChevronDownIcon size={14} />
        </button>
      </div>
    </header>
  );
}