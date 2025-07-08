import { ReactNode } from 'react';

/** Base properties shared by all calendar components */
export interface BaseProps {
    /** Optional CSS class name for styling */
    className?: string;
    /** Optional child elements */
    children?: ReactNode;
}

/** Properties for the main Calendar component */
export interface CalendarProps extends BaseProps {
    /** Default month to display when calendar first renders */
    defaultMonth?: Date;
    /** Callback function when a date is selected */
    onSelectDate: (date: Date) => void;
    /** Date when payment is due, will be highlighted */
    paymentDueDate?: Date;
    /** Currently selected date */
    selectedDate?: Date;
}

/** Properties for the calendar grid body component */
export interface GridBodyProps extends BaseProps {
    /** Whether to show days from previous/next months */
    showOutsideDays?: boolean;
    /** Which day the week starts on (0 = Sunday, 1 = Monday) */
    weekStartsOn?: 0 | 1;
}

/** Properties for the calendar grid header component */
export interface GridHeaderProps extends BaseProps {
    /** Number of characters to show for weekday names */
    weekdayChar?: number;
    /** Which day the week starts on (0 = Sunday, 1 = Monday) */
    weekStartsOn?: 0 | 1;
}

/** Properties for the main grid container component */
export interface GridProps extends BaseProps {
    /** Custom class name for styling days outside the current month */
    outsideDayClassName?: string;
    /** Whether to show days from previous/next months */
    showOutsideDays?: boolean;
}

/** Properties for legend items showing date types */
export interface LegendItemProps extends BaseProps {
    /** Type of date the legend item represents */
    type?: 'selected' | 'payment-due' | 'today';
}

/** Properties for navigation buttons */
export interface NavigationButtonProps extends BaseProps {
    /** Direction of navigation (previous/next month) */
    direction: 'prev' | 'next';
}

/** Base properties for all select components */
export interface SelectOptionsProps extends BaseProps {
    /** Number of options to show after current value */
    optionsAfter?: number;
    /** Number of options to show before current value */
    optionsBefore?: number;
}

/** 
 * The shape of the Calendar context value that will be shared across calendar components.
 * This context provides state and callbacks for managing calendar date selection,
 * current month view, and payment due dates.
 */
export interface CalendarContextValue {
    /** Currently selected date in the calendar */
    selectedDate?: Date;

    /** Date when payment is due, will be highlighted in the calendar */
    paymentDueDate?: Date;

    /** 
     * Callback function triggered when a date is selected
     * @param date - The newly selected date
     */
    onSelectDate: (date: Date) => void;

    /** Current month being displayed in the calendar view */
    month: Date;

    /** 
     * Function to update the currently displayed month
     * @param month - The new month to display
     */
    setMonth: (month: Date) => void;

    /** Initial month to display when calendar first renders */
    defaultMonth: Date;
}
