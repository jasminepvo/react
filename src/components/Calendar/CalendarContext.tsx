import { createContext, useContext } from 'react';

export interface CalendarContextValue {
  selectedDate?: Date;
  paymentDueDate?: Date;
  onSelectDate: (date: Date) => void;
  onSubmit?: () => void;
  month: Date;
  setMonth: (month: Date) => void;
  defaultMonth: Date;
  // Keyboard navigation state
  focusedDate?: Date;
  setFocusedDate: (date: Date | undefined) => void;
  // Keyboard navigation methods
  handleKeyDown: (event: React.KeyboardEvent, currentDate: Date) => void;
  // Focus management
  focusFirstDate: () => void;
  focusLastDate: () => void;
  // Calendar dates utility
  getCalendarDates: () => Date[];
}

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
