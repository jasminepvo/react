import React from 'react';
import { useDateFieldContext } from './DateFieldContext';
import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';

interface TriggerProps {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * @description Trigger component for DateField
 * @param {TriggerProps} props - The props for the Trigger component
 * @param {string} props.className - The className of the Trigger component
 * @param {React.CSSProperties} props.style - The style of the Trigger component
 * @returns {React.ReactNode} The Trigger component
 */

const Trigger: React.FC<TriggerProps> = ({ className = '', style }) => {
  const ctx = useDateFieldContext();

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      ctx.setOpen(true);
    }
  };

  const handleFocus = () => {
    // Focus received - no action needed
  };

  const handleClick = () => {
    // Click handled by Radix UI Popover.Trigger
  };

  const hasError = !!ctx.inputError;

  return (
    <Popover.Trigger asChild>
      <button
        type='button'
        className={clsx(
          'flex-shrink-0 p-2 focus:ring-2 focus:ring-pink-500',
          {
            'text-pink-500 hover:text-pink-700': !hasError,
            'text-red-500 hover:text-red-700': hasError,
          },
          className
        )}
        aria-label='Open calendar'
        disabled={ctx.disabled}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onClick={handleClick}
        style={style}
      >
        <svg width='20' height='20' fill='currentColor' viewBox='0 0 20 20'>
          <path d='M6 2a1 1 0 0 1 1 1v1h6V3a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1V3a1 1 0 0 1 1-1zm8 4V6H6v.01H4v10h12V6h-2z' />
        </svg>
      </button>
    </Popover.Trigger>
  );
};

export default Trigger;
