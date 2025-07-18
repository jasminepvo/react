import { forwardRef } from 'react';
import clsx from 'clsx';
import { ActionItemProps } from './types';
import { useActionItemContext } from './useActionItemContext';

export const ActionItemButton = forwardRef<HTMLButtonElement, ActionItemProps>(
  ({ onClick, disabled = false, children, className = '', ...props }, ref) => {
    // Use the custom hook to get the appropriate context
    const { contextType, context } = useActionItemContext();

    const baseClassName =
      'inline-flex items-center justify-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none';
    const disabledClassName = disabled
      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
      : 'bg-blue-600 text-white hover:bg-blue-700';
    const combinedClassName = clsx(baseClassName, disabledClassName, className);

    // Handle click based on context type
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;

      // Call the original onClick if provided
      onClick?.(event);

      // Additional context-specific behavior
      if (contextType === 'calendar') {
        // In Calendar context, call the onSubmit function if available
        if (context.onSubmit) {
          context.onSubmit();
        }
      } else if (contextType === 'dateField') {
        // In DateField context, we need to handle this differently
        // The DateField context doesn't have onSubmit, so we'll rely on the onClick prop
        // or handle it through the parent components
      }
    };

    return (
      <button
        ref={ref}
        type='button'
        onClick={handleClick}
        className={combinedClassName}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);
