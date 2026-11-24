import { useEffect, useRef, useState } from 'react';
import { ChevronDownIcon } from '../../components/icons';

const LANGUAGES = [
  { code: 'uz', label: 'O‘zbekcha' },
  { code: 'ru', label: 'Русский' },
  { code: 'en', label: 'English' },
];

export default function LanguageSelect() {
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(LANGUAGES[0]);
  const rootRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) setIsOpen(false);
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSelect = (language) => {
    setCurrent(language);
    setIsOpen(false);
  };

  return (
    <div className="lang" ref={rootRef}>
      <button
        type="button"
        className="lang__button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span aria-hidden="true">🌐</span>
        <span>{current.label}</span>
        <ChevronDownIcon />
      </button>

      {isOpen && (
        <ul className="lang__menu" role="listbox">
          {LANGUAGES.map((language) => (
            <li key={language.code}>
              <button
                type="button"
                role="option"
                aria-selected={language.code === current.code}
                className={`lang__option ${language.code === current.code ? 'lang__option--active' : ''}`}
                onClick={() => handleSelect(language)}
              >
                {language.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}