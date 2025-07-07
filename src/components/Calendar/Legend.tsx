import React, { FC } from 'react';
import { CompoundComponentProps, LegendItemProps } from './types';

export const Legend: FC<CompoundComponentProps> = ({ className, children }) => (
  <div className={`calendar-legend ${className || ''}`}>{children}</div>
);

export const LegendItem: FC<LegendItemProps> = ({
  className,
  children,
  type,
}) => (
  <div className={`calendar-legend-item ${className || ''}`}>
    <div
      className={`w-4 h-4 ${
        type === 'selected'
          ? 'bg-blue-500 rounded-full'
          : type === 'payment-due'
          ? 'border-2 border-yellow-300'
          : type === 'today'
          ? 'bg-gray-200 rounded-full'
          : ''
      }`}
    />
    <span>{children}</span>
  </div>
);
