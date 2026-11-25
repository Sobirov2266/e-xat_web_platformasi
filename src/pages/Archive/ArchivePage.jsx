import { useMemo, useState } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import { ArchiveIcon } from '../../components/icons';
import { MOCK_ARCHIVE, ARCHIVE_TABS } from '../../data/mockArchive';
import {
  getArchivedInboxLetters,
  getArchivedOutboxLetters,
  getRemovedArchiveIds,
  unarchiveLetter,
} from '../../services/letterArchive';
import './ArchivePage.css';

const PaperclipIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </svg>
);

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-4-4" />
  </svg>
);

const UnarchiveIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 8v13H3V8" />
    <path d="M3 8l9-5 9 5" />
    <path d="M12 3v13" />
    <path d="m8 11 4 4 4-4" />
  </svg>
);

export default function ArchivePage() {
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState('');
  const [archiveVersion, setArchiveVersion] = useState(0);

  const visibleRows = useMemo(() => {
    const query = search.trim().toLowerCase();
    const removedIds = new Set(getRemovedArchiveIds());
    const archivedInbox = getArchivedInboxLetters();
    const archivedOutbox = getArchivedOutboxLetters();
    const combined = [
      ...archivedInbox,
      ...archivedOutbox,
      ...MOCK_ARCHIVE.filter((item) => !removedIds.has(item.id)),
    ];
    return combined.filter((item) => {
      const tabMatch =
        activeTab === 'all' ||
        (activeTab === 'with-attachment' && item.attachment) ||
        (activeTab === 'urgent' && item.urgent);
      const searchMatch =
        !query ||
        item.id.includes(query) ||
        item.sender.toLowerCase().includes(query) ||
        item.subject.toLowerCase().includes(query);
      return tabMatch && searchMatch;
    });
  }, [activeTab, search, archiveVersion]);

  const toggleSelected = (id) => {
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const handleUnarchive = (id) => {
    if (confirm(`#${id} raqamli xatni arxivdan chiqarmoqchimisiz?`)) {
      unarchiveLetter(id);
      setArchiveVersion((current) => current + 1);
      setMessage('Xat arxivdan chiqarildi');
      window.setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleBulkUnarchive = () => {
    if (confirm(`${selected.length} ta xatni arxivdan chiqarmoqchimisiz?`)) {
      selected.forEach(unarchiveLetter);
      setSelected([]);
      setArchiveVersion((current) => current + 1);
      setMessage('Xatlar arxivdan chiqarildi');
      window.setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="archive-page">
      {message && (
        <div className="archive-message" role="status">
          <span>✓</span>
          {message}
        </div>
      )}
      <PageHeader
        Icon={ArchiveIcon}
        title="Arxiv"
        subtitle="Bosh sahifa › Qo'shimcha funksiyalar › Arxiv"
      />

      <section className="archive-card">
        <div className="archive-toolbar">
          <div className="archive-tabs" role="tablist">
            {ARCHIVE_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`archive-tab ${activeTab === tab.id ? 'archive-tab--active' : ''}`}
                onClick={() => {
                  setActiveTab(tab.id);
                  setPage(1);
                }}
              >
                {tab.label}
                <span className="archive-tab__count">{tab.count}</span>
              </button>
            ))}
          </div>

          <div className="archive-tools">
            <label className="archive-search">
              <SearchIcon />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Xat, raqam yoki mavzu qidiring..."
                aria-label="Xatlar ichida qidirish"
              />
            </label>
          </div>
        </div>

        {selected.length > 0 ? (
          <div className="selection-toolbar">
            <strong>{selected.length} ta xat tanlandi</strong>
            <button type="button" onClick={handleBulkUnarchive}>
              <UnarchiveIcon />
              Arxivdan chiqarish
            </button>
            <button type="button" className="selection-toolbar__clear" onClick={() => setSelected([])}>
              × Bekor qilish
            </button>
          </div>
        ) : (
          <div className="table-head">
            <div className="table-head__checkbox">
              <input type="checkbox" checked={false} readOnly aria-label="Xatlarni tanlash" />
            </div>
            <div />
            <div className="table-head__sender">Yuboruvchi tashkilot <span>↕</span></div>
            <div className="table-head__subject">Hujjat mavzusi <span>↕</span></div>
            <div className="table-head__date">Kelgan sana <span>↕</span></div>
            <div className="table-head__archived">Arxivlangan sana <span>↕</span></div>
            <div className="table-head__action" />
          </div>
        )}

        <div className="mail-table">
          {visibleRows.map((item) => {
            const isSelected = selected.includes(item.id);

            return (
              <article
                key={item.id}
                className={`mail-row ${isSelected ? 'mail-row--selected' : ''}`}
              >
                <div className="mail-row__checkbox">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelected(item.id)}
                    aria-label={`${item.id} raqamli xatni tanlash`}
                  />
                </div>
                <div className="mail-row__id">{item.id}</div>
                <div className="mail-row__sender">
                  <span className={`mail-row__initials mail-row__initials--${item.initials.toLowerCase()}`}>
                    {item.initials}
                  </span>
                  <span>{item.sender}</span>
                </div>
                <div className="mail-row__subject">
                  <span>{item.subject}</span>
                  {item.attachment && (
                    <span className="mail-row__attachment" title="Biriktirma mavjud">
                      <PaperclipIcon />
                    </span>
                  )}
                  {item.urgent && <span className="mail-row__urgent">SHOSHILINCH</span>}
                </div>
                <div className="mail-row__date">{item.received}</div>
                <div className="mail-row__archived">{item.archivedDate}</div>
                <div className="mail-row__action">
                  <button
                    type="button"
                    className="mail-row__unarchive"
                    onClick={() => handleUnarchive(item.id)}
                    title="Arxivdan chiqarish"
                  >
                    <UnarchiveIcon />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <div className="archive-pagination">
          <strong>Jami: {visibleRows.length} ta hujjat</strong>
          <div className="archive-pagination__right">
            <label>
              Sahifada:
              <select defaultValue="10">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </label>
            <button type="button" disabled aria-label="Oldingi sahifa">«</button>
            {[1, 2, 3].map((number) => (
              <button
                type="button"
                key={number}
                className={page === number ? 'archive-pagination__page--active' : ''}
                onClick={() => setPage(number)}
              >
                {number}
              </button>
            ))}
            <button type="button" aria-label="Keyingi sahifa">›</button>
            <button type="button" aria-label="Oxirgi sahifa">»</button>
          </div>
        </div>
      </section>
    </div>
  );
}
