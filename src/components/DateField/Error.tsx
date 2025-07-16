import React from 'react';
import { useDateFieldContext } from './DateFieldContext';
import clsx from 'clsx';

interface ErrorProps {
  className?: string;
}

const Error: React.FC<ErrorProps> = ({ className = '' }) => {
  const ctx = useDateFieldContext();
  if (!ctx.inputError) return null;
  return (
    <p
      className={clsx(
        'text-sm text-red-600 flex items-center gap-2',
        className
      )}
    >
      {ctx.inputError}
    </p>
  );
};

export default Error;
