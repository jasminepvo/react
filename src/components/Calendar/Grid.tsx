import { FC, useMemo } from 'react';
import clsx from 'clsx';
import {
  format as dateFnsFormat,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  startOfWeek,
  endOfWeek,
  addDays,
} from 'date-fns';
import { GridProps, GridHeaderProps, GridBodyProps } from './types';
import { useCalendarContext } from './CalendarContext';
import {
  CalendarGridContext,
  useCalendarGridContext,
} from './CalendarGridContext';
import {
  formatWeekdayName,
  getWeekStartsOnNum,
  groupDatesIntoWeeks,
  getDayClasses,
  calculatePreviousMonthDate,
  calculateNextMonthDate,
} from './helpers';
import React from 'react';

// Grid Component
export const Grid: FC<GridProps> = ({
  className,
  children,
  weekStartsOn = 'sunday',
  outsideDayClassName,
  showOutsideDays,
}) => {
  const contextValue = useMemo(
    () => ({
      weekStartsOn,
      outsideDayClassName,
      showOutsideDays,
    }),
    [weekStartsOn, outsideDayClassName, showOutsideDays]
  );
  return (
    <table
      className={clsx('w-full border-collapse', className)}
      role='grid'
      aria-label='Calendar'
    >
      <CalendarGridContext.Provider value={contextValue}>
        {children}
      </CalendarGridContext.Provider>
    </table>
  );
};

// Grid Header Component
export const GridHeader: FC<GridHeaderProps> = ({
  className,
  weekdayChar = 'med', // Default to 'med'
}) => {
  const { weekStartsOn } = useCalendarGridContext();
  // Convert weekStartsOn to number for date-fns
  const weekStartsOnNum = getWeekStartsOnNum(weekStartsOn);
  // Get the start of the week based on weekStartsOn
  const baseDate = startOfWeek(new Date(), { weekStartsOn: weekStartsOnNum });

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(baseDate, i);
    const fullName = dateFnsFormat(date, 'EEEE');
    return formatWeekdayName(fullName, weekdayChar);
  });

  return (
    <thead>
      <tr className={clsx('text-center text-sm py-2 font-normal', className)}>
        {weekDays.map((day, i) => (
          <th key={i} scope='col'>
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
}) => {
  const { weekStartsOn, outsideDayClassName } = useCalendarGridContext();
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
          newDate = calculatePreviousMonthDate(currentDate, month, setMonth);
        }
        break;

      case 'ArrowRight':
        event.preventDefault();
        if (currentIndex < dates.length - 1) {
          // Stay within current month view
          newDate = dates[currentIndex + 1];
        } else {
          // Navigate to next month
          newDate = calculateNextMonthDate(currentDate, month, setMonth);
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
          newDate = calculatePreviousMonthDate(currentDate, month, setMonth);
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
          newDate = calculateNextMonthDate(currentDate, month, setMonth);
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
  const weekStartsOnNum = getWeekStartsOnNum(weekStartsOn);

  // Get the start and end dates for the calendar grid
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  const calendarStart = startOfWeek(monthStart, {
    weekStartsOn: weekStartsOnNum,
  });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: weekStartsOnNum });

  // Generate all dates to display
  const dates = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  // Group dates into weeks using helper function
  const weeks = groupDatesIntoWeeks(dates);

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
  React.useLayoutEffect(() => {
    if (focusedDate && typeof focusedDate === 'object') {
      const focusedButton = document.querySelector(
        `button[data-date="${focusedDate.toISOString()}"][tabindex="0"]`
      ) as HTMLElement;
      if (focusedButton) {
        focusedButton.focus();
      }
    }
  }, [focusedDate]);

  const handleDateClick = (date: Date) => {
    onSelectDate(date);
    if (setFocusedDate && typeof setFocusedDate === 'function') {
      setFocusedDate(date);
    }
  };

  return (
    <tbody className={clsx('', className)}>
      {weeks.map((week, weekIndex) => (
        <tr key={weekIndex} role='row'>
          {week.map((date, dayIndex) => {
            const isOutsideMonth = !isSameMonth(date, month);
            if (!showOutsideDays && isOutsideMonth) {
              return (
                <td
                  key={dayIndex}
                  className={clsx(
                    'aspect-square bg-gray-100 cursor-default',
                    outsideDayClassName
                  )}
                  role='gridcell'
                />
              );
            }

            const isFocused = focusedDate
              ? isSameMonth(date, focusedDate) &&
                date.getDate() === focusedDate.getDate()
              : false;

            return (
              <td
                key={dayIndex}
                className={getDayClasses(
                  date,
                  month,
                  selectedDate,
                  paymentDueDate,
                  focusedDate,
                  outsideDayClassName
                )}
                role='gridcell'
                data-date={date.toISOString()}
                aria-selected={
                  selectedDate
                    ? isSameMonth(date, selectedDate) &&
                      date.getDate() === selectedDate.getDate()
                    : false
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
                  data-date={date.toISOString()}
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
