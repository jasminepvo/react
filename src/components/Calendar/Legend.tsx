import { FC } from 'react';
import { BaseCalendarProps } from './types';
import clsx from 'clsx';

export interface LegendItemProps extends BaseCalendarProps {
  type: 'selected' | 'payment-due';
}

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

const LegendItem: FC<LegendItemProps> = ({ children, type, className }) => {
  return (
    <div className={clsx('flex items-center gap-2', className)}>
      <div
        className={clsx('w-4 h-4 rounded-lg', {
          'bg-blue-200': type === 'selected',
          'border-2 border-yellow-300 bg-yellow-100': type === 'payment-due',
        })}
      />
      <span className='text-sm text-gray-600'>{children}</span>
    </div>
  );
};

export { LegendItem };
