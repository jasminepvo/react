import { createContext, useContext } from 'react';
import { CalendarContextType } from './types';

// Creates a context with undefined as initial value
export const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined
);

// Custom hook to use the calendar context
export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error(
      'Calendar components must be used within a Calendar provider'
    );
  }
  return context;
};
