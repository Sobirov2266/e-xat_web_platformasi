import { useState } from 'react';
import { MOCK_EMPLOYEES } from '../../data/mockAttachment';

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-4-4" />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export default function AdditionalEmployeesSelector({ selectedEmployees, onSelectEmployees }) {
  const [search, setSearch] = useState('');

  const toggleEmployee = (employee) => {
    const isSelected = selectedEmployees.some((e) => e.id === employee.id);
    if (isSelected) {
      onSelectEmployees(selectedEmployees.filter((e) => e.id !== employee.id));
    } else {
      onSelectEmployees([...selectedEmployees, employee]);
    }
  };

  const filteredEmployees = MOCK_EMPLOYEES.filter((employee) => {
    const query = search.trim().toLowerCase();
    return (
      !query ||
      employee.name.toLowerCase().includes(query) ||
      employee.department.toLowerCase().includes(query)
    );
  });

  const availableEmployees = filteredEmployees.filter(
    (employee) => !selectedEmployees.some((e) => e.id === employee.id)
  );

  return (
    <section className="attachment-section">
      <div className="attachment-section__header">
        <h3 className="attachment-section__title">QO'SHIMCHA HODIMLAR</h3>
        {selectedEmployees.length > 0 && (
          <span className="attachment-section__badge">{selectedEmployees.length} TA</span>
        )}
      </div>

      <label className="employee-search">
        <SearchIcon />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Hodimlarni qidirish..."
        />
      </label>

      {selectedEmployees.length > 0 && (
        <div className="selected-employees">
          {selectedEmployees.map((employee) => (
            <div key={employee.id} className="executor-card executor-card--compact">
              <span className={`executor-avatar executor-avatar--${employee.avatarColor}`}>
                {employee.initials}
              </span>
              <div className="executor-info">
                <strong>{employee.name}</strong>
                <small>{employee.department}</small>
              </div>
              <button
                type="button"
                className="executor-card__remove"
                onClick={() => toggleEmployee(employee)}
                aria-label="Hodimni o'chirish"
              >
                <CloseIcon />
              </button>
            </div>
          ))}
        </div>
      )}

      {availableEmployees.length > 0 && (
        <div className="executor-list executor-list--compact">
          {availableEmployees.map((employee) => (
            <button
              key={employee.id}
              type="button"
              className="executor-card executor-card--compact"
              onClick={() => toggleEmployee(employee)}
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
