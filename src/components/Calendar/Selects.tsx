import React, { FC } from 'react';
import { SelectProps } from './types';
import { useCalendar } from './CalendarContext';
import clsx from 'clsx';

const baseSelectStyles =
  'p-2 rounded-lg bg-transparent hover:bg-gray-100 transition-colors';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const MonthSelect: FC<Omit<SelectProps, 'type'>> = ({ className }) => {
  const { defaultMonth } = useCalendar();
  const currentMonth = defaultMonth?.getMonth() ?? new Date().getMonth();

  return (
    <select value={currentMonth} className={clsx(baseSelectStyles, className)}>
      {months.map((month, index) => (
        <option key={month} value={index}>
          {month}
        </option>
      ))}
    </select>
  );
};

export const YearSelect: FC<Omit<SelectProps, 'type'>> = ({ className }) => {
  const { defaultMonth } = useCalendar();
  const currentYear = defaultMonth?.getFullYear() ?? new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

  return (
    <select value={currentYear} className={clsx(baseSelectStyles, className)}>
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
};
