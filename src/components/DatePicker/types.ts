import { Matcher } from "react-day-picker";

export interface BaseDatePickerProps {
  label?: string;
  placeholder?: string;
  disclaimer?: string;
  disabled?: Matcher | Matcher[];
  required?: boolean;
  errorMessage?: string;
}

export interface DateConstraints {
  minDate?: Date;
  maxDate?: Date;
}

export interface DateInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  readOnly: boolean;
  required?: boolean;
  id: string;
}

export interface DatePickerLabelProps {
  label?: string;
  required?: boolean;
  error?: boolean;
  htmlFor: string;
}

export interface DateRangeInfoProps extends DateConstraints {
  error?: string;
}

export interface ErrorMessageProps {
  message: string;
}

export interface CalendarLegendProps {
  paymentDueDate?: Date;
} 