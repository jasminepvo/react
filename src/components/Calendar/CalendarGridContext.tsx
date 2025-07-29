import { createContext, useContext } from "react";

import { CalendarGridContextType } from "./types";


export const CalendarGridContext = createContext<
  CalendarGridContextType | undefined>(undefined);

  export const useCalendarGridContext = () => {
    const context = useContext(CalendarGridContext);
    if (!context) {
      throw new Error('useCalendarGridContext must be used within a CalendarGridContext');
    }
    return context;
  };