import './PageHeader.css';

export default function PageHeader({ Icon, title, subtitle }) {
  return (
    <div className="page-header">
      <span className="page-header__icon">
        <Icon size={26} />
      </span>
      <div>
        <h1 className="page-header__title">{title}</h1>
        {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
      </div>
    </div>
  );
}