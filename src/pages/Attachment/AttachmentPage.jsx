import { useState } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import { AttachmentIcon } from '../../components/icons';
import LetterList from './LetterList';
import ExecutorSelector from './ExecutorSelector';
import AdditionalEmployeesSelector from './AdditionalEmployeesSelector';
import CommentSection from './CommentSection';
import './AttachmentPage.css';

export default function AttachmentPage() {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [selectedExecutor, setSelectedExecutor] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAttach = () => {
    if (!selectedLetter || !selectedExecutor) {
      alert('Iltimos, xat va asosiy ijrochini tanlang');
      return;
    }
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setSelectedLetter(null);
    setSelectedExecutor(null);
    setSelectedEmployees([]);
    setComment('');
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="attachment-page">
        <PageHeader
          Icon={AttachmentIcon}
          title="Xat biriktirish"
          subtitle="Bosh sahifa › Qo'shimcha funksiyalar › Xat biriktirish"
        />

        <div className="attachment-success">
          <div className="attachment-success__icon">✓</div>
          <h2 className="attachment-success__title">Xat muvaffaqiyatli biriktirildi!</h2>
          <p className="attachment-success__subtitle">
            #{selectedLetter.id} raqamli xat {selectedExecutor.name} ga biriktirildi
          </p>
          <div className="attachment-success__details">
            <div className="success-detail">
              <span className="success-detail__label">Xat:</span>
              <span className="success-detail__value">#{selectedLetter.id}</span>
            </div>
            <div className="success-detail">
              <span className="success-detail__label">Asosiy ijrochi:</span>
              <span className="success-detail__value">{selectedExecutor.name}</span>
            </div>
            {selectedEmployees.length > 0 && (
              <div className="success-detail">
                <span className="success-detail__label">Qo'shimcha hodimlar:</span>
                <span className="success-detail__value">{selectedEmployees.length} ta</span>
              </div>
            )}
          </div>
          <button type="button" className="attachment-success__button" onClick={handleReset}>
            Yangi xat biriktirish
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="attachment-page">
      <PageHeader
        Icon={AttachmentIcon}
        title="Xat biriktirish"
        subtitle="Bosh sahifa › Qo'shimcha funksiyalar › Xat biriktirish"
      />

      <div className="attachment-layout">
        <LetterList selectedLetter={selectedLetter} onSelectLetter={setSelectedLetter} />

        <div className="attachment-main">
          {selectedLetter ? (
            <>
              <div className="attachment-selected-letter">
                <div className="selected-letter-header">
                  <span className="selected-letter-id">#{selectedLetter.id}</span>
                  <span className="selected-letter-date">{selectedLetter.date}</span>
                </div>
                <h2 className="selected-letter-title">{selectedLetter.title}</h2>
                <p className="selected-letter-org">{selectedLetter.organization}</p>
              </div>

              <div className="attachment-content">
                <ExecutorSelector selectedExecutor={selectedExecutor} onSelectExecutor={setSelectedExecutor} />
                <AdditionalEmployeesSelector
                  selectedEmployees={selectedEmployees}
                  onSelectEmployees={setSelectedEmployees}
                />
                <CommentSection comment={comment} onChangeComment={setComment} />
              </div>
            </>
          ) : (
            <div className="attachment-empty">
              <div className="attachment-empty__icon">📋</div>
              <h3 className="attachment-empty__title">Xat tanlang</h3>
              <p className="attachment-empty__subtitle">
                Chap tomondan ro'yxatdan biriktirmoqchi bo'lgan xatni tanlang
              </p>
            </div>
          )}
        </div>
      </div>

      {selectedLetter && (
        <div className="attachment-footer">
          <div className="attachment-footer__summary">
            {selectedLetter && selectedExecutor && (
              <>
                <span>Asosiy: {selectedExecutor.name}</span>
                <span>·</span>
                <span>Xat #{selectedLetter.id}</span>
                {selectedEmployees.length > 0 && (
                  <>
                    <span>·</span>
                    <span>qo'shimcha hodimlar: {selectedEmployees.length} ta</span>
                  </>
                )}
              </>
            )}
          </div>
          <button
            type="button"
            className="attachment-footer__button"
            onClick={handleAttach}
            disabled={!selectedLetter || !selectedExecutor}
          >
            Xatni biriktirish
          </button>
        </div>
      )}
    </div>
  );
}
