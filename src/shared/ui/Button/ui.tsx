'use client';

import { ReactNode, ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'action' | 'modal-cancel' | 'modal-ok';
type ButtonSize = 'compact' | 'default' | 'comfortable' | 'emphasis';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'default',
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}: ButtonProps) => {
  const baseClasses = 'rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2';

  const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    action: 'bg-(--color-gray-75) text-gray-800 hover:bg-gray-200 focus:ring-gray-500 justify-between',
    'modal-ok': 'bg-(--color-gray-200) text-(--color-gray-900)',
    'modal-cancel': 'text-(--text) hover:bg-gray-300',
  };

  // 8-point grid system 기반 사이즈 정의
  const sizeClasses: Record<ButtonSize, string> = {
    compact: 'px-3 py-2 text-sm', // height: 32px (4x8) 좁은 공간용
    default: 'px-4 py-2 text-base', // height: 40px (5x8) 기본 사이즈
    comfortable: 'px-5 py-3 text-base', // height: 48px (6x8) 여유있는 사이즈
    emphasis: 'px-6 py-4 text-lg', // height: 56px (7x8) 강조용 큰 사이즈
  } as const;

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      {...props}
    >
      {leftIcon && <span className="button-icon">{leftIcon}</span>}
      <span className={variant === 'action' ? 'flex-1 text-left' : ''}>{children}</span>
      {rightIcon && <span className="button-icon">{rightIcon}</span>}
    </button>
  );
};
