import React, { FC } from 'react';
import { NavigationProps } from './types';
import { useCalendarContext } from './CalendarContext';

export const Navigation: FC<NavigationProps> = ({
  className,
  navLayout = 'around',
}) => {
  const { month, setMonth } = useCalendarContext();

  const handlePrevMonth = () => {
    const prevMonth = new Date(month);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setMonth(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(month);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setMonth(nextMonth);
  };

  return (
    <div className={`calendar-navigation ${className || ''}`}>
      <button onClick={handlePrevMonth} aria-label='Previous month'>
        ←
      </button>
      {navLayout === 'around' && <div className='flex-1' />}
      <button onClick={handleNextMonth} aria-label='Next month'>
        →
      </button>
    </div>
  );
};
