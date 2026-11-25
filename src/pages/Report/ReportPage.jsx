import { useState, useMemo } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import {
  ReportIcon,
  ChevronDownIcon,
  DownloadIcon,
  PrinterIcon,
  RefreshIcon,
  FilterIcon,
  SearchIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  BuildingIcon,
  InboxIcon,
  SendIcon,
  TrendingUpIcon,
  DocumentIcon,
} from '../../components/icons';
import {
  REPORT_KPI_STATS,
  REPORT_ORGANIZATIONS,
  PERIOD_OPTIONS,
  CATEGORY_OPTIONS,
  DOCUMENT_TYPE_OPTIONS,
} from '../../data/mockReport';
import OrganizationDetailModal from './OrganizationDetailModal';
import './ReportPage.css';

export default function ReportPage() {
  const [period, setPeriod] = useState(PERIOD_OPTIONS[0]);
  const [docType, setDocType] = useState(DOCUMENT_TYPE_OPTIONS[0]);
  const [categoryFilter, setCategoryFilter] = useState('Barchasi');
  const [searchQuery, setSearchQuery] = useState('');

  const [sortField, setSortField] = useState('total');
  const [sortOrder, setSortOrder] = useState('desc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [selectedOrg, setSelectedOrg] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshedTime, setLastRefreshedTime] = useState('Bugun, 17:00');

  // Handle Refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      const now = new Date();
      const timeStr = `Bugun, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      setLastRefreshedTime(timeStr);
    }, 450);
  };

  // Reset Filters
  const handleResetFilters = () => {
    setPeriod(PERIOD_OPTIONS[0]);
    setDocType(DOCUMENT_TYPE_OPTIONS[0]);
    setCategoryFilter('Barchasi');
    setSearchQuery('');
    setPage(1);
  };

  // Filter and sort organizations
  const filteredOrganizations = useMemo(() => {
    let result = [...REPORT_ORGANIZATIONS];

    if (categoryFilter !== 'Barchasi') {
      result = result.filter((org) => org.category === categoryFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (org) =>
          org.name.toLowerCase().includes(q) ||
          org.code.toLowerCase().includes(q) ||
          org.category.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
        return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }

      return sortOrder === 'asc' ? valA - valB : valB - valA;
    });

    return result;
  }, [categoryFilter, searchQuery, sortField, sortOrder]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredOrganizations.length / pageSize) || 1;
  const paginatedOrgs = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredOrganizations.slice(start, start + pageSize);
  }, [filteredOrganizations, page, pageSize]);

  // Overall totals from filtered
  const tableTotals = useMemo(() => {
    return filteredOrganizations.reduce(
      (acc, curr) => ({
        incoming: acc.incoming + curr.incoming,
        outgoing: acc.outgoing + curr.outgoing,
        total: acc.total + curr.total,
      }),
      { incoming: 0, outgoing: 0, total: 0 }
    );
  }, [filteredOrganizations]);

  // Dynamic max for organizational volume
  const maxTotalVolume = useMemo(() => {
    return Math.max(...REPORT_ORGANIZATIONS.map((o) => o.total), 1);
  }, []);

  // Sort handler
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = [
      '№',
      'Tashkilot nomi',
      'Kodi',
      'Kategoriya',
      'Kiruvchi xatlar',
      'Chiquvchi xatlar',
      'Jami xatlar',
      'Ijro foizi (%)',
      'O‘rtacha ko‘rish muddati (kun)',
      'Muddati o‘tgan xatlar',
      'Holat',
    ];

    const rows = filteredOrganizations.map((org, index) => [
      index + 1,
      `"${org.name.replace(/"/g, '""')}"`,
      org.code,
      `"${org.category}"`,
      org.incoming,
      org.outgoing,
      org.total,
      org.executionRate,
      org.avgResponseDays,
      org.overdueCount,
      org.status,
    ]);

    const csvContent =
      '\uFEFF' +
      [headers.join(','), ...rows.map((row) => row.join(','))].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `e-xat_hisobot_${period.replace(/\s+/g, '_')}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Handle Print
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="report-page">
      {/* Top Header with breadcrumb and quick action buttons */}
      <div className="report-header-wrapper">
        <PageHeader
          Icon={ReportIcon}
          title="Hisobot va tahlillar"
          subtitle="Tizimdagi xatlar harakati, ijro intizomi va tashkilotlar bo‘yicha batafsil statistika"
        />

        <div className="report-top-actions">
          <button
            type="button"
            className={`report-btn report-btn--outline ${isRefreshing ? 'report-btn--spinning' : ''}`}
            onClick={handleRefresh}
            title="Ma’lumotlarni yangilash"
          >
            <RefreshIcon size={15} />
            <span className="report-top-actions__refresh-text">Yangilash</span>
          </button>

          <button
            type="button"
            className="report-btn report-btn--outline"
            onClick={handlePrint}
            title="Hisobotni chop etish"
          >
            <PrinterIcon size={15} />
            <span>Chop etish</span>
          </button>

          <button
            type="button"
            className="report-btn report-btn--primary"
            onClick={handleExportCSV}
            title="Excel formatida yuklab olish"
          >
            <DownloadIcon size={15} />
            <span>Excel yuklash</span>
          </button>
        </div>
      </div>

      {/* Main Filter Bar */}
      <section className="report-filter-bar" aria-label="Filtrlar">
        <div className="report-filter-bar__item">
          <label htmlFor="period-select">
            <CalendarIcon size={13} />
            <span>Hisobot davri</span>
          </label>
          <div className="report-select-wrapper">
            <select
              id="period-select"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            >
              {PERIOD_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDownIcon size={13} className="report-select-arrow" />
          </div>
        </div>

        <div className="report-filter-bar__item">
          <label htmlFor="doctype-select">
            <DocumentIcon size={13} />
            <span>Hujjat turi</span>
          </label>
          <div className="report-select-wrapper">
            <select
              id="doctype-select"
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
            >
              {DOCUMENT_TYPE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDownIcon size={13} className="report-select-arrow" />
          </div>
        </div>

        <div className="report-filter-bar__item">
          <label htmlFor="category-select">
            <BuildingIcon size={13} />
            <span>Tashkilot toifasi</span>
          </label>
          <div className="report-select-wrapper">
            <select
              id="category-select"
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setPage(1);
              }}
            >
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDownIcon size={13} className="report-select-arrow" />
          </div>
        </div>

        <div className="report-filter-bar__actions">
          <button
            type="button"
            className="report-filter-reset-btn"
            onClick={handleResetFilters}
            title="Barcha filtrlarni dastlabki holatga qaytarish"
          >
            Filtrni tozalash
          </button>
          <div className="report-filter-last-update">
            <ClockIcon size={12} />
            <span>Yangilandi: {lastRefreshedTime}</span>
          </div>
        </div>
      </section>

      {/* KPI Metric Cards */}
      <section className="report-kpi-grid">
        {REPORT_KPI_STATS.map((kpi) => {
          let IconComponent = InboxIcon;
          if (kpi.id === 'total') IconComponent = DocumentIcon;
          if (kpi.id === 'outgoing') IconComponent = SendIcon;
          if (kpi.id === 'discipline') IconComponent = CheckCircleIcon;

          return (
            <div key={kpi.id} className={`report-kpi-card report-kpi-card--${kpi.color}`}>
              <div className="report-kpi-card__top">
                <div className="report-kpi-card__icon">
                  <IconComponent size={22} />
                </div>
                <div className={`report-kpi-card__trend ${kpi.isPositive ? 'report-kpi-card__trend--up' : 'report-kpi-card__trend--down'}`}>
                  <TrendingUpIcon size={13} />
                  <span>{kpi.change}</span>
                </div>
              </div>

              <div className="report-kpi-card__body">
                <span className="report-kpi-card__title">{kpi.title}</span>
                <strong className="report-kpi-card__value">{kpi.value}</strong>
              </div>

              <div className="report-kpi-card__footer">
                <span className="report-kpi-card__subtext">{kpi.subText}</span>
              </div>
            </div>
          );
        })}
      </section>

      {/* Organizations Full Breakdown Table Card */}
      <section className="report-card report-card--table">
        <div className="report-table-toolbar">
          <div className="report-table-toolbar__title">
            <BuildingIcon size={20} className="report-card__icon" />
            <div>
              <h3 className="report-card__title">Tashkilotlar kesimidagi batafsil hisobot</h3>
              <p className="report-card__subtitle">
                Jami {filteredOrganizations.length} ta tashkilot bo‘yicha xatlar harakati
              </p>
            </div>
          </div>

          <div className="report-table-toolbar__controls">
            {/* Search Input */}
            <div className="report-search-box">
              <SearchIcon size={16} />
              <input
                type="text"
                placeholder="Tashkilot yoki kod bo‘yicha qidiruv..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="report-search-clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Qidiruvni tozalash"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Quick Filter Pills */}
            <div className="report-table-category-pills">
              {CATEGORY_OPTIONS.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`report-table-pill ${categoryFilter === cat ? 'report-table-pill--active' : ''}`}
                  onClick={() => {
                    setCategoryFilter(cat);
                    setPage(1);
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table Component */}
        <div className="report-table-responsive">
          <table className="report-data-table">
            <thead>
              <tr>
                <th className="report-col-num">№</th>
                <th
                  className="report-col-name report-th--sortable"
                  onClick={() => handleSort('name')}
                >
                  <div className="report-th-content">
                    <span>Tashkilot nomi</span>
                    <span className="report-sort-indicator">
                      {sortField === 'name' ? (sortOrder === 'asc' ? '▲' : '▼') : '↕'}
                    </span>
                  </div>
                </th>
                <th
                  className="report-col-stat report-th--sortable"
                  onClick={() => handleSort('incoming')}
                >
                  <div className="report-th-content report-th-content--right">
                    <span>Kiruvchi</span>
                    <span className="report-sort-indicator">
                      {sortField === 'incoming' ? (sortOrder === 'asc' ? '▲' : '▼') : '↕'}
                    </span>
                  </div>
                </th>
                <th
                  className="report-col-stat report-th--sortable"
                  onClick={() => handleSort('outgoing')}
                >
                  <div className="report-th-content report-th-content--right">
                    <span>Chiquvchi</span>
                    <span className="report-sort-indicator">
                      {sortField === 'outgoing' ? (sortOrder === 'asc' ? '▲' : '▼') : '↕'}
                    </span>
                  </div>
                </th>
                <th
                  className="report-col-total report-th--sortable"
                  onClick={() => handleSort('total')}
                >
                  <div className="report-th-content report-th-content--right">
                    <span>Jami hajm</span>
                    <span className="report-sort-indicator">
                      {sortField === 'total' ? (sortOrder === 'asc' ? '▲' : '▼') : '↕'}
                    </span>
                  </div>
                </th>
                <th className="report-col-progress">Hajm ulushi</th>
                <th
                  className="report-col-rate report-th--sortable"
                  onClick={() => handleSort('executionRate')}
                >
                  <div className="report-th-content report-th-content--center">
                    <span>Ijro intizomi</span>
                    <span className="report-sort-indicator">
                      {sortField === 'executionRate' ? (sortOrder === 'asc' ? '▲' : '▼') : '↕'}
                    </span>
                  </div>
                </th>
                <th className="report-col-action">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrgs.length === 0 ? (
                <tr>
                  <td colSpan="8" className="report-table-empty">
                    <div className="report-empty-state">
                      <FilterIcon size={32} />
                      <p>Qidiruv shartlariga mos keluvchi tashkilot topilmadi</p>
                      <button
                        type="button"
                        className="report-btn report-btn--outline"
                        onClick={handleResetFilters}
                      >
                        Filtrni tozalash
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedOrgs.map((org, index) => {
                  const globalIndex = (page - 1) * pageSize + index + 1;
                  const volumePercent = Math.round((org.total / maxTotalVolume) * 100);

                  return (
                    <tr
                      key={org.id}
                      className="report-table-row"
                      onClick={() => setSelectedOrg(org)}
                    >
                      <td className="report-col-num">{globalIndex}</td>
                      <td className="report-col-name">
                        <div className="report-org-cell">
                          <span className={`report-org-avatar report-org-avatar--${org.avatarColor}`}>
                            {org.code.slice(0, 2)}
                          </span>
                          <div className="report-org-info">
                            <span className="report-org-name" title={org.name}>
                              {org.name}
                            </span>
                            <div className="report-org-meta">
                              <span className="report-org-code">{org.code}</span>
                              <span className="report-org-category">{org.category}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="report-col-stat">
                        <div className="report-stat-num report-stat-num--incoming">
                          <span className="report-dot report-dot--blue" />
                          <strong>{org.incoming}</strong>
                        </div>
                      </td>
                      <td className="report-col-stat">
                        <div className="report-stat-num report-stat-num--outgoing">
                          <span className="report-dot report-dot--green" />
                          <strong>{org.outgoing}</strong>
                        </div>
                      </td>
                      <td className="report-col-total">
                        <strong className="report-total-num">{org.total}</strong>
                      </td>
                      <td className="report-col-progress">
                        <div className="report-volume-bar-wrapper">
                          <div className="report-volume-bar">
                            <div
                              className="report-volume-bar__fill"
                              style={{ width: `${volumePercent}%` }}
                            />
                          </div>
                          <span className="report-volume-bar__label">{volumePercent}%</span>
                        </div>
                      </td>
                      <td className="report-col-rate">
                        <div className="report-rate-badge-wrapper">
                          <span
                            className={`report-rate-badge ${
                              org.executionRate >= 96
                                ? 'report-rate-badge--high'
                                : org.executionRate >= 90
                                ? 'report-rate-badge--medium'
                                : 'report-rate-badge--low'
                            }`}
                          >
                            {org.executionRate}%
                          </span>
                        </div>
                      </td>
                      <td className="report-col-action">
                        <button
                          type="button"
                          className="report-action-btn"
                          title="Batafsil ko‘rish"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedOrg(org);
                          }}
                        >
                          Batafsil
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
            {filteredOrganizations.length > 0 && (
              <tfoot>
                <tr className="report-table-footer-row">
                  <td colSpan="2" className="report-footer-title">
                    Jami ko‘rsatilgan tashkilotlar bo‘yicha:
                  </td>
                  <td className="report-col-stat">
                    <strong>{tableTotals.incoming.toLocaleString('uz-UZ')}</strong>
                  </td>
                  <td className="report-col-stat">
                    <strong>{tableTotals.outgoing.toLocaleString('uz-UZ')}</strong>
                  </td>
                  <td className="report-col-total">
                    <strong className="report-grand-total">{tableTotals.total.toLocaleString('uz-UZ')}</strong>
                  </td>
                  <td colSpan="3" className="report-footer-note">
                    O‘rtacha ijro intizomi: <strong>95.8%</strong>
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>

        {/* Professional Pagination Bar */}
        {filteredOrganizations.length > 0 && (
          <div className="report-pagination-container">
            <div className="report-pagination-info">
              <span>
                Jami: <strong>{filteredOrganizations.length}</strong> ta tashkilotdan{' '}
                <strong>{(page - 1) * pageSize + 1}</strong> -{' '}
                <strong>{Math.min(page * pageSize, filteredOrganizations.length)}</strong> ko‘rsatilmoqda
              </span>
            </div>

            <div className="report-pagination-controls">
              <div className="report-page-size-select">
                <span>Sahifada:</span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setPage(1);
                  }}
                >
                  <option value={5}>5 tadan</option>
                  <option value={10}>10 tadan</option>
                  <option value={15}>15 tadan</option>
                </select>
              </div>

              <div className="report-page-buttons">
                <button
                  type="button"
                  className="report-page-btn"
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  aria-label="Oldingi sahifa"
                >
                  ‹
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    type="button"
                    className={`report-page-btn ${page === num ? 'report-page-btn--active' : ''}`}
                    onClick={() => setPage(num)}
                  >
                    {num}
                  </button>
                ))}

                <button
                  type="button"
                  className="report-page-btn"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  aria-label="Keyingi sahifa"
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Organization Detail Modal */}
      {selectedOrg && (
        <OrganizationDetailModal
          organization={selectedOrg}
          onClose={() => setSelectedOrg(null)}
        />
      )}
    </div>
  );
}
