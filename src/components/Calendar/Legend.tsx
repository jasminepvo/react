import { FC } from 'react';
import clsx from 'clsx';
import { BaseProps, LegendItemProps } from './types';

export const Legend: FC<BaseProps> = ({ className, children }) => (
  <div className={clsx('flex gap-4 p-4', className)}>
    {children}
  </div>
);

export const LegendItem: FC<LegendItemProps> = ({
  className,
  children,
  type,
}) => (
  <div
    className={clsx('flex items-center gap-2 text-sm text-gray-600', className)}
  >
    <div
      className={clsx('w-4 h-4', {
        'bg-pink-500': type === 'selected',
        'border-2 border-yellow-400': type === 'payment-due',
      })}
    />
    <span>{children}</span>
  </div>
);
