import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageHeader from '../../components/layout/PageHeader';
import { InboxIcon } from '../../components/icons';
import { INBOX_TABS, MOCK_INBOX } from '../../data/mockInbox';
import './InboxPage.css';

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

const ChevronDownIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const STATUS_LABELS = {
  answered: 'Javob berildi',
  new: 'Yangi',
  open: 'O‘qildi',
};

export default function InboxPage() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() =>
    location.state?.inboxTab === 'new' ? 'new' : 'all',
  );
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [page, setPage] = useState(1);

  const visibleRows = useMemo(() => {
    const query = search.trim().toLowerCase();
    return MOCK_INBOX.filter((item) => {
      const tabMatch =
        activeTab === 'all' ||
        (activeTab === 'new' && item.status === 'new') ||
        (activeTab === 'open' && item.status === 'open') ||
        (activeTab === 'overdue' && item.status === 'answered');
      const searchMatch =
        !query ||
        item.id.includes(query) ||
        item.sender.toLowerCase().includes(query) ||
        item.subject.toLowerCase().includes(query);
      return tabMatch && searchMatch;
    });
  }, [activeTab, search]);

  const toggleSelected = (id) => {
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  return (
    <div className="inbox-page">
      <PageHeader
        Icon={InboxIcon}
        title="Kiruvchi xatlar"
        subtitle="Bosh sahifa › Kiruvchi xatlar"
      />

      <section className="inbox-card">
        <div className="inbox-toolbar">
          <div className="inbox-tabs" role="tablist">
            {INBOX_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`inbox-tab ${activeTab === tab.id ? 'inbox-tab--active' : ''}`}
                onClick={() => {
                  setActiveTab(tab.id);
                  setPage(1);
                }}
              >
                {tab.label}
                <span className="inbox-tab__count">{tab.count}</span>
              </button>
            ))}
          </div>

          <div className="inbox-tools">
            <label className="inbox-search">
              <SearchIcon />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Xat, raqam yoki mavzu qidiring..."
                aria-label="Xatlar ichida qidirish"
              />
            </label>

            <div className="inbox-filter">
              <button
                type="button"
                className="inbox-filter__button"
                aria-expanded={filterOpen}
                onClick={() => setFilterOpen((current) => !current)}
              >
                <ChevronDownIcon />
                <span>Filter</span>
              </button>
              {filterOpen && (
                <div className="inbox-filter__menu">
                  <button type="button" onClick={() => setFilterOpen(false)}>Barchasi</button>
                  <button type="button" onClick={() => setFilterOpen(false)}>Ilovali xatlar</button>
                  <button type="button" onClick={() => setFilterOpen(false)}>Muddatli xatlar</button>
                </div>
              )}
            </div>

            <button type="button" className="inbox-refresh" aria-label="So‘rovlarni yangilash">
              ↻
            </button>
          </div>
        </div>

        {selected.length > 0 ? (
          <div className="selection-toolbar">
            <strong>{selected.length} ta xat tanlandi</strong>
            <button type="button">⌁ Biriktirish</button>
            <button type="button">◉ O‘qilgan deb belgilash</button>
            <button type="button">▦ Arxivlash</button>
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
            <div className="table-head__deadline">Javob berish muddati <span>↕</span></div>
            <div className="table-head__status">Holati</div>
            <div className="table-head__action" />
          </div>
        )}

        <div className="mail-table">
          {visibleRows.map((item) => {
            const isSelected = selected.includes(item.id);
            const isUnread = item.status === 'new';

            return (
              <article
                key={item.id}
                className={`mail-row ${isUnread ? 'mail-row--unread' : ''} ${isSelected ? 'mail-row--selected' : ''}`}
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
                <div className={`mail-row__deadline ${item.deadline ? 'mail-row__deadline--set' : ''}`}>
                  {item.deadline || '—'}
                </div>
                <div className="mail-row__status">
                  <span className={`mail-status mail-status--${item.status}`}>
                    <i />
                    {STATUS_LABELS[item.status]}
                  </span>
                </div>
                <div className="mail-row__action">
                  {item.status === 'answered' && <button type="button" className="mail-row__reply">Biriktirish</button>}
                  <button type="button" className="mail-row__more" aria-label="Boshqa amallar">⋮</button>
                </div>
              </article>
            );
          })}
        </div>

        <div className="inbox-pagination">
          <strong>Jami: 24 ta hujjat</strong>
          <div className="inbox-pagination__right">
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
                className={page === number ? 'inbox-pagination__page--active' : ''}
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
