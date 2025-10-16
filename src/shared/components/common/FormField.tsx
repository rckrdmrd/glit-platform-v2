import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'date';
  value: string | number;
  onChange: (value: string) => void;
  error?: string;
  success?: string;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  rows?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  success,
  placeholder,
  required = false,
  options = [],
  rows = 4,
  size = 'md',
}) => {
  const getSizeClasses = () => {
    const sizes = {
      sm: 'py-2 px-3 text-sm',
      md: 'py-3 px-4 text-base',
      lg: 'py-4 px-5 text-lg',
    };
    return sizes[size];
  };

  const getBorderClasses = () => {
    if (error) {
      return 'border-red-500 focus:border-red-500 focus:ring-red-500';
    }
    if (success) {
      return 'border-green-500 focus:border-green-500 focus:ring-green-500';
    }
    return 'border-gray-300 focus:border-orange-500 focus:ring-orange-500';
  };

  const baseInputClasses = `w-full border-2 rounded-lg text-detective-text placeholder-gray-500 outline-none transition-all focus:ring-2 focus:ring-opacity-20 ${getSizeClasses()} ${getBorderClasses()}`;

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-detective-text">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className={`${baseInputClasses} resize-none`}
        />
      ) : type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={baseInputClasses}
        >
          <option value="">Seleccionar...</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={baseInputClasses}
        />
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}
      {success && !error && <p className="text-sm text-green-500">{success}</p>}
    </div>
  );
};
