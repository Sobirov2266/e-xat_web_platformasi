import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../../components/layout/PageHeader';
import { ArrowLeftIcon } from '../../components/icons';
import { MOCK_OUTBOX } from '../../data/mockOutbox';
import '../Inbox/InboxDetailPage.css';

const STATUS_LABELS = {
  answered: 'Javob berilgan',
  sent: 'Yuborilgan',
  read: 'O‘qildi',
};

export default function OutboxDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const letter = MOCK_OUTBOX.find((item) => item.id === id);

  return (
    <div className="inbox-detail-page">
      <div className="inbox-detail-page__top">
        <button
          type="button"
          className="inbox-detail__back-header"
          onClick={() => navigate('/outbox')}
          aria-label="Chiquvchi xatlar sahifasiga qaytish"
        >
          <PageHeader
            Icon={ArrowLeftIcon}
            title={letter ? `Chiquvchi xat #${letter.id}` : 'Xat topilmadi'}
            subtitle="Bosh sahifa › Chiquvchi xatlar › Xatni ko‘rish"
          />
        </button>
      </div>

      {letter ? (
        <article className="inbox-detail__card">
          <header className="inbox-detail__header">
            <div>
              <h2 className="inbox-detail__subject">{letter.subject}</h2>
              <div className="inbox-detail__sender">
                <span className={`mail-row__initials mail-row__initials--${letter.initials.toLowerCase()}`}>
                  {letter.initials}
                </span>
                <strong>{letter.recipient}</strong>
              </div>
            </div>
            <div className="inbox-detail__meta">
              <div>
                Yuborilgan sana
                <strong>{letter.sent}</strong>
              </div>
              <div>
                Xat o‘qilgan vaqt
                <strong>{letter.readAt || '—'}</strong>
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
            <p>Hurmatli hamkasb,</p>
            <p>
              <strong>{letter.subject}</strong> mavzusidagi xat yuborildi.
            </p>
            <p>Bu chiquvchi xatning mazmuni.</p>
          </div>
        </article>
      ) : (
        <article className="inbox-detail__card">
          <div className="inbox-detail__body">So‘ralgan xat topilmadi.</div>
        </article>
      )}
    </div>
  );
}
