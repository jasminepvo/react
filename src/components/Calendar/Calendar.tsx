import React, { FC, ReactNode, createContext, useContext } from 'react';
import {
  format as dateFnsFormat,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  startOfWeek,
  endOfWeek,
} from 'date-fns';
import { CalendarProps } from './types';

// Styles
import './Calendar.css';

interface CalendarContextValue {
  selectedDate?: Date;
  paymentDueDate?: Date;
  onSelectDate: (date: Date) => void;
  month: Date;
  setMonth: (month: Date) => void;
  defaultMonth: Date;
}

const CalendarContext = createContext<CalendarContextValue | undefined>(
  undefined
);

const useCalendarContext = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error(
      'Calendar compound components must be used within Calendar'
    );
  }
  return context;
};

interface CompoundComponentProps {
  className?: string;
  children?: ReactNode;
}

// Main Calendar Component
export function Calendar({
  children,
  selectedDate,
  paymentDueDate,
  onSelectDate,
  defaultMonth = new Date(),
  className = '',
}: CalendarProps) {
  const [month, setMonth] = React.useState<Date>(defaultMonth);

  return (
    <CalendarContext.Provider
      value={{
        selectedDate,
        paymentDueDate,
        onSelectDate,
        month,
        setMonth,
        defaultMonth,
      }}
    >
      <div className={className}>{children}</div>
    </CalendarContext.Provider>
  );
}

// Heading Component (Container for navigation and caption)
const Heading: FC<CompoundComponentProps> = ({ className, children }) => (
  <div className={className}>{children}</div>
);

// Navigation Component
interface NavigationProps extends CompoundComponentProps {
  navLayout?: 'around' | 'before' | 'after';
}

const Navigation: FC<NavigationProps> = ({
  className,
  navLayout = 'around',
}) => {
  const { month, setMonth } = useCalendarContext();

  const handlePrevMonth = () => {
    const prevMonth = new Date(month);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setMonth(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(month);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setMonth(nextMonth);
  };

  return (
    <div className={className}>
      <button onClick={handlePrevMonth} aria-label='Previous month'>
        ←
      </button>
      {navLayout === 'around' && <div className='flex-1' />}
      <button onClick={handleNextMonth} aria-label='Next month'>
        →
      </button>
    </div>
  );
};

// Caption Component
interface CaptionProps extends CompoundComponentProps {
  captionLayout?: 'label' | 'dropdown' | 'buttons';
}

const Caption: FC<CaptionProps> = ({
  className,
  children,
  captionLayout = 'label',
}) => {
  const { month } = useCalendarContext();

  if (captionLayout === 'label') {
    return <div className={className}>{dateFnsFormat(month, 'MMMM yyyy')}</div>;
  }

  return <div className={className}>{children}</div>;
};

// Month Select Component
const MonthSelect: FC<CompoundComponentProps> = ({ className }) => {
  const { month, setMonth } = useCalendarContext();

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = new Date(month);
    newMonth.setMonth(parseInt(event.target.value));
    setMonth(newMonth);
  };

  return (
    <select
      className={className}
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

// Year Select Component
const YearSelect: FC<CompoundComponentProps> = ({ className }) => {
  const { month, setMonth } = useCalendarContext();
  const currentYear = new Date().getFullYear();

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = new Date(month);
    newMonth.setFullYear(parseInt(event.target.value));
    setMonth(newMonth);
  };

  return (
    <select
      className={className}
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

// Grid Component
const Grid: FC<CompoundComponentProps> = ({ className, children }) => (
  <div className={className}>{children}</div>
);

// Grid Header Component
interface GridHeaderProps extends CompoundComponentProps {
  weekdayChar?: number;
}

const GridHeader: FC<GridHeaderProps> = ({ className, weekdayChar = 2 }) => {
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(2024, 0, i + 1); // Using a Sunday-starting week
    return dateFnsFormat(
      date,
      weekdayChar === 1
        ? 'EEEEE'
        : weekdayChar === 2
        ? 'EE'
        : weekdayChar === 3
        ? 'EEE'
        : 'EEEE'
    );
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
interface GridBodyProps extends CompoundComponentProps {
  outsideDays?: boolean;
}

const GridBody: FC<GridBodyProps> = ({ className, outsideDays = true }) => {
  const { month, selectedDate, paymentDueDate, onSelectDate } =
    useCalendarContext();

  // Get the start and end dates for the calendar grid
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

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
            if (!outsideDays && isOutsideMonth) {
              return <div key={dayIndex} className='calendar-day empty' />;
            }

            return (
              <button
                key={dayIndex}
                className={getDayClasses(date)}
                onClick={() => onSelectDate(date)}
                disabled={isOutsideMonth && !outsideDays}
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

// Legend Component
const Legend: FC<CompoundComponentProps> = ({ className, children }) => (
  <div className={className}>{children}</div>
);

// Legend Item Component
interface LegendItemProps extends CompoundComponentProps {
  type?: 'selected' | 'payment-due' | 'today';
}

const LegendItem: FC<LegendItemProps> = ({ className, children, type }) => (
  <div className={className}>
    <div
      className={`w-4 h-4 ${
        type === 'selected'
          ? 'bg-blue-500 rounded-full'
          : type === 'payment-due'
          ? 'border-2 border-yellow-300'
          : type === 'today'
          ? 'bg-gray-200 rounded-full'
          : ''
      }`}
    />
    <span>{children}</span>
  </div>
);

// Messaging Component
const Messaging: FC<CompoundComponentProps> = ({ className, children }) => (
  <div className={className} role='status'>
    {children}
  </div>
);

// Attach compound components
Calendar.Heading = Heading;
Calendar.Navigation = Navigation;
Calendar.Caption = Caption;
Calendar.MonthSelect = MonthSelect;
Calendar.YearSelect = YearSelect;
Calendar.Grid = Grid;
Calendar.GridHeader = GridHeader;
Calendar.GridBody = GridBody;
Calendar.Legend = Legend;
Calendar.LegendItem = LegendItem;
Calendar.Messaging = Messaging;

export default Calendar;
