import { ValidateDateInputProps } from "./types";
import { parse, isValid, format } from 'date-fns';

// Supported date formats
export const SUPPORTED_FORMATS = ['MM/dd/yyyy', 'dd/MM/yyyy'] as const;
export type DateFormat = typeof SUPPORTED_FORMATS[number];

/**
 * Parses a date string using the specified format
 * @param value - The date string to parse
 * @param format - The format to parse with
 * @returns Parsed Date object or null if invalid
 */
export function parseDateWithFormat(
  value: string,
  format: DateFormat
): Date | null {
  try {
    const parsed = parse(value, format, new Date());
    return isValid(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * Validates a date input against min/max range and excluded dates.
 * @param params - An object containing minDate, maxDate, formattedDate, excludeDates, and error messages.
 * @returns A specific error message if the date is out of range or excluded, otherwise an empty string.
 */
export const validateDateInput = ({
  minDate,
  maxDate,
  parsedDate,
  excludeDates,
  invalidRangeErrorMessage,
  excludeDatesErrorMessage,
}: ValidateDateInputProps): string => {
  // Check if date is in exclude list
  const isExcludeDates = excludeDates?.some((date: Date) =>
    new Date(date).getTime() === parsedDate.getTime()
  );

  if (isExcludeDates) {
    return excludeDatesErrorMessage || 'This date is not available for selection';
  }

  // Check if date is within range (only if there's a range)
  const isDateRange = minDate !== maxDate;
  if (!isDateRange) {
    return "";
  }

  if (parsedDate < minDate || parsedDate > maxDate) {
    const minDateStr = minDate.toLocaleDateString();
    const maxDateStr = maxDate.toLocaleDateString();
    return invalidRangeErrorMessage || `Date should be between ${minDateStr} and ${maxDateStr}`;
  }

  return "";
}

/**
 * Validates if a string matches the specified date format
 * @param testDate - The string to test
 * @param format - The format to check against
 * @returns True if the string matches the format, false otherwise
 */
export const validDateFormat = (
  testDate: string,
  format: DateFormat
): boolean => {
  return parseDateWithFormat(testDate, format) !== null;
}

/**
 * Returns the initial input error message for the DatePicker.
 * @param params - An object containing required, selected, selectedDate, and error.
 * @returns The error message if the field is required and no date is set, otherwise an empty string or the provided error.
 */
export function getInitialInputError({
  required,
  selected,
  selectedDate,
  error,
}: {
  required: boolean;
  selected: Date | null | undefined;
  selectedDate: Date | null | undefined;
  error?: string;
}): string {
  if (required && !selected && !selectedDate) {
    return error || "This field is required";
  }
  return error || "";
}

/**
 * Formats a date according to the specified format
 * @param date - The date to format
 * @param formatStr - The format string (e.g., 'MM/dd/yyyy')
 * @returns Formatted date string
 */
export function formatDate(date: Date, formatStr: DateFormat): string {
  return format(date, formatStr);
}

/**
 * Formats the date input as the user types, inserting slashes and removing invalid characters.
 * @param value - The current input value
 * @param formatStr - The target format (defaults to 'MM/dd/yyyy')
 * @returns The formatted input string
 */
export function formatDateInput(value: string, formatStr: DateFormat = 'MM/dd/yyyy'): string {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, "");

  // Handle empty input
  if (digits.length === 0) {
    return "";
  }

  // Early return for unsupported formats
  if (formatStr !== 'MM/dd/yyyy' && formatStr !== 'dd/MM/yyyy') {
    return value;
  }

  // Build formatted string based on digit length
  let formatted = "";

  if (digits.length >= 1) {
    formatted = digits.slice(0, 2);
  }

  if (digits.length >= 3) {
    formatted = `${formatted}/${digits.slice(2, 4)}`;
  }

  if (digits.length >= 5) {
    formatted = `${formatted}/${digits.slice(4, 8)}`;
  }

  // Limit to 10 characters
  return formatted.slice(0, 10);
}

/**
 * Returns the required field error message if the value is missing and the field is required.
 * @param date - The date value to check.
 * @param required - Whether the field is required.
 * @param error - Optional custom error message.
 * @returns The error message if required and date is missing, otherwise an empty string.
 */
export function getRequiredFieldError(date: Date | null | undefined, required: boolean, error?: string): string {
  return required && !date ? error || "This field is required" : "";
}