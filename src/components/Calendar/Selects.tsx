import React, { FC } from 'react';
import { format as dateFnsFormat } from 'date-fns';
import { CompoundComponentProps } from './types';
import { useCalendarContext } from './CalendarContext';

export const MonthSelect: FC<CompoundComponentProps> = ({ className }) => {
  const { month, setMonth } = useCalendarContext();

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = new Date(month);
    newMonth.setMonth(parseInt(event.target.value));
    setMonth(newMonth);
  };

  return (
    <select
      className={`calendar-select ${className || ''}`}
      value={month.getMonth()}
      onChange={handleMonthChange}
      aria-label='Select month'
    >
      {Array.from({ length: 12 }, (_, i) => (
        <option key={i} value={i}>
          {dateFnsFormat(new Date(2024, i, 1), 'MMMM')}
        </option>
      ))}
    </select>
  );
};

export const YearSelect: FC<CompoundComponentProps> = ({ className }) => {
  const { month, setMonth } = useCalendarContext();
  const currentYear = new Date().getFullYear();

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = new Date(month);
    newMonth.setFullYear(parseInt(event.target.value));
    setMonth(newMonth);
  };

  return (
    <select
      className={`calendar-select ${className || ''}`}
      value={month.getFullYear()}
      onChange={handleYearChange}
      aria-label='Select year'
    >
      {Array.from({ length: 10 }, (_, i) => currentYear - 5 + i).map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
};
