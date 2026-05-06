import React from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  size = 'md'
}) => {
  const sizes = {
    sm: 'w-9 h-5',
    md: 'w-11 h-6',
    lg: 'w-14 h-7'
  };

  const knobSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <label className="inline-flex items-center cursor-pointer gap-3">
      {label && <span className="text-sm font-medium text-gray-700">{label}</span>}

      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only peer"
        />

        <div
          className={`${sizes[size]} bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-300 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        />

        <div
          className={`absolute top-0.5 left-0.5 ${knobSizes[size]} bg-white rounded-full shadow-md transition-transform duration-300 ${disabled ? 'opacity-75' : ''} ${size === 'sm' ? 'peer-checked:translate-x-4' : size === 'md' ? 'peer-checked:translate-x-5' : 'peer-checked:translate-x-6'
            }`}
        />
      </div>
    </label>
  );
};

export default Toggle;