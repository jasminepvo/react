import React, { FC } from 'react';
import { format as dateFnsFormat } from 'date-fns';
import { CaptionProps } from './types';
import { useCalendarContext } from './CalendarContext';

export const Caption: FC<CaptionProps> = ({
  className,
  children,
  captionLayout = 'label',
}) => {
  const { month } = useCalendarContext();

  if (captionLayout === 'label') {
    return <div className={className}>{dateFnsFormat(month, 'MMMM yyyy')}</div>;
  }

  return <div className={className}>{children}</div>;
};
