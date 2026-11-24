import {
  ArchiveIcon,
  AttachmentIcon,
  ChatIcon,
  GridIcon,
  HomeIcon,
  InboxIcon,
  OrganizationIcon,
  ReportIcon,
  SendIcon,
  SettingsIcon,
} from '../components/icons';
import { MOCK_STATS } from '../data/mockStats';
import { ROUTES } from '../routes/paths';

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Bosh sahifa', to: ROUTES.DASHBOARD, Icon: HomeIcon },
  { id: 'inbox', label: 'Kiruvchi xatlar', to: ROUTES.INBOX, Icon: InboxIcon, badge: MOCK_STATS.unread },
  { id: 'outbox', label: 'Chiquvchi xatlar', to: ROUTES.OUTBOX, Icon: SendIcon },
  { id: 'chat', label: 'Muloqot', to: ROUTES.CHAT, Icon: ChatIcon },
  {
    id: 'more',
    label: 'Qo‘shimcha funksiyalar',
    Icon: GridIcon,
    children: [
      { id: 'attachment', label: 'Xat biriktirish', to: ROUTES.ATTACHMENT },
      { id: 'organization', label: 'Tashkilot tuzilmasi', to: ROUTES.ORGANIZATION },
      { id: 'archive', label: 'Arxiv', to: ROUTES.ARCHIVE },
      { id: 'report', label: 'Hisobot', to: ROUTES.REPORT },
      { id: 'settings', label: 'Sozlamalar', to: ROUTES.SETTINGS },
    ],
  },
];