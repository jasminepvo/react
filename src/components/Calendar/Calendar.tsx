import React, { createContext, useContext, useState } from 'react';
import { format } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { cn } from '../../lib/utils';

// Calendar Context
interface CalendarContextType {
  selectedDate?: Date;
  paymentDueDate?: Date;
  onSelectDate?: (date: Date) => void;
  month: Date;
  setMonth: (month: Date) => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined
);

const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('Calendar components must be used within Calendar');
  }
  return context;
};

// Main Calendar Component
interface CalendarProps {
  children: React.ReactNode;
  selectedDate?: Date;
  paymentDueDate?: Date;
  onSelectDate?: (date: Date) => void;
  defaultMonth?: Date;
  className?: string;
}

const Calendar = ({
  children,
  selectedDate,
  paymentDueDate,
  onSelectDate,
  defaultMonth = new Date(),
  className,
}: CalendarProps) => {
  const [month, setMonth] = useState(defaultMonth);

  return (
    <CalendarContext.Provider
      value={{
        selectedDate,
        paymentDueDate,
        onSelectDate,
        month,
        setMonth,
      }}
    >
      <div
        className={cn(
          'bg-white rounded-lg shadow-lg p-4 w-full max-w-md',
          className
        )}
      >
        {children}
      </div>
    </CalendarContext.Provider>
  );
};

// Calendar Heading Component
interface CalendarHeadingProps {
  className?: string;
  children?: React.ReactNode;
}

const CalendarHeading = ({ className, children }: CalendarHeadingProps) => {
  const { month, setMonth } = useCalendar();

  if (children) {
    return (
      <div className={cn('flex items-center justify-between mb-4', className)}>
        {children}
      </div>
    );
  }

  // Default heading implementation
  const handlePreviousMonth = () => {
    const prevMonth = new Date(month);
    prevMonth.setMonth(month.getMonth() - 1);
    setMonth(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(month);
    nextMonth.setMonth(month.getMonth() + 1);
    setMonth(nextMonth);
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = new Date(month);
    newMonth.setMonth(parseInt(event.target.value));
    setMonth(newMonth);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = new Date(month);
    newMonth.setFullYear(parseInt(event.target.value));
    setMonth(newMonth);
  };

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

  const currentYear = month.getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

  return (
    <div className={cn('flex items-center justify-between mb-4', className)}>
      <button
        onClick={handlePreviousMonth}
        className='p-1 hover:bg-gray-100 rounded'
      >
        <ChevronLeftIcon className='w-5 h-5 text-gray-600' />
      </button>

      <div className='flex items-center space-x-2'>
        <select
          value={month.getMonth()}
          onChange={handleMonthChange}
          className='text-lg font-semibold bg-transparent border-none outline-none cursor-pointer'
        >
          {months.map((monthName, index) => (
            <option key={index} value={index}>
              {monthName}
            </option>
          ))}
        </select>

        <select
          value={month.getFullYear()}
          onChange={handleYearChange}
          className='text-lg font-semibold bg-transparent border-none outline-none cursor-pointer'
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleNextMonth}
        className='p-1 hover:bg-gray-100 rounded'
      >
        <ChevronRightIcon className='w-5 h-5 text-gray-600' />
      </button>
    </div>
  );
};

// Navigation Button Components
interface CalendarNavButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const CalendarNavButton = ({
  onClick,
  children,
  className,
}: CalendarNavButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn('p-1 hover:bg-gray-100 rounded', className)}
    >
      {children}
    </button>
  );
};

const CalendarPrevButton = ({ className }: { className?: string }) => {
  const { month, setMonth } = useCalendar();

  const handlePreviousMonth = () => {
    const prevMonth = new Date(month);
    prevMonth.setMonth(month.getMonth() - 1);
    setMonth(prevMonth);
  };

  return (
    <CalendarNavButton onClick={handlePreviousMonth} className={className}>
      <ChevronLeftIcon className='w-5 h-5 text-gray-600' />
    </CalendarNavButton>
  );
};

const CalendarNextButton = ({ className }: { className?: string }) => {
  const { month, setMonth } = useCalendar();

  const handleNextMonth = () => {
    const nextMonth = new Date(month);
    nextMonth.setMonth(month.getMonth() + 1);
    setMonth(nextMonth);
  };

  return (
    <CalendarNavButton onClick={handleNextMonth} className={className}>
      <ChevronRightIcon className='w-5 h-5 text-gray-600' />
    </CalendarNavButton>
  );
};

// Month/Year Selector Components
const CalendarMonthSelect = ({ className }: { className?: string }) => {
  const { month, setMonth } = useCalendar();

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = new Date(month);
    newMonth.setMonth(parseInt(event.target.value));
    setMonth(newMonth);
  };

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

  return (
    <select
      value={month.getMonth()}
      onChange={handleMonthChange}
      className={cn(
        'text-lg font-semibold bg-transparent border-none outline-none cursor-pointer',
        className
      )}
    >
      {months.map((monthName, index) => (
        <option key={index} value={index}>
          {monthName}
        </option>
      ))}
    </select>
  );
};

const CalendarYearSelect = ({ className }: { className?: string }) => {
  const { month, setMonth } = useCalendar();

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = new Date(month);
    newMonth.setFullYear(parseInt(event.target.value));
    setMonth(newMonth);
  };

  const currentYear = month.getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

  return (
    <select
      value={month.getFullYear()}
      onChange={handleYearChange}
      className={cn(
        'text-lg font-semibold bg-transparent border-none outline-none cursor-pointer',
        className
      )}
    >
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
};

// Calendar Grid Component
interface CalendarGridProps {
  children: React.ReactNode;
  className?: string;
}

const CalendarGrid = ({ children, className }: CalendarGridProps) => {
  return <div className={cn('mb-4', className)}>{children}</div>;
};

// Calendar Grid Header Component
interface CalendarGridHeaderProps {
  children: (weekday: string) => React.ReactNode;
  className?: string;
}

const CalendarGridHeader = ({
  children,
  className,
}: CalendarGridHeaderProps) => {
  const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className={cn('flex mb-2', className)}>
      {weekdays.map((weekday, index) => (
        <div key={index} className='flex-1 text-center'>
          {children(weekday)}
        </div>
      ))}
    </div>
  );
};

// Calendar Header Cell Component
interface CalendarHeaderCellProps {
  children: React.ReactNode;
  className?: string;
}

const CalendarHeaderCell = ({
  children,
  className,
}: CalendarHeaderCellProps) => {
  return (
    <div className={cn('text-gray-500 text-sm font-medium py-2', className)}>
      {children}
    </div>
  );
};

// Calendar Grid Body Component
interface CalendarGridBodyProps {
  children: (date: Date) => React.ReactNode;
  className?: string;
}

const CalendarGridBody = ({ children, className }: CalendarGridBodyProps) => {
  const { month } = useCalendar();

  // Generate all dates for the current month
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, monthIndex, 1).getDay();

  const dates: (Date | null)[] = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    dates.push(null);
  }

  // Add all days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    dates.push(new Date(year, monthIndex, day));
  }

  // Group dates into weeks
  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < dates.length; i += 7) {
    weeks.push(dates.slice(i, i + 7));
  }

  return (
    <div className={cn('space-y-1', className)}>
      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className='flex'>
          {week.map((date, dayIndex) => (
            <div key={dayIndex} className='flex-1 text-center'>
              {date && children(date)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

// Calendar Cell Component
interface CalendarCellProps {
  date: Date;
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'selected' | 'payment-due' | 'today';
}

const CalendarCell = ({
  date,
  children,
  className,
  variant,
}: CalendarCellProps) => {
  const { selectedDate, paymentDueDate, onSelectDate } = useCalendar();

  // Auto-detect variant if not provided
  let computedVariant: 'default' | 'selected' | 'payment-due' | 'today' =
    variant || 'default';
  if (!variant) {
    const isSelected =
      selectedDate &&
      format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
    const isPaymentDue =
      paymentDueDate &&
      format(date, 'yyyy-MM-dd') === format(paymentDueDate, 'yyyy-MM-dd');
    const isToday =
      format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');

    if (isSelected) computedVariant = 'selected';
    else if (isPaymentDue) computedVariant = 'payment-due';
    else if (isToday) computedVariant = 'today';
    else computedVariant = 'default';
  }

  const handleClick = () => {
    if (onSelectDate) {
      onSelectDate(date);
    }
  };

  const variantStyles = {
    default: 'hover:bg-gray-100',
    selected: 'bg-orange-200 text-orange-900 hover:bg-orange-200',
    'payment-due': 'border-2 border-orange-300 hover:bg-gray-100',
    today: 'bg-gray-100 hover:bg-gray-200',
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'h-9 w-9 text-sm rounded-full transition-colors',
        variantStyles[computedVariant],
        className
      )}
    >
      {children || date.getDate()}
    </button>
  );
};

// Legend Components - Composable
interface CalendarLegendProps {
  children: React.ReactNode;
  className?: string;
}

const CalendarLegend = ({ children, className }: CalendarLegendProps) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center space-x-6 text-sm mb-4',
        className
      )}
    >
      {children}
    </div>
  );
};

interface CalendarLegendItemProps {
  children: React.ReactNode;
  indicator: React.ReactNode;
  className?: string;
}

const CalendarLegendItem = ({
  children,
  indicator,
  className,
}: CalendarLegendItemProps) => {
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      {indicator}
      <span className='text-gray-600'>{children}</span>
    </div>
  );
};

// Legend Indicator Components
const CalendarSelectedIndicator = ({ className }: { className?: string }) => (
  <div className={cn('w-4 h-4 bg-orange-200 rounded-full', className)} />
);

const CalendarPaymentDueIndicator = ({ className }: { className?: string }) => (
  <div
    className={cn('w-4 h-4 border-2 border-orange-300 rounded-full', className)}
  />
);

// Messaging Component - Completely Customizable
interface CalendarMessagingProps {
  children: React.ReactNode;
  className?: string;
}

const CalendarMessaging = ({ children, className }: CalendarMessagingProps) => {
  return (
    <div className={cn('text-gray-500 text-sm text-left mb-4', className)}>
      {children}
    </div>
  );
};

// Export compound component with all sub-components
Calendar.Heading = CalendarHeading;
Calendar.PrevButton = CalendarPrevButton;
Calendar.NextButton = CalendarNextButton;
Calendar.MonthSelect = CalendarMonthSelect;
Calendar.YearSelect = CalendarYearSelect;
Calendar.Grid = CalendarGrid;
Calendar.GridHeader = CalendarGridHeader;
Calendar.HeaderCell = CalendarHeaderCell;
Calendar.GridBody = CalendarGridBody;
Calendar.Cell = CalendarCell;
Calendar.Legend = CalendarLegend;
Calendar.LegendItem = CalendarLegendItem;
Calendar.SelectedIndicator = CalendarSelectedIndicator;
Calendar.PaymentDueIndicator = CalendarPaymentDueIndicator;
Calendar.Messaging = CalendarMessaging;

export default Calendar;
export {
  CalendarHeading,
  CalendarPrevButton,
  CalendarNextButton,
  CalendarMonthSelect,
  CalendarYearSelect,
  CalendarGrid,
  CalendarGridHeader,
  CalendarHeaderCell,
  CalendarGridBody,
  CalendarCell,
  CalendarLegend,
  CalendarLegendItem,
  CalendarSelectedIndicator,
  CalendarPaymentDueIndicator,
  CalendarMessaging,
};
