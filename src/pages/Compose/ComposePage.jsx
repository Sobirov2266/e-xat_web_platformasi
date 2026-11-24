import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DocumentIcon, SendIcon } from '../../components/icons';
import { MOCK_RECIPIENTS } from '../../data/mockRecipients';
import { addOutboxLetter } from '../../data/mockOutbox';
import { ROUTES } from '../../routes/paths';
import './ComposePage.css';

const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-4-4" />
  </svg>
);

const UsersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
  </svg>
);

const AttachmentIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </svg>
);

const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="10" width="16" height="11" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
);

export default function ComposePage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [recipientSearch, setRecipientSearch] = useState('');
  const [recipient, setRecipient] = useState('');
  const [recipientPickerOpen, setRecipientPickerOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [priority, setPriority] = useState('normal');
  const [body, setBody] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [dspEnabled, setDspEnabled] = useState(true);

  const recipients = MOCK_RECIPIENTS.filter((item) =>
    item.organization.toLowerCase().includes(recipientSearch.trim().toLowerCase()),
  );

  const handleFiles = (event) => {
    const files = Array.from(event.target.files || []);
    setAttachments((current) => [...current, ...files].slice(0, 10));
  };

  const handleSend = () => {
    const finalRecipient = recipient.trim() || recipientSearch.trim();

    if (!finalRecipient || !subject.trim()) {
      setRecipientPickerOpen(!finalRecipient);
      return;
    }

    addOutboxLetter({
      recipient: finalRecipient,
      subject: subject.trim(),
      attachment: attachments.length > 0,
    });
    navigate(ROUTES.OUTBOX, {
      replace: true,
      state: { sentSuccess: true },
    });
  };

  return (
    <div className="compose-page">
      <div className="compose-header">
        <button
          type="button"
          className="compose-header__back"
          aria-label="Orqaga"
          onClick={() => navigate(-1)}
        >
          ‹
        </button>
        <div>
          <h1 className="compose-header__title">Yangi xat yozish</h1>
          <p className="compose-header__subtitle">Bosh sahifa › Chiquvchi xatlar › Yangi xat yozish</p>
        </div>
      </div>

      <section className="compose-card">
        <div className="compose-card__field compose-card__recipient">
          <label className="compose-card__label">
            Kimga <span>*</span>
          </label>
          <div className="recipient-control">
            <SearchIcon />
            <input
              value={recipientSearch}
              onChange={(event) => setRecipientSearch(event.target.value)}
              onFocus={() => setRecipientPickerOpen(true)}
              placeholder="Qabul qiluvchi tashkilot nomini kiriting..."
            />
            {recipientPickerOpen && (
              <div className="recipient-picker">
                {recipients.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onMouseDown={() => {
                      setRecipient(item.organization);
                      setRecipientSearch(item.organization);
                      setRecipientPickerOpen(false);
                    }}
                  >
                    {item.organization}
                  </button>
                ))}
                {recipients.length === 0 && <span>Topilmadi</span>}
              </div>
            )}
          </div>
          <button
            type="button"
            className="recipient-select"
            onClick={() => setRecipientPickerOpen((current) => !current)}
          >
            <UsersIcon />
            Ro‘yxatdan tanlash
          </button>
        </div>

        {recipient && <div className="compose-card__recipient-chip">{recipient}</div>}

        <div className="compose-card__field compose-card__subject">
          <label className="compose-card__label">
            Mavzu <span>*</span>
          </label>
          <input
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            placeholder="Xat mavzusini kiriting..."
          />
        </div>

        <div className="compose-card__priority">
          <span className="compose-card__label">Ustuvorlik</span>
          <div className="priority-options">
            <button
              type="button"
              className={priority === 'normal' ? 'priority-option--active' : ''}
              onClick={() => setPriority('normal')}
            >
              <SendIcon size={13} />
              Oddiy
            </button>
            <button
              type="button"
              className={priority === 'important' ? 'priority-option--active priority-option--important' : ''}
              onClick={() => setPriority('important')}
            >
              <SendIcon size={13} />
              Muhim
            </button>
            <button
              type="button"
              className={priority === 'urgent' ? 'priority-option--active priority-option--urgent' : ''}
              onClick={() => setPriority('urgent')}
            >
              <SendIcon size={13} />
              Shoshilinch
            </button>
          </div>
        </div>

        <div className="compose-editor">
          <div className="compose-editor__toolbar" aria-label="Matn formatlash">
            <select aria-label="Matn turi" defaultValue="normal">
              <option value="normal">Normal</option>
              <option value="heading">Sarlavha</option>
            </select>
            <button type="button" aria-label="Pastga">B</button>
            <button type="button" aria-label="Kursiv"><i>I</i></button>
            <button type="button" aria-label="Tagiga chizilgan"><u>U</u></button>
            <button type="button" aria-label="Rо’yxat">≡</button>
            <button type="button" aria-label="Tartiblangan ro’yxat">☷</button>
            <button type="button" aria-label="Chapga">≪</button>
            <button type="button" aria-label="Onga">≫</button>
            <button type="button" aria-label="Bog‘lama">⌕</button>
            <button type="button" aria-label="Matn hajmi">Tx</button>
          </div>
          <textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
            maxLength={5000}
            placeholder="Xat matnini kiriting..."
          />
          <span className="compose-editor__count">{body.length} / 5000</span>
        </div>

        <button
          type="button"
          className="compose-upload"
          onClick={() => fileInputRef.current?.click()}
        >
          <AttachmentIcon />
          <span>
            <strong>Fayl tanlash yoki sudrab tashlang</strong>
            <small>PDF, DOC, DOCX, XLS, XLSX, JPG, PNG, ZIP · maksimal hajm 20 MB</small>
          </span>
          {attachments.length > 0 && <b>{attachments.length} ta fayl</b>}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          hidden
          onChange={handleFiles}
        />

        <div className="compose-actions">
          <div className="compose-actions__left">
            <button type="button" className="compose-send" onClick={handleSend}>
              <SendIcon size={16} />
              Yuborish
            </button>
            <button type="button" className="compose-draft">
              <DocumentIcon size={16} />
              Qoralama saqlash
            </button>
          </div>
          <label className="compose-dsp">
            <LockIcon />
            <span>
              <strong>DSP (maxfiylik)</strong>
              <small>Xat shifrlab yuboriladi</small>
            </span>
            <input
              type="checkbox"
              checked={dspEnabled}
              onChange={(event) => setDspEnabled(event.target.checked)}
            />
            <span className="compose-dsp__switch" aria-hidden="true" />
          </label>
        </div>
      </section>
    </div>
  );
}
