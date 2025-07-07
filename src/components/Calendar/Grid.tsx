import { FC } from 'react';
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
import {
  CompoundComponentProps,
  GridHeaderProps,
  GridBodyProps,
} from './types';
import { useCalendarContext } from './CalendarContext';

// Grid Component
export const Grid: FC<CompoundComponentProps> = ({ className, children }) => (
  <div className={className}>{children}</div>
);

// Grid Header Component
export const GridHeader: FC<GridHeaderProps> = ({
  className,
  weekdayChar = 2,
  weekStartsOn = 0, // Default to Sunday
}) => {
  // Get the start of the week based on weekStartsOn
  const baseDate = startOfWeek(new Date(), { weekStartsOn });

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(baseDate, i);
    const fullName = dateFnsFormat(date, 'EEEE');

    return weekdayChar === 1
      ? fullName[0]
      : weekdayChar === 2
      ? fullName.slice(0, 2)
      : weekdayChar === 3
      ? fullName.slice(0, 3)
      : fullName;
  });

  return (
    <div className={className}>
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
  weekStartsOn = 0, // Default to Sunday
}) => {
  const { month, selectedDate, paymentDueDate, onSelectDate } =
    useCalendarContext();

  // Get the start and end dates for the calendar grid
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn });

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

    return `
      calendar-day
      ${isOutsideMonth ? 'outside-month' : ''}
      ${isSelected ? 'selected' : ''}
      ${isPaymentDue ? 'payment-due' : ''}
      ${isToday ? 'today' : ''}
    `.trim();
  };

  return (
    <div className={`calendar-grid ${className || ''}`}>
      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className='calendar-week'>
          {week.map((date, dayIndex) => {
            const isOutsideMonth = !isSameMonth(date, month);
            if (!showOutsideDays && isOutsideMonth) {
              return <div key={dayIndex} className='calendar-day empty' />;
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
