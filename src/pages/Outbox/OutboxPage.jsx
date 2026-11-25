import { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/layout/PageHeader';
import { SendIcon } from '../../components/icons';
import { OUTBOX_TABS, MOCK_OUTBOX } from '../../data/mockOutbox';
import { ROUTES } from '../../routes/paths';
import { archiveOutboxLetters, getArchivedOutboxLetters } from '../../services/letterArchive';
import '../Inbox/InboxPage.css';
import './OutboxPage.css';

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

const STATUS_LABELS = {
  answered: 'Javob berilgan',
  sent: 'Yuborilgan',
  read: 'O‘qildi',
};

export default function OutboxPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [archiveMessage, setArchiveMessage] = useState('');

  const visibleRows = useMemo(() => {
    const query = search.trim().toLowerCase();
    const archivedIds = new Set(getArchivedOutboxLetters().map((item) => item.id));
    return MOCK_OUTBOX.filter((item) => {
      if (archivedIds.has(item.id)) return false;
      const tabMatch =
        activeTab === 'all' ||
        (activeTab === 'read' && item.status === 'read') ||
        (activeTab === 'answered' && item.status === 'answered');
      const searchMatch =
        !query ||
        item.id.includes(query) ||
        item.recipient.toLowerCase().includes(query) ||
        item.subject.toLowerCase().includes(query);
      return tabMatch && searchMatch;
    });
  }, [activeTab, search]);

  const toggleSelected = (id) => {
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const handleArchiveSelected = () => {
    const letters = MOCK_OUTBOX.filter((item) => selected.includes(item.id));
    archiveOutboxLetters(letters);
    setSelected([]);
    setArchiveMessage(`${letters.length} ta xat arxivlandi`);
    window.setTimeout(() => setArchiveMessage(''), 3000);
  };

  const totalPages = Math.max(1, Math.ceil(visibleRows.length / pageSize));
  const pagedRows = visibleRows.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="inbox-page outbox-page">
      {archiveMessage && (
        <div className="inbox-archive-toast" role="status">
          <span>✓</span>
          {archiveMessage}
        </div>
      )}
      {location.state?.sentSuccess && (
        <div className="outbox-success" role="status">
          <span className="outbox-success__icon">✓</span>
          <span>
            <strong>Xat muvaffaqiyatli yuborildi</strong>
            <small>Chiquvchi xatlar ro‘yxatiga qo‘shildi</small>
          </span>
        </div>
      )}
      <div className="outbox-header">
        <PageHeader
          Icon={SendIcon}
          title="Chiquvchi xatlar"
          subtitle="Bosh sahifa › Chiquvchi xatlar"
        />
        <Link to={ROUTES.COMPOSE} className="outbox-compose">
          <span aria-hidden="true">+</span>
          Yangi xat yozish
        </Link>
      </div>

      <section className="inbox-card">
        <div className="inbox-toolbar">
          <div className="inbox-tabs" role="tablist">
            {OUTBOX_TABS.map((tab) => (
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
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Xat, raqam yoki mavzu qidiring..."
                aria-label="Xatlar ichida qidirish"
              />
            </label>

          </div>
        </div>

        {selected.length > 0 ? (
          <div className="selection-toolbar">
            <strong>{selected.length} ta xat tanlandi</strong>
            <button type="button">◉ Yuborilgan deb belgilash</button>
            <button type="button" onClick={handleArchiveSelected}>▦ Arxivlash</button>
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
            <div className="table-head__sender">Qabul qiluvchi tashkilot <span>↕</span></div>
            <div className="table-head__subject">Hujjat mavzusi <span>↕</span></div>
            <div className="table-head__date">Yuborilgan sana <span>↕</span></div>
            <div className="table-head__read">Xat o‘qilgan vaqt <span>↕</span></div>
            <div className="table-head__deadline">Javob berish muddati <span>↕</span></div>
            <div className="table-head__status">Holati</div>
            <div className="table-head__action" />
          </div>
        )}

        <div className="mail-table">
          {pagedRows.map((item) => (
            <article
              key={item.id}
              className={`mail-row ${item.status === 'sent' ? 'mail-row--unread' : ''} ${selected.includes(item.id) ? 'mail-row--selected' : ''}`}
              role="link"
              tabIndex={0}
              onClick={() => navigate(`/outbox/${item.id}`)}
              onKeyDown={(event) => {
                if (event.target !== event.currentTarget) return;
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  navigate(`/outbox/${item.id}`);
                }
              }}
            >
              <div className="mail-row__checkbox">
                <input
                  type="checkbox"
                  checked={selected.includes(item.id)}
                  onChange={() => toggleSelected(item.id)}
                  onClick={(event) => event.stopPropagation()}
                  aria-label={`${item.id} raqamli xatni tanlash`}
                />
              </div>
              <div className="mail-row__id">{item.id}</div>
              <div className="mail-row__sender">
                <span className={`mail-row__initials mail-row__initials--${item.initials.toLowerCase()}`}>
                  {item.initials}
                </span>
                <span>{item.recipient}</span>
              </div>
              <div className="mail-row__subject">
                <span>{item.subject}</span>
                {item.attachment && (
                  <span className="mail-row__attachment" title="Biriktirma mavjud">
                    <PaperclipIcon />
                  </span>
                )}
              </div>
              <div className="mail-row__date">{item.sent}</div>
              <div className={`mail-row__read ${item.readAt ? 'mail-row__read--set' : ''}`}>
                {item.readAt || '—'}
              </div>
              <div className={`mail-row__deadline ${item.deadline ? 'mail-row__deadline--set' : ''}`}>
                {item.deadline || '—'}
              </div>
              <div className="mail-row__status">
                <span className={`mail-status mail-status--${item.status}`}>
                  <i />
                  {STATUS_LABELS[item.status]}
                </span>
              </div>
              <div className="mail-row__action" />
            </article>
          ))}
        </div>

        <div className="inbox-pagination">
          <strong>Jami: {visibleRows.length} ta hujjat</strong>
          <div className="inbox-pagination__right">
            <label>
              Sahifada:
              <select
                value={pageSize}
                onChange={(event) => {
                  setPageSize(Number(event.target.value));
                  setPage(1);
                }}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </label>
            <button type="button" disabled={page === 1} onClick={() => setPage(1)} aria-label="Birinchi sahifa">«</button>
            <button type="button" disabled={page === 1} onClick={() => setPage((current) => Math.max(1, current - 1))} aria-label="Oldingi sahifa">‹</button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
              <button
                type="button"
                key={number}
                className={page === number ? 'inbox-pagination__page--active' : ''}
                onClick={() => setPage(number)}
              >
                {number}
              </button>
            ))}
            <button type="button" disabled={page === totalPages} onClick={() => setPage((current) => Math.min(totalPages, current + 1))} aria-label="Keyingi sahifa">›</button>
            <button type="button" disabled={page === totalPages} onClick={() => setPage(totalPages)} aria-label="Oxirgi sahifa">»</button>
          </div>
        </div>
      </section>
    </div>
  );
}
