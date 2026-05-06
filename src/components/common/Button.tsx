// src/components/common/Button.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = "",
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary: "bg-[rgb(var(--primary))] text-white hover:bg-opacity-90 shadow-sm",
    secondary: "bg-[rgb(var(--muted))] text-[rgb(var(--foreground))] hover:bg-gray-200",
    outline: "border border-[rgb(var(--border))] bg-transparent hover:bg-[rgb(var(--muted))] text-[rgb(var(--foreground))]"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-[6px]",
    md: "px-5 py-2.5 rounded-[var(--radius-btn)]",
    lg: "px-8 py-3 text-lg rounded-[10px]"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;