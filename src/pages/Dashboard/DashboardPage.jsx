import { HomeIcon, InboxIcon, MailIcon, SendIcon } from '../../components/icons';
import PageHeader from '../../components/layout/PageHeader';
import { MOCK_STATS } from '../../data/mockStats';
import { ROUTES } from '../../routes/paths';
import { getCurrentUser } from '../../services/auth';
import { getUserDisplay } from '../../utils/user';
import HeroBanner from './HeroBanner';
import StatCard from './StatCard';
import './DashboardPage.css';

const STAT_CARDS = [
  { id: 'incoming', label: 'Jami kiruvchi xatlar', value: MOCK_STATS.incomingTotal, Icon: InboxIcon, color: 'green', to: ROUTES.INBOX },
  { id: 'outgoing', label: 'Jami chiquvchi xatlar', value: MOCK_STATS.outgoingTotal, Icon: SendIcon, color: 'blue', to: ROUTES.OUTBOX },
  { id: 'new', label: 'Yangi xatlar', value: MOCK_STATS.unread, Icon: MailIcon, color: 'purple', to: ROUTES.INBOX, state: { inboxTab: 'new' } },
];

export default function DashboardPage() {
  const { shortName } = getUserDisplay(getCurrentUser());

  return (
    <>
      <PageHeader Icon={HomeIcon} title="Bosh sahifa" subtitle={`Xush kelibsiz, ${shortName}`} />
      <HeroBanner />

      <section className="dashboard__stats">
        {STAT_CARDS.map((card) => (
          <StatCard key={card.id} {...card} />
        ))}
      </section>
    </>
  );
}