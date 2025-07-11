import { ReactNode, HTMLAttributes, AriaAttributes } from 'react';

/** Base properties shared by all calendar components */
export interface BaseProps extends HTMLAttributes<HTMLElement>, AriaAttributes {
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

/** Properties for month selection component */
export type MonthSelectProps = SelectOptionsProps;

/** Properties for combined month-year selection component */
export type MonthYearSelectProps = SelectOptionsProps;

/** Properties for year selection component */
export type YearSelectProps = SelectOptionsProps;

