import React from 'react';
import { useDateFieldContext } from './DateFieldContext';
import clsx from 'clsx';
import { BaseProps } from './types';

const HelpText: React.FC<BaseProps> = ({ className = '' }) => {
  const ctx = useDateFieldContext();
  if (!ctx.helpText) return null;
  return (
    <p className={clsx('mt-1 ml-1 text-xs text-black', className)}>
      {ctx.helpText}
    </p>
  );
};

export default HelpText;
