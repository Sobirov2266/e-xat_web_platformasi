import { useMemo, useState } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import { OrganizationIcon } from '../../components/icons';
import { MOCK_EMPLOYEES, DEPARTMENTS } from '../../data/mockOrganization';
import AddEmployeeModal from './AddEmployeeModal';
import DropdownMenu from './DropdownMenu';
import './OrganizationPage.css';

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-4-4" />
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export default function OrganizationPage() {
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('Barchasi');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [employees, setEmployees] = useState(MOCK_EMPLOYEES);
  const pageSize = 10;

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        employee.name.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query) ||
        employee.phone.includes(query) ||
        employee.position.toLowerCase().includes(query);

      const matchesDepartment =
        departmentFilter === 'Barchasi' || employee.department === departmentFilter;

      return matchesSearch && matchesDepartment;
    });
  }, [search, departmentFilter, employees]);

  const totalPages = Math.ceil(filteredEmployees.length / pageSize);
  const paginatedEmployees = filteredEmployees.slice((page - 1) * pageSize, page * pageSize);

  const getAvatarColorClass = (color) => `employee-avatar--${color}`;

  const handleAddEmployee = (newEmployee) => {
    setEmployees((prev) => [...prev, newEmployee]);
  };

  const handleUpdateEmployee = (updatedEmployee) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
    );
  };

  const handleDeleteEmployee = (employeeId) => {
    if (confirm('Haqiqatan ham bu hodimni o\'chirmoqchimisiz?')) {
      setEmployees((prev) => prev.filter((emp) => emp.id !== employeeId));
    }
  };

  const handleEditEmployee = (employee) => {
    setEditEmployee(employee);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditEmployee(null);
  };

  return (
    <div className="organization-page">
      <PageHeader
        Icon={OrganizationIcon}
        title="Tashkilot tuzilmasi"
        subtitle="Bosh sahifa › Qo'shimcha funksiyalar › Tashkilot tuzilmasi"
      />

      <div className="organization-content">
        <div className="organization-toolbar">
          <div className="organization-filters">
            <label className="organization-search">
              <SearchIcon />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Hodim, lavozim yoki telefon qidiring..."
              />
            </label>

            <select
              className="organization-filter"
              value={departmentFilter}
              onChange={(e) => {
                setDepartmentFilter(e.target.value);
                setPage(1);
              }}
            >
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className="organization-add-btn"
            onClick={() => setIsModalOpen(true)}
          >
            <PlusIcon />
            Hodim qo'shish
          </button>
        </div>

        <div className="organization-table-container">
          <table className="organization-table">
            <thead>
              <tr>
                <th>Hodim</th>
                <th>Lavozim</th>
                <th>Bo'lim</th>
                <th>Email</th>
                <th>Telefon</th>
                <th>Amallar</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEmployees.length === 0 ? (
                <tr>
                  <td colSpan="6" className="organization-table__empty">
                    Hodim topilmadi
                  </td>
                </tr>
              ) : (
                paginatedEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td>
                      <div className="employee-cell">
                        <span className={`employee-avatar ${getAvatarColorClass(employee.avatarColor)}`}>
                          {employee.initials}
                        </span>
                        <span className="employee-name">{employee.name}</span>
                      </div>
                    </td>
                    <td>{employee.position}</td>
                    <td>{employee.department}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phone}</td>
                    <td>
                      <DropdownMenu
                        onEdit={() => handleEditEmployee(employee)}
                        onDelete={() => handleDeleteEmployee(employee.id)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filteredEmployees.length > 0 && (
          <div className="organization-pagination">
            <span className="organization-pagination__info">
              Jami: {filteredEmployees.length} ta hodim
            </span>
            <div className="organization-pagination__controls">
              <button
                type="button"
                className="pagination-btn"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                ‹
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  type="button"
                  className={`pagination-btn ${page === num ? 'pagination-btn--active' : ''}`}
                  onClick={() => setPage(num)}
                >
                  {num}
                </button>
              ))}
              <button
                type="button"
                className="pagination-btn"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                ›
              </button>
            </div>
          </div>
        )}
      </div>

      <AddEmployeeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddEmployee={handleAddEmployee}
        editEmployee={editEmployee}
        onUpdateEmployee={handleUpdateEmployee}
      />
    </div>
  );
}
