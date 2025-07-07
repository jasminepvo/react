import React, { FC } from 'react';
import { BaseCalendarProps, LegendItemProps, IndicatorProps } from './types';
import clsx from 'clsx';

export const Legend: FC<BaseCalendarProps> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        'flex items-center justify-center space-x-4',
        'mt-4',
        className
      )}
    >
      {children}
    </div>
  );
};

const LegendItem: FC<LegendItemProps> = ({
  children,
  indicator,
  className,
}) => {
  return (
    <div className={clsx('flex items-center gap-2', className)}>
      {indicator}
      <span className='text-sm text-gray-600'>{children}</span>
    </div>
  );
};

const SelectedIndicator: FC<IndicatorProps> = ({ className }) => {
  return <div className={clsx('w-4 h-4 rounded-lg bg-blue-500', className)} />;
};

const PaymentDueIndicator: FC<IndicatorProps> = ({ className }) => {
  return (
    <div
      className={clsx('w-4 h-4 rounded-lg border-2 border-red-500', className)}
    />
  );
};

export { LegendItem, SelectedIndicator, PaymentDueIndicator };
