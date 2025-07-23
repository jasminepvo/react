import { DayPicker } from 'react-day-picker';
import { CalendarProps } from './types';
import 'react-day-picker/dist/style.css';
import clsx from 'clsx';

const formatWeekdayName = (weekday: Date) => {
  return weekday.toLocaleDateString('en-US', { weekday: 'narrow' });
};

export const Calendar = ({
  captionLayout,
  classNames = {},
  selected,
  onSelect,
  showOutsideDays = true,
  disabled,
  required,
  minDate,
  maxDate,
  numberOfMonths = 1,
  paymentDueDate,
  formatters = { formatWeekdayName },
  ...props
}: CalendarProps) => {
  const baseStyles = {
    root: 'relative',
    months: clsx(
      'flex justify-center relative',
      numberOfMonths === 2
        ? 'after:absolute after:top-10 after:bottom-0 after:w-[1px] after:bg-red-200 after:left-1/2'
        : ''
    ),
    day: 'h-10 w-10 text-brown/70 text-base p-0 font-light aria-selected:opacity-100 hover:bg-gray/20 cursor-pointer rounded-lg',
    day_button: 'h-10 w-10',
    month_grid: 'w-[100%]',
    month_caption: 'text-base text-brown',
    month: 'space-y-4 text-center px-2 mx-4',
    nav: 'flex items-center justify-between w-full',
    button_previous:
      'h-6 w-6 p-0 opacity-50 hover:opacity-100 absolute left-2 top-0 text-taupe [&>svg]:text-taupe [&>svg]:fill-taupe',
    button_next:
      'h-6 w-6 p-0 opacity-50 hover:opacity-100 text-taupe absolute right-2 top-0 [&>svg]:text-taupe [&>svg]:fill-taupe',
    weekdays: 'text-base font-semibold w-4 h-6',
    disabled: 'text-gray hover:bg-gray/10',
    hidden: 'invisible',
    outside: 'opacity-50',
    today: 'text-blush font-bold!',
    range_start: 'bg-blush text-cream rounded-l-lg',
    range_end: 'bg-blush text-cream rounded-r-lg',
    selected: 'bg-blush text-taupe hover:bg-taupe rounded-lg',
    ...classNames,
  };

  // Custom modifiers for the payment due date
  const modifiers = {
    ...(paymentDueDate ? { paymentDue: paymentDueDate } : {}),
  };

  const modifiersClassNames = {
    paymentDue: 'outline-2 outline-blush rounded-sm',
  };

  // Create date range constraint
  let dateConstraints = disabled || [];

  // Add min/max date constraints
  if (minDate || maxDate) {
    const beforeMinDate = minDate ? { before: minDate } : undefined;
    const afterMaxDate = maxDate ? { after: maxDate } : undefined;

    // Combine the constraints
    const constraints = [
      ...(Array.isArray(dateConstraints) ? dateConstraints : [dateConstraints]),
      ...(beforeMinDate ? [beforeMinDate] : []),
      ...(afterMaxDate ? [afterMaxDate] : []),
    ].filter(Boolean);

    dateConstraints = constraints;
  }

  return (
    <DayPicker
      mode='single'
      selected={selected as Date | undefined}
      onSelect={onSelect as (date: Date | undefined) => void}
      showOutsideDays={showOutsideDays}
      disabled={dateConstraints}
      required={required}
      classNames={baseStyles}
      modifiers={modifiers}
      modifiersClassNames={modifiersClassNames}
      formatters={formatters}
      captionLayout={captionLayout}
      numberOfMonths={numberOfMonths}
      {...props}
    />
  );
};
