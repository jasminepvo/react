import { FC } from 'react';
import { SelectProps } from './types';
import { useCalendar } from './CalendarContext';
import { getMonth, getYear, format } from 'date-fns';
import clsx from 'clsx';

const baseSelectStyles =
  'p-2 rounded-lg bg-transparent hover:bg-gray-100 transition-colors';

// Use date-fns to generate month names
const months = Array.from({ length: 12 }, (_, i) =>
  format(new Date(2024, i, 1), 'MMMM')
);

/**
 * MonthSelect Component
 * Renders a dropdown for selecting months
 * - Uses Omit to remove 'type' from SelectProps since it's hardcoded for this component
 * - Gets defaultMonth from CalendarContext
 * - Falls back to current month if defaultMonth is not provided
 * - Uses date-fns for consistent date handling
 */
export const MonthSelect: FC<Omit<SelectProps, 'type'>> = ({ className }) => {
  const { defaultMonth } = useCalendar();
  // Get current month (0-11) using date-fns
  const currentMonth = defaultMonth
    ? getMonth(defaultMonth)
    : getMonth(new Date());

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

/**
 * YearSelect Component
 * Renders a dropdown for selecting years
 * - Uses Omit to remove 'type' from SelectProps since it's hardcoded for this component
 * - Gets defaultMonth from CalendarContext
 * - Falls back to current year if defaultMonth is not provided
 * - Shows a range of 10 years (5 years before and 4 years after current year)
 * - Uses date-fns for consistent date handling
 */
export const YearSelect: FC<Omit<SelectProps, 'type'>> = ({ className }) => {
  const { defaultMonth } = useCalendar();
  // Get current year using date-fns
  const currentYear = defaultMonth
    ? getYear(defaultMonth)
    : getYear(new Date());
  // Generate array of years: 5 years before and 4 years after current year
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
