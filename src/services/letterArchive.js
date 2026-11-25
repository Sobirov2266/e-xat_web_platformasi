const ARCHIVED_INBOX_KEY = 'e-xat_archived_inbox';
const ARCHIVED_OUTBOX_KEY = 'e-xat_archived_outbox';
const REMOVED_ARCHIVE_KEY = 'e-xat_removed_archive';

const readArray = (key) => {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
};

const writeArray = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getArchivedInboxLetters = () => readArray(ARCHIVED_INBOX_KEY);

export const getArchivedOutboxLetters = () => readArray(ARCHIVED_OUTBOX_KEY);

export const getRemovedArchiveIds = () => readArray(REMOVED_ARCHIVE_KEY);

export const archiveInboxLetters = (letters) => {
  const archived = getArchivedInboxLetters();
  const archivedIds = new Set(archived.map((item) => item.id));
  const today = new Intl.DateTimeFormat('uz-UZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
    .format(new Date())
    .replace(/\//g, '.');

  const additions = letters
    .filter((item) => !archivedIds.has(item.id))
    .map((item) => ({
      id: item.id,
      sender: item.sender,
      subject: item.subject,
      received: item.received,
      archivedDate: today,
      initials: item.initials,
      attachment: item.attachment,
      urgent: Boolean(item.urgent),
    }));

  writeArray(ARCHIVED_INBOX_KEY, [...archived, ...additions]);
  return additions;
};

export const archiveOutboxLetters = (letters) => {
  const archived = getArchivedOutboxLetters();
  const archivedIds = new Set(archived.map((item) => item.id));
  const today = new Intl.DateTimeFormat('uz-UZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
    .format(new Date())
    .replace(/\//g, '.');

  const additions = letters
    .filter((item) => !archivedIds.has(item.id))
    .map((item) => ({
      id: item.id,
      sender: item.recipient,
      recipient: item.recipient,
      subject: item.subject,
      received: item.sent,
      sent: item.sent,
      archivedDate: today,
      initials: item.initials,
      attachment: item.attachment,
      urgent: false,
    }));

  writeArray(ARCHIVED_OUTBOX_KEY, [...archived, ...additions]);
  return additions;
};

export const unarchiveLetter = (id) => {
  const archived = getArchivedInboxLetters();
  writeArray(
    ARCHIVED_INBOX_KEY,
    archived.filter((item) => item.id !== id),
  );
  const archivedOutbox = getArchivedOutboxLetters();
  writeArray(
    ARCHIVED_OUTBOX_KEY,
    archivedOutbox.filter((item) => item.id !== id),
  );

  const removed = getRemovedArchiveIds();
  if (!removed.includes(id)) {
    writeArray(REMOVED_ARCHIVE_KEY, [...removed, id]);
  }
};
