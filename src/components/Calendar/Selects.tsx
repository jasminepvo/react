import React, { FC } from 'react';
import clsx from 'clsx';
import { format as dateFnsFormat, addMonths, addYears } from 'date-fns';
import {
  MonthSelectProps,
  YearSelectProps,
  MonthYearSelectProps,
} from './types';
import { useCalendarContext } from './CalendarContext';

const selectBaseClasses = clsx(
  'py-1 pr-4 pl-3',
  'border border-gray-200 rounded-md',
  'bg-white text-pink-900',
  'cursor-pointer appearance-none',
  'focus:outline-none focus:ring-2 focus:ring-blue-500',
);

export const MonthYearSelect: FC<MonthYearSelectProps> = ({
  className,
  optionsBefore = 0,
  optionsAfter = 12,
}) => {
  const { month, setMonth } = useCalendarContext();

  const options = Array.from(
    { length: optionsBefore + optionsAfter + 1 },
    (_, i) => {
      const date = addMonths(month, i - optionsBefore);
      return {
        value: date.toISOString(),
        label: dateFnsFormat(date, 'MMMM yyyy'),
      };
    }
  );

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(new Date(event.target.value));
  };

  return (
    <select
      className={clsx(selectBaseClasses, className)}
      value={month.toISOString()}
      onChange={handleChange}
      aria-label='Select month and year'
    >
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

export const MonthSelect: FC<MonthSelectProps> = ({
  className,
  optionsBefore = 0,
  optionsAfter = 11, // Show full year of months by default
}) => {
  const { month, setMonth } = useCalendarContext();
  const currentMonth = month.getMonth();

  const options = Array.from(
    { length: optionsBefore + optionsAfter + 1 },
    (_, i) => {
      const monthIndex = (currentMonth - optionsBefore + i + 12) % 12; // Ensure it wraps around
      const date = new Date(month.getFullYear(), monthIndex, 1);
      return {
        value: monthIndex,
        label: dateFnsFormat(date, 'MMMM'),
      };
    }
  );

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = new Date(month);
    newMonth.setMonth(parseInt(event.target.value));
    setMonth(newMonth);
  };

  return (
    <select
      className={clsx(selectBaseClasses, className)}
      value={month.getMonth()}
      onChange={handleMonthChange}
      aria-label='Select month'
    >
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

export const YearSelect: FC<YearSelectProps> = ({
  className,
  optionsBefore = 0,
  optionsAfter = 5,
}) => {
  const { month, setMonth } = useCalendarContext();

  const options = Array.from(
    { length: optionsBefore + optionsAfter + 1 },
    (_, i) => {
      const date = addYears(month, i - optionsBefore);
      return {
        value: date.getFullYear(),
        label: date.getFullYear().toString(),
      };
    }
  );

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = new Date(month);
    newMonth.setFullYear(parseInt(event.target.value));
    setMonth(newMonth);
  };

  return (
    <select
      className={clsx(selectBaseClasses, className)}
      value={month.getFullYear()}
      onChange={handleYearChange}
      aria-label='Select year'
    >
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};
