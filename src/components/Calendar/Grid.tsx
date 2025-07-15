import { FC } from 'react';
import clsx from 'clsx';
import {
  format as dateFnsFormat,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  startOfWeek,
  endOfWeek,
  addDays,
} from 'date-fns';
import { GridProps, GridHeaderProps, GridBodyProps } from './types';
import { useCalendarContext } from './CalendarContext';

// Grid Component
export const Grid: FC<GridProps> = ({ className, children }) => (
  <div className={className}>{children}</div>
);

// Helper function to format weekday names
function formatWeekdayName(fullName: string, format: 'short' | 'med' | 'long') {
  if (format === 'short') return fullName[0];
  if (format === 'med') return fullName.slice(0, 2);
  return fullName;
}

// Grid Header Component
export const GridHeader: FC<GridHeaderProps> = ({
  className,
  weekdayChar = 'med', // Default to 'med'
  weekStartsOn = 'sunday', // Default to 'sunday'
}) => {
  // Convert weekStartsOn to number for date-fns
  const weekStartsOnNum = weekStartsOn === 'monday' ? 1 : 0;
  // Get the start of the week based on weekStartsOn
  const baseDate = startOfWeek(new Date(), { weekStartsOn: weekStartsOnNum });

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(baseDate, i);
    const fullName = dateFnsFormat(date, 'EEEE');
    return formatWeekdayName(fullName, weekdayChar);
  });

  return (
    <div
      className={clsx(
        'grid grid-cols-7 gap-px bg-gray-100 text-center text-xs text-gray-500 py-2',
        className
      )}
    >
      {weekDays.map((day, i) => (
        <div key={i}>{day}</div>
      ))}
    </div>
  );
};

// Grid Body Component
export const GridBody: FC<GridBodyProps> = ({
  className,
  showOutsideDays = true,
  weekStartsOn = 'sunday', // Default to 'sunday'
}) => {
  const { month, selectedDate, paymentDueDate, onSelectDate } =
    useCalendarContext();

  // Convert weekStartsOn to number for date-fns
  const weekStartsOnNum = weekStartsOn === 'monday' ? 1 : 0;

  // Get the start and end dates for the calendar grid
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  const calendarStart = startOfWeek(monthStart, {
    weekStartsOn: weekStartsOnNum,
  });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: weekStartsOnNum });

  // Generate all dates to display
  const dates = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  // Group dates into weeks
  const weeks: Date[][] = [];
  let currentWeek: Date[] = [];

  dates.forEach((date) => {
    currentWeek.push(date);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  const getDayClasses = (date: Date) => {
    const isOutsideMonth = !isSameMonth(date, month);
    const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
    const isPaymentDue = paymentDueDate
      ? isSameDay(date, paymentDueDate)
      : false;
    const isToday = isSameDay(date, new Date());

    const baseClasses =
      'aspect-square flex items-center justify-center text-md cursor-pointer';

    return clsx(baseClasses, {
      // Text colors
      'bg-pink-100 text-pink-300': isOutsideMonth && !isSelected,
      'text-white': isSelected,
      'font-bold': isToday,

      // Background colors
      'bg-white': !isOutsideMonth && !isSelected,
      'bg-pink-500': isSelected,
      'hover:bg-pink-500': !isSelected,

      // Borders and special states
      'outline outline-1 outline-yellow-400': isPaymentDue,
      'focus:ring-1 focus:ring-pink-500': true,
    });
  };

  return (
    <div
      className={clsx(
        'grid gap-px bg-gray-100 rounded-lg overflow-hidden',
        className
      )}
    >
      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className='grid grid-cols-7 gap-px'>
          {week.map((date, dayIndex) => {
            const isOutsideMonth = !isSameMonth(date, month);
            if (!showOutsideDays && isOutsideMonth) {
              return (
                <div
                  key={dayIndex}
                  className='aspect-square bg-gray-100 cursor-default'
                />
              );
            }

            return (
              <button
                key={dayIndex}
                className={getDayClasses(date)}
                onClick={() => onSelectDate(date)}
                disabled={isOutsideMonth && !showOutsideDays}
              >
                {dateFnsFormat(date, 'd')}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};
