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
  addMonths,
} from 'date-fns';
import { GridProps, GridHeaderProps, GridBodyProps } from './types';
import { useCalendarContext } from './CalendarContext';
import React from 'react';

// Grid Component
export const Grid: FC<GridProps> = ({ className, children }) => (
  <table className={className} role='grid' aria-label='Calendar'>
    {children}
  </table>
);

// Helper function to format weekday names
function formatWeekdayName(
  fullName: string,
  format: 'short' | 'med' | 'long' | 'full'
) {
  if (format === 'short') return fullName[0];
  if (format === 'med') return fullName.slice(0, 2);
  if (format === 'long') return fullName.slice(0, 3);
  if (format === 'full') return fullName;
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
    <thead>
      <tr
        className={clsx(
          'grid grid-cols-7 gap-px bg-gray-100 text-center text-xs text-gray-500 py-2',
          className
        )}
      >
        {weekDays.map((day, i) => (
          <th key={i} scope='col' className='font-normal'>
            {day}
          </th>
        ))}
      </tr>
    </thead>
  );
};

// Grid Body Component
export const GridBody: FC<GridBodyProps> = ({
  className,
  showOutsideDays = true,
  weekStartsOn = 'sunday', // Default to 'sunday'
}) => {
  const {
    month,
    selectedDate,
    paymentDueDate,
    onSelectDate,
    focusedDate,
    setFocusedDate,
    focusFirstDate,
    getCalendarDates,
    setMonth,
    onSubmit,
  } = useCalendarContext();

  // Keyboard navigation handler
  const handleDateKeyDown = (event: React.KeyboardEvent, currentDate: Date) => {
    const dates = getCalendarDates();
    const currentIndex = dates.findIndex(
      (date) => date.getTime() === currentDate.getTime()
    );

    if (currentIndex === -1) return;

    let newDate: Date | undefined;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        if (currentIndex > 0) {
          // Stay within current month view
          newDate = dates[currentIndex - 1];
        } else {
          // Navigate to previous month
          const prevMonth = addMonths(month, -1);
          setMonth(prevMonth);

          // Calculate the corresponding date in the previous month
          const currentDayOfWeek = currentDate.getDay();
          const prevMonthStart = startOfMonth(prevMonth);
          const prevMonthEnd = endOfMonth(prevMonth);
          const prevMonthCalendarStart = startOfWeek(prevMonthStart, {
            weekStartsOn: 0,
          });
          const prevMonthCalendarEnd = endOfWeek(prevMonthEnd, {
            weekStartsOn: 0,
          });

          // Get all dates in the previous month view
          const prevMonthDates = eachDayOfInterval({
            start: prevMonthCalendarStart,
            end: prevMonthCalendarEnd,
          });

          // Find the same day of week in the last week of previous month
          const lastWeekStartIndex = prevMonthDates.length - 7;
          const targetDateIndex = lastWeekStartIndex + currentDayOfWeek;

          if (targetDateIndex >= 0 && targetDateIndex < prevMonthDates.length) {
            newDate = prevMonthDates[targetDateIndex];
          }
        }
        break;

      case 'ArrowRight':
        event.preventDefault();
        if (currentIndex < dates.length - 1) {
          // Stay within current month view
          newDate = dates[currentIndex + 1];
        } else {
          // Navigate to next month
          const nextMonth = addMonths(month, 1);
          setMonth(nextMonth);

          // Calculate the corresponding date in the next month
          const currentDayOfWeek = currentDate.getDay();
          const nextMonthStart = startOfMonth(nextMonth);
          const nextMonthEnd = endOfMonth(nextMonth);
          const nextMonthCalendarStart = startOfWeek(nextMonthStart, {
            weekStartsOn: 0,
          });
          const nextMonthCalendarEnd = endOfWeek(nextMonthEnd, {
            weekStartsOn: 0,
          });

          // Get all dates in the next month view
          const nextMonthDates = eachDayOfInterval({
            start: nextMonthCalendarStart,
            end: nextMonthCalendarEnd,
          });

          // Find the same day of week in the first week of next month
          const targetDateIndex = currentDayOfWeek;

          if (targetDateIndex >= 0 && targetDateIndex < nextMonthDates.length) {
            newDate = nextMonthDates[targetDateIndex];
          }
        }
        break;

      case 'ArrowUp': {
        event.preventDefault();
        const weekIndex = Math.floor(currentIndex / 7);
        const dayOfWeek = currentIndex % 7;
        const targetIndex = (weekIndex - 1) * 7 + dayOfWeek;

        if (targetIndex >= 0) {
          // Stay within current month view
          newDate = dates[targetIndex];
        } else {
          // Navigate to previous month
          const prevMonth = addMonths(month, -1);
          setMonth(prevMonth);

          // Calculate the corresponding date in the previous month
          const currentDayOfWeek = currentDate.getDay();
          const prevMonthStart = startOfMonth(prevMonth);
          const prevMonthEnd = endOfMonth(prevMonth);
          const prevMonthCalendarStart = startOfWeek(prevMonthStart, {
            weekStartsOn: 0,
          });
          const prevMonthCalendarEnd = endOfWeek(prevMonthEnd, {
            weekStartsOn: 0,
          });

          // Get all dates in the previous month view
          const prevMonthDates = eachDayOfInterval({
            start: prevMonthCalendarStart,
            end: prevMonthCalendarEnd,
          });

          // Find the same day of week in the last week of previous month
          const lastWeekStartIndex = prevMonthDates.length - 7;
          const targetDateIndex = lastWeekStartIndex + currentDayOfWeek;

          if (targetDateIndex >= 0 && targetDateIndex < prevMonthDates.length) {
            newDate = prevMonthDates[targetDateIndex];
          }
        }
        break;
      }

      case 'ArrowDown': {
        event.preventDefault();
        const weekIndexDown = Math.floor(currentIndex / 7);
        const dayOfWeekDown = currentIndex % 7;
        const targetIndexDown = (weekIndexDown + 1) * 7 + dayOfWeekDown;

        if (targetIndexDown < dates.length) {
          // Stay within current month view
          newDate = dates[targetIndexDown];
        } else {
          // Navigate to next month
          const nextMonth = addMonths(month, 1);
          setMonth(nextMonth);

          // Calculate the corresponding date in the next month
          const currentDayOfWeek = currentDate.getDay();
          const nextMonthStart = startOfMonth(nextMonth);
          const nextMonthEnd = endOfMonth(nextMonth);
          const nextMonthCalendarStart = startOfWeek(nextMonthStart, {
            weekStartsOn: 0,
          });
          const nextMonthCalendarEnd = endOfWeek(nextMonthEnd, {
            weekStartsOn: 0,
          });

          // Get all dates in the next month view
          const nextMonthDates = eachDayOfInterval({
            start: nextMonthCalendarStart,
            end: nextMonthCalendarEnd,
          });

          // Find the same day of week in the first week of next month
          const targetDateIndex = currentDayOfWeek;

          if (targetDateIndex >= 0 && targetDateIndex < nextMonthDates.length) {
            newDate = nextMonthDates[targetDateIndex];
          }
        }
        break;
      }

      case 'Enter':
      case ' ':
        event.preventDefault();
        onSelectDate(currentDate);
        break;

      case 'Escape':
        event.preventDefault();
        // Close popover if we're in a DateField context
        onSubmit?.();
        break;

      case 'Home':
        event.preventDefault();
        focusFirstDate();
        return;

      case 'End': {
        event.preventDefault();
        // Focus last date
        const lastDate = dates[dates.length - 1];
        if (lastDate) {
          setFocusedDate(lastDate);
        }
        return;
      }

      default:
        return;
    }

    if (newDate) {
      setFocusedDate(newDate);
    }
  };

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

  // Focus first date when component mounts or month changes
  React.useEffect(() => {
    if (
      !focusedDate &&
      focusFirstDate &&
      typeof focusFirstDate === 'function'
    ) {
      focusFirstDate();
    }
  }, [month, focusedDate, focusFirstDate]);

  // Additional effect to ensure focus is set when calendar opens
  React.useEffect(() => {
    if (focusedDate && typeof focusedDate === 'object') {
      // Small delay to ensure the DOM is updated
      const timer = setTimeout(() => {
        const focusedButton = document.querySelector(
          `[data-date="${focusedDate.toISOString()}"][tabindex="0"]`
        ) as HTMLElement;
        if (focusedButton) {
          focusedButton.focus();
        }
      }, 10); // Slightly longer delay to ensure DOM is ready
      return () => clearTimeout(timer);
    }
  }, [focusedDate]);

  const getDayClasses = (date: Date) => {
    const isOutsideMonth = !isSameMonth(date, month);
    const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
    const isPaymentDue = paymentDueDate
      ? isSameDay(date, paymentDueDate)
      : false;
    const isToday = isSameDay(date, new Date());
    const isFocused = focusedDate ? isSameDay(date, focusedDate) : false;

    const baseClasses =
      'aspect-square flex items-center justify-center text-md cursor-pointer';

    return clsx(baseClasses, {
      // Text colors
      'bg-pink-100 text-pink-300': isOutsideMonth && !isSelected,
      'text-white': isSelected,
      'font-bold': isToday,

      // Background colors
      'bg-white': !isOutsideMonth && !isSelected && !isFocused,
      'bg-pink-500': isSelected,
      'bg-pink-200': isFocused && !isSelected,
      'hover:bg-pink-500': !isSelected,

      // Borders and special states
      'outline outline-1 outline-yellow-400': isPaymentDue,
      'focus:ring-2 focus:ring-pink-500 focus:ring-offset-2': true,
      'focus:outline-none': true,
    });
  };

  const handleDateClick = (date: Date) => {
    onSelectDate(date);
    if (setFocusedDate && typeof setFocusedDate === 'function') {
      setFocusedDate(date);
    }
  };

  return (
    <tbody
      className={clsx(
        'grid gap-px bg-gray-100 rounded-lg overflow-hidden',
        className
      )}
    >
      {weeks.map((week, weekIndex) => (
        <tr key={weekIndex} className='grid grid-cols-7 gap-px' role='row'>
          {week.map((date, dayIndex) => {
            const isOutsideMonth = !isSameMonth(date, month);
            if (!showOutsideDays && isOutsideMonth) {
              return (
                <td
                  key={dayIndex}
                  className='aspect-square bg-gray-100 cursor-default'
                  role='gridcell'
                />
              );
            }

            const isFocused = focusedDate
              ? isSameDay(date, focusedDate)
              : false;

            return (
              <td
                key={dayIndex}
                className={getDayClasses(date)}
                role='gridcell'
                data-date={date.toISOString()}
                aria-selected={
                  selectedDate ? isSameDay(date, selectedDate) : false
                }
                aria-label={`${dateFnsFormat(date, 'EEEE, MMMM d, yyyy')}${
                  isOutsideMonth ? ' (outside current month)' : ''
                }`}
              >
                <button
                  className='w-full h-full flex items-center justify-center'
                  onClick={() => handleDateClick(date)}
                  onKeyDown={(e) => handleDateKeyDown(e, date)}
                  disabled={isOutsideMonth && !showOutsideDays}
                  tabIndex={isFocused ? 0 : -1}
                >
                  {dateFnsFormat(date, 'd')}
                </button>
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};
