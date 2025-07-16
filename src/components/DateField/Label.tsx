import React from 'react';
import { useDateFieldContext } from './DateFieldContext';

const Label: React.FC<React.PropsWithChildren<{ required?: boolean }>> = ({
  children,
  required,
}) => {
  const ctx = useDateFieldContext();
  return (
    <label className='block text-xs font-normal text-taupe'>
      {children || ctx.label}
      {(required ?? ctx.required) && (
        <span className='text-red-600 ml-1'>*</span>
      )}
    </label>
  );
};

export default Label;
