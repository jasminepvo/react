import { FC } from 'react';
import { SelectProps } from './types';
import { useCalendar } from './CalendarContext';
import { getMonth, getYear, format, setMonth, setYear } from 'date-fns';
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
 * - Gets month from CalendarContext
 * - Updates the calendar context when month changes
 */
export const MonthSelect: FC<Omit<SelectProps, 'type'>> = ({ className }) => {
  const { month, setMonth: updateMonth } = useCalendar();
  const currentMonth = getMonth(month);

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(event.target.value, 10);
    updateMonth(setMonth(month, newMonth));
  };

  return (
    <select
      value={currentMonth}
      onChange={handleMonthChange}
      className={clsx(baseSelectStyles, className)}
    >
      {months.map((monthName, index) => (
        <option key={monthName} value={index}>
          {monthName}
        </option>
      ))}
    </select>
  );
};

/**
 * YearSelect Component
 * Renders a dropdown for selecting years
 * - Uses Omit to remove 'type' from SelectProps since it's hardcoded for this component
 * - Gets year from CalendarContext
 * - Updates the calendar context when year changes
 * - Shows a range of years (5 years before and 4 years after current year)
 */
export const YearSelect: FC<Omit<SelectProps, 'type'>> = ({ className }) => {
  const { month, setMonth: updateMonth } = useCalendar();
  const currentYear = getYear(month);

  // Generate array of years: 5 years before and 4 years after current year
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(event.target.value, 10);
    updateMonth(setYear(month, newYear));
  };

  return (
    <select
      value={currentYear}
      onChange={handleYearChange}
      className={clsx(baseSelectStyles, className)}
    >
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
};
