import React, { FC, useMemo } from 'react';
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

  const contextValue = useMemo(
    () => ({
      selectedDate,
      paymentDueDate,
      onSelectDate,
      onSubmit,
      month,
      setMonth,
      defaultMonth,
    }),
    [
      selectedDate,
      paymentDueDate,
      onSelectDate,
      onSubmit,
      month,
      setMonth,
      defaultMonth,
    ]
  );
  return (
    <CalendarContext.Provider value={contextValue}>
      <div className={className}>{children}</div>
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
