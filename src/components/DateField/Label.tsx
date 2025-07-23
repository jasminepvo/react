import React from 'react';
import { useDateFieldContext } from './DateFieldContext';
import clsx from 'clsx';

interface LabelProps extends React.PropsWithChildren {
  required?: boolean;
  className?: string;
}

/**
 * @description Label component for DateField
 * @param {LabelProps} props - The props for the Label component
 * @param {React.ReactNode} props.children - The children of the Label component
 * @param {boolean} props.required - Whether the field is required
 * @param {string} props.className - The className of the Label component
 * @returns {React.ReactNode} The Label component
 */

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
