import React from 'react';
import { useDateFieldContext } from './DateFieldContext';

const Error: React.FC = () => {
  const ctx = useDateFieldContext();
  if (!ctx.inputError) return null;
  return (
    <p className='text-sm text-red-600 flex items-center gap-2'>
      {ctx.inputError}
    </p>
  );
};

export default Error;
