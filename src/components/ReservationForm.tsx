import React, { useState } from "react";
import "../styles/ReservationForm.css";

type ReservationFormProps = {
  seatNumber: number;
  formData: Record<string, string>;
  onChange: (seatNumber: number, name: string, value: string) => void;
};

const ReservationForm: React.FC<ReservationFormProps> = ({ seatNumber, formData, onChange }) => {
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange(seatNumber, name, value);

    if (value) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const validateInput = (name: string, value: string) => {
    if (!value) {
      setErrors((prev) => ({ ...prev, [name]: true }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    validateInput(name, value);
  };

  return (
    <div className="reservation-form">
      <span className="header-text">{seatNumber}. Yolcu</span>
      <div className="form-row">
        <label>
          İsim:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.name ? "error" : ""}
            required
          />
        </label>
        <label>
          Soyisim:
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.surname ? "error" : ""}
            required
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          Telefon:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.phone ? "error" : ""}
            required
          />
        </label>
        <label>
          E-Posta:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email ? "error" : ""}
            required
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          Cinsiyet:
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.gender ? "error" : ""}
            required
          >
            <option value="" disabled>
              Seçiniz
            </option>
            <option value="male">Erkek</option>
            <option value="female">Kadın</option>
          </select>
        </label>
        <label>
          Doğum Tarihi:
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.birthDate ? "error" : ""}
            required
          />
        </label>
      </div>
    </div>
  );
};

export default ReservationForm;
