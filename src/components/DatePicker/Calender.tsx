import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { CalendarProps } from "./types";

const formatWeekdayName = (weekday: Date) => {
  return weekday.toLocaleDateString("en-US", { weekday: "narrow" });
};

export const Calendar = ({
  classNames = {},
  selected,
  onSelect,
  showOutsideDays = true,
  disabled,
  required,
  minDate,
  maxDate,
  paymentDueDate,
  formatters = { formatWeekdayName },
  ...props
}: CalendarProps) => {
  const baseStyles = {
    root: "relative",
    months: "relative",
    day: "h-11 w-11 text-brown/70 text-base p-0 font-light aria-selected:opacity-100 hover:bg-gray/20 rounded-sm pointer",
    month_grid: "w-100%",
    month_caption: "text-base text-brown",
    month: "space-y-4 text-center",
    nav: "flex items-center justify-between w-full absolute left-0 right-0 px-6 top-3",
    button_previous:
      "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-taupe absolute left-0 [&>svg]:text-taupe [&>svg]:fill-taupe",
    button_next:
      "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-taupe absolute right-0 [&>svg]:text-taupe [&>svg]:fill-taupe",
    caption: "flex items-center justify-center relative",
    weekdays: "text-base font-extrabold w-4 h-6 text-brown",
    disabled: "text-gray hover:bg-gray/10",
    hidden: "invisible",
    outside: "opacity-50",
    today: "text-blush! font-bold!",
    selected: "bg-blush text-taupe hover:bg-taupe rounded-sm",
    range_start: "bg-blush text-cream rounded-l-sm",
    range_end: "bg-blush text-cream rounded-r-sm",
    range_middle: "bg-blush/50 text-brown",
    ...classNames,
  };

  // Custom modifiers for the payment due date
  const modifiers = {
    ...(paymentDueDate ? { paymentDue: paymentDueDate } : {}),
  };

  const modifiersClassNames = {
    paymentDue: "border-2 border-blush rounded-sm",
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
      mode="single"
      selected={selected as Date | undefined}
      onSelect={onSelect as (date: Date | undefined) => void}
      showOutsideDays={showOutsideDays}
      disabled={dateConstraints}
      required={required}
      classNames={baseStyles}
      modifiers={modifiers}
      modifiersClassNames={modifiersClassNames}
      formatters={formatters}
      {...props}
    />
  );
};
