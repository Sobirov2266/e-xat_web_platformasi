import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../../components/layout/PageHeader';
import { ArrowLeftIcon, SendIcon } from '../../components/icons';
import { MOCK_INBOX } from '../../data/mockInbox';
import { ROUTES } from '../../routes/paths';
import './InboxDetailPage.css';

const STATUS_LABELS = {
  answered: 'Javob berildi',
  new: 'Yangi',
  open: 'O‘qildi',
};

export default function InboxDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const letter = MOCK_INBOX.find((item) => item.id === id);

  if (!letter) {
    return (
      <div className="inbox-detail-page">
        <div className="inbox-detail-page__top">
          <button
            type="button"
            className="inbox-detail__back-header"
            onClick={() => navigate('/inbox')}
            aria-label="Kiruvchi xatlar sahifasiga qaytish"
          >
            <PageHeader Icon={ArrowLeftIcon} title="Xat topilmadi" subtitle="Bosh sahifa › Kiruvchi xatlar" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="inbox-detail-page">
      <div className="inbox-detail-page__top">
        <button
          type="button"
          className="inbox-detail__back-header"
          onClick={() => navigate('/inbox')}
          aria-label="Kiruvchi xatlar sahifasiga qaytish"
        >
          <PageHeader
            Icon={ArrowLeftIcon}
            title={`Kiruvchi xat #${letter.id}`}
            subtitle="Bosh sahifa › Kiruvchi xatlar › Xatni ko‘rish"
          />
        </button>
      </div>

      <article className="inbox-detail__card">
        <header className="inbox-detail__header">
          <div>
            <div className="inbox-detail__subject-row">
              <h2 className="inbox-detail__subject">{letter.subject}</h2>
              <span className="inbox-detail__priority">Muhim</span>
            </div>
            <div className="inbox-detail__field-list">
              <div className="inbox-detail__field">
                <span>Tashkilot nomi</span>
                <strong>{letter.sender}</strong>
              </div>
              <div className="inbox-detail__field">
                <span>Xat mavzusi</span>
                <strong>{letter.subject}</strong>
              </div>
              <div className="inbox-detail__field">
                <span>Ustivorligi</span>
                <strong>Muhim</strong>
              </div>
            </div>
          </div>
          <div className="inbox-detail__meta">
            <div>
              Kelgan sana
              <strong>{letter.received}</strong>
            </div>
            <div>
              Javob muddati
              <strong>{letter.deadline || '—'}</strong>
            </div>
            <div>
              Holati
              <strong>{STATUS_LABELS[letter.status]}</strong>
            </div>
            <div>
              Biriktirma
              <strong>{letter.attachment ? 'Mavjud' : 'Yo‘q'}</strong>
            </div>
          </div>
        </header>

        <div className="inbox-detail__body">
          <div className="inbox-detail__body-label">Asosiy xat matni</div>
          <div className="inbox-detail__message">
            <p>Hurmatli hamkasb,</p>
            <p>
              <strong>{letter.subject}</strong> mavzusidagi xat sizga yuborildi.
            </p>
            <p>
              Iltimos, hujjat mazmunini ko‘rib chiqing va belgilangan muddatga rioya qilib javob qaytaring.
            </p>
          </div>
          <div className="inbox-detail__attachments">
            <div className="inbox-detail__body-label">Ilova fayllar</div>
            {letter.attachment ? (
              <button type="button" className="inbox-detail__attachment">
                <span className="inbox-detail__attachment-icon">PDF</span>
                <span>
                  <strong>{letter.id}-hujjat.pdf</strong>
                  <small>Hujjat ilovasi</small>
                </span>
              </button>
            ) : (
              <span className="inbox-detail__no-attachment">Ilova fayl mavjud emas</span>
            )}
          </div>
        </div>
        <footer className="inbox-detail__footer">
          <button
            type="button"
            className="inbox-detail__reply"
            onClick={() =>
              navigate(ROUTES.COMPOSE, {
                state: {
                  replyTo: letter.sender,
                  replySubject: `Re: ${letter.subject}`,
                },
              })
            }
          >
            <SendIcon size={16} />
            Javob xatini yuborish
          </button>
        </footer>
      </article>
    </div>
  );
}
