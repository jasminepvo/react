import React, { FC } from 'react';
import { CalendarProps } from './types';
import { CalendarContext } from './CalendarContext';
import { Heading } from './Heading';
import { Grid, GridHeader, GridBody, HeaderCell, Cell } from './Grid';
import {
  Legend,
  LegendItem,
} from './Legend';
import { Messaging } from './Messaging';
import { PrevButton, NextButton } from './NavigationButtons';
import { MonthSelect, YearSelect } from './Selects';

// Define compound component type
type CalendarComponent = FC<CalendarProps> & {
  Heading: typeof Heading;
  Grid: typeof Grid;
  GridHeader: typeof GridHeader;
  GridBody: typeof GridBody;
  HeaderCell: typeof HeaderCell;
  Cell: typeof Cell;
  Legend: typeof Legend;
  LegendItem: typeof LegendItem;
  Messaging: typeof Messaging;
  PrevButton: typeof PrevButton;
  NextButton: typeof NextButton;
  MonthSelect: typeof MonthSelect;
  YearSelect: typeof YearSelect;
};

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
        defaultMonth,
        month,
        setMonth,
      }}
    >
      <div className={className}>{children}</div>
    </CalendarContext.Provider>
  );
}

// Attach compound components
Calendar.Heading = Heading;
Calendar.Grid = Grid;
Calendar.GridHeader = GridHeader;
Calendar.GridBody = GridBody;
Calendar.HeaderCell = HeaderCell;
Calendar.Cell = Cell;
Calendar.Legend = Legend;
Calendar.LegendItem = LegendItem;
Calendar.Messaging = Messaging;
Calendar.PrevButton = PrevButton;
Calendar.NextButton = NextButton;
Calendar.MonthSelect = MonthSelect;
Calendar.YearSelect = YearSelect;

// Type assertion
const TypedCalendar = Calendar as CalendarComponent;
export default TypedCalendar;
