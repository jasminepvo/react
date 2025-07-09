import React from 'react';
import { CalendarProps } from './types';
import { CalendarContext } from './CalendarContext';
import { Grid, GridHeader, GridBody } from './Grid';
import { Navigation } from './NavigationButtons';
import { MonthSelect, YearSelect, MonthYearSelect } from './Selects';
import { Legend, LegendItem } from './Legend';
import { Messaging } from './Messaging';
import { Heading } from './Heading';
import { Caption } from './Caption';

interface CalendarComponent extends React.FC<CalendarProps> {
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
}

export function Calendar({
  children,
  selectedDate,
  paymentDueDate,
  onSelectDate,
  defaultMonth = new Date(),
  className = '',
}) => {
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
};

// Attach subcomponents to maintain compound component pattern
Calendar.Heading = Heading;
Calendar.Navigation = Navigation;
Calendar.Caption = Caption;
Calendar.MonthSelect = MonthSelect;
Calendar.YearSelect = YearSelect;
Calendar.MonthYearSelect = MonthYearSelect;
Calendar.Grid = Grid;
Calendar.GridHeader = GridHeader;
Calendar.GridBody = GridBody;
Calendar.Legend = Legend;
Calendar.LegendItem = LegendItem;
Calendar.Messaging = Messaging;

export default Calendar as CalendarComponent;
