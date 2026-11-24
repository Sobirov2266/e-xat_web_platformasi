import { useState, useEffect } from 'react';
import { DEPARTMENTS } from '../../data/mockOrganization';
import './AddEmployeeModal.css';

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const AVATAR_COLORS = ['blue', 'purple', 'green', 'orange', 'red'];

export default function AddEmployeeModal({ isOpen, onClose, onAddEmployee, editEmployee, onUpdateEmployee }) {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: 'Boshqaruv',
    email: '',
    phone: '',
    avatarColor: 'blue',
  });

  const [errors, setErrors] = useState({});

  const isEditMode = !!editEmployee;

  useEffect(() => {
    if (editEmployee) {
      setFormData({
        name: editEmployee.name,
        position: editEmployee.position,
        department: editEmployee.department,
        email: editEmployee.email,
        phone: editEmployee.phone,
        avatarColor: editEmployee.avatarColor,
      });
    } else {
      setFormData({
        name: '',
        position: '',
        department: 'Boshqaruv',
        email: '',
        phone: '',
        avatarColor: 'blue',
      });
    }
    setErrors({});
  }, [editEmployee, isOpen]);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Ism majburiy';
    }

    if (!formData.position.trim()) {
      newErrors.position = 'Lavozim majburiy';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email majburiy';
    } else if (!formData.email.includes('@exat.uz')) {
      newErrors.email = 'Email @exat.uz bilan tugashi kerak';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefon majburiy';
    } else if (!/^\+998 \d{2} \d{3} \d{2} \d{2}$/.test(formData.phone)) {
      newErrors.phone = 'Telefon formati: +998 90 123 45 67';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const initials = formData.name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const employeeData = {
      name: formData.name.trim(),
      initials,
      position: formData.position.trim(),
      department: formData.department,
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      avatarColor: formData.avatarColor,
    };

    if (isEditMode) {
      onUpdateEmployee({ ...editEmployee, ...employeeData });
    } else {
      onAddEmployee({ id: Date.now(), ...employeeData });
    }

    onClose();
    setFormData({
      name: '',
      position: '',
      department: 'Boshqaruv',
      email: '',
      phone: '',
      avatarColor: 'blue',
    });
    setErrors({});
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{isEditMode ? 'Hodimni tahrirlash' : 'Yangi hodim qo\'shish'}</h2>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Yopish">
            <CloseIcon />
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Ism Familiya *</label>
            <input
              type="text"
              className={`form-input ${errors.name ? 'form-input--error' : ''}`}
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Masalan: Karimov Jahongir"
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Lavozim *</label>
            <input
              type="text"
              className={`form-input ${errors.position ? 'form-input--error' : ''}`}
              value={formData.position}
              onChange={(e) => handleChange('position', e.target.value)}
              placeholder="Masalan: Bosh direktor"
            />
            {errors.position && <span className="form-error">{errors.position}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Bo'lim *</label>
            <select
              className="form-input"
              value={formData.department}
              onChange={(e) => handleChange('department', e.target.value)}
            >
              {DEPARTMENTS.filter((dept) => dept !== 'Barchasi').map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Email *</label>
            <input
              type="email"
              className={`form-input ${errors.email ? 'form-input--error' : ''}`}
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="ism@exat.uz"
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Telefon *</label>
            <input
              type="tel"
              className={`form-input ${errors.phone ? 'form-input--error' : ''}`}
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+998 90 123 45 67"
            />
            {errors.phone && <span className="form-error">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Avatar rangi</label>
            <div className="color-picker">
              {AVATAR_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`color-option ${formData.avatarColor === color ? 'color-option--active' : ''}`}
                  onClick={() => handleChange('avatarColor', color)}
                >
                  <span className={`color-swatch color-swatch--${color}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn--secondary" onClick={onClose}>
              Bekor qilish
            </button>
            <button type="submit" className="btn btn--primary">
              {isEditMode ? 'Saqlash' : 'Qo\'shish'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
