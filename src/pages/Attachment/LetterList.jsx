import { useState } from 'react';
import { MOCK_LETTERS } from '../../data/mockAttachment';

export default function LetterList({ selectedLetter, onSelectLetter }) {
  const [filter, setFilter] = useState('all');

  const filteredLetters = MOCK_LETTERS.filter((letter) => {
    if (filter === 'all') return true;
    if (filter === 'assigned') return letter.assignedTo && letter.assignedTo.length > 0;
    if (filter === 'unassigned') return !letter.assignedTo || letter.assignedTo.length === 0;
    return true;
  });

  return (
    <aside className="letter-list-sidebar">
      <div className="letter-list-sidebar__header">
        <h3 className="letter-list-sidebar__title">KELGAN XATLAR</h3>
        <span className="letter-list-sidebar__count">{MOCK_LETTERS.length}</span>
      </div>

      <div className="letter-list-sidebar__tabs">
        <button
          type="button"
          className={`letter-list-tab ${filter === 'all' ? 'letter-list-tab--active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Barchasi
        </button>
        <button
          type="button"
          className={`letter-list-tab ${filter === 'assigned' ? 'letter-list-tab--active' : ''}`}
          onClick={() => setFilter('assigned')}
        >
          Biriktirilgan
        </button>
        <button
          type="button"
          className={`letter-list-tab ${filter === 'unassigned' ? 'letter-list-tab--active' : ''}`}
          onClick={() => setFilter('unassigned')}
        >
          Biriktirilmagan
        </button>
      </div>

      <div className="letter-list-sidebar__items">
        {filteredLetters.map((letter) => {
          const isSelected = selectedLetter?.id === letter.id;
          const isAssigned = letter.assignedTo && letter.assignedTo.length > 0;

          return (
            <button
              key={letter.id}
              type="button"
              className={`letter-list-item ${isSelected ? 'letter-list-item--selected' : ''}`}
              onClick={() => onSelectLetter(letter)}
            >
              <div className="letter-list-item__header">
                <span className="letter-list-item__id">#{letter.id}</span>
                <span className="letter-list-item__date">{letter.date}</span>
              </div>
              <div className="letter-list-item__title">{letter.title}</div>
              <div className="letter-list-item__meta">
                <span>{letter.organization}</span>
              </div>

              {isAssigned ? (
                <div className="letter-list-item__assignees">
                  {letter.assignedTo.map((assignee) => (
                    <div key={assignee.id} className="assignee-item">
                      <span className={`assignee-avatar assignee-avatar--${assignee.avatarColor}`}>
                        {assignee.initials}
                      </span>
                      <span className="assignee-name">{assignee.name}</span>
                      {assignee.isMain && <span className="assignee-badge">Asosiy</span>}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="letter-list-item__unassigned">
                  <span className="unassigned-badge">Biriktirilmagan</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
