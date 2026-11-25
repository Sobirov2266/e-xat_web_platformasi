import Modal from '../../components/ui/Modal';
import {
  InboxIcon,
  SendIcon,
  DocumentIcon,
  CheckCircleIcon,
  ClockIcon,
  DownloadIcon,
} from '../../components/icons';

export default function OrganizationDetailModal({ organization, onClose }) {
  if (!organization) return null;

  const handleExportSingle = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      encodeURIComponent(
        `Tashkilot,${organization.name}\n` +
        `Kodi,${organization.code}\n` +
        `Kategoriya,${organization.category}\n` +
        `Kiruvchi xatlar,${organization.incoming}\n` +
        `Chiquvchi xatlar,${organization.outgoing}\n` +
        `Jami xatlar,${organization.total}\n` +
        `Ijro intizomi,${organization.executionRate}%\n` +
        `O'rtacha javob vaqti,${organization.avgResponseDays} kun\n`
      );
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', `${organization.code}_hisobot.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Modal
      title={organization.name}
      subtitle={`Tashkilot kodi: ${organization.code} • Kategoriya: ${organization.category}`}
      onClose={onClose}
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', width: '100%' }}>
          <button
            type="button"
            className="report-btn report-btn--secondary"
            onClick={onClose}
          >
            Yopish
          </button>
          <button
            type="button"
            className="report-btn report-btn--primary"
            onClick={handleExportSingle}
          >
            <DownloadIcon size={16} />
            Eksport qilish (CSV)
          </button>
        </div>
      }
    >
      <div className="report-modal-content">
        <div className="report-modal-stats">
          <div className="report-modal-stat report-modal-stat--blue">
            <div className="report-modal-stat__icon">
              <InboxIcon size={20} />
            </div>
            <div>
              <span className="report-modal-stat__label">Kiruvchi xatlar</span>
              <strong className="report-modal-stat__value">{organization.incoming}</strong>
            </div>
          </div>

          <div className="report-modal-stat report-modal-stat--green">
            <div className="report-modal-stat__icon">
              <SendIcon size={20} />
            </div>
            <div>
              <span className="report-modal-stat__label">Chiquvchi xatlar</span>
              <strong className="report-modal-stat__value">{organization.outgoing}</strong>
            </div>
          </div>

          <div className="report-modal-stat report-modal-stat--purple">
            <div className="report-modal-stat__icon">
              <DocumentIcon size={20} />
            </div>
            <div>
              <span className="report-modal-stat__label">Jami aylanma</span>
              <strong className="report-modal-stat__value">{organization.total}</strong>
            </div>
          </div>
        </div>

        <div className="report-modal-details">
          <div className="report-modal-row">
            <div className="report-modal-field">
              <span className="report-modal-field__label">Ijro intizomi</span>
              <div className="report-modal-badge-wrapper">
                <span className="report-badge report-badge--success">
                  <CheckCircleIcon size={14} />
                  {organization.executionRate}% bajarildi
                </span>
                <span className="report-modal-field__note">Holat: {organization.status}</span>
              </div>
            </div>

            <div className="report-modal-field">
              <span className="report-modal-field__label">O‘rtacha ko‘rib chiqish muddati</span>
              <div className="report-modal-badge-wrapper">
                <span className="report-badge report-badge--neutral">
                  <ClockIcon size={14} />
                  {organization.avgResponseDays} ish kuni
                </span>
              </div>
            </div>
          </div>

          <div className="report-modal-progress-section">
            <div className="report-modal-progress-header">
              <span>Hujjatlar aylanmasi nisbati</span>
              <span>
                Kiruvchi: {Math.round((organization.incoming / organization.total) * 100)}% | 
                Chiquvchi: {Math.round((organization.outgoing / organization.total) * 100)}%
              </span>
            </div>
            <div className="report-ratio-bar">
              <div
                className="report-ratio-bar__incoming"
                style={{ width: `${(organization.incoming / organization.total) * 100}%` }}
                title={`Kiruvchi: ${organization.incoming}`}
              />
              <div
                className="report-ratio-bar__outgoing"
                style={{ width: `${(organization.outgoing / organization.total) * 100}%` }}
                title={`Chiquvchi: ${organization.outgoing}`}
              />
            </div>
          </div>

          <div className="report-modal-info-box">
            <h4>Hujjatlar turlari taqsimoti</h4>
            <div className="report-modal-types-grid">
              <div className="report-type-item">
                <span className="report-type-dot report-type-dot--blue" />
                <span>Rasmiy xatlar</span>
                <strong>{Math.round(organization.total * 0.52)} ta</strong>
              </div>
              <div className="report-type-item">
                <span className="report-type-dot report-type-dot--green" />
                <span>Murojaatlar</span>
                <strong>{Math.round(organization.total * 0.22)} ta</strong>
              </div>
              <div className="report-type-item">
                <span className="report-type-dot report-type-dot--purple" />
                <span>Buyruq va topshiriqlar</span>
                <strong>{Math.round(organization.total * 0.16)} ta</strong>
              </div>
              <div className="report-type-item">
                <span className="report-type-dot report-type-dot--amber" />
                <span>Boshqa hujjatlar</span>
                <strong>{Math.round(organization.total * 0.10)} ta</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
