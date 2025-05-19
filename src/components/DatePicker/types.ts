import { Matcher, DayPicker } from "react-day-picker";

export type SelectionValue = Date | null;

export interface CalendarProps extends Pick<React.ComponentProps<typeof DayPicker>, 'formatters'> {
    selected?: Date | undefined;
    onSelect?: (value: Date | undefined) => void;
    classNames?: Record<string, string>;
    showOutsideDays?: boolean;
    disabled?: Matcher | Matcher[];
    required?: boolean;
    minDate?: Date;
    maxDate?: Date;
    paymentDueDate?: Date;
    captionLayout?: 'dropdown' | 'label' | 'dropdown-months' | 'dropdown-years';
}

export interface ValidateDateInputProps {
    minDate: Date;
    maxDate: Date;
    formattedDate: string;
    excludeDates?: Date[];
    startDateErrorMessage?: string;
    endDateErrorMessage?: string;
    excludeDatesErrorMessage?: string;
}

export interface DatePickerProps {
    className?: string;
    startDate?: Date;
    endDate?: Date;
    excludeDates?: Date[];
    isReadOnly?: boolean;
    required?: boolean;
    selected?: Date;
    onChange?: (date: SelectionValue) => void;
    placeholder?: string;
    helpText?: string;
    idTextfield?: string;
    name?: string;
    startDateErrorMessage?: string;
    endDateErrorMessage?: string;
    excludeDatesErrorMessage?: string;
    error?: string;
    label?: string;
    disclaimer?: string;
    disabled?: Matcher | Matcher[];
    paymentDueDate?: Date;
    showOutsideDays?: boolean;
    captionLayout?: 'dropdown' | 'label' | 'dropdown-months' | 'dropdown-years';
}
