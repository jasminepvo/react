import { Matcher, DayPicker } from "react-day-picker";

/** Represents the value that can be selected in the DatePicker component */
export type SelectionValue = Date | null;

/** Props for the Calendar component that extends react-day-picker's DayPicker component */
export interface CalendarProps extends Pick<React.ComponentProps<typeof DayPicker>, 'formatters'> {
    /** Layout style for the calendar caption */
    captionLayout?: 'dropdown' | 'label' | 'dropdown-months' | 'dropdown-years';
    /** Custom class names for styling different parts of the calendar */
    classNames?: Record<string, string>;
    /** Dates or date ranges that should be disabled/unselectable */
    disabled?: Matcher | Matcher[];
    /** Maximum selectable date */
    maxDate?: Date;
    /** Minimum selectable date */
    minDate?: Date;
    /** Number of months to display at once */
    numberOfMonths?: 1 | 2;
    /** Callback function when a date is selected */
    onSelect?: (value: Date | undefined) => void;
    /** Due date for payment, used for highlighting */
    paymentDueDate?: Date;
    /** Whether date selection is required */
    required?: boolean;
    /** Currently selected date */
    selected?: Date | undefined;
    /** Whether to show days from previous/next months */
    showOutsideDays?: boolean;

}

/** Props for validating date input values */
export interface ValidateDateInputProps {
    /** Error message to display when end date is invalid */
    endDateErrorMessage?: string;
    /** Error message to display when date is in excluded dates */
    excludeDatesErrorMessage?: string;
    /** Array of dates that should be excluded from selection */
    excludeDates?: Date[];
    /** Date string in the specified format */
    formattedDate: string;
    /** Maximum allowed date */
    maxDate: Date;
    /** Minimum allowed date */
    minDate: Date;
    /** Error message to display when start date is invalid */
    startDateErrorMessage?: string;
}

/** Props for the main DatePicker component */
export interface DatePickerProps {
    /** Layout style for the calendar caption */
    captionLayout?: 'dropdown' | 'label' | 'dropdown-months' | 'dropdown-years';
    /** CSS class name for the component */
    className?: string;
    /** Disclaimer text shown below the component */
    disclaimer?: string;
    /** Dates or date ranges that should be disabled */
    disabled?: Matcher | Matcher[];
    /** Maximum selectable date */
    endDate?: Date;
    /** Error message for excluded dates */
    excludeDatesErrorMessage?: string;
    /** Array of dates that cannot be selected */
    excludeDates?: Date[];
    /** Error message for invalid end date */
    endDateErrorMessage?: string;
    /** General error message */
    error?: string;
    /** Help text displayed below the input field */
    helpText?: string;
    /** ID for the text input field */
    idTextfield?: string;
    /** Whether the datepicker is in read-only mode */
    isReadOnly?: boolean;
    /** Label text for the input field */
    label?: string;
    /** Height of the modal containing the calendar */
    modalHeight?: string;
    /** Width of the modal containing the calendar */
    modalWidth?: string;
    /** Name attribute for the input field */
    name?: string;
    /** Number of months to display at once */
    numberOfMonths?: 1 | 2;
    /** Callback function when date selection changes */
    onChange?: (date: SelectionValue) => void;
    /** Payment due date for highlighting */
    paymentDueDate?: Date;
    /** Placeholder text for the input field */
    placeholder?: string;
    /** Whether date selection is required */
    required?: boolean;
    /** Currently selected date */
    selected?: Date;
    /** Whether to show days from previous/next months */
    showOutsideDays?: boolean;
    /** Whether to show the legend below the calendar */
    showLegend?: boolean;
    /** Initial or minimum selectable date */
    startDate?: Date;
    /** Error message for invalid start date */
    startDateErrorMessage?: string;
}
