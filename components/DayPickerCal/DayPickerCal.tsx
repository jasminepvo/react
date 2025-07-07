import React, { ReactNode } from 'react';
import { DayPicker, DayPickerSingleProps } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import {
  CustomNavigationBar,
  CustomMonthCaption,
  CustomWeekdaysRow,
  CustomMonthGrid,
  CustomWeeksContainer,
  CustomWeekRow,
  CustomDayCell,
  CustomFooter,
} from './CalendarParts';

interface DayPickerCalProps extends DayPickerSingleProps {
  children?: ReactNode;
}

type CompoundComponent = {
  Nav: React.FC;
  MonthCaption: React.FC;
  Weekdays: React.FC;
  MonthGrid: React.FC<{ children?: ReactNode }>;
  Weeks: React.FC<{ children?: ReactNode }>;
  Week: React.FC<{ children?: ReactNode }>;
  Day: React.FC;
  Footer: React.FC;
};

const DayPickerCal: React.FC<DayPickerCalProps> & CompoundComponent = ({
  children,
  ...props
}) => {
  return (
    <>
      <DayPicker
        {...props}
        components={{
          Nav: CustomNavigationBar,
          MonthCaption: CustomMonthCaption,
          Weekdays: CustomWeekdaysRow,
          MonthGrid: CustomMonthGrid,
          Weeks: CustomWeeksContainer,
          Week: CustomWeekRow,
          Day: CustomDayCell,
          Footer: CustomFooter,
        }}
      />
      {children}
    </>
  );
};

DayPickerCal.Nav = () => null;
DayPickerCal.MonthCaption = () => null;
DayPickerCal.Weekdays = () => null;
DayPickerCal.MonthGrid = ({ children }) => <>{children}</>;
DayPickerCal.Weeks = ({ children }) => <>{children}</>;
DayPickerCal.Week = ({ children }) => <>{children}</>;
DayPickerCal.Day = () => null;
DayPickerCal.Footer = () => null;

export default DayPickerCal;
