import { createContext, useContext } from 'react';
import { CalendarContextValue } from './types';

export const CalendarContext = createContext<CalendarContextValue | undefined>(
  undefined
);

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error(
      'Calendar components must be used within a Calendar provider'
    );
  }
  return context;
};
