import { useEffect, useMemo, useRef, useState } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import { ChatIcon, ChevronRightIcon, SendIcon, ShieldCheckIcon } from '../../components/icons';
import { MOCK_CHATS, MOCK_MESSAGES } from '../../data/mockChats';
import './ChatPage.css';

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-4-4" />
  </svg>
);

const LetterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MoreIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <circle cx="5" cy="12" r="1.7" />
    <circle cx="12" cy="12" r="1.7" />
    <circle cx="19" cy="12" r="1.7" />
  </svg>
);

const QUICK_REPLIES = [
  'Qabul qilindi',
  'Ko‘rib chiqilmoqda',
  'Qo‘shimcha ma’lumot kerak',
  'Rahmat',
];

const getInitials = (name = '') =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

export default function ChatPage() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [activeChat, setActiveChat] = useState(MOCK_CHATS[0]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const conversationBodyRef = useRef(null);

  const unreadCount = useMemo(
    () => MOCK_CHATS.reduce((total, chat) => total + chat.unread, 0),
    [],
  );

  const chats = useMemo(() => {
    const query = search.trim().toLowerCase();
    return MOCK_CHATS.filter((chat) => {
      const tabMatch = activeTab === 'all' || chat.unread > 0;
      const searchMatch = !query || chat.name.toLowerCase().includes(query);
      return tabMatch && searchMatch;
    });
  }, [activeTab, search]);

  useEffect(() => {
    const body = conversationBodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [activeChat.id, messages]);

  const handleSend = () => {
    const text = message.trim();
    if (!text) return;

    setMessages((current) => [
      ...current,
      {
        id: current.length + 1,
        outgoing: true,
        time: new Date().toLocaleTimeString('uz-UZ', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        text,
      },
    ]);
    setMessage('');
  };

  return (
    <div className="chat-page">
      <PageHeader
        Icon={ChatIcon}
        title="Muloqot"
        subtitle="Bosh sahifa › Muloqot"
      />

      <section className="chat-workspace" aria-label="Muloqot ish maydoni">
        <aside className="chat-directory">
          <div className="chat-directory__top">
            <div className="chat-directory__heading">
              <h2>Muloqotlar</h2>
              <span>{MOCK_CHATS.length}</span>
            </div>

            <label className="chat-search">
              <SearchIcon />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Tashkilot nomi bo‘yicha qidirish"
                aria-label="Tashkilot nomi bo‘yicha qidirish"
              />
            </label>

            <div className="chat-directory__tabs" aria-label="Muloqotlar filtri">
              <button
                type="button"
                className={activeTab === 'all' ? 'is-active' : ''}
                aria-pressed={activeTab === 'all'}
                onClick={() => setActiveTab('all')}
              >
                Barchasi <span>{MOCK_CHATS.length}</span>
              </button>
              <button
                type="button"
                className={activeTab === 'unread' ? 'is-active' : ''}
                aria-pressed={activeTab === 'unread'}
                onClick={() => setActiveTab('unread')}
              >
                O‘qilmagan <span>{unreadCount}</span>
              </button>
            </div>
          </div>

          <div className="chat-directory__list">
            {chats.length > 0 ? (
              chats.map((chat) => (
                <button
                  type="button"
                  key={chat.id}
                  className={`chat-list__item ${activeChat.id === chat.id ? 'chat-list__item--active' : ''}`}
                  aria-pressed={activeChat.id === chat.id}
                  onClick={() => setActiveChat(chat)}
                >
                  <span className={`chat-list__avatar chat-list__avatar--${chat.initials.toLowerCase()}`}>
                    {chat.initials}
                  </span>
                  <span className="chat-list__info">
                    <strong>{chat.name}</strong>
                    <small>{chat.preview}</small>
                  </span>
                  <span className="chat-list__meta">
                    <b>{chat.time || chat.date.replace('.2026', '')}</b>
                    <span className="chat-list__badges">
                      {chat.urgent && <i aria-label="Muhim xat">!</i>}
                      {chat.unread > 0 && <span>{chat.unread}</span>}
                    </span>
                  </span>
                </button>
              ))
            ) : (
              <div className="chat-directory__empty">
                <SearchIcon />
                <strong>Muloqot topilmadi</strong>
                <span>Qidiruv shartlarini o‘zgartiring.</span>
                <button type="button" onClick={() => { setSearch(''); setActiveTab('all'); }}>
                  Filtrlarni tozalash
                </button>
              </div>
            )}
          </div>
        </aside>

        <section className="chat-conversation" aria-label="Suhbat">
          <header className="chat-conversation__header">
            <span className={`chat-conversation__avatar chat-list__avatar--${activeChat.initials.toLowerCase()}`}>
              {activeChat.initials}
            </span>
            <div className="chat-conversation__identity">
              <h2>{activeChat.name}</h2>
              <p><i /> Onlayn faoliyat: 14:32</p>
            </div>
            <div className="chat-conversation__actions">
              <span className="chat-conversation__secure">
                <ShieldCheckIcon size={15} />
                <span>DSP himoyalangan</span>
              </span>
              <button type="button" aria-label="Boshqa amallar">
                <MoreIcon />
              </button>
            </div>
          </header>

          <div className="chat-conversation__body" ref={conversationBodyRef}>
            <div className="chat-thread">
              {messages.map((item) => {
                if (item.letter) {
                  return (
                    <div className="chat-letter" key={item.id}>
                      <span className="chat-letter__icon"><LetterIcon /></span>
                      <div className="chat-letter__copy">
                        <small>BOG‘LIQ XAT · {item.letter.id}</small>
                        <strong>{item.letter.title}</strong>
                      </div>
                      <span className="chat-letter__status"><i /> {item.letter.status}</span>
                      <span className="chat-letter__link">
                        Xatini ochish <ChevronRightIcon size={14} />
                      </span>
                    </div>
                  );
                }

                if (item.date) {
                  return (
                    <div className="chat-date" key={item.id}>
                      <span>{item.date}</span>
                    </div>
                  );
                }

                if (item.type === 'new') {
                  return (
                    <div className="chat-new" key={item.id}>
                      <span>Yangi xabarlar</span>
                    </div>
                  );
                }

                return (
                  <article
                    key={item.id}
                    className={`chat-message ${item.outgoing ? 'chat-message--outgoing' : 'chat-message--incoming'}`}
                  >
                    {!item.outgoing && (
                      <span className="chat-message__avatar">{getInitials(item.author)}</span>
                    )}
                    <div className="chat-message__content">
                      {(item.author || item.outgoing) && (
                        <div className="chat-message__author">
                          <strong>{item.outgoing ? 'Siz' : item.author}</strong>
                          <span>· {item.outgoing ? 'Devonxona bo‘limi' : item.authorRole}</span>
                        </div>
                      )}
                      <div className="chat-message__bubble">
                        {item.text.split('\n').map((line, index) => (
                          <span key={`${item.id}-${index}`}>{line}</span>
                        ))}
                        <small>
                          {item.time}
                          {item.outgoing && <span aria-label="O‘qildi"> ✓✓</span>}
                        </small>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <footer className="chat-composer">
            <div className="chat-composer__quick">
              <span className="chat-composer__quick-label">Tez javob</span>
              {QUICK_REPLIES.map((reply) => (
                <button type="button" key={reply} onClick={() => setMessage(reply)}>
                  {reply}
                </button>
              ))}
            </div>
            <div className="chat-composer__field">
              <input
                value={message}
                onChange={(event) => setMessage(event.target.value.slice(0, 1000))}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') handleSend();
                }}
                placeholder="Xabar yozing..."
                aria-label="Xabar matni"
              />
              <span className="chat-composer__counter">{message.length} / 1000</span>
              <button type="button" onClick={handleSend} disabled={!message.trim()}>
                <SendIcon size={16} />
                Yuborish
              </button>
            </div>
          </footer>
        </section>

        <aside className="chat-details" aria-label="Tashkilot tafsilotlari">
          <div className="chat-details__profile">
            <span className={`chat-details__avatar chat-list__avatar--${activeChat.initials.toLowerCase()}`}>
              {activeChat.initials}
            </span>
            <h2>{activeChat.name}</h2>
            <span className="chat-details__stir">STIR: <b>203456789</b></span>
          </div>

          <section className="chat-details__section">
            <h3>Aloqa shaxslari</h3>
            <div className="chat-contact">
              <span className="chat-contact__avatar">UN</span>
              <div>
                <strong>Usmonova Nilufar</strong>
                <small>Devonxona bo‘limi</small>
              </div>
            </div>
            <div className="chat-contact">
              <span className="chat-contact__avatar chat-contact__avatar--blue">KJ</span>
              <div>
                <strong>Karimov Jahongir</strong>
                <small>Axborot texnologiyalari</small>
              </div>
            </div>
          </section>

          <a className="chat-details__phone" href="tel:+998712021100">
            <span className="chat-details__phone-icon"><PhoneIcon /></span>
            <span>
              <small>Aloqa telefoni</small>
              <strong>+998 71 202 11 00</strong>
            </span>
          </a>

          <section className="chat-details__section chat-details__letters">
            <h3>Bog‘liq xatlar</h3>
            <button type="button">
              <span className="chat-details__letter-top">
                <strong>#7344</strong>
                <span><i /> Javob berildi</span>
              </span>
              <span className="chat-details__letter-title">Oliy ta’lim sifatini oshirish...</span>
              <ChevronRightIcon size={15} />
            </button>
            <button type="button">
              <span className="chat-details__letter-top">
                <strong>#7341</strong>
                <span className="chat-details__letter-new"><i /> Yangi</span>
              </span>
              <span className="chat-details__letter-title">Universitet faoliyatiga oid...</span>
              <ChevronRightIcon size={15} />
            </button>
          </section>

          <div className="chat-details__security">
            <ShieldCheckIcon size={19} />
            <div>
              <strong>Xavfsiz muloqot</strong>
              <span>Xabarlar DSP himoyasi ostida uzatiladi.</span>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
