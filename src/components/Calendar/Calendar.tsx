import React, { FC, useMemo, useCallback } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
} from 'date-fns';
import { CalendarProps } from './types';
import { CalendarContext } from './CalendarContext';
import { Grid, GridHeader, GridBody } from './Grid';
import { Navigation } from './NavigationButtons';
import { MonthSelect, YearSelect, MonthYearSelect } from './Selects';
import { Legend, LegendItem } from './Legend';
import { Messaging } from './Messaging';
import { Heading } from './Heading';
import { Caption } from './Caption';
import { ActionItemButton } from './ActionItemButton';

interface CalendarComponent extends FC<CalendarProps> {
  Heading: typeof Heading;
  Navigation: typeof Navigation;
  Caption: typeof Caption;
  MonthSelect: typeof MonthSelect;
  YearSelect: typeof YearSelect;
  MonthYearSelect: typeof MonthYearSelect;
  Grid: typeof Grid;
  GridHeader: typeof GridHeader;
  GridBody: typeof GridBody;
  Legend: typeof Legend;
  LegendItem: typeof LegendItem;
  Messaging: typeof Messaging;
  ActionItemButton: typeof ActionItemButton;
}

const CalendarBase: FC<CalendarProps> = ({
  children,
  selectedDate,
  paymentDueDate,
  onSelectDate,
  onSubmit,
  defaultMonth = new Date(),
  className = '',
}) => {
  const [month, setMonth] = React.useState<Date>(defaultMonth);
  const [focusedDate, setFocusedDate] = React.useState<Date | undefined>(
    selectedDate
  );

  // Update focused date when selected date changes
  React.useEffect(() => {
    setFocusedDate(selectedDate);
  }, [selectedDate]);

  // Ensure we always have a focused date when the calendar mounts
  React.useEffect(() => {
    if (!focusedDate) {
      const monthStart = startOfMonth(month);
      const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
      setFocusedDate(calendarStart);
    }
  }, [focusedDate, month]);

  // Get all dates in the current month view for navigation
  const getCalendarDates = useCallback(() => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  }, [month]);

  // Focus management methods
  const focusFirstDate = useCallback(() => {
    const monthStart = startOfMonth(month);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    setFocusedDate(calendarStart);
  }, [month, setFocusedDate]);

  const focusLastDate = useCallback(() => {
    const monthEnd = endOfMonth(month);
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
    setFocusedDate(calendarEnd);
  }, [month, setFocusedDate]);

  const contextValue = useMemo(() => {
    // Ensure all functions are properly defined
    const value = {
      selectedDate,
      paymentDueDate,
      onSelectDate,
      onSubmit,
      month,
      setMonth,
      defaultMonth,
      focusedDate,
      setFocusedDate: setFocusedDate || (() => {}),
      focusFirstDate: focusFirstDate || (() => {}),
      focusLastDate: focusLastDate || (() => {}),
      getCalendarDates,
    };

    return value;
  }, [
    selectedDate,
    paymentDueDate,
    onSelectDate,
    onSubmit,
    month,
    setMonth,
    defaultMonth,
    focusedDate,
    setFocusedDate,
    focusFirstDate,
    focusLastDate,
    getCalendarDates,
  ]);

  return (
    <CalendarContext.Provider value={contextValue}>
      <div className={`relative ${className}`}>{children}</div>
    </CalendarContext.Provider>
  );
};

export const Calendar = Object.assign(CalendarBase, {
  Heading,
  Navigation,
  Caption,
  MonthSelect,
  YearSelect,
  MonthYearSelect,
  Grid,
  GridHeader,
  GridBody,
  Legend,
  LegendItem,
  Messaging,
  ActionItemButton,
}) as CalendarComponent;

export default Calendar;
