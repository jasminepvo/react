import React from 'react';
import { useDateFieldContext } from './DateFieldContext';
import * as Popover from '@radix-ui/react-popover';

const Trigger: React.FC<{
  className?: string;
  style?: React.CSSProperties;
}> = ({ className = '', style }) => {
  const ctx = useDateFieldContext();
  return (
    <Popover.Trigger asChild>
      <button
        type='button'
        className={`absolute right-2 top-1/2 -translate-y-1/2 text-pink-500 hover:text-pink-700 focus:outline-none ${className}`}
        aria-label='Open calendar'
        disabled={ctx.disabled}
        tabIndex={-1}
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
