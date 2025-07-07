import React from 'react';
import clsx from 'clsx';
import { NavigationButtonProps } from './types';
import { useCalendarContext } from './CalendarContext';

export const Navigation: React.FC<NavigationButtonProps> = ({
  className,
  direction,
}) => {
  const { month, setMonth } = useCalendarContext();

  const handleClick = () => {
    const newMonth = new Date(month);
    newMonth.setMonth(newMonth.getMonth() + (direction === 'prev' ? -1 : 1));
    setMonth(newMonth);
  };

  const buttonClasses = clsx(
    'p-2 text-white hover:text-black transition-colors',
    className
  );

  return (
    <button
      onClick={handleClick}
      className={buttonClasses}
      aria-label={`${direction === 'prev' ? 'Previous' : 'Next'} month`}
    >
      {direction === 'prev' ? '←' : '→'}
    </button>
  );
};
