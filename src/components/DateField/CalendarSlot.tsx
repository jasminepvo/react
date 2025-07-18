import React from 'react';
import { Calendar } from '../Calendar';
import { useDateFieldContext } from './DateFieldContext';
import type { DateFieldCalendarSlotProps } from './types';

const CalendarSlot: React.FC<DateFieldCalendarSlotProps> = ({
  children,
  ...rest
}) => {
  const ctx = useDateFieldContext();
  const [tempDate, setTempDate] = React.useState<Date | undefined>(ctx.value);

  // Reset tempDate when popover opens or value changes
  React.useEffect(() => {
    if (ctx.open) setTempDate(ctx.value);
  }, [ctx.open, ctx.value]);

  // Handler for calendar date selection
  const handleSelect = (date: Date | undefined) => {
    setTempDate(date);
  };

  // Handler for submit button
  const handleSubmit = () => {
    ctx.setValue(tempDate);
    ctx.setOpen(false);
  };

  return (
    <Calendar
      selectedDate={tempDate}
      onSelectDate={handleSelect}
      onSubmit={handleSubmit}
      {...rest}
    >
      {children}
    </Calendar>
  );
};

export default CalendarSlot;
