import React from 'react';
import { useDateFieldContext } from './DateFieldContext';
import clsx from 'clsx';

interface LabelProps extends React.PropsWithChildren {
  required?: boolean;
  className?: string;
}

const Label: React.FC<LabelProps> = ({
  children,
  required,
  className = '',
}) => {
  const ctx = useDateFieldContext();
  return (
    <label className={clsx('block text-xs font-normal text-taupe', className)}>
      {children || ctx.label}
      {(required ?? ctx.required) && (
        <span className='text-red-600 ml-1'>*</span>
      )}
    </label>
  );
};

export default Label;
