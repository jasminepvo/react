import { forwardRef } from 'react';
import clsx from 'clsx';
import { ActionItemProps } from './types';

export const ActionItemButton = forwardRef<HTMLButtonElement, ActionItemProps>(
  ({ onClick, disabled = false, children, className = '', ...props }, ref) => {
    const baseClassName =
      'inline-flex items-center justify-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none';
    const disabledClassName = disabled
      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
      : 'bg-blue-600 text-white hover:bg-blue-700';
    const combinedClassName = clsx(baseClassName, disabledClassName, className);

    return (
      <button
        ref={ref}
        type='button'
        onClick={disabled ? undefined : onClick}
        className={combinedClassName}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);
