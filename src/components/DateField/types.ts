// Types for DateField and its subcomponents
import type { CalendarProps } from '../Calendar';
import { ReactNode, HTMLAttributes, AriaAttributes } from 'react';

/** Base properties shared by all calendar components */
export interface BaseProps extends HTMLAttributes<HTMLElement>, AriaAttributes {
    /** Optional CSS class name for styling */
    className?: string;
    /** Optional child elements */
    children?: ReactNode;
}

import { DateFormat } from "../DatePicker/helper";

/**
 * Base props shared by DateField and its context.
 */
export interface DateFieldBaseProps extends HTMLAttributes<HTMLDivElement> {
    /** Children for composition. */
    children: React.ReactNode;
    /** Optional class name for the root element. */
    className?: string;
    /** Whether the field is disabled. */
    disabled?: boolean;
    /** Dates to exclude from selection. */
    excludeDates?: Date[];
    /** Error message for excluded dates. */
    excludeDatesErrorMessage?: string;
    /** Help text for the field. */
    helpText?: string;
    /** Label for the field. */
    label?: string;
    /** Maximum selectable date. */
    maxDate?: Date;
    /** Minimum selectable date. */
    minDate?: Date;
    /** Callback when the date changes. */
    onDateChange?: (date: Date | undefined) => void;
    /** Whether the field is required. */
    required?: boolean;
    /** Error message for invalid date range. */
    invalidRangeErrorMessage?: string;
    /** Optional style for the root element. */
    style?: React.CSSProperties;
    /** The selected date value (controlled). */
    value?: Date;
    /** Date format for input and display (defaults to 'MM/dd/yyyy') */
    format?: DateFormat;
    /** Array of formats to try when parsing user input (defaults to all supported formats) */
    parseFormats?: readonly DateFormat[];
}

/**
 * Context value for DateField compound components.
 * Extends base props and adds state/setters.
 */
export interface DateFieldContextProps extends Omit<DateFieldBaseProps, 'children'> {
    /** Whether the field is disabled. */
    disabled?: boolean;
    /** Dates to exclude from selection. */
    excludeDates?: Date[];
    /** Error message for excluded dates. */
    excludeDatesErrorMessage?: string;
    /** Help text for the field. */
    helpText?: string;
    /** Ref for the input element. */
    inputRef: React.RefObject<HTMLInputElement>;
    /** Current input error message. */
    inputError: string;
    /** Setter for input error. */
    setInputError: (err: string) => void;
    /** Current input value (string). */
    inputValue: string;
    /** Setter for input value. */
    setInputValue: (val: string) => void;
    /** Label for the field. */
    label?: string;
    /** Maximum selectable date. */
    maxDate?: Date;
    /** Minimum selectable date. */
    minDate?: Date;
    /** Callback when the date changes. */
    onDateChange?: (date: Date | undefined) => void;
    /** Whether the popover is open. */
    open: boolean;
    /** Setter for popover open state. */
    setOpen: (open: boolean) => void;
    /** Whether the field is required. */
    required?: boolean;
    /** Setter for date value. */
    setValue: (date: Date | undefined) => void;
    /** Error message for invalid date range. */
    invalidRangeErrorMessage?: string;
    /** Optional style for the root element. */
    style?: React.CSSProperties;
    /** The selected date value (may be controlled or uncontrolled). */
    value?: Date;
    /** Date format for input and display (defaults to 'MM/dd/yyyy') */
    format?: DateFormat;
}

/**
 * Props for the DateField.Calendar slot component.
 */
export type DateFieldCalendarSlotProps = Omit<CalendarProps, 'selectedDate' | 'onSelectDate'> & {
    /** Calendar children for composition. */
    children?: React.ReactNode;
}; 
