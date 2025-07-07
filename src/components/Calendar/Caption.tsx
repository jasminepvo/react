import { FC } from 'react';
import { format as dateFnsFormat } from 'date-fns';
import { CaptionProps } from './types';
import { useCalendarContext } from './CalendarContext';

export const Caption: FC<CaptionProps> = ({ className, children }) => {
  const { month } = useCalendarContext();

  if (children) {
    return <div className={className}>{children}</div>;
  }

  return <div className={className}>{dateFnsFormat(month, 'MMMM yyyy')}</div>;
};
