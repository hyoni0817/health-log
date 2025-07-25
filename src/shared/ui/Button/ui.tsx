'use client';

import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'action';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}: ButtonProps) => {
  const baseClasses =
    'inline-flex items-center justify-center rounded-xl font-medium transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    action: 'bg-(--color-gray-75) text-gray-800 hover:bg-gray-200 focus:ring-gray-500 justify-between',
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      {...props}
    >
      {leftIcon && <span className="mr-3">{leftIcon}</span>}
      <span className={variant === 'action' ? 'flex-1 text-left' : ''}>{children}</span>
      {rightIcon && <span className="ml-3">{rightIcon}</span>}
    </button>
  );
};
