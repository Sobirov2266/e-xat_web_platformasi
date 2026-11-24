import { useState } from 'react';
import Modal from '../../components/ui/Modal';
import { KeyIcon } from '../../components/icons';

export default function KeySelectModal({ keys, onClose, onSubmit }) {
  const [selectedId, setSelectedId] = useState(null);
  const selectedKey = keys.find((key) => key.id === selectedId);

  return (
    <Modal
      title="Kalitni tanlang"
      subtitle="Tizimga kirish uchun shaxsiy kalitingizni tanlang."
      onClose={onClose}
      footer={
        <>
          <button type="button" className="modal__btn modal__btn--ghost" onClick={onClose}>
            Bekor qilish
          </button>
          <button
            type="button"
            className="modal__btn modal__btn--primary"
            disabled={!selectedKey}
            onClick={() => onSubmit(selectedKey)}
          >
            Kirish
          </button>
        </>
      }
    >
      <ul className="key-list" role="radiogroup">
        {keys.map((key) => {
          const isActive = key.id === selectedId;

          return (
            <li key={key.id}>
              <button
                type="button"
                role="radio"
                aria-checked={isActive}
                className={`key-item ${isActive ? 'key-item--active' : ''}`}
                onClick={() => setSelectedId(key.id)}
              >
                <span className="key-item__icon">
                  <KeyIcon width={28} />
                </span>
                <span className="key-item__info">
                  <span className="key-item__name">{key.fullName}</span>
                  <span className="key-item__meta">
                    {key.organization} · Amal qilish muddati: {key.validTo}
                  </span>
                </span>
                <span className="key-item__radio" />
              </button>
            </li>
          );
        })}
      </ul>
    </Modal>
  );
}