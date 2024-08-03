// components/formcomponent/checkboxfield.tsx
import React from 'react';

interface CheckboxFieldProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({ label, name, checked, onChange, disabled }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={Boolean(checked)}
        onChange={onChange}
        disabled={disabled}
        className="form-checkbox"
      />
      <label htmlFor={name} className="ml-2">
        {label}
      </label>
    </div>
  );
};

export default CheckboxField;
