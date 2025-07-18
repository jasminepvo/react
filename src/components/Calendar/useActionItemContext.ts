import { useContext } from 'react';
import { DateFieldContext } from '../DateField/DateFieldContext';
import { CalendarContext } from './CalendarContext';

/**
 * Custom hook that checks for Calendar context first, then DateField context.
 * Throws an error if neither context is found.
 * 
 * This enables ActionItemButton to work in both usage patterns:
 * 1. Within DateField.Calendar (Calendar context takes precedence)
 * 2. Within standalone Calendar (Calendar context)
 */
export function useActionItemContext() {
    // Call both hooks unconditionally to follow React rules
    const dateFieldContext = useContext(DateFieldContext);
    const calendarContext = useContext(CalendarContext);

    // Prioritize Calendar context (since ActionItemButton is a Calendar component)
    if (calendarContext) {
        return { contextType: 'calendar' as const, context: calendarContext };
    }

    // Fall back to DateField context
    if (dateFieldContext) {
        return { contextType: 'dateField' as const, context: dateFieldContext };
    }

    // If neither context is found, throw an error
    throw new Error("ActionItemButton must be used within DateField or Calendar.");
}
