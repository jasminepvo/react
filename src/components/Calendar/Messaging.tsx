import React, { FC } from 'react';
import { MessagingProps } from './types';
import { useCalendar } from './CalendarContext';
import clsx from 'clsx';

export const Messaging: FC<MessagingProps> = ({
  children,
  className,
  format = 'long',
}) => {
  const { selectedDate } = useCalendar();

  const formatDate = (date: Date) => {
    if (format === 'short') {
      return date.toLocaleDateString();
    }
    return date.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className={clsx('text-center mt-4 text-sm text-gray-600', className)}>
      {children ||
        (selectedDate
          ? `Selected date: ${formatDate(selectedDate)}`
          : 'Select a date')}
    </div>
  );
};
