import { MOCK_EMPLOYEES } from '../../data/mockAttachment';

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export default function ExecutorSelector({ selectedExecutor, onSelectExecutor }) {
  return (
    <section className="attachment-section">
      <div className="attachment-section__header">
        <h3 className="attachment-section__title">ASOSIY IJROCHI</h3>
        <span className="attachment-section__badge attachment-section__badge--mandatory">MAJBURIY</span>
      </div>

      {selectedExecutor ? (
        <div className="executor-card executor-card--selected">
          <span className={`executor-avatar executor-avatar--${selectedExecutor.avatarColor}`}>
            {selectedExecutor.initials}
          </span>
          <div className="executor-info">
            <strong>{selectedExecutor.name}</strong>
            <small>{selectedExecutor.department}</small>
          </div>
          <button
            type="button"
            className="executor-card__remove"
            onClick={() => onSelectExecutor(null)}
            aria-label="Ijrochini o'chirish"
          >
            <CloseIcon />
          </button>
        </div>
      ) : (
        <div className="executor-list">
          {MOCK_EMPLOYEES.map((employee) => (
            <button
              key={employee.id}
              type="button"
              className="executor-card"
              onClick={() => onSelectExecutor(employee)}
            >
              <span className={`executor-avatar executor-avatar--${employee.avatarColor}`}>
                {employee.initials}
              </span>
              <div className="executor-info">
                <strong>{employee.name}</strong>
                <small>{employee.department}</small>
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
