import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import exatIcon from '../../assets/images/exat-icon.png';
import { NAV_ITEMS } from '../../constants/navigation';
import { ChevronDownIcon, LogoutIcon } from '../icons';
import './Sidebar.css';

const getLinkClass = ({ isActive }) => `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`;

const SquareIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
  </svg>
);

export default function Sidebar({ onLogout, onNavigate }) {
  const [openGroupId, setOpenGroupId] = useState(null);

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <img className="sidebar__brand-icon" src={exatIcon} alt="" />
        <div className="sidebar__brand-text">
          <span className="sidebar__brand-name">E-XAT</span>
          <span className="sidebar__brand-slogan">Himoyalangan elektron pochta tizimi</span>
        </div>
      </div>

      <nav className="sidebar__nav">
        {NAV_ITEMS.map(({ id, label, to, Icon, badge, children }) => {
          if (children) {
            const isOpen = openGroupId === id;

            return (
              <div key={id}>
                <button
                  type="button"
                  className="sidebar__link"
                  aria-expanded={isOpen}
                  onClick={() => setOpenGroupId(isOpen ? null : id)}
                >
                  <Icon size={18} />
                  <span className="sidebar__label">{label}</span>
                  <ChevronDownIcon className={`sidebar__chevron ${isOpen ? 'sidebar__chevron--open' : ''}`} />
                </button>

                {isOpen && children.length > 0 && (
                  <div className="sidebar__sub">
                    {children.map((child) => (
                      <NavLink key={child.id} to={child.to} className={getLinkClass} onClick={onNavigate}>
                        <SquareIcon />
                        <span className="sidebar__label">{child.label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <NavLink key={id} to={to} className={getLinkClass} onClick={onNavigate}>
              <Icon size={18} />
              <span className="sidebar__label">{label}</span>
              {badge > 0 && <span className="sidebar__badge">{badge}</span>}
            </NavLink>
          );
        })}
      </nav>

      <button type="button" className="sidebar__logout" onClick={onLogout}>
        <LogoutIcon size={18} />
        Chiqish
      </button>
    </aside>
  );
}