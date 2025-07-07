import { FC } from 'react';
import {
  GridProps,
  GridHeaderProps,
  HeaderCellProps,
  GridBodyProps,
  CellProps,
} from './types';
import { useCalendar } from './CalendarContext';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isSameDay,
  getDate,
} from 'date-fns';
import clsx from 'clsx';

const Grid: FC<GridProps> = ({ children, className, layout = 'default' }) => {
  return (
    <div
      className={clsx(
        'mt-4',
        layout === 'compact' ? 'gap-1' : 'gap-2',
        className
      )}
    >
      {children}
    </div>
  );
};

const GridHeader: FC<GridHeaderProps> = ({ render, className }) => {
  // Use date-fns to generate weekday names
  const weekdays = Array.from({ length: 7 }, (_, i) =>
    format(new Date(2024, 0, i + 1), 'EEEE')
  );

  return (
    <div className={clsx('grid grid-cols-7 mb-2', className)}>
      {weekdays.map((weekday) =>
        render ? (
          render(weekday)
        ) : (
          <HeaderCell key={weekday}>{weekday}</HeaderCell>
        )
      )}
    </div>
  );
};

const HeaderCell: FC<HeaderCellProps> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        'text-center text-sm font-medium text-gray-500',
        className
      )}
    >
      {children}
    </div>
  );
};

const GridBody: FC<GridBodyProps> = ({ render, className }) => {
  const { defaultMonth = new Date() } = useCalendar();

  // Calculate dates for the month using date-fns
  const monthStart = startOfMonth(defaultMonth);
  const monthEnd = endOfMonth(defaultMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startingDay = getDay(monthStart);

  // Create calendar grid
  const days: (Date | null)[] = [];

  // Add empty cells for days before the first of the month
  for (let i = 0; i < startingDay; i++) {
    days.push(null);
  }

  // Add all days of the month
  days.push(...daysInMonth);

  // Group days into weeks
  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <div className={clsx('grid gap-1', className)}>
      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className='grid grid-cols-7 gap-1'>
          {week.map((date, dayIndex) => (
            <div key={dayIndex} className='aspect-square'>
              {date && (render ? render(date) : <Cell date={date} />)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const Cell: FC<CellProps> = ({ date, className }) => {
  const { selectedDate, onSelectDate, paymentDueDate } = useCalendar();

  const isSelected = selectedDate && isSameDay(selectedDate, date);
  const isPaymentDue = paymentDueDate && isSameDay(paymentDueDate, date);

  return (
    <button
      onClick={() => onSelectDate(date)}
      className={clsx(
        'w-full h-full flex items-center justify-center rounded-lg transition-colors',
        isSelected && 'bg-blue-500 text-white',
        isPaymentDue && 'border-2 border-red-500',
        !isSelected && !isPaymentDue && 'hover:bg-gray-100',
        className
      )}
    >
      {getDate(date)}
    </button>
  );
};

export { Grid, GridHeader, GridBody, HeaderCell, Cell };
