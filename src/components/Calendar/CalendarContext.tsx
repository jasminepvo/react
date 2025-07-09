import { createContext, useContext } from 'react';
import { CalendarContextValue } from './types';

export const CalendarContext = createContext<CalendarContextValue | undefined>(
  undefined
);

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error(
      'Calendar compound components must be used within Calendar'
    );
  }
  return context;
};
